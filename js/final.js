// ---- LOAD SCORE ----
const finalScoreEl = document.getElementById('finalScore');
let score = parseInt(localStorage.getItem('saola_arcade_score') || '0', 10);
finalScoreEl.innerText = score;


// ---- LOAD PLAYER INFO ----
const nameEl = document.getElementById('finalName');
const classEl = document.getElementById('finalClass');
const emailEl = document.getElementById('finalEmail');

// Read from localStorage
const playerName = localStorage.getItem('player_name') || 'Không có';
const playerClass = localStorage.getItem('player_class') || 'Không có';
const playerEmail = localStorage.getItem('player_email') || 'Không có';

nameEl.innerText = playerName;
classEl.innerText = playerClass;
emailEl.innerText = playerEmail;
