
const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const nameField = document.getElementById("nameField");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const switchBtn = document.getElementById("switchBtn");
const switchText = document.getElementById("switchText");
const authMessage = document.getElementById("authMessage");

let isSignup = false;

function showMessage(message, success = false) {
    authMessage.textContent = message;
    authMessage.style.color = success ? "#4ade80" : "#f87171";
}

switchBtn.addEventListener("click", function () {
    isSignup = !isSignup;

    if (isSignup) {
        formTitle.textContent = "Create Account";
        formSubtitle.textContent = "Join QuizMaster and start learning.";
        nameField.hidden = false;
        nameInput.required = true;
        submitBtn.textContent = "Create Account";
        switchText.firstChild.textContent = "Already have an account? ";
        switchBtn.textContent = "Login";
    } else {
        formTitle.textContent = "Welcome Back!";
        formSubtitle.textContent = "Login to continue your learning journey.";
        nameField.hidden = true;
        nameInput.required = false;
        submitBtn.textContent = "Login";
        switchText.firstChild.textContent = "Don't have an account? ";
        switchBtn.textContent = "Sign Up";
    }

    authForm.reset();
    showMessage("");
});

authForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const name = nameInput.value.trim();

    let users = JSON.parse(localStorage.getItem("quizUsers")) || [];

    if (isSignup) {
        if (!name) {
            showMessage("Please enter your name.");
            return;
        }

        if (users.some(user => user.email === email)) {
            showMessage("Account already exists. Please login.");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("quizUsers", JSON.stringify(users));

        showMessage("Account created successfully! Please login.", true);

        isSignup = false;
        formTitle.textContent = "Welcome Back!";
        formSubtitle.textContent = "Login to continue your learning journey.";
        nameField.hidden = true;
        nameInput.required = false;
        submitBtn.textContent = "Login";
        switchText.firstChild.textContent = "Don't have an account? ";
        switchBtn.textContent = "Sign Up";
        authForm.reset();

    } else {
        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            showMessage("Invalid email or password.");
            return;
        }

        localStorage.setItem("quizCurrentUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        showMessage("Login successful! Redirecting...", true);

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }
});
