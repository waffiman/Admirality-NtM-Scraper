const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("SetSailNativeLan", {
  getNetworkInfo: function () {
    return ipcRenderer.invoke("setsail-lan-network");
  },
  openWifiSettings: function () {
    return ipcRenderer.invoke("setsail-lan-open-wifi");
  },
  probe: function (opts) {
    return ipcRenderer.invoke("setsail-lan-probe", opts || {});
  },
  connect: async function (opts) {
    const r = await ipcRenderer.invoke("setsail-lan-connect", opts || {});
    return r;
  },
  disconnect: function () {
    return ipcRenderer.invoke("setsail-lan-disconnect");
  },
  listenUdp: function (opts) {
    return ipcRenderer.invoke("setsail-lan-listen-udp", opts || {});
  },
  stop: function () {
    return ipcRenderer.invoke("setsail-lan-disconnect");
  },
  onData: function (cb) {
    ipcRenderer.on("setsail-lan-data", (_e, data) => {
      try {
        if (typeof cb === "function") cb(data);
        if (window.__setsailLanAisIngest) window.__setsailLanAisIngest(data);
      } catch (err) {}
    });
  }
});

// Auto-wire ingest
ipcRenderer.on("setsail-lan-data", (_e, data) => {
  try {
    if (window.__setsailLanAisIngest) window.__setsailLanAisIngest(data);
  } catch (err) {}
});
