/**
 * Copy SetSail site into native/www for Capacitor + Electron.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const WWW = path.resolve(__dirname, "..", "..", "www");

const COPY_LIST = [
  "index.html",
  "OPEN_SETSAIL.html",
  "manifest.json",
  "sw.js",
  "notices.json",
  "weather.json",
  "ais.json",
  "news.json",
  "assets",
  "ais",
  "api"
];

function rmDeep(p) {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function copyRecursive(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      if (name === "node_modules" || name === ".git" || name.startsWith("_tmp")) continue;
      copyRecursive(path.join(src, name), path.join(dst, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

rmDeep(WWW);
fs.mkdirSync(WWW, { recursive: true });

for (const rel of COPY_LIST) {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) {
    console.warn("skip missing", rel);
    continue;
  }
  console.log("copy", rel);
  copyRecursive(src, path.join(WWW, rel));
}

console.log("www ready →", WWW);
