const questions = [
  {
    question:
      "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "function"],
    answer: "const",
  },
  {
    question: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "Object.keys()",
      "JSON.valueOf()",
    ],
    answer: "JSON.stringify()",
  },
  {
    question: "What does DOM stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Dynamic Output Module",
      "Document Oriented Model",
    ],
    answer: "Document Object Model",
  },
  {
    question:
      "Which symbol is used to write a single-line comment in JavaScript?",
    options: ["<!-- -->", "#", "//", "/* */"],
    answer: "//",
  },
  {
    question:
      "Which array method creates a new array with all elements that pass a test?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    answer: "filter()",
  },
  {
    question: 'What is the result of 5 + "5" in JavaScript?',
    options: ["10", "55", "Error", "undefined"],
    answer: "55",
  },
  {
    question:
      "Which of these is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
  {
    question: "Which HTML element is used to include JavaScript in a web page?",
    options: ["<script>", "<js>", "<code>", "<link>"],
    answer: "<script>",
  },
];

const scoreBadge = document.getElementById("score-badge");
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

function getFeedbackMessage(scoreValue) {
  if (scoreValue === 8) {
    return "Excellent work — you really know your JavaScript!";
  }

  if (scoreValue >= 6) {
    return "Great job — you are on a strong streak!";
  }

  if (scoreValue >= 4) {
    return "Nice effort — keep practicing and you will improve!";
  }

  if (scoreValue >= 2) {
    return "Good try — learning takes practice!";
  }

  return "Keep going — every question helps you improve!";
}

function updateScoreBadge() {
  scoreBadge.textContent = `Score: ${score}`;
}

function renderQuestion() {
  isAnswered = false;
  nextButton.disabled = true;

  const currentQuestion = questions[currentQuestionIndex];
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = option;
    optionButton.dataset.answer = option;
    optionButton.addEventListener("click", handleOptionClick);
    optionsContainer.appendChild(optionButton);
  });

  updateScoreBadge();
}

function handleOptionClick(event) {
  if (isAnswered) {
    return;
  }

  const selectedButton = event.target.closest("button");

  if (!selectedButton) {
    return;
  }

  const selectedAnswer = selectedButton.dataset.answer;
  const correctAnswer = questions[currentQuestionIndex].answer;
  isAnswered = true;
  nextButton.disabled = false;

  const optionButtons = Array.from(document.querySelectorAll(".option-btn"));

  optionButtons.forEach((button) => {
    button.disabled = true;

    if (button.dataset.answer === correctAnswer) {
      button.classList.add("correct");
    }

    if (
      button.dataset.answer === selectedAnswer &&
      selectedAnswer !== correctAnswer
    ) {
      button.classList.add("wrong");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score += 1;
    updateScoreBadge();
  }
}

function showFinalScreen() {
  const finalMessage = getFeedbackMessage(score);
  finalScore.textContent = `You scored ${score} out of 8 — ${finalMessage}`;
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  showFinalScreen();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  isAnswered = false;

  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", restartQuiz);

renderQuestion();
