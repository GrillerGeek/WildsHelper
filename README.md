# Shipwreck in the Wildlands - Helper App

A Progressive Web App (PWA) companion for the solo RPG "Shipwreck in the Wildlands".

![PWA Badge](https://img.shields.io/badge/PWA-Enabled-success)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20iPadOS%20%7C%20macOS-blue)

## Features

### Character Management
- Create and manage characters with 6 backgrounds (Merchant, Sailor, Scholar, Artisan, Soldier, Wanderer)
- Track 6 skills (Athletics, Awareness, Cunning, Lore, Survival, Will) from 0-5
- Auto-calculated HP (10 + Athletics) and AP (Top 2 skills + 5)
- Equipment and notes tracking
- XP progression system

### Dice & Oracles
- **Skill Check Roller**: 2d6 + skill + modifiers vs DC (Easy to Legendary)
- **Weather Oracle**: Seasonal weather with d6 table
- **Discovery Oracle**: Find landmarks, ruins, resources, and more
- **Encounter Oracle**: Random encounters (wildlife, predators, Sylvani, survivors)
- **Complication Oracle**: When things go wrong
- **Yes/No Oracle**: Likelihood-based decision making

### Resource Tracking
- Day and season progression
- Water and food supply management
- Shelter and safety status
- Challenge logging for XP awards
- Exploration notes

### Quick Reference
- Difficulty Classes (Easy 5 → Legendary 20+)
- Skill check modifiers
- XP awards (Basic 1 → Epic 4)
- Survival needs and DCs
- Rest & recovery rules
- Action Point costs

### PWA Features
✅ **Install as App** - Works like a native app on iPhone, iPad, and Mac
✅ **Offline Play** - Full functionality without internet
✅ **Auto-Save** - Game data persists in localStorage
✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
✅ **Full-Screen Mode** - No browser UI when installed
✅ **Auto-Updates** - Always get the latest version

---

## Quick Start

### 1. Generate Icons (First Time Only)

Open `generate-icons.html` in a browser and download all icons to the `/icons/` folder.

### 2. Host the App

**GitHub Pages (Recommended):**
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/WildsHelper.git
git push -u origin main

# Enable GitHub Pages in repository Settings → Pages
```

**Or use Netlify:** Drag and drop the folder to [netlify.com](https://netlify.com)

### 3. Install on Device

**iPhone/iPad:**
1. Open Safari → Navigate to your hosted URL
2. Tap Share → "Add to Home Screen"
3. Tap "Add"

**Mac:**
1. Open Safari → Navigate to your hosted URL
2. File → "Add to Dock"

See [INSTALL.md](INSTALL.md) for detailed instructions.

---

## Project Structure

```
WildsHelper/
├── index.html              # Main app structure
├── styles.css              # Responsive styling with PWA support
├── app.js                  # Game logic and mechanics
├── manifest.json           # PWA configuration
├── service-worker.js       # Offline caching and updates
├── generate-icons.html     # Browser-based icon generator
├── generate-icons.sh       # CLI icon generator (requires librsvg)
├── icons/                  # App icons (generated)
│   ├── icon.svg           # Source icon
│   └── icon-*.png         # Generated PNG icons
├── RPG/                    # Game guide
│   └── Shipwreck in the Wildlands.pdf
├── README.md              # This file
├── INSTALL.md             # Installation guide
└── DevPlan.md             # Development documentation
```

---

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Responsive design with Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **PWA APIs** - Service Worker, Web App Manifest, Cache API
- **localStorage** - Persistent game data

---

## Browser Compatibility

### Required for Installation
- **iOS/iPadOS**: Safari 11.3+
- **macOS**: Safari 14+ or Chrome 90+

### Works in Browser (without installation)
- Chrome, Edge, Firefox, Safari (all modern versions)

---

## Documentation

- **[INSTALL.md](INSTALL.md)** - Complete installation guide for iOS, iPad, and Mac
- **[DevPlan.md](DevPlan.md)** - Comprehensive development documentation with design rationale

---

## Game Mechanics Summary

Based on "Shipwreck in the Wildlands" by [Publisher Name]:

- **Skills**: 0-5 scale representing character abilities
- **Checks**: Roll 2d6 + skill + modifiers vs Difficulty Class
- **HP**: Health (10 + Athletics), track damage and recovery
- **AP**: Action Points (Top 2 skills + 5), spend on actions, refresh on long rest
- **XP**: Experience from challenges (1-4 XP based on difficulty)
- **Survival**: Track water, food, shelter, and safety for wilderness survival
- **Oracles**: Random tables for solo play (weather, discoveries, encounters, complications)

---

## Development

### Local Development

```bash
# Serve locally (Python 3)
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Updating the App

1. Make changes to code
2. Update cache version in `service-worker.js`:
   ```javascript
   const CACHE_NAME = 'wilds-helper-v2'; // increment version
   ```
3. Push to GitHub
4. Users get updates automatically on next app launch

### Adding Features

The modular architecture makes it easy to extend:
- **New Oracle**: Add table to `app.js`, create roll function, add UI in `index.html`
- **New Resource**: Add input to Resources tab, update save/load in `app.js`
- **New Reference**: Add section to Reference tab with game rules

See [DevPlan.md](DevPlan.md) for detailed development guide.

---

## Roadmap

### Phase 2 Features
- [ ] Hex map tracker with visual grid
- [ ] Dice roll history log
- [ ] Character portrait upload
- [ ] Dark mode toggle
- [ ] Export/import character sheets
- [ ] Multiple save slots
- [ ] NPC relationship tracker
- [ ] Session journal with timestamps

### Technical Improvements
- [ ] Push notifications for reminders
- [ ] Cloud sync (optional)
- [ ] Undo/redo for actions
- [ ] Accessibility enhancements (ARIA, keyboard nav)
- [ ] Auto-save every N minutes

---

## Credits

**Game**: Shipwreck in the Wildlands
**App Developer**: [Your Name]
**Technology**: Progressive Web App (PWA)
**License**: [Your chosen license]

---

## Support

**Installation Issues?** See [INSTALL.md](INSTALL.md) troubleshooting section
**Development Questions?** Check [DevPlan.md](DevPlan.md)
**Bug Reports**: Open an issue on GitHub

---

## License

[Choose your license - MIT, GPL, etc.]

---

**Ready to adventure in the Wildlands?** Install the app and start your solo RPG journey! 🌲⛵🗺️
