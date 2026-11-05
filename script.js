
// QUIZMASTER DASHBOARD

const currentUser = JSON.parse(
    localStorage.getItem("quizCurrentUser")
);

// Check login
if (document.getElementById("userName")) {
    if (!currentUser) {
        window.location.href = "login.html";
    } else {
        document.getElementById("userName").textContent =
            currentUser.name;
    }

    loadDashboard();
}

// Start quiz
function startQuiz(subject) {
    localStorage.setItem("selectedSubject", subject);
    window.location.href = "quiz.html";
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("quizCurrentUser");
        window.location.href = "login.html";
    });
}

// Load dashboard statistics
function loadDashboard() {
    const history = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
    );

    const total = history.length;

    const best = total
        ? Math.max(...history.map(item => item.percentage))
        : 0;

    const points = history.reduce(
        (sum, item) => sum + item.score,
        0
    );

    document.getElementById("totalQuizzes").textContent = total;
    document.getElementById("bestScore").textContent = best + "%";
    document.getElementById("totalPoints").textContent = points;

    const historyBox = document.getElementById("quizHistory");

    if (!total) {
        historyBox.textContent =
            "No quizzes played yet. Start your first quiz!";
        return;
    }

    historyBox.innerHTML = history.slice(-5).reverse().map(item => `
        <div style="padding:15px 0;border-bottom:1px solid #303353;">
            <strong>${item.subject}</strong>
            <span style="float:right;color:#c4b5fd;">
                ${item.percentage}%
            </span>
            <p style="font-size:12px;color:#aaa;">
                Score: ${item.score}/${item.total}
            </p>
        </div>
    `).join("");
}
