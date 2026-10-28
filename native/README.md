# SetSail native shells (Android + Windows)

Shared web UI in `www/` (synced from repo root via `npm run native:sync`).

## Windows (Electron)

```bash
npm run native:sync
cd native/electron
npm install
npm start          # dev
npm run pack       # → downloads/windows/SetSail-Setup-*.exe
```

LAN NMEA: `SetSailNativeLan` preload bridge (UDP/TCP).

## Android (Capacitor)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android --save-dev
npm run native:sync
# Point capacitor webDir at www (see native/capacitor.config.json)
npx cap add android
npx cap sync android
```

Open `android/` in Android Studio → Build APK → copy to `downloads/SetSail-android.apk`.

See `android-plugin/README.md` for the UDP/TCP plugin.

## App features

- Adaptive **Wi‑Fi AIS** UI (My Vessel → Connect Wi‑Fi AIS)
- Motion brow on SetChart (HDG/COG/SOG/ROT)
- Cloud pause banner on module Wi‑Fi
- Google-only gate in native shells + `/api/user-profile` sync
