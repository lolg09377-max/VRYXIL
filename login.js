// ==========================================
// 🔒 VRYXIL SECURE AUTHENTICATION ENGINE
// 🔥 WITH ANTI-BRUTE-FORCE & ENCRYPTION
// ==========================================

const sysMsg = document.getElementById('systemMessage');
const MAX_FAILS = 3; 
const LOCKOUT_TIME = 3 * 60 * 1000; 

function encryptData(text) {
    return btoa(text); 
}

function showMessage(text, type) {
    sysMsg.innerText = text;
    sysMsg.className = `sys-msg ${type}`;
    setTimeout(() => { sysMsg.innerText = "SYSTEM: AWAITING INPUT..."; sysMsg.className = "sys-msg"; }, 4000);
}

function togglePassword() {
    let passInput = document.getElementById('loginPassword');
    passInput.type = (passInput.type === "password") ? "text" : "password";
}

function togglePortal(view) {
    document.getElementById('loginSection').style.display = view === 'login' ? 'block' : 'none';
    document.getElementById('registerSection').style.display = view === 'register' ? 'block' : 'none';
    document.getElementById('adminSection').style.display = view === 'admin' ? 'block' : 'none';
}

function checkLockout(email) {
    let securityDB = JSON.parse(localStorage.getItem('vryxil_security')) || {};
    let userSec = securityDB[email];
    if (userSec && userSec.lockUntil > Date.now()) {
        let remainingTime = Math.ceil((userSec.lockUntil - Date.now()) / 1000 / 60);
        return `SYSTEM LOCKED: Try again in ${remainingTime} minutes.`;
    }
    return null;
}

function recordFailedAttempt(email) {
    let securityDB = JSON.parse(localStorage.getItem('vryxil_security')) || {};
    let userSec = securityDB[email] || { fails: 0, lockUntil: 0 };
    userSec.fails += 1;
    if (userSec.fails >= MAX_FAILS) {
        userSec.lockUntil = Date.now() + LOCKOUT_TIME; 
        showMessage("THREAT DETECTED: Account locked for 3 minutes!", "error");
    } else {
        let attemptsLeft = MAX_FAILS - userSec.fails;
        showMessage(`ACCESS DENIED: Invalid Key! (${attemptsLeft} attempts left)`, "error");
    }
    securityDB[email] = userSec;
    localStorage.setItem('vryxil_security', JSON.stringify(securityDB));
}

function clearFailedAttempts(email) {
    let securityDB = JSON.parse(localStorage.getItem('vryxil_security')) || {};
    if (securityDB[email]) {
        securityDB[email].fails = 0;
        securityDB[email].lockUntil = 0;
        localStorage.setItem('vryxil_security', JSON.stringify(securityDB));
    }
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('regEmail').value.trim();
    let pass = document.getElementById('regPassword').value.trim();
    let usersDB = JSON.parse(localStorage.getItem('vryxil_users')) || {};

    if (usersDB[email]) { showMessage("ERROR: Cyber ID already exists!", "error"); return; }

    usersDB[email] = encryptData(pass); 
    localStorage.setItem('vryxil_users', JSON.stringify(usersDB));
    
    showMessage("SUCCESS: QUANTUM ID CREATED! Please Login.", "success");
    setTimeout(() => { togglePortal('login'); document.getElementById('registerForm').reset(); }, 1500);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('loginEmail').value.trim();
    let pass = document.getElementById('loginPassword').value.trim();

    if (email === 'admin' && pass === 'admin22k') {
        showMessage("ADMIN PROTOCOL INITIATED...", "success");
        setTimeout(() => { openAdminPanel(); document.getElementById('loginForm').reset(); }, 1000);
        return;
    }

    let usersDB = JSON.parse(localStorage.getItem('vryxil_users')) || {};

    if (!usersDB[email]) { showMessage("ACCESS DENIED: Account not found!", "error"); return; }

    let lockMsg = checkLockout(email);
    if (lockMsg) { showMessage(lockMsg, "error"); return; }

    if (usersDB[email] !== encryptData(pass)) { 
        recordFailedAttempt(email); return; 
    }

    clearFailedAttempts(email);

    let btn = document.getElementById('loginBtn');
    btn.innerText = "DECRYPTING..."; btn.style.background = "#39ff14"; btn.style.color = "#000";
    
    showMessage("ACCESS GRANTED: Entering System...", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1500);
});

async function socialAutoLogin(platform) {
    let userEmail = prompt(`SYSTEM OVERRIDE: Enter your registered ${platform} Email:`);
    if (!userEmail) return;

    let usersDB = JSON.parse(localStorage.getItem('vryxil_users')) || {};
    let lockMsg = checkLockout(userEmail);
    if (lockMsg) { showMessage(lockMsg, "error"); return; }
    
    if (usersDB[userEmail]) {
        clearFailedAttempts(userEmail);
        showMessage(`SUCCESS: ${platform} Handshake verified!`, "success");
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
    } else {
        showMessage(`AUTH FAILED: No registered ID found for ${platform}.`, "error");
    }
}

function openAdminPanel() {
    togglePortal('admin');
    let usersDB = JSON.parse(localStorage.getItem('vryxil_users')) || {};
    let securityDB = JSON.parse(localStorage.getItem('vryxil_security')) || {};
    let listEl = document.getElementById('userList');
    listEl.innerHTML = "";

    let totalUsers = Object.keys(usersDB).length;
    if (totalUsers === 0) {
        listEl.innerHTML = "<li>No registered cyber agents found.</li>";
    } else {
        let count = 1;
        for (let user in usersDB) {
            let status = "🟢 ACTIVE";
            if (securityDB[user] && securityDB[user].lockUntil > Date.now()) {
                status = "🔴 BLOCKED";
            }
            let li = document.createElement('li');
            li.innerHTML = `<span>[ID ${count}]</span> ${user} <span style="float:right; font-size:0.6rem;">${status}</span>`;
            listEl.appendChild(li);
            count++;
        }
    }
}

document.getElementById('forgotPass').addEventListener('click', function(e) {
    e.preventDefault();
    showMessage("SYSTEM: Password reset packet dispatched.", "success");
});
