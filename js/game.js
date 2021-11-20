const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("question-counter");
const progressbarfull = document.getElementById("progressbarfull");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
// console.log(choices);

let currentQuestion = {};
let acceptingAnswer = false;
let scores = 0;
let questionCounter = 0;
let avaiableQuestions = [];

let questions = [
  {
    question:
      "What year was the first Iron Man movie released, kicking off the Marvel Cinematic Universe?",
    choice1: "2005",
    choice2: "2008",
    choice3: "2010",
    choice4: "2012",
    answer: 2,
  },
  {
    question: "What is the name of Thor’s hammer?",
    choice1: "Vanir",
    choice2: "Mjolnir",
    choice3: "Aesir",
    choice4: "Norn",
    answer: 2,
  },
  {
    question: "What is Captain America’s shield made of?",
    choice1: "Adamantium",
    choice2: "Vibranium",
    choice3: "Promethium",
    choice4: "Carbonadium",
    answer: 2,
  },
  {
    question:
      "In the Incredible Hulk, what does Tony tell Thaddeus Ross at the end of the film?",
    choice1: "That he wants to study The Hulk",
    choice2: "That he knows about S.H.I.E.L.D.",
    choice3: "That they are putting a team together",
    choice4: "That Thaddeus owes him money",
    answer: 3,
  },
  {
    question:
      "Who was the last holder of the Space Stone before Thanos claims it for his Infinity Gauntlet? ",
    choice1: "Thor",
    choice2: "The Collector",
    choice3: "Tony Stark",
    choice4: "Loki",
    answer: 4,
  },
  {
    question: "What fake name does Natasha use when she first meets Tony?",
    choice1: "Natalie Rushman",
    choice2: "Naya Rabe",
    choice3: "Nicole Rohan",
    choice4: "Natalia Romanoff",
    answer: 1,
  },
  {
    question: "Who is killed by Loki in the Avengers?",
    choice1: "Maria Hill",
    choice2: "Nick Fury",
    choice3: "Doctor Erik Selvig",
    choice4: "Agent Coulson",
    answer: 4,
  },
  {
    question: "Who does the Mad Titan sacrifice to acquire the Soul Stone?",
    choice1: "Nebula",
    choice2: "Cull Obsidian",
    choice3: "Ebony Maw",
    choice4: "Gamora",
    answer: 4,
  },
  {
    question: "What type of doctor is Stephen Strange?",
    choice1: "Neurosurgeon",
    choice2: "Cardiothoracic Surgeon",
    choice3: "Trauma Surgeon",
    choice4: "Plastic Surgeon",
    answer: 1,
  },
  {
    question: "Who is Black Panther’s sister?",
    choice1: "Shuri",
    choice2: "Nakia",
    choice3: "Ramonda",
    choice4: "Okoye",
    answer: 1,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  scores = 0;
  avaiableQuestions = [...questions];
  // console.log(avaiableQuestions);
  alert("Don't refresh till you finish the Game");
  setTimeout(() => {
    loader.style.display = "none";
    game.style.display = "block";
  }, 3000);
  getnewQuestion();
};

getnewQuestion = () => {
  if (avaiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //Go to the end page
    localStorage.setItem("mostRecentScore", scores);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  //Increment the progress bar
  progressbarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * avaiableQuestions.length);
  currentQuestion = avaiableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  avaiableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classtoApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classtoApply = "correct";
    }

    if (classtoApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    // console.log(classtoApply);

    //We can do the same thing with ternary operator
    // const classtoApply= selectedAnswer== currentQuestion.answer ? 'correct' : 'incorrect';

    selectedChoice.parentElement.classList.add(classtoApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classtoApply);
      getnewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  scores += num;
  scoreText.innerText = scores;
};

startGame();
