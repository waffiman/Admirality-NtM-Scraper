# SetSail LAN plugin (Android)

Capacitor custom plugin stub for UDP/TCP NMEA on Android.

## Scaffold

From repo root (requires Node + Android Studio):

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android --save
node native/scripts/sync-www.js
npx cap init SetSail ai.setsail.app --web-dir www
# or use native/capacitor.config.json with webDir ../www from native/
npx cap add android
npx cap sync android
```

Open `android/` in Android Studio, add INTERNET + ACCESS_NETWORK_STATE + ACCESS_WIFI_STATE (+ nearby Wi‑Fi / location for SSID on modern Android).

Implement `SetSailLanPlugin` mirroring Electron IPC:

- `getNetworkInfo` → WifiManager / LinkProperties gateway
- `connect` / `listenUdp` → DatagramSocket / Socket
- `openWifiSettings` → Settings.Panel or ACTION_WIFI_SETTINGS
- emit `nmea` events to WebView

Until the plugin is compiled, the JS UI still works; Auto-detect reports “install native app for live LAN sockets” in the browser.
