let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = {};

const landing = document.getElementById('landing');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const counter = document.getElementById('counter');
const progressBar = document.getElementById('progress-bar');
const contextTag = document.getElementById('context');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const resultsList = document.getElementById('results-list');

// Load data
async function init() {
    try {
        const response = await fetch('data.json');
        quizData = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function startQuiz() {
    landing.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('animate-in');
    currentQuestionIndex = 0;
    userAnswers = {};
    showQuestion();
}

function showQuestion() {
    const question = quizData.questions[currentQuestionIndex];

    // Check if question has any valid options
    const validOptions = Object.entries(question.options).filter(([key, value]) => value !== null && value !== undefined && value !== '');

    if (validOptions.length === 0) {
        console.warn(`Question ${question.id} has no options. Skipping.`);
        if (currentQuestionIndex < quizData.questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
        return;
    }

    counter.innerText = `Pregunta ${currentQuestionIndex + 1} de ${quizData.questions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%`;

    contextTag.innerText = question.context || 'General';
    questionText.innerText = question.text;

    optionsContainer.innerHTML = '';

    validOptions.forEach(([key, value]) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-in';
        btn.style.animationDelay = `${validOptions.findIndex(opt => opt[0] === key) * 0.1}s`;
        btn.innerText = value;
        btn.onclick = () => selectOption(key);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(optionKey) {
    const questionId = quizData.questions[currentQuestionIndex].id;
    userAnswers[questionId] = optionKey;

    if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    resultsScreen.classList.add('animate-in');

    const candidates = quizData.candidates.map(candidate => {
        let matches = 0;
        let totalAnswered = 0;

        quizData.questions.forEach(q => {
            const userId = q.id;
            const userAnswer = userAnswers[userId];
            const candidateAnswer = candidate.answers[userId];

            if (userAnswer && candidateAnswer) {
                totalAnswered++;
                if (userAnswer === candidateAnswer) {
                    matches++;
                }
            }
        });

        const percentage = totalAnswered > 0 ? (matches / totalAnswered) * 100 : 0;
        return { ...candidate, percentage: Math.round(percentage) };
    });

    // Sort by percentage descending
    candidates.sort((a, b) => b.percentage - a.percentage);

    resultsList.innerHTML = '';
    candidates.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card';

        // Use a default image if not found
        const photoPath = c.photo || 'https://via.placeholder.com/150?text=Candidato';
        const partyPath = c.partyLogo || 'https://via.placeholder.com/60?text=P';
        const profilePath = c.profilePic ? `<img src="${c.profilePic}" style="width: 24px; height: 24px; border-radius: 50%; vertical-align: middle; margin-right: 10px;">` : '';

        card.innerHTML = `
            <div class="rank-number">#${index + 1}</div>
            <div class="candidate-image-container">
                <img src="${photoPath}" alt="${c.name}" class="candidate-photo">
                <img src="${partyPath}" alt="${c.party}" class="party-logo-mini">
            </div>
            <div class="candidate-info">
                <div class="candidate-name">${c.name}</div>
                <div class="candidate-party">${c.party}</div>
                <div class="profile-tag">${profilePath}${c.profile.replace(/_/g, ' ')}</div>
                <div class="match-bar-bg">
                    <div class="match-bar-fill" style="width: ${c.percentage}%"></div>
                </div>
            </div>
            <div class="match-percentage">
                <div class="percentage-value">${c.percentage}%</div>
                <div class="percentage-label">Afinidad</div>
            </div>
        `;
        resultsList.appendChild(card);
    });
}

startBtn.onclick = startQuiz;
restartBtn.onclick = () => {
    resultsScreen.classList.add('hidden');
    landing.classList.remove('hidden');
};

init();
