// Array of question objects
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },
    {
        question: "What is the Largest Country in the World?",
        answers: [
            { text: "Russia", correct: true },
            { text: "Canada", correct: false },
            { text: "China", correct: false },
            { text: "USA", correct: false }
        ]
    },
    {
        question: "What is the Largest Ocean in the World?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Arctic", correct: false },
            { text: "Pacific", correct: true }
        ]
    },
    {
        question: "which is the national flag of India?",
        answers: [
            { text: "🇸🇱", correct: false },
            { text: "🇱🇷", correct: false },
            { text: "🇨🇮", correct: false },
            { text: "🇮🇳", correct: true }
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "What is the capital of USA?",
        answers: [
            { text: "Washington", correct: true },
            { text: "New York", correct: false },
            { text: "Los Angeles", correct: false },
            { text: "Chicago", correct: false }
        ]
    },
    {
        question: "What is the currency of India?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Rupee", correct: true },
            { text: "Euro", correct: false },
            { text: "Pound", correct: false }
        ]
    },
    {
        question: "What is the currency of USA?",
        answers: [
            { text: "Dollar", correct: true },
            { text: "Rupee", correct: false },
            { text: "Euro", correct: false },
            { text: "Pound", correct: false }
        ]
    },
    {
        question: "What is the currency of UK?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Rupee", correct: false },
            { text: "Euro", correct: false },
            { text: "Pound", correct: true }
        ]
    },
    {
        question: "What is the currency of France?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Rupee", correct: false },
            { text: "Euro", correct: true },
            { text: "Pound", correct: false }
        ]
    },
];

// HTML elements for displaying the quiz
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

// State variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to display the current question
function showQuestion() {

    resetState(); // Clear previous question and answers

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button"); // Create a button for each answer
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button); // Append the button to the answer buttons element
        if (answers.correct) {
            button.dataset.correct = answers.correct // Add data attribute to correct answer
        }
        button.addEventListener("click", selectAnswer); // Add event listener to each answer button
    });

}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); // Remove all answer buttons
    }
}

// Function to handle the answer selection
function selectAnswer(ans) {
    const selectedBtn = ans.target;
    const isCorrect = selectedBtn.dataset.correct === "true" // Check if the selected answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect")
    }
    // Disable all answer buttons

    Array.from(answerButtonsElement.children).forEach(button => { // Convert HTML collection to array
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all answer buttons
    });
    nextButton.style.display = "block"; // Display the next button
}

// Function to display the final score
function showScore() {
    resetState(); // Clear previous question and answers
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length} !`; // Display the final score
    nextButton.innerHTML = "Restart"; // Change the text of the next button
    nextButton.style.display = "block"; // Display the next button
}

// Function to handle the next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
// Start the quiz
startQuiz();
// End of quiz.js file