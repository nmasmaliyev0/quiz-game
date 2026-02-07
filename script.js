// DOM Elements
const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const startBtn = document.querySelector('#start-btn');
const questionText = document.querySelector('#question-text');
const answersContainer = document.querySelector('#answers-container');
const currentQuestionSpan = document.querySelector('#current-question');
const totalQuestionsSpan = document.querySelector('#total-questions');
const scoreSpan = document.querySelector('#score');
const progressBar = document.querySelector('#progress');
const finalScoreSpan = document.querySelector('#final-score');
const maxScoreSpan = document.querySelector('#max-score');
const resultMessage = document.querySelector('#result-message');
const restartBtn = document.querySelector('#restart-btn');


// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Linux", correct: true },
      { text: "JavaScript", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Gd", correct: false },
      { text: "Go", correct: false },
      { text: "Ag", correct: false }
    ]
  }
];


// Result Messages
const resultMessages = [
  [
    "Oops! Looks like this quiz was tricky. Don't worry—practice makes perfect!",
    "Don't be discouraged! Every wrong answer is a step closer to mastering it.",
    "Keep trying! You've got the curiosity, now let's get the knowledge too!"
  ],
  [
    "Not bad! You've got some of it right—keep going and you'll improve!",
    "You're on your way! A little more focus and you'll hit higher scores next time.",
    "Good start! Every answer counts toward getting better."
  ],
  [
    "Nice! You know a good amount. Just a little more and you'll be a quiz master!",
    "Well done! You're right about half the time—let's aim higher next round!",
    "Great effort! You're learning as you go, and it's paying off."
  ],
  [
    "Awesome! You really know your stuff!",
    "Impressive! Most of your answers were spot on—keep it up!",
    "You're doing great! Just a few tweaks and you'll ace it next time."
  ],
  [
    "Amazing! You're a true quiz champion!",
    "Perfect score! Your knowledge is top-notch!",
    "Flawless! You really nailed this quiz!"
  ]
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;
  scoreSpan.textContent = score;

  startScreen.classList.remove('active');
  quizScreen.classList.add('active');

  showQuestion();
}


function restartQuiz() {
  resultScreen.classList.remove('active');
  quizScreen.classList.add('active');

  startQuiz();
}


function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  progressBar.style.width = `${currentQuestionIndex / quizQuestions.length * 100}%`;

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  // shuffles the array
  const answers = shuffle(currentQuestion.answers);
  
  answers.forEach(answer => {
    // creating element
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.className = "answers-btn";

    button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);

    answersContainer.appendChild(button);
  });
};


function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (!isCorrect) {
    selectedButton.classList.add('incorrect');
  }

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  };

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are any questions or if the quiz is over 
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
};


function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const successRate = score / quizQuestions.length * 100;
  const randomIndex = Math.floor(Math.random() * 3)

  switch (true) {
    case successRate >= 81 && successRate <= 100:
      message = resultMessages[4][randomIndex];
      break;
    case successRate >= 61 && successRate <= 80:
      message = resultMessages[3][randomIndex];
      break;
    case successRate >= 41 && successRate <= 60:
      message = resultMessages[2][randomIndex];
      break;
    case successRate >= 21 && successRate <= 40:
      message = resultMessages[1][[randomIndex]];
      break;
    case successRate >= 0 && successRate <= 20:
      message = resultMessages[0][randomIndex];
      break;
  }

  resultMessage.textContent = message;
};


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};