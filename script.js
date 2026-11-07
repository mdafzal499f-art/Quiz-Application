
// QUIZ APPLICATION DASHBOARD

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("quizCurrentUser"));
    } catch (error) {
        return null;
    }
}

const currentUser = getCurrentUser();

// CHECK LOGIN
if (document.getElementById("userName")) {
    if (!currentUser) {
        window.location.replace("login.html");
    } else {
        document.getElementById("userName").textContent =
            currentUser.name;

        loadDashboard();
    }
}

// START QUIZ
function startQuiz(subject) {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
        return;
    }

    localStorage.setItem("selectedSubject", subject);
    window.location.href = "quiz.html";
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("quizCurrentUser");
        window.location.replace("login.html");
    });
}

// LOAD DASHBOARD STATISTICS
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
