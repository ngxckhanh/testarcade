const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const emailInput = document.getElementById("emailInput");
const startBtn = document.getElementById("startBtn");
const errorMsg = document.getElementById("errorMsg");

/* Enable button only if fields are valid */
function validate() {
    if (nameInput.value.trim() && classInput.value.trim() && emailInput.value.trim()) {
        startBtn.disabled = false;
        errorMsg.textContent = "";
    } else {
        startBtn.disabled = true;
    }
}

nameInput.addEventListener("input", validate);
classInput.addEventListener("input", validate);
emailInput.addEventListener("input", validate);

/* Save info + go to game */
startBtn.addEventListener("click", () => {
    localStorage.setItem("saola_user_name", nameInput.value.trim());
    localStorage.setItem("saola_user_class", classInput.value.trim());
    localStorage.setItem("saola_user_email", emailInput.value.trim());

    window.location.href = "sorting-game.html";
});
