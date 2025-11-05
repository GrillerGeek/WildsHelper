# Installation Guide - Wilds Helper PWA

Your **Shipwreck in the Wildlands Helper** is now a Progressive Web App (PWA) that can be installed on iPhone, iPad, and Mac!

## What is a PWA?

A Progressive Web App works like a native app but lives on the web. Benefits:
- ✅ **Installs like a native app** - Gets its own icon on your home screen/dock
- ✅ **Works offline** - Once installed, works without internet
- ✅ **Automatic updates** - Always get the latest version when online
- ✅ **No App Store needed** - Install directly from Safari
- ✅ **Cross-platform** - Same app on iPhone, iPad, and Mac

---

## Prerequisites

### 1. Generate App Icons (One-time setup)

Before installing, you need to create the app icons:

**Option A: Using the Browser Tool (Easiest)**
1. Open `generate-icons.html` in any web browser
2. Icons will be generated automatically
3. Click "Download" under each icon
4. Save all icons to the `/icons/` folder with the exact filenames shown

**Option B: Using Command Line (If you have librsvg or imagemagick)**
```bash
# Install librsvg (recommended)
brew install librsvg

# Run the generation script
./generate-icons.sh
```

### 2. Host the App

The PWA must be served over HTTPS (or localhost). Choose one option:

**Option A: GitHub Pages (Recommended - Free & Easy)**

1. Create a GitHub repository
2. Push all files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Wilds Helper PWA"
   git remote add origin https://github.com/YOUR-USERNAME/WildsHelper.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from `main` branch
   - Click Save
4. Your app will be live at: `https://YOUR-USERNAME.github.io/WildsHelper/`

**Option B: Netlify (Alternative - Also Free)**

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `WildsHelper` folder to Netlify
3. Get instant URL like: `https://wilds-helper.netlify.app`

**Option C: Local Testing (Development Only)**

```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

⚠️ **Note**: Service Worker requires HTTPS in production. Use GitHub Pages or Netlify for real installation.

---

## Installation Instructions

### iPhone / iPad

1. **Open Safari** (must use Safari, not Chrome)
   - Navigate to your hosted URL (e.g., `https://YOUR-USERNAME.github.io/WildsHelper/`)

2. **Tap the Share button** (square with arrow pointing up)
   - Located at the bottom of the screen (iPhone) or top (iPad)

3. **Scroll down and tap "Add to Home Screen"**
   - You may need to scroll the bottom menu to find it

4. **Customize the name** (optional)
   - Default: "Wilds Helper"
   - Tap "Add" in the top-right corner

5. **Launch the app**
   - Find the app icon on your home screen
   - Tap to open - it will run in full-screen mode!

**Screenshots:**
```
┌─────────────────┐
│   Safari        │  Step 1: Open in Safari
│                 │
│  Wilds Helper   │
│  [Content]      │
│                 │
│  [Share 📤]     │  Step 2: Tap Share
└─────────────────┘

┌─────────────────┐
│  Add to Home    │  Step 3: Select option
│  Screen         │
└─────────────────┘
```

### Mac (macOS)

**Method 1: Safari (macOS Sonoma 14+)**

1. **Open Safari**
   - Navigate to your hosted URL

2. **File → Add to Dock**
   - Or click the share button in toolbar
   - Select "Add to Dock"

3. **Launch from Dock**
   - App icon appears in your Dock
   - Opens in its own window

**Method 2: Chrome/Edge**

1. **Open Chrome or Edge**
   - Navigate to your hosted URL

2. **Look for install prompt**
   - Click the install icon (➕ or ⬇️) in the address bar
   - Or: Menu → "Install Wilds Helper..."

3. **Click "Install"**
   - App appears in Applications folder
   - Can be launched like any Mac app

---

## Verify Installation

### Check if PWA is Working

1. **Service Worker Registered**
   - Open the app in Safari
   - Open Web Inspector (Develop → Show Web Inspector)
   - Console should show: `Service Worker registered successfully`

2. **Offline Mode Test**
   - Open the installed app
   - Turn on Airplane Mode
   - Reload the app - it should still work!
   - Your saved game data will still be there

3. **Standalone Mode**
   - When launched from home screen/dock, there should be NO browser address bar
   - App runs in full-screen mode

### Troubleshooting

**Problem: "Add to Home Screen" option missing (iOS)**
- ✅ Make sure you're using Safari (not Chrome/Firefox)
- ✅ Check that you're on the actual app page, not the GitHub repo page
- ✅ Try force-quitting Safari and reopening

**Problem: Service Worker not registering**
- ✅ Ensure app is served over HTTPS (GitHub Pages does this automatically)
- ✅ Check browser console for errors
- ✅ Verify `service-worker.js` and `manifest.json` are in the root directory

**Problem: Icons not showing**
- ✅ Run `generate-icons.html` to create all icon sizes
- ✅ Verify icons are in `/icons/` folder
- ✅ Check filenames match manifest.json exactly: `icon-72x72.png`, `icon-192x192.png`, etc.

**Problem: App doesn't work offline**
- ✅ Load the app at least once while online (to cache resources)
- ✅ Check Service Worker status in browser DevTools
- ✅ Ensure all files are cached (check `service-worker.js` CACHE_NAME)

**Problem: Updates not showing**
- ✅ Service Worker caches aggressively. To force update:
  - iOS: Delete app, reinstall from Safari
  - Mac: Clear Safari cache, reload
- ✅ Increase version number in `service-worker.js` (change `CACHE_NAME`)

---

## Updating the App

### For Users

**Automatic Updates (Default)**
- When online, the app checks for updates automatically
- Close and reopen the app to get the latest version
- Your saved game data is preserved

**Manual Update**
- iOS: Delete app → Reinstall from Safari
- Mac: Remove from Dock → Add again from Safari

### For Developers

When you update the app code:

1. **Update Cache Version**
   ```javascript
   // In service-worker.js, increment version:
   const CACHE_NAME = 'wilds-helper-v2'; // was v1
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update app features"
   git push
   ```

3. **GitHub Pages auto-deploys** (within 1-2 minutes)

4. **Users get updates** next time they open the app while online

---

## Uninstalling

### iPhone / iPad
1. Long-press the app icon on home screen
2. Tap "Remove App" → "Delete App"
3. Confirm deletion

### Mac
**Safari-installed:**
1. Right-click app icon in Dock
2. Options → Remove from Dock
3. Delete from Applications folder if needed

**Chrome-installed:**
1. Open Chrome
2. Menu → "Uninstall Wilds Helper..."

---

## Advanced: Custom Domain (Optional)

Want a custom URL like `wilds.yourdomain.com`?

### Using GitHub Pages + Custom Domain

1. Buy a domain (Namecheap, Google Domains, etc.)

2. Add `CNAME` file to repository:
   ```
   wilds.yourdomain.com
   ```

3. Configure DNS:
   - Type: `CNAME`
   - Name: `wilds`
   - Value: `YOUR-USERNAME.github.io`

4. Enable HTTPS in GitHub Pages settings

5. Update `manifest.json`:
   ```json
   "start_url": "https://wilds.yourdomain.com/",
   "scope": "https://wilds.yourdomain.com/"
   ```

---

## Features Enabled by PWA

✅ **Offline Play** - Works without internet after first install
✅ **Local Data Storage** - Save/load persists in localStorage
✅ **Full-Screen Mode** - No browser UI when launched as app
✅ **Home Screen Icon** - Quick access from home screen/dock
✅ **Fast Loading** - Cached resources load instantly
✅ **Auto Updates** - Get new features without reinstalling
✅ **Native Feel** - Looks and feels like a native app
✅ **Safe Area Support** - Respects iPhone notch/rounded corners
✅ **Cross-Platform** - Same app on all devices

---

## Future Enhancements

The PWA foundation enables:

- 📱 **Push Notifications** - Reminders to continue your adventure
- 🔄 **Background Sync** - Auto-sync game data when back online
- 📂 **File System Access** - Export/import character sheets
- 🎮 **Gamepad Support** - Use controllers on desktop
- 🌙 **Dark Mode** - Automatic theme switching
- 📸 **Camera Access** - Scan dice rolls (AR dice)
- 🗺️ **Geolocation** - Real-world hex mapping

These can be added incrementally without reinstalling!

---

## Support & Feedback

**Issues?** Check the troubleshooting section above.

**Feature Requests?** The PWA architecture makes adding features easy!

**Questions?**
- Check `DevPlan.md` for technical details
- Review `service-worker.js` for offline behavior
- Inspect `manifest.json` for app configuration

---

## Quick Reference

| Action | iOS | Mac |
|--------|-----|-----|
| Install | Safari → Share → Add to Home Screen | Safari → File → Add to Dock |
| Launch | Tap home screen icon | Click Dock icon |
| Update | Automatic when online | Automatic when online |
| Uninstall | Long-press → Delete | Right-click → Remove |
| Offline | Works after first load | Works after first load |

---

## Checklist

Before sharing your app, verify:

- [ ] Icons generated (all 8 sizes in `/icons/` folder)
- [ ] App hosted on HTTPS (GitHub Pages or Netlify)
- [ ] Service Worker registering (check browser console)
- [ ] Manifest linked in `index.html`
- [ ] App installs on iOS Safari
- [ ] App works offline after installation
- [ ] Saved games persist after app restart
- [ ] Safe areas respected on notched devices
- [ ] All oracles and features functional

---

**Congratulations!** Your Shipwreck in the Wildlands Helper is now a fully-functional PWA. Enjoy your adventures in the Wildlands! 🌲⛵
