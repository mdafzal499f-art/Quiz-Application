localStorage.removeItem("quizCurrentUser");
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("quizUsers")) || [];
    } catch (error) {
        return [];
    }
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("quizCurrentUser"));
    } catch (error) {
        return null;
    }
}

function showMessage(message, success = false) {
    const authMessage = document.getElementById("authMessage");

    if (authMessage) {
        authMessage.textContent = message;
        authMessage.style.color = success ? "#4ade80" : "#f87171";
    }
}

// Already logged in? Open Dashboard.
const currentUser = getCurrentUser();

if (currentUser) {
    if (
        document.getElementById("loginForm") ||
        document.getElementById("signupForm")
    ) {
        window.location.href = "dashboard.html";
    }
}

// SIGNUP SYSTEM
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = getUsers();

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

        localStorage.setItem("quizCurrentUser", JSON.stringify({
            name: name,
            email: email
        }));

        showMessage("Account created! Opening Dashboard...", true);

        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1000);
    });
}

// LOGIN SYSTEM
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = getUsers();

        const user = users.find(user =>
            user.email === email &&
            user.password === password
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

        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1000);
    });
}
