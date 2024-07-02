
const creation = document.querySelectorAll(".create-account");
creation.forEach((e) => {
    e.addEventListener("click", closeLogin);
})

const login = document.querySelectorAll(".login-account");
login.forEach((e) => {
    e.addEventListener("click", closeSignUp);
})