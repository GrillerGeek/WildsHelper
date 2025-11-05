# Development Plan: Shipwreck in the Wildlands Helper App

## Project Overview

**Purpose**: Create a responsive web application to assist players of the solo RPG "Shipwreck in the Wildlands" by providing digital tools for character management, dice rolling, oracle tables, resource tracking, and quick reference materials.

**Technology Stack**: Vanilla HTML, CSS, and JavaScript (no frameworks)

**Source Material**: `/Users/jasonrobey/Repos/WildsHelper/RPG/Shipwreck in the Wildlands.pdf` (76-page game guide)

---

## Design Decisions & Rationale

### 1. Technology Choice: Vanilla JavaScript

**Decision**: Use pure HTML/CSS/JavaScript without any frameworks (React, Vue, etc.)

**Reasoning**:
- **Simplicity**: Solo RPG helper doesn't require complex state management or routing
- **Performance**: No framework overhead; faster load times on any device
- **Portability**: Works offline; can be opened directly from filesystem
- **Maintenance**: No build process, dependencies, or npm packages to maintain
- **Accessibility**: Lower barrier for future modifications by any developer

### 2. Architecture: Single-Page Application (SPA)

**Decision**: Tab-based navigation within a single HTML file

**Reasoning**:
- **User Experience**: No page reloads; instant tab switching during gameplay
- **State Persistence**: All game data remains in memory during session
- **Simplicity**: Easier to manage than multi-page navigation
- **Mobile-Friendly**: Reduces data usage; better for tablet/phone play sessions

### 3. Data Storage: localStorage

**Decision**: Use browser's localStorage API for save/load functionality

**Reasoning**:
- **No Backend Required**: Eliminates server costs and complexity
- **Offline Play**: Works without internet connection
- **Privacy**: All data stays on user's device
- **Simplicity**: Built-in browser API; no database setup needed
- **Persistence**: Data survives browser restarts

**Trade-offs**:
- No cross-device sync (acceptable for solo play)
- Limited to ~5-10MB storage (more than sufficient for this use case)

### 4. Responsive Design Strategy

**Decision**: Mobile-first responsive design using CSS Grid and Flexbox

**Reasoning**:
- **Diverse Use Cases**: Players may use phones (portable), tablets (at table), or desktops
- **Grid Layout**: Perfect for skill grids and stat boxes
- **Flexbox**: Ideal for navigation tabs and button groups
- **Media Queries**: Breakpoints at 768px (tablet) and 480px (mobile)

---

## File Structure & Implementation Guide

### File 1: `index.html`

**Purpose**: Application structure and semantic markup

#### Key Sections:

1. **Header**
   - App title and subtitle
   - Sets context immediately upon opening

2. **Tab Navigation**
   - 4 main tabs: Character, Oracles, Resources, Reference
   - Data attribute `data-tab` for JavaScript event handling
   - Active state managed via CSS class

3. **Character Tab** (`#character-tab`)
   - **Character Identity**: Name input, background dropdown (6 options from PDF)
   - **Skills Section**: 6 skill inputs (Athletics, Awareness, Cunning, Lore, Survival, Will)
     - Range: 0-5 (game rule from PDF page 8)
     - Grid layout for visual organization
   - **Stats Section**:
     - HP display (calculated as 10 + Athletics per PDF page 9)
     - AP display (calculated as top 2 skills + 5 per PDF page 10)
     - Current HP/AP inputs for tracking damage/usage
     - XP input for progression tracking
   - **Equipment Section**: Freeform textarea for inventory notes

4. **Oracles Tab** (`#oracles-tab`)
   - **Skill Check Roller**:
     - Inputs: Skill level, DC selection, modifier
     - Implements 2d6 + skill + modifier vs DC (core mechanic from PDF)
     - Visual feedback for success/failure
   - **Weather Oracle**:
     - Season selector (affects weather table)
     - d6 roll with seasonal results (from PDF pages 24-25)
   - **Discovery Oracle**: d6 table for hex exploration (PDF page 30)
   - **Encounter Oracle**: d6 table for unexpected meetings (PDF page 32)
   - **Complication Oracle**: d6 table for setbacks (PDF page 34)
   - **Yes/No Oracle**: Likelihood-based decision tool (common solo RPG mechanic)

5. **Resources Tab** (`#resources-tab`)
   - **Time Tracker**: Day and season inputs for campaign progression
   - **Survival Needs**:
     - Water supply (numeric tracker)
     - Food supply (numeric tracker)
     - Shelter checkbox (required for long rest)
     - Safety checkbox (affects rest quality)
     - Based on survival rules from PDF pages 15-18
   - **Challenge Tracker**: Textarea for logging XP-worthy challenges
   - **Exploration Tracker**: Freeform notes for hex map tracking

6. **Reference Tab** (`#reference-tab`)
   - **Difficulty Classes Table**: Easy (5) through Legendary (20+) from PDF page 11
   - **Skill Check Modifiers**: Prepared (+2), Rushed (-2), Help (+1 per helper)
   - **XP Awards**: Basic (1), Advanced (2), Major (3), Epic (4) from PDF page 13
   - **Survival Needs**: Water/food requirements, DCs for foraging
   - **Rest & Recovery**: Short rest (1 hour, 1d6 HP) vs Long rest (8 hours, full recovery)
   - **Action Costs**: AP expenditure guide

7. **Footer**
   - Save, Load, Reset buttons for game management

#### HTML Best Practices Applied:
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessible form labels with `for` attributes
- Descriptive IDs for JavaScript manipulation
- Input constraints (`min`, `max`, `type="number"`) for data validation

---

### File 2: `styles.css`

**Purpose**: Visual design, layout, and responsive behavior

#### Design System:

1. **Color Palette** (CSS Custom Properties)
   ```css
   --primary-color: #2c5530;    /* Dark forest green */
   --secondary-color: #4a7c4e;  /* Medium green */
   --accent-color: #8b6f47;     /* Earthy brown */
   --bg-color: #f5f5dc;         /* Beige (parchment feel) */
   --card-bg: #ffffff;          /* Clean white */
   --text-color: #333333;       /* Dark gray for readability */
   --border-color: #d4c5a9;     /* Soft tan */
   --success-color: #5cb85c;    /* Green (successful rolls) */
   --danger-color: #d9534f;     /* Red (failed rolls) */
   --warning-color: #f0ad4e;    /* Orange (caution) */
   ```

   **Reasoning**:
   - Nature theme fits "Wildlands" setting
   - Beige background reduces eye strain during long play sessions
   - Distinct colors for success/failure provide instant visual feedback

2. **Typography**
   - Font: System font stack (Segoe UI, Tahoma, etc.)
   - **Reasoning**: Fast loading, consistent cross-platform rendering
   - Line height: 1.6 for readability
   - Responsive font sizes (2rem headers scale down on mobile)

3. **Layout Components**

   **Container**:
   ```css
   max-width: 1200px;
   margin: 0 auto;
   ```
   - Prevents ultra-wide layouts on large monitors
   - Centers content for better focus

   **Tab Navigation**:
   - Flexbox with flex: 1 for equal-width tabs
   - Hover states for interactivity feedback
   - Active state with bold font and color change

   **Grid Systems**:
   - **Skills Grid**: `repeat(auto-fit, minmax(150px, 1fr))`
     - Auto-adjusts columns based on available width
     - Minimum 150px ensures readable skill boxes
   - **Stats Section**: Similar auto-fit grid for HP/AP/XP boxes

4. **Component Styles**

   **Skill Inputs**:
   - Large, centered text for quick scanning
   - Bold numbers for emphasis
   - Focus state with border color change

   **Roll Buttons**:
   - Full width for easy tapping on mobile
   - Accent color to stand out from content
   - Hover and active states for tactile feedback

   **Roll Results**:
   - Colored left border (accent/success/danger)
   - Large dice display (1.5rem) for visibility
   - Conditional background colors for success/failure
   - Minimum height prevents layout shift when empty

   **Tables**:
   - Full width with border-collapse
   - Alternating row borders for scanability
   - Bold labels and right-aligned values

5. **Responsive Breakpoints**

   **Tablet (768px)**:
   - Reduce padding (20px → 10px)
   - Scale down headers (2rem → 1.5rem)
   - Reduce tab button sizes
   - Skills grid: 2 columns
   - Stats section: stacked single column
   - Full-width footer buttons

   **Mobile (480px)**:
   - Skills grid: single column
   - Time controls: stacked inputs
   - Need items: wrap on small screens

   **Reasoning**: Common device widths; ensures usability on phones, tablets, and desktops

---

### File 3: `app.js`

**Purpose**: Application logic, game mechanics, and interactivity

#### Architecture:

1. **Game State Object**
   ```javascript
   const gameState = {
       character: { /* all character data */ },
       resources: { /* all resource data */ }
   };
   ```

   **Reasoning**:
   - Central data structure mirrors application tabs
   - Easy to serialize for localStorage
   - Clear separation of concerns

2. **Oracle Tables as Objects**
   - Structured as nested objects (e.g., `weatherOracle.spring[1-6]`)
   - **Reasoning**:
     - Direct lookup by dice roll: `weatherOracle[season][roll]`
     - Easy to extend with new seasons/results
     - Matches PDF table structure exactly

#### Core Functions:

1. **Dice Rolling**
   ```javascript
   function rollDice(sides) {
       return Math.floor(Math.random() * sides) + 1;
   }

   function roll2d6() {
       return rollDice(6) + rollDice(6);
   }
   ```

   **Reasoning**:
   - `Math.random()` is sufficient for non-cryptographic needs
   - Separate 2d6 function matches game's core mechanic
   - Returns total directly (game doesn't need individual die results)

2. **Stat Calculations**
   ```javascript
   function calculateHP() {
       const athletics = parseInt(document.getElementById('athletics').value) || 0;
       return 10 + athletics;
   }

   function calculateAP() {
       const skills = [/* all 6 skills */];
       skills.sort((a, b) => b - a);
       return skills[0] + skills[1] + 5;
   }
   ```

   **Reasoning**:
   - Implements exact formulas from PDF pages 9-10
   - `|| 0` fallback prevents NaN errors
   - AP calculation sorts to find top 2 skills automatically
   - Called on every skill input change for real-time updates

3. **Skill Check Function**
   ```javascript
   function performSkillCheck() {
       const roll = roll2d6();
       const total = roll + skillLevel + modifier;
       const success = total >= dc;
       // Display results with visual feedback
   }
   ```

   **Reasoning**:
   - Implements core 2d6 + skill + modifier vs DC mechanic
   - Boolean success check enables conditional CSS classes
   - Detailed result display shows math for transparency

4. **Oracle Functions**
   - Each oracle has dedicated function (rollWeather, rollDiscovery, etc.)
   - **Reasoning**:
     - Specific logic per oracle (e.g., Weather needs season selection)
     - Clear function names for maintainability
     - Consistent result display pattern

5. **Save/Load System**
   ```javascript
   function saveGame() {
       // Collect all form values into gameState
       localStorage.setItem('wildshelper-save', JSON.stringify(gameState));
   }

   function loadGame() {
       const savedData = localStorage.getItem('wildshelper-save');
       const data = JSON.parse(savedData);
       // Populate all form fields
   }
   ```

   **Reasoning**:
   - Manual field collection ensures accurate state capture
   - JSON serialization for structured storage
   - Error handling with alert feedback
   - Auto-load prompt on startup for convenience

6. **Event Listeners**
   - Initialized in `DOMContentLoaded` event
   - **Reasoning**: Ensures DOM is ready before attaching listeners

   Key listeners:
   - Skill inputs → `updateStats()` for real-time HP/AP calculation
   - Tab buttons → `initTabs()` for navigation
   - Oracle buttons → specific roll functions
   - Footer buttons → save/load/reset functions

#### Implementation Patterns:

1. **Tab System**
   - Data attributes on buttons (`data-tab="character"`)
   - Corresponding IDs on content (`id="character-tab"`)
   - CSS class toggle for visibility (`.active`)
   - **Reasoning**: Declarative, scalable to more tabs

2. **Resource Adjustment**
   ```javascript
   function adjustResource(resourceId, amount) {
       // Inline onclick handlers for +/- buttons
   }
   ```
   - **Reasoning**: Simple increment/decrement with bounds checking

3. **Result Display Pattern**
   - All oracle results follow same structure:
     ```javascript
     resultDiv.innerHTML = `
         <div class="dice-display">Roll: ${roll}</div>
         <div><strong>${result}</strong></div>
     `;
     ```
   - **Reasoning**: Consistent UX; easy to scan results

---

## Game Mechanics Implementation

### Character System

**Skills (0-5 scale)**:
- Athletics: Physical prowess, climbing, swimming
- Awareness: Perception, noticing details
- Cunning: Deception, stealth, quick thinking
- Lore: Knowledge, history, nature
- Survival: Wilderness skills, tracking, foraging
- Will: Mental fortitude, resisting fear

**Derived Stats**:
- **HP (Hit Points)**: 10 + Athletics skill level
  - Represents physical resilience
  - Athletics bonus reflects toughness
- **AP (Action Points)**: Top 2 skill levels + 5
  - Represents daily energy/resources
  - Rewards specialization (high skills)
  - Minimum 5 AP even with all skills at 0

### Oracle Tables (from PDF)

1. **Weather Oracle** (d6, seasonal modifiers)
   - Affects travel, foraging difficulty, shelter needs
   - Different results per season (Spring/Summer/Fall/Winter)

2. **Discovery Oracle** (d6)
   - Triggered when exploring new hexes
   - Results: Landmarks, ruins, resources, wildlife, survivors, phenomena

3. **Encounter Oracle** (d6)
   - Random encounters during travel
   - Results: Wildlife, predators, Sylvani, survivors, hazards, opportunities

4. **Complication Oracle** (d6)
   - When things go wrong or GM needs twist
   - Results: Equipment damage, injuries, weather, lost, depleted resources, attention

5. **Yes/No Oracle** (d6, likelihood-based)
   - For binary questions
   - Thresholds: Unlikely (5+), Possible (4+), Likely (3+)
   - Extremes: 1 = "not at all", 6 = "and then some"

### Difficulty Classes

| Difficulty | DC | When to Use |
|-----------|----|----|
| Easy | 5 | Routine task, favorable conditions |
| Moderate | 8 | Standard challenge |
| Challenging | 12 | Requires skill and preparation |
| Hard | 15 | Expert-level task |
| Extreme | 18 | Near-impossible |
| Legendary | 20+ | Heroic feat |

**Skill Check Formula**: 2d6 + Skill Level + Modifiers vs DC

**Common Modifiers**:
- Prepared/Advantageous: +2
- Rushed/Hindered: -2
- Group Help: +1 per helper

### Survival System

**Daily Needs**:
- 1 Water per day (DC 12 Survival to find)
- 1 Food per day (DC 12 Survival to forage)
- Shelter for long rest (DC 8 Survival to build)
- Safety improves rest quality

**Rest Mechanics**:
- **Short Rest**: 1 hour, recover 1d6 HP
- **Long Rest**: 8 hours, requires water + food + shelter, recovers all HP and AP
- Missing needs prevents full recovery

**Action Point Economy**:
- Simple actions: 1 AP
- Complex actions: 2 AP
- Extended actions: 3+ AP
- AP refreshes only on long rest (strategic resource)

### Experience System

**XP Awards** (based on challenge difficulty):
- Basic: 1 XP (Simple skill check, minor obstacle)
- Advanced: 2 XP (Multiple checks, moderate risk)
- Major: 3 XP (Significant obstacle, multiple sessions)
- Epic: 4 XP (Life-threatening, major story goal)

**Skill Advancement** (not yet implemented in app):
- Spend 10 XP to raise skill from 0→1
- Subsequent increases cost 10 × new level
- Example: 0→1 (10 XP), 1→2 (20 XP), 2→3 (30 XP)

---

## Testing & Validation Checklist

### Functional Testing

**Character Tab**:
- [ ] Name input persists on save/load
- [ ] All 6 backgrounds selectable
- [ ] Skills constrained to 0-5
- [ ] HP calculation updates when Athletics changes
- [ ] AP calculation updates when any skill changes
- [ ] Current HP/AP prevent values > max
- [ ] Equipment textarea saves properly
- [ ] XP input accepts numeric values

**Oracles Tab**:
- [ ] Skill check calculates: 2d6 + skill + modifier
- [ ] Skill check compares total vs selected DC
- [ ] Success shows green styling, failure shows red
- [ ] Weather oracle changes results based on season
- [ ] All d6 oracles produce results 1-6
- [ ] Yes/No oracle respects likelihood thresholds
- [ ] Yes/No oracle shows extremes on 1 or 6

**Resources Tab**:
- [ ] Day counter increments/decrements
- [ ] Season selector persists
- [ ] Water +/- buttons adjust value correctly
- [ ] Food +/- buttons adjust value correctly
- [ ] Water/Food cannot go below 0
- [ ] Shelter checkbox toggles
- [ ] Safety checkbox toggles
- [ ] Challenge notes save on game save
- [ ] Exploration notes save on game save

**Reference Tab**:
- [ ] All tables display correctly
- [ ] Information matches PDF source material

**Save/Load System**:
- [ ] Save button stores all data to localStorage
- [ ] Load button retrieves all data from localStorage
- [ ] Load with no saved data shows error message
- [ ] Auto-load prompt appears on page load if save exists
- [ ] Reset button clears all fields to defaults
- [ ] Reset button requires confirmation

### Responsive Testing

**Desktop (1200px+)**:
- [ ] Skill grid shows 3-4 columns
- [ ] Stats boxes display in row
- [ ] All tabs visible in single row
- [ ] Max width container centers content

**Tablet (768px - 1199px)**:
- [ ] Skill grid shows 2 columns
- [ ] Stats boxes stack vertically
- [ ] Tab buttons remain horizontal
- [ ] Padding reduces appropriately

**Mobile (< 768px)**:
- [ ] Skill grid shows 1 column
- [ ] All inputs full-width
- [ ] Tab buttons may wrap to 2 rows
- [ ] Footer buttons stack vertically
- [ ] Touch targets minimum 44x44px

### Browser Compatibility

**Required**:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS)

**Features Used** (check support):
- CSS Grid (supported IE11+)
- Flexbox (supported IE11+)
- localStorage (supported all modern browsers)
- CSS Custom Properties (supported IE Edge+, not IE11)

**Graceful Degradation**:
- Works without localStorage (just no persistence)
- CSS fallbacks for older browsers (basic layout)

---

## Future Enhancement Ideas

### Phase 2 Features

1. **Advanced Character Management**
   - Background-specific skill bonuses
   - Starting equipment based on background
   - Character portrait upload

2. **Enhanced Dice Roller**
   - Dice roll history log
   - Advantage/Disadvantage mechanic (roll 2d6 twice, take higher/lower)
   - Critical success/failure on doubles

3. **Hex Map Tracker**
   - Visual hex grid (SVG or Canvas)
   - Click to mark explored hexes
   - Annotate hexes with discoveries
   - Export map as image

4. **Resource Automation**
   - "End Day" button: auto-decrement food/water
   - Rest button: check requirements, apply effects
   - Travel calculator: estimate AP cost for journey

5. **XP & Advancement**
   - Automatic skill advancement UI
   - XP cost calculator (10 × target level)
   - Skill improvement history

6. **Journal System**
   - Session notes with timestamps
   - Tag entries by day/location
   - Search functionality
   - Markdown support

7. **Export/Import**
   - Export character as JSON
   - Share character via URL
   - Print-friendly character sheet

8. **NPCs & Factions**
   - NPC tracker with relationship status
   - Sylvani encounter details
   - Human hamlet locations

### Technical Improvements

1. **State Management**
   - Implement undo/redo for actions
   - Auto-save every N minutes
   - Multiple save slots

2. **Accessibility**
   - ARIA labels for screen readers
   - Keyboard navigation (Tab, Enter, Arrow keys)
   - High contrast mode
   - Font size adjustment

3. **Progressive Web App (PWA)**
   - Service worker for offline use
   - Install as app on mobile/desktop
   - Push notifications for reminders

4. **Dark Mode**
   - Toggle dark/light theme
   - Respect OS preference
   - Persist preference

5. **Data Sync**
   - Optional cloud save (Firebase, Supabase)
   - Cross-device sync
   - Backup to file

---

## Developer Onboarding Guide

### Prerequisites
- Basic HTML/CSS/JavaScript knowledge
- Text editor (VS Code recommended)
- Modern web browser
- Git (for version control)

### Setup Steps

1. **Clone/Create Project**
   ```bash
   mkdir WildsHelper
   cd WildsHelper
   ```

2. **Create Files**
   - Create `index.html` (structure)
   - Create `styles.css` (design)
   - Create `app.js` (logic)

3. **Reference Material**
   - Place "Shipwreck in the Wildlands.pdf" in `RPG/` folder
   - Read pages 8-34 for core mechanics

4. **Development Workflow**
   - Open `index.html` in browser
   - Make changes in editor
   - Refresh browser to test
   - Use browser DevTools (F12) for debugging

5. **Testing**
   - Create test character (fill all fields)
   - Click Save
   - Refresh page
   - Click Load (should restore character)
   - Test all oracle buttons
   - Test responsive design (DevTools → Device Toolbar)

### Code Style Guidelines

**HTML**:
- Use semantic elements
- Descriptive IDs (kebab-case)
- Close all tags
- Indent 4 spaces

**CSS**:
- Mobile-first approach
- Use CSS custom properties for colors
- Class names: kebab-case
- Group related styles with comments

**JavaScript**:
- camelCase for variables/functions
- Descriptive names (no single letters except loop counters)
- Comment complex logic
- Use `const` for non-reassigned variables
- Handle edge cases (null checks, bounds)

### Debugging Tips

**Common Issues**:
1. **Stats not updating**: Check event listeners attached in DOMContentLoaded
2. **Save not working**: Check browser console for localStorage errors
3. **Oracle not rolling**: Verify function names match button IDs
4. **Layout broken**: Check CSS media query breakpoints

**Browser DevTools**:
- **Console**: Log values with `console.log()`
- **Elements**: Inspect CSS, toggle classes
- **Application → Local Storage**: View saved game data
- **Network**: Ensure files loading (should be 3 files)

---

## Deployment Options

### Option 1: Local File (Current)
**Steps**:
1. Double-click `index.html`
2. Opens in default browser

**Pros**: Simple, offline, no hosting needed
**Cons**: Must share 3 files; no URL

### Option 2: GitHub Pages (Recommended)
**Steps**:
1. Create GitHub repository
2. Push files to `main` branch
3. Enable Pages in Settings → Pages
4. Site live at `https://username.github.io/WildsHelper`

**Pros**: Free hosting, version control, shareable URL
**Cons**: Public repository (can use private with GitHub Pro)

### Option 3: Netlify/Vercel
**Steps**:
1. Connect GitHub repository
2. Auto-deploys on push
3. Custom domain support

**Pros**: Continuous deployment, custom domains, analytics
**Cons**: Overkill for static site

### Option 4: Self-Hosted
**Steps**:
1. Upload to web server (Apache, Nginx)
2. Serve files from directory

**Pros**: Full control
**Cons**: Server costs, maintenance

---

## Appendix: PDF Analysis Summary

### Key Pages Referenced

- **Pages 8-10**: Character creation, skills, HP/AP formulas
- **Pages 11-12**: Difficulty classes, skill check mechanics
- **Page 13**: XP system and awards
- **Pages 15-18**: Survival needs (water, food, shelter, safety)
- **Pages 19-20**: Rest and recovery mechanics
- **Pages 24-25**: Weather oracle tables by season
- **Page 30**: Discovery oracle
- **Page 32**: Encounter oracle
- **Page 34**: Complication oracle
- **Pages 40-50**: Geography and hex exploration
- **Pages 60-66**: 7-day starting adventure (future content)
- **Page 76**: Quick reference appendix

### Mechanics Not Yet Implemented

1. **Combat System** (pages 21-23)
   - Initiative order
   - Attack rolls
   - Damage calculation
   - Conditions (stunned, prone, etc.)

2. **Magic System** (if present)
   - Spell lists
   - Casting mechanics

3. **Crafting** (pages 36-38)
   - Item creation
   - Material gathering

4. **Social Encounters** (pages 39-41)
   - Persuasion mechanics
   - NPC reactions

5. **Hex Crawl Details**
   - Movement rules
   - Exploration procedures
   - Mapping guidelines

**Recommendation**: Implement these in Phase 2 based on player feedback.

---

## Conclusion

This development plan provides a complete blueprint for recreating the Shipwreck in the Wildlands Helper App. The application prioritizes simplicity, usability, and faithfulness to the source material. All design decisions are documented with rationale to guide future development.

**Core Principles**:
1. **Simplicity First**: No unnecessary complexity
2. **Offline Capable**: Works anywhere, anytime
3. **Mobile Friendly**: Responsive design for all devices
4. **Faithful Implementation**: Accurate to game rules
5. **Extensible**: Easy to add features later

By following this guide, any developer with HTML/CSS/JavaScript knowledge can recreate or extend this application. The modular structure allows for incremental improvements without major refactoring.

**Total Development Time Estimate**: 4-6 hours for initial build
**Maintenance**: Minimal (no dependencies, no backend)
**Skill Level Required**: Intermediate JavaScript

Good luck, and may your adventures in the Wildlands be memorable!
