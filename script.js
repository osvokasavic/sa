const questions = [
    {
        type: "select",
        question: "What are the primary colors?",
        options: [
            { text: "Red", correct: true },
            { text: "Blue", correct: true },
            { text: "Green", correct: false },
            { text: "Yellow", correct: true },
        ]
    },
    {
        type: "type",
        question: "What is the capital of France?",
        correctAnswers: ["Paris"]
    },
    // Add more question objects here
];

let selectedQuestions = [];

function initializeQuiz() {
    const questionsContainer = document.getElementById('questions-container');

    while (selectedQuestions.length < 20) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        if (!selectedQuestions.includes(question)) {
            selectedQuestions.push(question);
        }
    }

    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionLabel = document.createElement('label');
        questionLabel.innerText = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionLabel);

        if (q.type === "select") {
            q.options.forEach((option, optIndex) => {
                const optionDiv = document.createElement('div');
                const optionInput = document.createElement('input');
                optionInput.type = 'checkbox';
                optionInput.id = `q${index}_o${optIndex}`;
                optionInput.name = `q${index}`;
                optionInput.value = option.text;

                const optionLabel = document.createElement('label');
                optionLabel.htmlFor = `q${index}_o${optIndex}`;
                optionLabel.innerText = option.text;

                optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionLabel);
                questionDiv.appendChild(optionDiv);
            });
        } else if (q.type === "type") {
            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerInput.id = `q${index}_input`;
            questionDiv.appendChild(answerInput);
        }

        questionsContainer.appendChild(questionDiv);
    });
}

function endQuiz() {
    const form = document.getElementById('quiz-form');
    let score = 0;

    selectedQuestions.forEach((q, index) => {
        let questionScore = 0;

        if (q.type === "select") {
            const selectedOptions = document.querySelectorAll(`input[name="q${index}"]:checked`);
            const selectedValues = Array.from(selectedOptions).map(option => option.value);

            const correctOptions = q.options.filter(opt => opt.correct).map(opt => opt.text);
            const isCorrect = selectedValues.length === correctOptions.length &&
                selectedValues.every(val => correctOptions.includes(val));

            questionScore = isCorrect ? 1 : 0;

            const questionDiv = document.createElement('div');
            questionDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
            questionDiv.innerText = `${index + 1}. ${q.question} - Correct: ${correctOptions.join(', ')}`;
            document.getElementById('result-container').appendChild(questionDiv);

        } else if (q.type === "type") {
            const userAnswer = document.getElementById(`q${index}_input`).value.trim().toLowerCase();
            const isCorrect = q.correctAnswers.map(ans => ans.toLowerCase()).includes(userAnswer);

            questionScore = isCorrect ? 1 : 0;

            const questionDiv = document.createElement('div');
            questionDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
            questionDiv.innerText = `${index + 1}. ${q.question} - Correct: ${q.correctAnswers.join(', ')}`;
            document.getElementById('result-container').appendChild(questionDiv);
        }

        score += questionScore;
    });

    const scoreDiv = document.createElement('div');
    scoreDiv.innerText = `Your final score is: ${score}`;
    document.getElementById('result-container').appendChild(scoreDiv);
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
