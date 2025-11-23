/* QUIZ ITEMS */
const ITEMS = [
  { id:1, name:"Vỏ chuối",     cat:"organic",   text:"Lorem ipsum dolor sit amet, item 1 text." },
  { id:2, name:"Lon nhôm",     cat:"recycle",   text:"Consectetur adipiscing elit, item 2 text." },
  { id:3, name:"Túi ni lông",  cat:"inorganic", text:"Sed do eiusmod tempor incididunt, item 3 text." },
  { id:4, name:"Chai nhựa",    cat:"recycle",   text:"Ut enim ad minim veniam, item 4 text." },
  { id:5, name:"Thức ăn thừa", cat:"organic",   text:"Quis nostrud exercitation ullamco, item 5 text." },
  { id:6, name:"Giấy",         cat:"recycle",   text:"Duis aute irure dolor in reprehenderit, item 6 text." }
];

/* STATE */
let remaining = ITEMS.map(item => ({ ...item, attempts: 0 }));
let score = 0; // Always start at 0
localStorage.setItem("saola_arcade_score", "0");

let currentItem = null;
let timer = 15;
let timerInterval = null;

/* ELEMENTS */
const itemNameEl = document.getElementById("itemName");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const btnNext = document.getElementById("popupNext");
const binButtons = document.querySelectorAll(".binBtn");

const endPopup = document.getElementById("endPopup");
const endContinue = document.getElementById("endContinue");

scoreEl.innerText = score;

/* LOAD NEXT ITEM */
function nextItem() {
  if (remaining.length === 0) {
    endPopup.style.display = "block";
    return;
  }

  currentItem = remaining.shift();
  itemNameEl.innerText = currentItem.name;

  resetTimer();
}

/* TIMER */
function resetTimer() {
  clearInterval(timerInterval);
  timer = 15;
  timerEl.innerText = timer;

  timerInterval = setInterval(() => {
    timer--;
    timerEl.innerText = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      showWrongFlash();
    }
  }, 1000);
}

/* WRONG ANSWER FLASH */
function showWrongFlash() {
  document.body.style.background = "#ffb0b0";
  setTimeout(() => {
    document.body.style.background = "";
  }, 300);
}

/* USER CHOOSES BIN */
binButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.cat === currentItem.cat) {
      // CORRECT
      clearInterval(timerInterval); // pause timer

      if (currentItem.attempts === 0) {
        score += 100;
        if (score > 600) score = 600;
      }

      localStorage.setItem("saola_arcade_score", score);
      scoreEl.innerText = score;

      popupText.innerText = currentItem.text;
      popup.style.display = "block";

    } else {
      // WRONG → flash red and put question back at end
      btn.style.background = "#ff4d4d";
      setTimeout(() => { btn.style.background = ""; }, 300);
      showWrongFlash();

      currentItem.attempts = 1;
      remaining.push(currentItem); // return to end
    }
  });
});

/* POPUP → NEXT QUESTION */
btnNext.addEventListener("click", () => {
  popup.style.display = "none";
  nextItem();
});

/* END POPUP → FINAL PAGE */
endContinue.addEventListener("click", () => {
  window.location.href = "final.html";
});

/* INIT */
nextItem();
