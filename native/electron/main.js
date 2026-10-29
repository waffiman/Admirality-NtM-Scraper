const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const dgram = require("dgram");
const net = require("net");
const os = require("os");

let mainWindow = null;
let udpSocket = null;
let tcpClient = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: "SetSail"
  });

  const fs = require("fs");
  // Prefer online site (smaller installer); fall back to bundled www for offline bridge use.
  const bundled = [
    path.join(__dirname, "www", "index.html"),
    path.join(__dirname, "..", "..", "www", "index.html"),
    path.join(__dirname, "..", "..", "index.html")
  ].find((p) => fs.existsSync(p));
  const useRemote = process.env.SETSAIL_LOAD_REMOTE !== "0";
  if (useRemote) {
    mainWindow.loadURL(process.env.SETSAIL_URL || "https://setsail-ai.vercel.app/");
  } else if (bundled) {
    mainWindow.loadFile(bundled);
  } else {
    mainWindow.loadURL("https://setsail-ai.vercel.app/");
  }
}

function getNetworkInfo() {
  const ifaces = os.networkInterfaces();
  let ip = null;
  Object.keys(ifaces).forEach((name) => {
    (ifaces[name] || []).forEach((addr) => {
      if (addr.family === "IPv4" && !addr.internal && !ip) ip = addr.address;
    });
  });
  let gateway = null;
  if (ip) {
    const parts = ip.split(".");
    if (parts.length === 4) gateway = parts[0] + "." + parts[1] + "." + parts[2] + ".1";
  }
  return { ip: ip, gateway: gateway };
}

function stopSockets() {
  try {
    if (udpSocket) {
      udpSocket.close();
      udpSocket = null;
    }
  } catch (e) {}
  try {
    if (tcpClient) {
      tcpClient.destroy();
      tcpClient = null;
    }
  } catch (e2) {}
}

function pushData(buf) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("setsail-lan-data", buf.toString("utf8"));
  }
}

ipcMain.handle("setsail-lan-network", async () => getNetworkInfo());

ipcMain.handle("setsail-lan-open-wifi", async () => {
  // Windows: open Wi-Fi settings
  try {
    await shell.openExternal("ms-settings:network-wifi");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
});

ipcMain.handle("setsail-lan-probe", async (_e, opts) => {
  const host = (opts && opts.host) || "127.0.0.1";
  const port = Number((opts && opts.port) || 10110);
  const timeoutMs = Number((opts && opts.timeoutMs) || 600);
  return new Promise((resolve) => {
    const socket = dgram.createSocket("udp4");
    let done = false;
    const finish = (ok, proto) => {
      if (done) return;
      done = true;
      try {
        socket.close();
      } catch (e) {}
      resolve({ ok: !!ok, proto: proto || "udp" });
    };
    socket.on("message", () => finish(true, "udp"));
    socket.on("error", () => finish(false));
    try {
      socket.bind({ exclusive: false }, () => {
        try {
          socket.setBroadcast(true);
        } catch (e) {}
        const msg = Buffer.from("SetSailProbe\n");
        socket.send(msg, port, host);
        // also try listen on port briefly
      });
    } catch (e) {
      finish(false);
    }
    setTimeout(() => {
      // TCP probe
      const c = net.connect({ host: host, port: port }, () => {
        c.destroy();
        finish(true, "tcp");
      });
      c.on("error", () => {});
      setTimeout(() => {
        try {
          c.destroy();
        } catch (e) {}
        finish(false);
      }, timeoutMs);
    }, 50);
  });
});

ipcMain.handle("setsail-lan-connect", async (_e, opts) => {
  stopSockets();
  const host = (opts && opts.host) || "192.168.5.1";
  const port = Number((opts && opts.port) || 10110);
  const proto = String((opts && opts.proto) || "udp").toLowerCase();

  if (proto === "tcp") {
    tcpClient = net.connect({ host: host, port: port }, () => {});
    tcpClient.on("data", (buf) => pushData(buf));
    tcpClient.on("error", (err) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("setsail-lan-error", String(err.message || err));
      }
    });
    return { ok: true, proto: "tcp", host: host, port: port };
  }

  udpSocket = dgram.createSocket({ type: "udp4", reuseAddr: true });
  udpSocket.on("message", (buf) => pushData(buf));
  udpSocket.on("error", (err) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("setsail-lan-error", String(err.message || err));
    }
  });
  await new Promise((resolve, reject) => {
    udpSocket.bind(port, (err) => {
      if (err) reject(err);
      else {
        try {
          udpSocket.setBroadcast(true);
        } catch (e) {}
        resolve();
      }
    });
  });
  return { ok: true, proto: "udp", host: host, port: port };
});

ipcMain.handle("setsail-lan-disconnect", async () => {
  stopSockets();
  return { ok: true };
});

ipcMain.handle("setsail-lan-listen-udp", async (_e, opts) => {
  const port = Number((opts && opts.port) || 10110);
  return ipcMain.emit && (await (async () => {
    stopSockets();
    udpSocket = dgram.createSocket({ type: "udp4", reuseAddr: true });
    udpSocket.on("message", (buf) => pushData(buf));
    await new Promise((resolve, reject) => {
      udpSocket.bind(port, (err) => (err ? reject(err) : resolve()));
    });
    try {
      udpSocket.setBroadcast(true);
    } catch (e) {}
    return { ok: true };
  })());
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  stopSockets();
  if (process.platform !== "darwin") app.quit();
});
