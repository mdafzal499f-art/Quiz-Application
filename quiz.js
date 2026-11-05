
const subject = localStorage.getItem("selectedSubject") || "Computer";

const questions = {
    Computer: [
        {q:"What is the brain of a computer?",o:["RAM","CPU","Monitor","Keyboard"],a:1},
        {q:"Which language is used for web structure?",o:["HTML","Python","C++","Java"],a:0},
        {q:"What does RAM stand for?",o:["Read Access Memory","Random Access Memory","Run All Memory","None"],a:1},
        {q:"Which device is an input device?",o:["Monitor","Printer","Keyboard","Speaker"],a:2},
        {q:"Which is an operating system?",o:["Windows","HTML","CSS","Google"],a:0},
        {q:"What is the full form of CPU?",o:["Central Processing Unit","Computer Personal Unit","Control Program Unit","None"],a:0},
        {q:"Which is used to store data permanently?",o:["RAM","Cache","Hard Disk","Register"],a:2},
        {q:"Which one is a web browser?",o:["Windows","Chrome","Linux","Python"],a:1},
        {q:"What does URL stand for?",o:["Uniform Resource Locator","Universal Record Link","User Resource Line","None"],a:0},
        {q:"Which number system does a computer use?",o:["Decimal","Binary","Roman","Octal only"],a:1}
    ],

    Mathematics: [
        {q:"What is 12 × 8?",o:["86","96","88","98"],a:1},
        {q:"What is the square of 9?",o:["18","72","81","99"],a:2},
        {q:"What is 100 ÷ 4?",o:["20","25","30","40"],a:1},
        {q:"What is the value of π approximately?",o:["2.14","3.14","4.14","5.14"],a:1},
        {q:"What is 15 + 25?",o:["35","40","45","50"],a:1},
        {q:"What is the cube of 3?",o:["9","18","27","36"],a:2},
        {q:"What is 50% of 200?",o:["50","75","100","150"],a:2},
        {q:"How many sides does a hexagon have?",o:["5","6","7","8"],a:1},
        {q:"What is 7 × 7?",o:["42","48","49","56"],a:2},
        {q:"What is the smallest prime number?",o:["0","1","2","3"],a:2}
    ],

    Science: [
        {q:"Which planet is known as the Red Planet?",o:["Earth","Mars","Jupiter","Venus"],a:1},
        {q:"What gas do plants absorb?",o:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],a:2},
        {q:"What is the chemical formula of water?",o:["CO2","H2O","O2","NaCl"],a:1},
        {q:"How many bones are in an adult human body?",o:["106","206","306","406"],a:1},
        {q:"Which organ pumps blood?",o:["Lungs","Brain","Heart","Kidney"],a:2},
        {q:"What is the nearest star to Earth?",o:["Moon","Sun","Sirius","Mars"],a:1},
        {q:"What force pulls objects toward Earth?",o:["Magnetism","Gravity","Friction","Pressure"],a:1},
        {q:"Which vitamin comes from sunlight?",o:["Vitamin A","Vitamin B","Vitamin C","Vitamin D"],a:3},
        {q:"What is the boiling point of water at sea level?",o:["50°C","75°C","100°C","150°C"],a:2},
        {q:"Which part of a plant absorbs water?",o:["Flower","Leaf","Root","Fruit"],a:2}
    ],

    GK: [
        {q:"What is the capital of India?",o:["Mumbai","New Delhi","Kolkata","Chennai"],a:1},
        {q:"Which is the largest ocean?",o:["Indian","Atlantic","Pacific","Arctic"],a:2},
        {q:"Who is known as the Father of the Nation in India?",o:["Jawaharlal Nehru","Mahatma Gandhi","Sardar Patel","Bose"],a:1},
        {q:"Which is the national animal of India?",o:["Lion","Elephant","Tiger","Leopard"],a:2},
        {q:"How many days are there in a leap year?",o:["365","366","364","360"],a:1},
        {q:"Which planet is the largest?",o:["Earth","Mars","Jupiter","Mercury"],a:2},
        {q:"What is the currency of Japan?",o:["Dollar","Yen","Euro","Rupee"],a:1},
        {q:"Which is the highest mountain in the world?",o:["K2","Everest","Kangchenjunga","Makalu"],a:1},
        {q:"How many colours are in a rainbow?",o:["5","6","7","8"],a:2},
        {q:"Which is the fastest land animal?",o:["Lion","Horse","Cheetah","Tiger"],a:2}
    ]
};

const quizQuestions = questions[subject] || questions.Computer;

let currentQuestion = 0;
let answers = Array(quizQuestions.length).fill(null);
let timeLeft = 30;
let timerInterval;

const subjectTitle = document.getElementById("subjectTitle");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumber = document.getElementById("questionNumber");
const timer = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const questionDots = document.getElementById("questionDots");

subjectTitle.textContent = subject + " Quiz";

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timer.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    questionText.textContent = question.q;

    progressBar.style.width =
        ((currentQuestion + 1) / quizQuestions.length * 100) + "%";

    optionsContainer.innerHTML = "";

    question.o.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = String.fromCharCode(65 + index) + ". " + option;

        if (answers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => {
            answers[currentQuestion] = index;
            showQuestion();
        });

        optionsContainer.appendChild(button);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent =
        currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next →";

    renderDots();
    startTimer();
}

function renderDots() {
    questionDots.innerHTML = "";

    quizQuestions.forEach((question, index) => {
        const dot = document.createElement("button");
        dot.className = "question-dot";

        if (index === currentQuestion) dot.classList.add("active");
        if (answers[index] !== null) dot.classList.add("answered");

        dot.textContent = index + 1;

        dot.addEventListener("click", () => {
            currentQuestion = index;
            showQuestion();
        });

        questionDots.appendChild(dot);
    });
}

prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    clearInterval(timerInterval);

    const score = quizQuestions.reduce((total, question, index) => {
        return total + (answers[index] === question.a ? 10 : 0);
    }, 0);

    const correct = score / 10;
    const percentage = Math.round(correct / quizQuestions.length * 100);

    const history = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
    );

    history.push({
        subject: subject,
        score: score,
        total: quizQuestions.length * 10,
        correct: correct,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("quizHistory", JSON.stringify(history));
    localStorage.setItem("lastQuizResult", JSON.stringify({
        subject,
        score,
        total: quizQuestions.length * 10,
        correct,
        wrong: quizQuestions.length - correct,
        percentage
    }));

    window.location.href = "result.html";
}

showQuestion();
