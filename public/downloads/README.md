# SetSail native downloads

Host built artifacts here (or on GitHub Releases) and link from the Install App tile:

| File | Platform |
|------|----------|
| `SetSail-android.apk` | Android (sideload) |
| `SetSail-Setup-*.exe` | Windows (NSIS from `native/electron`) |

Build:

```bash
# sync web assets
node native/scripts/sync-www.js

# Windows
cd native/electron && npm install && npm run pack

# Android — after `npx cap add android` + Android Studio assembleRelease
# copy APK to downloads/SetSail-android.apk
```
