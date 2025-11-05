// Game State
const gameState = {
    character: {
        name: '',
        background: '',
        skills: {
            athletics: 0,
            awareness: 0,
            cunning: 0,
            lore: 0,
            survival: 0,
            will: 0
        },
        currentHP: 10,
        currentAP: 5,
        xp: 0,
        equipment: ''
    },
    resources: {
        day: 1,
        season: 'spring',
        water: 0,
        food: 0,
        shelter: false,
        safety: false,
        challenges: '',
        exploration: ''
    }
};

// Oracle Tables
const weatherOracle = {
    spring: {
        1: 'Clear skies, warm breeze',
        2: 'Overcast, mild',
        3: 'Light rain showers',
        4: 'Heavy rain',
        5: 'Thunderstorms',
        6: 'Fog and mist'
    },
    summer: {
        1: 'Hot and sunny',
        2: 'Clear and warm',
        3: 'Humid and overcast',
        4: 'Afternoon thunderstorms',
        5: 'Scorching heat',
        6: 'Sudden downpour'
    },
    fall: {
        1: 'Cool and crisp',
        2: 'Overcast, chilly',
        3: 'Light rain',
        4: 'Heavy winds',
        5: 'Cold rain',
        6: 'Early frost'
    },
    winter: {
        1: 'Clear and cold',
        2: 'Overcast, freezing',
        3: 'Light snow',
        4: 'Heavy snow',
        5: 'Blizzard conditions',
        6: 'Ice storm'
    }
};

const discoveryOracle = {
    1: 'Natural landmark (waterfall, ancient tree, rock formation)',
    2: 'Ruins or abandoned structure',
    3: 'Resource cache (food, water, materials)',
    4: 'Wildlife den or nest',
    5: 'Signs of other survivors',
    6: 'Mysterious or magical phenomenon'
};

const encounterOracle = {
    1: 'Peaceful wildlife',
    2: 'Aggressive predator',
    3: 'Sylvani (forest folk)',
    4: 'Other survivors',
    5: 'Environmental hazard',
    6: 'Unexpected opportunity'
};

const complicationOracle = {
    1: 'Equipment damaged or lost',
    2: 'Injuries or exhaustion',
    3: 'Weather worsens',
    4: 'Lost or disoriented',
    5: 'Resources depleted',
    6: 'Unwanted attention'
};

// Utility Functions
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function roll2d6() {
    return rollDice(6) + rollDice(6);
}

function calculateHP() {
    const athletics = parseInt(document.getElementById('athletics').value) || 0;
    return 10 + athletics;
}

function calculateAP() {
    const skills = [
        parseInt(document.getElementById('athletics').value) || 0,
        parseInt(document.getElementById('awareness').value) || 0,
        parseInt(document.getElementById('cunning').value) || 0,
        parseInt(document.getElementById('lore').value) || 0,
        parseInt(document.getElementById('survival').value) || 0,
        parseInt(document.getElementById('will').value) || 0
    ];
    skills.sort((a, b) => b - a);
    return skills[0] + skills[1] + 5;
}

function updateStats() {
    const maxHP = calculateHP();
    const maxAP = calculateAP();
    document.getElementById('max-hp').textContent = maxHP;
    document.getElementById('max-ap').textContent = maxAP;

    // Update current values if they exceed max
    const currentHP = parseInt(document.getElementById('current-hp').value);
    const currentAP = parseInt(document.getElementById('current-ap').value);

    if (currentHP > maxHP) {
        document.getElementById('current-hp').value = maxHP;
    }
    if (currentAP > maxAP) {
        document.getElementById('current-ap').value = maxAP;
    }
}

// Tab Navigation
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Skill Check
function performSkillCheck() {
    const skillLevel = parseInt(document.getElementById('skill-level').value) || 0;
    const dc = parseInt(document.getElementById('dc-select').value) || 8;
    const modifier = parseInt(document.getElementById('modifier').value) || 0;

    const roll = roll2d6();
    const total = roll + skillLevel + modifier;
    const success = total >= dc;

    const resultDiv = document.getElementById('skill-check-result');
    resultDiv.className = 'roll-result ' + (success ? 'success' : 'failure');

    resultDiv.innerHTML = `
        <div class="dice-display">2d6: ${roll} + Skill: ${skillLevel} + Mod: ${modifier} = ${total}</div>
        <div><strong>DC ${dc}: ${success ? 'SUCCESS!' : 'FAILURE'}</strong></div>
        ${success ? '<div>You accomplish the task!</div>' : '<div>The task proves too difficult.</div>'}
    `;
}

// Weather Oracle
function rollWeather() {
    const season = document.getElementById('season-select').value;
    const roll = rollDice(6);
    const result = weatherOracle[season][roll];

    const resultDiv = document.getElementById('weather-result');
    resultDiv.innerHTML = `
        <div class="dice-display">d6: ${roll}</div>
        <div><strong>${result}</strong></div>
    `;
}

// Discovery Oracle
function rollDiscovery() {
    const roll = rollDice(6);
    const result = discoveryOracle[roll];

    const resultDiv = document.getElementById('discovery-result');
    resultDiv.innerHTML = `
        <div class="dice-display">d6: ${roll}</div>
        <div><strong>${result}</strong></div>
    `;
}

// Encounter Oracle
function rollEncounter() {
    const roll = rollDice(6);
    const result = encounterOracle[roll];

    const resultDiv = document.getElementById('encounter-result');
    resultDiv.innerHTML = `
        <div class="dice-display">d6: ${roll}</div>
        <div><strong>${result}</strong></div>
    `;
}

// Complication Oracle
function rollComplication() {
    const roll = rollDice(6);
    const result = complicationOracle[roll];

    const resultDiv = document.getElementById('complication-result');
    resultDiv.innerHTML = `
        <div class="dice-display">d6: ${roll}</div>
        <div><strong>${result}</strong></div>
    `;
}

// Yes/No Oracle
function rollYesNo() {
    const likelihood = document.getElementById('yesno-likelihood').value;
    const roll = rollDice(6);

    let threshold = 4; // Possible
    if (likelihood === 'unlikely') threshold = 5;
    if (likelihood === 'likely') threshold = 3;

    const result = roll >= threshold ? 'YES' : 'NO';
    const isExtreme = roll === 1 || roll === 6;
    const extreme = isExtreme ? (roll === 6 ? ' (and then some!)' : ' (not at all!)') : '';

    const resultDiv = document.getElementById('yesno-result');
    resultDiv.className = 'roll-result ' + (result === 'YES' ? 'success' : 'failure');
    resultDiv.innerHTML = `
        <div class="dice-display">d6: ${roll}</div>
        <div><strong>${result}${extreme}</strong></div>
    `;
}

// Resource Adjustment
function adjustResource(resourceId, amount) {
    const input = document.getElementById(resourceId);
    const currentValue = parseInt(input.value) || 0;
    const newValue = Math.max(0, currentValue + amount);
    input.value = newValue;
}

// Save/Load Game
function saveGame() {
    // Collect all character data
    gameState.character.name = document.getElementById('char-name').value;
    gameState.character.background = document.getElementById('background').value;
    gameState.character.skills.athletics = parseInt(document.getElementById('athletics').value) || 0;
    gameState.character.skills.awareness = parseInt(document.getElementById('awareness').value) || 0;
    gameState.character.skills.cunning = parseInt(document.getElementById('cunning').value) || 0;
    gameState.character.skills.lore = parseInt(document.getElementById('lore').value) || 0;
    gameState.character.skills.survival = parseInt(document.getElementById('survival').value) || 0;
    gameState.character.skills.will = parseInt(document.getElementById('will').value) || 0;
    gameState.character.currentHP = parseInt(document.getElementById('current-hp').value) || 10;
    gameState.character.currentAP = parseInt(document.getElementById('current-ap').value) || 5;
    gameState.character.xp = parseInt(document.getElementById('xp').value) || 0;
    gameState.character.equipment = document.getElementById('equipment').value;

    // Collect resource data
    gameState.resources.day = parseInt(document.getElementById('current-day').value) || 1;
    gameState.resources.season = document.getElementById('current-season').value;
    gameState.resources.water = parseInt(document.getElementById('water-supply').value) || 0;
    gameState.resources.food = parseInt(document.getElementById('food-supply').value) || 0;
    gameState.resources.shelter = document.getElementById('shelter-check').checked;
    gameState.resources.safety = document.getElementById('safety-check').checked;
    gameState.resources.challenges = document.getElementById('challenge-notes').value;
    gameState.resources.exploration = document.getElementById('exploration-notes').value;

    // Save to localStorage
    localStorage.setItem('wildshelper-save', JSON.stringify(gameState));

    alert('Game saved successfully!');
}

function loadGame() {
    const savedData = localStorage.getItem('wildshelper-save');

    if (!savedData) {
        alert('No saved game found!');
        return;
    }

    const data = JSON.parse(savedData);

    // Load character data
    document.getElementById('char-name').value = data.character.name || '';
    document.getElementById('background').value = data.character.background || '';
    document.getElementById('athletics').value = data.character.skills.athletics || 0;
    document.getElementById('awareness').value = data.character.skills.awareness || 0;
    document.getElementById('cunning').value = data.character.skills.cunning || 0;
    document.getElementById('lore').value = data.character.skills.lore || 0;
    document.getElementById('survival').value = data.character.skills.survival || 0;
    document.getElementById('will').value = data.character.skills.will || 0;
    document.getElementById('current-hp').value = data.character.currentHP || 10;
    document.getElementById('current-ap').value = data.character.currentAP || 5;
    document.getElementById('xp').value = data.character.xp || 0;
    document.getElementById('equipment').value = data.character.equipment || '';

    // Load resource data
    document.getElementById('current-day').value = data.resources.day || 1;
    document.getElementById('current-season').value = data.resources.season || 'spring';
    document.getElementById('water-supply').value = data.resources.water || 0;
    document.getElementById('food-supply').value = data.resources.food || 0;
    document.getElementById('shelter-check').checked = data.resources.shelter || false;
    document.getElementById('safety-check').checked = data.resources.safety || false;
    document.getElementById('challenge-notes').value = data.resources.challenges || '';
    document.getElementById('exploration-notes').value = data.resources.exploration || '';

    updateStats();
    alert('Game loaded successfully!');
}

function resetGame() {
    if (confirm('Are you sure you want to create a new character? This will clear all current data.')) {
        // Reset all fields to default
        document.getElementById('char-name').value = '';
        document.getElementById('background').value = '';
        document.getElementById('athletics').value = 0;
        document.getElementById('awareness').value = 0;
        document.getElementById('cunning').value = 0;
        document.getElementById('lore').value = 0;
        document.getElementById('survival').value = 0;
        document.getElementById('will').value = 0;
        document.getElementById('current-hp').value = 10;
        document.getElementById('current-ap').value = 5;
        document.getElementById('xp').value = 0;
        document.getElementById('equipment').value = '';

        document.getElementById('current-day').value = 1;
        document.getElementById('current-season').value = 'spring';
        document.getElementById('water-supply').value = 0;
        document.getElementById('food-supply').value = 0;
        document.getElementById('shelter-check').checked = false;
        document.getElementById('safety-check').checked = false;
        document.getElementById('challenge-notes').value = '';
        document.getElementById('exploration-notes').value = '';

        updateStats();
        alert('New character created!');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTabs();

    // Skill inputs - update stats when changed
    const skillInputs = ['athletics', 'awareness', 'cunning', 'lore', 'survival', 'will'];
    skillInputs.forEach(skill => {
        document.getElementById(skill).addEventListener('input', updateStats);
    });

    // Oracle buttons
    document.getElementById('skill-check-btn').addEventListener('click', performSkillCheck);
    document.getElementById('weather-btn').addEventListener('click', rollWeather);
    document.getElementById('discovery-btn').addEventListener('click', rollDiscovery);
    document.getElementById('encounter-btn').addEventListener('click', rollEncounter);
    document.getElementById('complication-btn').addEventListener('click', rollComplication);
    document.getElementById('yesno-btn').addEventListener('click', rollYesNo);

    // Save/Load buttons
    document.getElementById('save-btn').addEventListener('click', saveGame);
    document.getElementById('load-btn').addEventListener('click', loadGame);
    document.getElementById('reset-btn').addEventListener('click', resetGame);

    // Try to load saved game on startup
    const savedData = localStorage.getItem('wildshelper-save');
    if (savedData) {
        const autoLoad = confirm('Found a saved game. Would you like to load it?');
        if (autoLoad) {
            loadGame();
        }
    }

    // Initial stats calculation
    updateStats();
});
