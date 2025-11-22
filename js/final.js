// Load total score
const finalScoreEl = document.getElementById('finalScore');
let score = parseInt(localStorage.getItem('saola_arcade_score') || '0', 10);
finalScoreEl.innerText = score;
