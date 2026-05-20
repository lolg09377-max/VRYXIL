// ==========================================
// ⚙️ VRYXIL 22K 12D DYNAMIC ENGINE + BEGINNER MAP
// ==========================================
let GAME_CONFIG = { BUBBLE_SPEED_MULTIPLIER: 0.5, MAX_BUBBLES_PER_SESSION: 15, MAX_ALLOWED_MISSES: 3, BUBBLE_MODE: 'SINGLE' };

let activeKeyboard = 'EN'; 
let currentUiLang = 'EN';  
let isBeginnerMode = false;

const locales = {
    EN: {
        brand: "VRYXIL MAGICAL TYPING <span>CREATED BY ENG. RANA</span>",
        themeHacker: "THEME: GHOST", themeNormal: "THEME: NORMAL",
        soundOn: "SOUND: ON", soundOff: "SOUND: OFF", trainerMode: "BUBBLE TYPE GAME", arcadeMode: "EXIT GAME ❌",
        wpm: "TYPING SPEED", acc: "ACCURACY", status: "LIVE FINGER MAP", targetAlert: "TARGET ACQUIRED",
        score: "SCORE: ", lives: "LIVES: ", configSpeed: "SPEED:", configLimit: "LIMIT:", configMisses: "MISSES:",
        bubbleSingle: "BUBBLE: 1 BY 1", bubbleMulti: "BUBBLE: MULTI", begOff: "BEGINNER HANDMAP: OFF", begOn: "BEGINNER HANDMAP: ON"
    },
    BN: {
        brand: "ভ্রিক্সিল ম্যাজিক্যাল টাইপিং <span>ইঞ্জিন: ইঞ্জি. রানা</span>",
        themeHacker: "থিম: ঘোস্ট", themeNormal: "থিম: নরমাল",
        soundOn: "সাউন্ড: চালু", soundOff: "সাউন্ড: বন্ধ", trainerMode: "বাবল টাইপ গেম", arcadeMode: "গেম বন্ধ করুন ❌",
        wpm: "টাইপিং গতি", acc: "সঠিকতা", status: "লাইভ ফিঙ্গার গাইড", targetAlert: "লক্ষ্য নির্ধারণ করা হয়েছে",
        score: "স্কোর: ", lives: "লাইফ: ", configSpeed: "গতি:", configLimit: "লিমিট:", configMisses: "লাইফ:",
        bubbleSingle: "বাবল: একটা করে", bubbleMulti: "বাবল: একসাথে অনেক", begOff: "হ্যান্ডম্যাপ: অফ", begOn: "হ্যান্ডম্যাপ: অন"
    }
};

const baseWords = {
    EN: ["vryxil", "python", "ai", "gamer", "latency", "matrix", "nexus", "cyber", "system", "code", "mechanical", "keyboard"],
    BN: ["ভ্রিক্সিল", "পাইথন", "এআই", "গেমার", "ল্যাটেন্সি", "ম্যাট্রিক্স", "সিস্টেম", "কীবোর্ড", "প্রোগ্রামিং", "ইঞ্জিন", "বাংলা", "কোড"]
};

const beginnerLessons = {
    EN: ["asdf", "jkl;", "sad", "dad", "fall", "ask", "all", "gas", "flag", "had", "half"],
    BN: ["ক", "খ", "গ", "ঘ", "আ", "স", "দ", "ফ", "আকাশ", "সাদা", "ফল", "জল", "কাল"]
};

const fingerMapEN = {
    'q':'Left Pinky', 'a':'Left Pinky', 'z':'Left Pinky', '1':'Left Pinky',
    'w':'Left Ring', 's':'Left Ring', 'x':'Left Ring', '2':'Left Ring',
    'e':'Left Middle', 'd':'Left Middle', 'c':'Left Middle', '3':'Left Middle',
    'r':'Left Index', 'f':'Left Index', 'v':'Left Index', '4':'Left Index', 't':'Left Index', 'g':'Left Index', 'b':'Left Index', '5':'Left Index',
    'y':'Right Index', 'h':'Right Index', 'n':'Right Index', '6':'Right Index', 'u':'Right Index', 'j':'Right Index', 'm':'Right Index', '7':'Right Index',
    'i':'Right Middle', 'k':'Right Middle', ',':'Right Middle', '8':'Right Middle',
    'o':'Right Ring', 'l':'Right Ring', '.':'Right Ring', '9':'Right Ring',
    'p':'Right Pinky', ';':'Right Pinky', '/':'Right Pinky', '0':'Right Pinky', '-':'Right Pinky', '=':'Right Pinky', '[':'Right Pinky', ']':'Right Pinky', "'":'Right Pinky',
    'space':'Thumb'
};

const fingerMapBN = {
    'Left Pinky': 'বাম কনিষ্ঠা', 'Left Ring': 'বাম অনামিকা', 'Left Middle': 'বাম মধ্যমা', 'Left Index': 'বাম তর্জনী',
    'Right Index': 'ডান তর্জনী', 'Right Middle': 'ডান মধ্যমা', 'Right Ring': 'ডান অনামিকা', 'Right Pinky': 'ডান কনিষ্ঠা',
    'Thumb': 'বৃদ্ধাঙ্গুলি', 'Any Finger': 'যেকোনো আঙুল'
};

const keyboardLayouts = {
    EN: [
        ["Esc", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", "Backspace"],
        ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", "|\n\\"],
        ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n'", "Enter"],
        ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", "Shift"],
        ["Ctrl", "Win", "Alt", "SPACEBAR", "Alt", "Ctrl"]
    ],
    BIJOY: [
        ["Esc", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", "Backspace"],
        ["Tab", "ং\nঙ", "য়\nয", "ঢ\nড", "ফ\nপ", "ঠ\nট", "ছ\nচ", "ঝ\nজ", "ঞ\nহ", "ঘ\nগ", "ঢ়\nড়", "{\n[", "}\n]", "|\n\\"],
        ["Caps", "র্\nৃ", "ূ\nু", "ী\nি", "অ\nা", "।\n্", "ভ\nব", "খ\nক", "থ\nত", "ধ\nদ", ":\n;", "\"\n'", "Enter"],
        ["Shift", "্য\n্র", "ঔ\nও", "ঐ\nএ", "ল\nর", "ণ\nন", "ষ\nস", "শ\nম", "<\n,", ">\n.", "?\n/", "Shift"],
        ["Ctrl", "Win", "Alt", "SPACEBAR", "Alt", "Ctrl"]
    ],
    AVRO: [
        ["Esc", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", "Backspace"],
        ["Tab", "Q\nক্ব", "W\nও", "E\nএ", "R\nর", "T\nট", "Y\nয়", "U\nউ", "I\nই", "O\nও", "P\nপ", "{\n[", "}\n]", "|\n\\"],
        ["Caps", "A\nআ", "S\nস", "D\nদ", "F\nফ", "G\nগ", "H\nহ", "J\nজ", "K\nক", "L\nল", ":\n;", "\"\n'", "Enter"],
        ["Shift", "Z\nয", "X\nক্স", "C\nচ", "V\nভ", "B\nব", "N\nন", "M\nম", "<\n,", ">\n.", "?\n/", "Shift"],
        ["Ctrl", "Win", "Alt", "SPACEBAR", "Alt", "Ctrl"]
    ]
};

const keyIdMapping = [
    ["escape", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "minus", "equal", "backspace"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "semicolon", "quote", "enter"],
    ["shift-l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift-r"],
    ["ctrl-l", "meta", "alt-l", "space", "alt-r", "ctrl-r"]
];

const numpadLayout = [
    { txt: "Num", id: "num-lock", col: 1, row: 1 }, { txt: "/", id: "num-slash", col: 2, row: 1 }, { txt: "*", id: "num-star", col: 3, row: 1 }, { txt: "-", id: "num-minus", col: 4, row: 1 },
    { txt: "7", id: "num-7", col: 1, row: 2 }, { txt: "8", id: "num-8", col: 2, row: 2 }, { txt: "9", id: "num-9", col: 3, row: 2 }, { txt: "+", id: "num-plus", col: 4, row: 2, hSpan: 2 },
    { txt: "4", id: "num-4", col: 1, row: 3 }, { txt: "5", id: "num-5", col: 2, row: 3 }, { txt: "6", id: "num-6", col: 3, row: 3 },
    { txt: "1", id: "num-1", col: 1, row: 4 }, { txt: "2", id: "num-2", col: 2, row: 4 }, { txt: "3", id: "num-3", col: 3, row: 4 }, { txt: "Ent", id: "num-enter", col: 4, row: 4, hSpan: 2 },
    { txt: "0", id: "num-0", col: 1, row: 5, wSpan: 2 }, { txt: ".", id: "num-dot", col: 3, row: 5 }
];

let osMode = 'TRAINER'; let currentTheme = 'HACKER'; let targetText = ""; let currentLetterIdx = 0; 
let totalKeystrokes = 0; let correctKeystrokes = 0; let sessionStartTime = null; let soundEnabled = true; let audioCtx = null;
let arcadeScore = 0; let arcadeLives = 3; let bubblesArray = []; let particlesArray = []; let gameLoopInterval = null; 
let bubbleSpawnInterval = null; let totalBubblesSpawned = 0; let activeBubble = null; 

function injectLiveControlBar() {
    const existingBar = document.getElementById('systemLiveConfigBar'); if (existingBar) existingBar.remove();
    const configBar = document.createElement('div'); configBar.className = "vryxil-live-config-bar"; configBar.id = "systemLiveConfigBar";
    configBar.innerHTML = `
        <div class="config-item"><label id="lblSpeed">SPEED:</label><input type="range" id="liveSpeedSlider" min="0.1" max="2.0" step="0.1" value="${GAME_CONFIG.BUBBLE_SPEED_MULTIPLIER}"><span id="liveSpeedVal" class="config-value-display">${GAME_CONFIG.BUBBLE_SPEED_MULTIPLIER}x</span></div>
        <div class="config-item"><label id="lblLimit">LIMIT:</label><input type="number" id="liveLimitInput" min="5" max="100" value="${GAME_CONFIG.MAX_BUBBLES_PER_SESSION}"></div>
        <div class="config-item"><label id="lblMisses">MISSES:</label><input type="number" id="liveMissesInput" min="1" max="10" value="${GAME_CONFIG.MAX_ALLOWED_MISSES}"></div>
        <div class="config-item"><button id="bubbleModeBtn" class="mode-toggle-btn" style="background: var(--magic-cyan); color:#000; box-shadow: 0 0 10px var(--magic-cyan); min-width: 150px;"></button></div>
    `;
    const headerPanel = document.querySelector('.header-panel'); headerPanel.parentNode.insertBefore(configBar, headerPanel.nextSibling);
    
    document.getElementById('liveSpeedSlider').oninput = function() { GAME_CONFIG.BUBBLE_SPEED_MULTIPLIER = parseFloat(this.value); document.getElementById('liveSpeedVal').innerText = this.value + "x"; };
    document.getElementById('liveLimitInput').onchange = function() { let val = parseInt(this.value); if (isNaN(val) || val < 5) val = 5; GAME_CONFIG.MAX_BUBBLES_PER_SESSION = val; this.value = val; };
    document.getElementById('liveMissesInput').onchange = function() { let val = parseInt(this.value); if (isNaN(val) || val < 1) val = 1; if (val > 10) val = 10; GAME_CONFIG.MAX_ALLOWED_MISSES = val; this.value = val; if(osMode === 'ARCADE') { arcadeLives = val; updateLivesUI(); } };
    document.getElementById('bubbleModeBtn').onclick = function() { GAME_CONFIG.BUBBLE_MODE = GAME_CONFIG.BUBBLE_MODE === 'SINGLE' ? 'MULTI' : 'SINGLE'; updateLanguageUI(); };
}

function renderDynamicKeyboard() {
    const container = document.getElementById('keyboardContainer'); if (!container) return; container.innerHTML = "";
    const mainBlock = document.createElement('div'); mainBlock.className = "main-kb-block";
    const layout = keyboardLayouts[activeKeyboard];

    for(let r=0; r<layout.length; r++) {
        const rowDiv = document.createElement('div'); rowDiv.className = "kb-row";
        for(let c=0; c<layout[r].length; c++) {
            const keyDiv = document.createElement('div'); keyDiv.className = "v-key"; keyDiv.id = `k-${keyIdMapping[r][c]}`;
            let parts = layout[r][c].split('\n');
            if (parts.length > 1) {
                keyDiv.classList.add('dual-key'); keyDiv.innerHTML = `<span class="dual-sub">${parts[0]}</span><span class="dual-main">${parts[1]}</span>`;
            } else { keyDiv.innerText = parts[0]; }
            if(keyIdMapping[r][c] === 'backspace') keyDiv.classList.add('backspace-key'); else if(keyIdMapping[r][c] === 'tab' || keyIdMapping[r][c] === '\\') keyDiv.classList.add('backslash-key');
            else if(keyIdMapping[r][c] === 'capslock') keyDiv.classList.add('caps-key'); else if(keyIdMapping[r][c] === 'enter') keyDiv.classList.add('enter-key');
            else if(keyIdMapping[r][c] === 'shift-l' || keyIdMapping[r][c] === 'shift-r') keyDiv.classList.add('shift-key'); else if(keyIdMapping[r][c] === 'space') keyDiv.classList.add('space-key');
            rowDiv.appendChild(keyDiv);
        }
        mainBlock.appendChild(rowDiv);
    }
    container.appendChild(mainBlock);

    const numBlock = document.createElement('div'); numBlock.className = "numpad-block";
    numpadLayout.forEach(k => {
        const keyDiv = document.createElement('div'); keyDiv.className = "v-key"; keyDiv.id = `k-${k.id}`; keyDiv.innerText = k.txt;
        keyDiv.style.gridColumn = k.wSpan ? `${k.col} / span ${k.wSpan}` : `${k.col}`; keyDiv.style.gridRow = k.hSpan ? `${k.row} / span ${k.hSpan}` : `${k.row}`;
        if (k.hSpan) keyDiv.style.height = "91px";
        numBlock.appendChild(keyDiv);
    });
    container.appendChild(numBlock);
}

class Bubble {
    constructor(word, canvasWidth) {
        this.word = word; this.x = Math.random() * (canvasWidth - 220) + 110; this.y = -30;
        this.radius = 45 + (word.length * 2); this.speed = (0.6 + (Math.random() * 0.4)) * GAME_CONFIG.BUBBLE_SPEED_MULTIPLIER;
        this.typedCount = 0; this.hasError = false; this.errorTimer = null;
    }
    update() { this.y += this.speed; }
    draw(ctx) {
        ctx.beginPath(); let grad = ctx.createRadialGradient(this.x, this.y, 4, this.x, this.y, this.radius);
        
        if (this.hasError) {
            grad.addColorStop(0, '#4a0000'); grad.addColorStop(1, '#ff0000'); ctx.strokeStyle = '#ff0000';
        } else if (currentTheme === 'HACKER') {
            grad.addColorStop(0, '#001a00'); grad.addColorStop(1, '#1f8a09'); ctx.strokeStyle = '#39ff14';
        } else {
            grad.addColorStop(0, '#f8fafc'); grad.addColorStop(1, '#cbd5e1'); ctx.strokeStyle = '#ff0000';
        }
        
        ctx.fillStyle = grad; ctx.lineWidth = 3; ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.font = activeKeyboard !== 'EN' ? "bold 18px 'Hind Siliguri', sans-serif" : "bold 20px 'JetBrains Mono', monospace"; ctx.textBaseline = "middle"; 
        
        let typedPart = this.word.substring(0, this.typedCount); let untypedPart = this.word.substring(this.typedCount);
        let totalWidth = ctx.measureText(this.word).width; let typedWidth = ctx.measureText(typedPart).width;
        let startX = this.x - (totalWidth / 2);
        
        if (this.typedCount > 0) {
            ctx.textAlign = "left"; ctx.fillStyle = this.hasError ? "#ffffff" : (currentTheme === 'HACKER' ? "#00ffff" : "#10b981"); 
            ctx.fillText(typedPart, startX, this.y);
            ctx.fillStyle = currentTheme === 'HACKER' ? "#ffffff" : "#ff0000"; ctx.fillText(untypedPart, startX + typedWidth, this.y);
        } else { 
            ctx.textAlign = "center"; ctx.fillStyle = currentTheme === 'HACKER' ? "#ffffff" : "#ff0000"; ctx.fillText(this.word, this.x, this.y); 
        }
    }
}

class Particle {
    constructor(x, y, color) { 
        this.x = x; this.y = y; this.radius = Math.random() * 5 + 2; 
        this.speedX = Math.random() * 10 - 5; this.speedY = Math.random() * 10 - 5; this.life = 25; this.color = color;
    }
    update() { this.x += this.speedX; this.y += this.speedY; this.life--; }
    draw(ctx) { ctx.beginPath(); ctx.fillStyle = this.color; ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); }
}

function startArcadeGame() {
    const canvas = document.getElementById('arcadeCanvas'); if (!canvas) return; const ctx = canvas.getContext('2d'); 
    canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight;
    arcadeScore = 0; arcadeLives = GAME_CONFIG.MAX_ALLOWED_MISSES; 
    bubblesArray = []; particlesArray = []; activeBubble = null; totalBubblesSpawned = 0;
    
    document.getElementById('gameScore').innerText = "000"; updateLivesUI();
    if(gameLoopInterval) clearInterval(gameLoopInterval); if(bubbleSpawnInterval) clearInterval(bubbleSpawnInterval);

    gameLoopInterval = setInterval(() => {
        ctx.fillStyle = currentTheme === 'HACKER' ? '#010201' : '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = particlesArray.length - 1; i >= 0; i--) { particlesArray[i].update(); particlesArray[i].draw(ctx); if (particlesArray[i].life <= 0) particlesArray.splice(i, 1); }
        for (let i = bubblesArray.length - 1; i >= 0; i--) {
            let b = bubblesArray[i]; b.update(); b.draw(ctx);
            if (b.y > canvas.height - 40) { 
                if(b.errorTimer) clearTimeout(b.errorTimer);
                if(b === activeBubble) { activeBubble = null; }
                playMechSound('error'); bubblesArray.splice(i, 1); arcadeLives--; updateLivesUI(); 
            }
        }
        if (totalBubblesSpawned >= GAME_CONFIG.MAX_BUBBLES_PER_SESSION && bubblesArray.length === 0 && arcadeLives > 0) { stopArcadeGame(); setTimeout(() => { alert(`🎉 SESSION COMPLETED! Score: ${arcadeScore}`); toggleOSMode(); }, 100); }
    }, 1000 / 60);

    bubbleSpawnInterval = setInterval(() => {
        if(osMode !== 'ARCADE' || totalBubblesSpawned >= GAME_CONFIG.MAX_BUBBLES_PER_SESSION) return;
        if(GAME_CONFIG.BUBBLE_MODE === 'SINGLE' && bubblesArray.length > 0) return;

        let pool;
        if (isBeginnerMode) { pool = activeKeyboard === 'EN' ? beginnerLessons.EN : beginnerLessons.BN; }
        else { pool = activeKeyboard === 'EN' ? baseWords.EN : baseWords.BN; }
        
        let word = pool[Math.floor(Math.random() * pool.length)];
        bubblesArray.push(new Bubble(word, canvas.width)); totalBubblesSpawned++;
    }, 2500); 
}

function handleArcadeInput(char) {
    let cleanChar = char.toLowerCase();
    if (char === "Backspace") {
        if (activeBubble && activeBubble.typedCount > 0) {
            activeBubble.typedCount--;
            if (activeBubble.typedCount === 0) { if(activeBubble.errorTimer) clearTimeout(activeBubble.errorTimer); activeBubble.hasError = false; activeBubble = null; }
        }
    } else if (char.length === 1 && char !== " ") {
        if (!activeBubble) {
            let lowestIdx = -1; let maxObjY = -1;
            for(let i=0; i<bubblesArray.length; i++) {
                if(bubblesArray[i].word[0].toLowerCase() === cleanChar) {
                    if(bubblesArray[i].y > maxObjY) { maxObjY = bubblesArray[i].y; lowestIdx = i; }
                }
            }
            if(lowestIdx !== -1) { activeBubble = bubblesArray[lowestIdx]; activeBubble.typedCount = 1; playMechSound('click'); } else { playMechSound('error'); }
        } else {
            let expectedChar = activeBubble.word[activeBubble.typedCount].toLowerCase();
            if(cleanChar === expectedChar) {
                activeBubble.typedCount++; activeBubble.hasError = false;
                if(activeBubble.errorTimer) { clearTimeout(activeBubble.errorTimer); activeBubble.errorTimer = null; }
                playMechSound('click');
                if(activeBubble.typedCount === activeBubble.word.length) {
                    let idx = bubblesArray.indexOf(activeBubble);
                    if(idx !== -1) {
                        let color = currentTheme === 'HACKER' ? "#39ff14" : "#10b981";
                        for(let p=0; p<30; p++) { particlesArray.push(new Particle(activeBubble.x, activeBubble.y, color)); }
                        bubblesArray.splice(idx, 1); arcadeScore += 10; document.getElementById('gameScore').innerText = String(arcadeScore).padStart(3, '0');
                    }
                    activeBubble = null;
                }
            } else {
                playMechSound('error');
                if(!activeBubble.hasError) {
                    activeBubble.hasError = true;
                    activeBubble.errorTimer = setTimeout(() => {
                        let idx = bubblesArray.indexOf(activeBubble);
                        if(idx !== -1) {
                            for(let p=0; p<40; p++) { particlesArray.push(new Particle(activeBubble.x, activeBubble.y, "#ff0000")); }
                            bubblesArray.splice(idx, 1); arcadeLives--; updateLivesUI(); playMechSound('error');
                        }
                        activeBubble = null; 
                    }, 2000); 
                }
            }
        }
    }
}

function updateLivesUI() {
    let displayEl = document.getElementById('gameLives'); if (!displayEl) return;
    if (arcadeLives <= 0) { displayEl.innerText = "GAME OVER"; stopArcadeGame(); setTimeout(() => { alert(`🛸 GAME OVER. SCORE: ${arcadeScore}`); toggleOSMode(); }, 100); return; }
    if (arcadeLives <= 5) { let hearts = ""; for(let i = 0; i < arcadeLives; i++) hearts += "❤️"; displayEl.innerText = hearts; } else { displayEl.innerText = `❤️ x ${arcadeLives}`; }
}

function stopArcadeGame() { clearInterval(gameLoopInterval); clearInterval(bubbleSpawnInterval); }

function playMechSound(type) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = audioCtx.createOscillator(); let gainNode = audioCtx.createGain(); osc.connect(gainNode); gainNode.connect(audioCtx.destination);
        if (type === 'click') { osc.type = 'triangle'; osc.frequency.setValueAtTime(180, audioCtx.currentTime); gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.03); }
        else if (type === 'error') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(110, audioCtx.currentTime); gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime + 0.1); }
    } catch(e){}
}

function startVryxilSession() {
    let list = []; let pool;
    if (isBeginnerMode) { pool = activeKeyboard === 'EN' ? beginnerLessons.EN : beginnerLessons.BN; }
    else { pool = activeKeyboard === 'EN' ? baseWords.EN : baseWords.BN; }
    for(let i=0; i<5; i++) { list.push(pool[Math.floor(Math.random() * pool.length)]); } 
    targetText = list.join(" "); totalKeystrokes = 0; correctKeystrokes = 0; sessionStartTime = null; setupTrainerUI();
}

function setupTrainerUI() {
    const display = document.getElementById('matrixDisplay'); if(!display) return; display.innerHTML = ""; currentLetterIdx = 0;
    for (let i = 0; i < targetText.length; i++) {
        let span = document.createElement('span'); span.className = "c-default";
        if (i === 0) span.classList.add('c-current'); span.innerText = targetText[i]; display.appendChild(span);
    }
    updateKeyGuides();
}

function updateKeyGuides() {
    document.querySelectorAll('.v-key').forEach(k => k.classList.remove('key-glow'));
    let statusTextEl = document.getElementById('statusText');
    
    if(osMode !== 'TRAINER' || currentLetterIdx >= targetText.length) {
        if(statusTextEl) statusTextEl.innerHTML = `READY <span style="font-size:0.6rem;">●</span>`;
        return;
    }
    
    let expectedChar = targetText[currentLetterIdx].toLowerCase();
    
    if (isBeginnerMode) {
        let lookupIdForMap = expectedChar === ' ' ? 'space' : expectedChar;
        let baseEngChar = lookupIdForMap; 
        
        if (activeKeyboard !== 'EN') {
            for(let r=0; r<keyboardLayouts[activeKeyboard].length; r++) {
                for(let c=0; c<keyboardLayouts[activeKeyboard][r].length; c++) {
                    let parts = keyboardLayouts[activeKeyboard][r][c].split('\n');
                    if (parts.length > 1 && (parts[0] === expectedChar || parts[1] === expectedChar)) {
                        baseEngChar = keyIdMapping[r][c]; break;
                    } else if (parts[0] === expectedChar) { baseEngChar = keyIdMapping[r][c]; break; }
                }
            }
        }
        
        let fingerName = fingerMapEN[baseEngChar] || 'Any Finger';
        if (currentUiLang === 'BN') fingerName = fingerMapBN[fingerName] || 'যেকোনো আঙুল';
        if(statusTextEl) statusTextEl.innerText = fingerName;
    } else {
        if(statusTextEl) statusTextEl.innerHTML = `READY <span style="font-size:0.6rem;">●</span>`;
    }

    if (activeKeyboard === 'EN') {
        let lookupId = expectedChar === ' ' ? 'space' : expectedChar;
        if(lookupId === ';') lookupId = 'semicolon'; if(lookupId === '-') lookupId = 'minus'; if(lookupId === '=') lookupId = 'equal'; if(lookupId === "'") lookupId = 'quote';
        let targetKeyNode = document.getElementById(`k-${lookupId}`); if (targetKeyNode) targetKeyNode.classList.add('key-glow');
    }
}

function setKeyboardMode(mode) { activeKeyboard = mode; renderDynamicKeyboard(); updateLanguageUI(); if(osMode === 'TRAINER') { startVryxilSession(); } }

function attachSystemListeners() {
    document.getElementById('modeBtn').onclick = toggleOSMode; document.getElementById('themeBtn').onclick = toggleThemeMode;
    document.getElementById('soundBtn').onclick = () => { soundEnabled = !soundEnabled; updateLanguageUI(); };
    document.getElementById('sysLangBtn').onclick = () => { currentUiLang = currentUiLang === 'EN' ? 'BN' : 'EN'; updateLanguageUI(); };
    document.getElementById('kbLangBtn').onclick = () => { if(activeKeyboard === 'EN') setKeyboardMode('AVRO'); else if(activeKeyboard === 'AVRO') setKeyboardMode('BIJOY'); else setKeyboardMode('EN'); };
    
    document.getElementById('beginnerBtn').onclick = () => {
        isBeginnerMode = !isBeginnerMode;
        document.getElementById('beginnerBtn').classList.toggle('active', isBeginnerMode);
        updateLanguageUI(); startVryxilSession();
    };

    window.addEventListener('keydown', (e) => {
        if (e.code === 'F12') { e.preventDefault(); setKeyboardMode(activeKeyboard === 'AVRO' ? 'EN' : 'AVRO'); return; }
        if (e.code === 'KeyB' && e.ctrlKey && e.altKey) { e.preventDefault(); setKeyboardMode(activeKeyboard === 'BIJOY' ? 'EN' : 'BIJOY'); return; }

        let id = '';
        if (e.code.startsWith('Key')) id = e.code.replace('Key', '').toLowerCase();
        else if (e.code.startsWith('Digit')) id = e.code.replace('Digit', '');
        else if (e.code === 'ControlLeft') id = 'ctrl-l'; else if (e.code === 'ControlRight') id = 'ctrl-r';
        else if (e.code === 'AltLeft') id = 'alt-l'; else if (e.code === 'AltRight') id = 'alt-r';
        else if (e.code === 'ShiftLeft') id = 'shift-l'; else if (e.code === 'ShiftRight') id = 'shift-r';
        else if (e.code === 'Space') id = 'space'; else if (e.code === 'Minus') id = 'minus';
        else if (e.code === 'Equal') id = 'equal'; else if (e.code === 'Quote') id = 'quote';
        else if (e.code === 'Semicolon') id = 'semicolon'; else if (e.code === 'Escape') id = 'escape';
        else if (e.code === 'Backspace') id = 'backspace'; else if (e.code === 'Tab') id = 'tab';
        else if (e.code === 'CapsLock') id = 'capslock'; else if (e.code === 'Enter') id = 'enter';
        else if (e.code === 'MetaLeft' || e.code === 'MetaRight') id = 'meta';

        let activeKeyNode = document.getElementById(`k-${id}`);
        if(activeKeyNode) { activeKeyNode.classList.add('key-glow'); setTimeout(() => activeKeyNode.classList.remove('key-glow'), 120); }

        if (e.key === 'Backspace') { e.preventDefault(); if (osMode === 'ARCADE') handleArcadeInput('Backspace'); } 
        else if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
            if(e.key === ' ') e.preventDefault();
            if (osMode === 'TRAINER') handleTrainerInput(e.key); else handleArcadeInput(e.key);
        }
    });
}

function handleTrainerInput(typedChar) {
    if (!sessionStartTime) sessionStartTime = new Date(); totalKeystrokes++; let expectedChar = targetText[currentLetterIdx]; 
    let spans = document.getElementById('matrixDisplay').querySelectorAll('span');
    if (typedChar === expectedChar) { 
        playMechSound('click'); correctKeystrokes++; spans[currentLetterIdx].className = "c-correct"; currentLetterIdx++; 
        if(currentLetterIdx < targetText.length) spans[currentLetterIdx].classList.add('c-current'); 
    } else { playMechSound('error'); spans[currentLetterIdx].classList.add('c-wrong'); setTimeout(() => { spans[currentLetterIdx].className = "c-default c-current"; }, 150); }
    
    let accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100; document.getElementById('accuracy').innerHTML = `${accuracy}<span class="unit">%</span>`;
    if (currentLetterIdx >= targetText.length) { sessionStartTime = null; startVryxilSession(); } else { updateKeyGuides(); }
}

function toggleOSMode() {
    const osFrame = document.querySelector('.vryxil-os'); const configBar = document.getElementById('systemLiveConfigBar');
    const controlsRight = document.querySelector('.controls-right');
    if (osMode === 'TRAINER') { 
        osMode = 'ARCADE'; osFrame.classList.add('arcade-fullscreen'); 
        if(configBar) configBar.style.display = 'flex';
        if(configBar && controlsRight) { controlsRight.insertBefore(configBar, controlsRight.firstChild); }
        document.getElementById('trainerModeZone').classList.remove('active'); document.getElementById('arcadeModeZone').classList.add('active'); setTimeout(startArcadeGame, 50); 
    } else { 
        osMode = 'TRAINER'; osFrame.classList.remove('arcade-fullscreen'); 
        if(configBar) configBar.style.display = 'none';
        if(configBar) { const dashboard = document.querySelector('.dashboard'); dashboard.parentNode.insertBefore(configBar, dashboard.nextSibling); }
        document.getElementById('arcadeModeZone').classList.remove('active'); document.getElementById('trainerModeZone').classList.add('active'); stopArcadeGame(); startVryxilSession(); 
    }
    updateLanguageUI();
}

function toggleThemeMode() { currentTheme = currentTheme === 'HACKER' ? 'NORMAL' : 'HACKER'; document.body.className = currentTheme === 'HACKER' ? "theme-hacker" : "theme-normal"; updateLanguageUI(); }

function updateLanguageUI() {
    const cur = locales[currentUiLang];
    document.getElementById('brandText').innerHTML = cur.brand;
    document.getElementById('themeBtn').innerText = currentTheme === 'HACKER' ? cur.themeHacker : cur.themeNormal;
    document.getElementById('soundBtn').innerText = soundEnabled ? cur.soundOn : cur.soundOff;
    document.getElementById('modeBtn').innerText = osMode === 'TRAINER' ? cur.trainerMode : cur.arcadeMode;
    document.getElementById('sysLangBtn').innerText = currentUiLang === 'EN' ? "SYSTEM LANGUAGE: ENGLISH" : "সিস্টেম ভাষা: বাংলা";
    
    let layoutLabel = activeKeyboard;
    if(currentUiLang === 'EN') {
        if(activeKeyboard === 'EN') layoutLabel = 'ENGLISH'; else if(activeKeyboard === 'AVRO') layoutLabel = 'AVRO'; else if(activeKeyboard === 'BIJOY') layoutLabel = 'BIJOY';
    } else {
        if(activeKeyboard === 'EN') layoutLabel = 'ইংরেজি'; else if(activeKeyboard === 'AVRO') layoutLabel = 'অভ্র'; else if(activeKeyboard === 'BIJOY') layoutLabel = 'বিজয়';
    }
    document.getElementById('kbLangBtn').innerText = currentUiLang === 'EN' ? `KEYBOARD: ${layoutLabel}` : `কীবোর্ড: ${layoutLabel}`;
    document.getElementById('beginnerBtn').innerText = isBeginnerMode ? cur.begOn : cur.begOff;

    document.getElementById('wpmLabel').innerText = cur.wpm; document.getElementById('accLabel').innerText = cur.acc;
    document.getElementById('statusLabel').innerText = isBeginnerMode ? cur.status : (currentUiLang === 'EN' ? "SYSTEM STATUS" : "সিস্টেম স্ট্যাটাস"); 
    document.getElementById('targetAlert').innerText = cur.targetAlert;
    document.getElementById('scoreLabel').innerText = cur.score; document.getElementById('livesLabel').innerText = cur.lives;
    
    let lblSpeed = document.getElementById('lblSpeed'); if(lblSpeed) lblSpeed.innerText = cur.configSpeed;
    let lblLimit = document.getElementById('lblLimit'); if(lblLimit) lblLimit.innerText = cur.configLimit;
    let lblMisses = document.getElementById('lblMisses'); if(lblMisses) lblMisses.innerText = cur.configMisses;

    let bubbleBtn = document.getElementById('bubbleModeBtn');
    if(bubbleBtn) { bubbleBtn.innerText = GAME_CONFIG.BUBBLE_MODE === 'SINGLE' ? cur.bubbleSingle : cur.bubbleMulti; }

    document.getElementById('modeBtn').className = osMode === 'ARCADE' ? "mode-toggle-btn arcade-active" : "mode-toggle-btn";
}

window.onload = () => { injectLiveControlBar(); renderDynamicKeyboard(); attachSystemListeners(); startVryxilSession(); updateLanguageUI(); };
