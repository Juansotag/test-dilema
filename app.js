// --- Supabase REST API ---
const SUPABASE_URL = 'https://vsvzquvcuhsngjvdwdnc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DJ1mK2CAQLRfYLx17u3_oQ_EL6P_9gE';

let lastResponseId = null; // guarda el id de la última respuesta guardada

async function saveResponse(answers, sortedCandidates) {
    try {
        const row = {
            top_candidate: sortedCandidates[0].name,
            top_percentage: sortedCandidates[0].percentage,
            results: sortedCandidates.map(c => ({ name: c.name, percentage: c.percentage }))
        };
        Object.entries(answers).forEach(([id, answer]) => {
            row[`q${id}`] = answer;
        });

        const response = await fetch(`${SUPABASE_URL}/rest/v1/quiz_responses`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(row)
        });

        if (response.ok) {
            const [data] = await response.json();
            lastResponseId = data?.id || null;
            console.log('[Supabase] Respuesta guardada. ID:', lastResponseId);
            // Habilitar el botón de comentario ahora que tenemos el ID
            const btn = document.getElementById('feedback-submit-btn');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Enviar comentario';
            }
        } else {
            const errText = await response.text();
            console.warn('[Supabase] Error al guardar:', response.status, errText);
            // El botón queda deshabilitado si no se pudo guardar
            const btn = document.getElementById('feedback-submit-btn');
            if (btn) btn.textContent = 'No disponible';
        }
    } catch (e) {
        console.warn('[Supabase] Error inesperado:', e);
    }
}

async function saveComment(comment) {
    if (!lastResponseId) {
        console.warn('[Supabase] No hay respuesta guardada a la que vincular el comentario.');
        return false;
    }
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/quiz_responses?id=eq.${lastResponseId}`,
            {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ comment })
            }
        );
        return response.ok;
    } catch (e) {
        console.warn('[Supabase] Error al guardar comentario:', e);
        return false;
    }
}
// --- Fin Supabase ---

let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let cameFromResults = false;

const landing = document.getElementById('landing');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const answersScreen = document.getElementById('answers-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const viewAnswersBtn = document.getElementById('view-answers-btn');
const backToLandingBtn = document.getElementById('back-to-landing-btn');
const feedbackText = document.getElementById('feedback-text');
const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackCharCount = document.getElementById('feedback-char-count');

// Contador de caracteres del textarea
feedbackText.addEventListener('input', () => {
    const len = feedbackText.value.length;
    feedbackCharCount.textContent = `${len} / 1000`;
});

// Enviar comentario
feedbackSubmitBtn.addEventListener('click', async () => {
    const text = feedbackText.value.trim();
    if (!text) {
        feedbackStatus.textContent = '⚠️ Por favor escribe algo antes de enviar.';
        feedbackStatus.className = 'feedback-status error';
        return;
    }
    feedbackSubmitBtn.disabled = true;
    feedbackSubmitBtn.textContent = 'Enviando...';
    const ok = await saveComment(text);
    if (ok) {
        feedbackStatus.textContent = '✅ ¡Gracias por tu comentario!';
        feedbackStatus.className = 'feedback-status success';
        feedbackText.value = '';
        feedbackCharCount.textContent = '0 / 1000';
        feedbackSubmitBtn.textContent = 'Comentario enviado';
    } else {
        feedbackStatus.textContent = '❌ Error al enviar. Intenta de nuevo.';
        feedbackStatus.className = 'feedback-status error';
        feedbackSubmitBtn.disabled = false;
        feedbackSubmitBtn.textContent = 'Enviar comentario';
    }
});


const counter = document.getElementById('counter');
const progressBar = document.getElementById('progress-bar');
const contextTag = document.getElementById('context');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const resultsList = document.getElementById('results-list');

const candidatesGrid = document.getElementById('candidates-grid');
const candidateDetailView = document.getElementById('candidate-detail-view');
const detailPhoto = document.getElementById('detail-photo');
const detailName = document.getElementById('detail-name');
const detailParty = document.getElementById('detail-party');
const answersList = document.getElementById('answers-list');

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
    answersScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('animate-in');
    currentQuestionIndex = 0;
    userAnswers = {};
    showQuestion();
}

function showAnswersScreen() {
    cameFromResults = false;
    landing.classList.add('hidden');
    answersScreen.classList.remove('hidden');
    answersScreen.classList.add('animate-in');
    candidateDetailView.classList.add('hidden');
    candidatesGrid.classList.remove('hidden');

    candidatesGrid.innerHTML = '';
    quizData.candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'candidate-selector-card animate-in';
        card.innerHTML = `
            <img src="${candidate.photo || 'https://via.placeholder.com/80'}" alt="${candidate.name}">
            <h3>${candidate.name}</h3>
            <p>${candidate.party}</p>
        `;
        card.onclick = () => showCandidateDetail(candidate);
        candidatesGrid.appendChild(card);
    });
}

function showCandidateDetail(candidate, fromResults = false) {
    cameFromResults = fromResults;
    if (fromResults) {
        resultsScreen.classList.add('hidden');
        answersScreen.classList.remove('hidden');
        answersScreen.classList.add('animate-in');
    }

    candidatesGrid.classList.add('hidden');
    candidateDetailView.classList.remove('hidden');
    candidateDetailView.classList.add('animate-in');

    // Use a default image if not found
    const detailPhotoPath = candidate.photo || 'https://via.placeholder.com/150?text=Candidato';
    const detailPartyPath = candidate.partyLogo || 'https://via.placeholder.com/60?text=P';
    const detailProfilePath = candidate.profilePic ? `<img src="${candidate.profilePic}" style="width: 24px; height: 24px; border-radius: 50%; vertical-align: middle; margin-right: 10px;">` : '';

    detailPhoto.src = detailPhotoPath;
    detailName.innerText = candidate.name;
    detailParty.innerHTML = `<img src="${detailPartyPath}" style="height: 24px; vertical-align: middle; margin-right: 8px;"> ${candidate.party}`;

    // Campaign URL button
    const campaignBtn = document.getElementById('campaign-url-btn');
    if (candidate.campaignUrl) {
        campaignBtn.href = candidate.campaignUrl;
        campaignBtn.classList.remove('hidden');
    } else {
        // fallback: show button linking to a web search if no URL found
        campaignBtn.href = `https://www.google.com/search?q=${encodeURIComponent(candidate.name + ' candidato presidencia Colombia 2026')}`;
        campaignBtn.classList.remove('hidden');
    }


    // Inject profile description
    const profileTextContainer = document.getElementById('candidate-profile-text');
    if (profileTextContainer) {
        profileTextContainer.innerHTML = candidate.description ? candidate.description.split('\n\n').map(p => `<p>${p}</p>`).join('') : '';
    }

    answersList.innerHTML = `
        <div class="disclaimer-box animate-in">
            <i>⚠️</i>
            <p>Estas no son necesariamente las respuestas oficiales dadas por el candidato. Representan lo que, de forma interna, el <strong>Laboratorio de Gobierno (GovLab)</strong> considera que serían sus posiciones frente a este dilema.</p>
        </div>
    `;

    quizData.questions.forEach(q => {
        const answerKey = candidate.answers[q.id];
        const answerText = q.options[answerKey] || 'No respondió';

        const item = document.createElement('div');
        item.className = 'answer-item animate-in';
        item.innerHTML = `
            <h4>Pregunta ${q.id}: ${q.context}</h4>
            <p>${q.text}</p>
            <span class="answer-text-label">Respuesta del candidato: ${answerText}</span>
        `;
        answersList.appendChild(item);
    });
}

function showQuestion() {
    // ... existing logic ...
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

    // Deshabilitar botón de comentario hasta que el guardado termine
    const fbBtn = document.getElementById('feedback-submit-btn');
    if (fbBtn) {
        fbBtn.disabled = true;
        fbBtn.textContent = 'Guardando...';
    }

    // Guardar en Supabase (sin bloquear la UI)
    saveResponse(userAnswers, candidates);

    resultsList.innerHTML = '';
    candidates.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.style.cursor = 'pointer';
        card.onclick = () => showCandidateDetail(c, true);

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
                <div class="profile-tag">${profilePath}${(c.profile || '').replace(/_/g, ' ')}</div>
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
viewAnswersBtn.onclick = showAnswersScreen;
backToLandingBtn.onclick = () => {
    if (cameFromResults) {
        answersScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        resultsScreen.classList.add('animate-in');
        cameFromResults = false;
    } else {
        if (!candidateDetailView.classList.contains('hidden')) {
            candidateDetailView.classList.add('hidden');
            candidatesGrid.classList.remove('hidden');
            candidatesGrid.classList.add('animate-in');
        } else {
            answersScreen.classList.add('hidden');
            landing.classList.remove('hidden');
            landing.classList.add('animate-in');
        }
    }
};
restartBtn.onclick = () => {
    resultsScreen.classList.add('hidden');
    landing.classList.remove('hidden');
};

init();
