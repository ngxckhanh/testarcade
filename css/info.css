const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const emailInput = document.getElementById("emailInput");
const errorMsg = document.getElementById("errorMsg");
const startBtn = document.getElementById("startBtn");

// Email pattern for Gmail
const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

function validate() {
    const name = nameInput.value.trim();
    const clas = classInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !clas || !email) {
        errorMsg.innerText = "Please fill in all fields.";
        startBtn.disabled = true;
        return;
    }

    if (!gmailPattern.test(email)) {
        errorMsg.innerText = "Email must be a valid @gmail.com address.";
        startBtn.disabled = true;
        return;
    }

    errorMsg.innerText = "";
    startBtn.disabled = false;
}

// Validate whenever input changes
nameInput.addEventListener("input", validate);
classInput.addEventListener("input", validate);
emailInput.addEventListener("input", validate);

// Save to localStorage and go to sorting.html
startBtn.addEventListener("click", () => {
    localStorage.setItem("player_name", nameInput.value.trim());
    localStorage.setItem("player_class", classInput.value.trim());
    localStorage.setItem("player_email", emailInput.value.trim());

    window.location.href = "sorting-game.html";
});
