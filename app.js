// --- Supabase REST API ---
const SUPABASE_URL = 'https://vsvzquvcuhsngjvdwdnc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DJ1mK2CAQLRfYLx17u3_oQ_EL6P_9gE';

let lastResponseId = null; // guarda el id de la última respuesta guardada

// --- Perfiles de Votante: metadata de colores por nombre ---
const PROFILE_META = {
    'El Pragmático': { color: '#596377', bg: '#f0f2f5' },
    'El Reformista': { color: '#a30016', bg: '#fef2f2' },
    'El Institucionalista': { color: '#0057e4', bg: '#f0f4ff' },
    'El Liberal': { color: '#e91212', bg: '#fff0f0' },
    'El Ambientalista': { color: '#5cb413', bg: '#f0fdf4' },
    'El Conservador': { color: '#222222', bg: '#f5f5f5' },
    'El Tecnocrático': { color: '#d1a000', bg: '#fffbeb' },
};

// SVG path data – 24×24 viewBox, stroke-based icons
const PROFILE_ICON_SVGS = {
    'El Pragmático': // Scales / Balance
        `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
         <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
         <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>`,
    'El Reformista': // People / Community
        `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
         <circle cx="9" cy="7" r="4"/>
         <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`,
    'El Institucionalista': // Building columns
        `<line x1="3" y1="22" x2="21" y2="22"/>
         <line x1="2" y1="9" x2="22" y2="9"/>
         <path d="M12 2L2 9h20L12 2z"/>
         <line x1="5" y1="9" x2="5" y2="22"/><line x1="9" y1="9" x2="9" y2="22"/>
         <line x1="15" y1="9" x2="15" y2="22"/><line x1="19" y1="9" x2="19" y2="22"/>`,
    'El Liberal': // Flag
        `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
         <line x1="4" y1="22" x2="4" y2="15"/>`,
    'El Ambientalista': // Leaf
        `<path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
         <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
    'El Conservador': // Sword
        `<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
         <line x1="13" y1="19" x2="19" y2="13"/>
         <line x1="16" y1="16" x2="20" y2="20"/>
         <line x1="19" y1="21" x2="21" y2="19"/>`,
    'El Tecnocrático': // CPU chip
        `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
         <line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/>
         <line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/>
         <line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/>
         <line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/>`,
};

function getProfileMeta(name) {
    return PROFILE_META[name] || { color: '#1e3b70', bg: '#eff6ff' };
}

function getProfileIconSVG(name, color = 'currentColor', size = 32) {
    const paths = PROFILE_ICON_SVGS[name] || '<circle cx="12" cy="12" r="8"/>';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
        stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

const OPTION_SCORES = {
    1: { 'A': 100, 'B': 0, 'C': 10, 'D': 30, 'E': 50 },
    2: { 'A': 80, 'B': 100, 'C': 30, 'D': 0, 'E': 90 },
    3: { 'A': 100, 'B': 0, 'C': 50, 'D': 20, 'E': 10 },
    4: { 'A': 80, 'B': 0, 'C': 50, 'D': 20, 'E': 60 },
    5: { 'A': 100, 'B': 50, 'C': 0, 'D': 20, 'E': 80 },
    6: { 'A': 0, 'B': 100, 'C': 20, 'D': 50, 'E': 40 },
    7: { 'A': 100, 'B': 0, 'C': 80, 'D': 20, 'E': 50 },
    8: { 'A': 100, 'B': 50, 'C': 30, 'D': 70, 'E': 0 },
    9: { 'A': 100, 'B': 20, 'C': 80, 'D': 50, 'E': 60 },
    10: { 'A': 100, 'B': 20, 'C': 80, 'D': 0, 'E': 50 },
    11: { 'A': 0, 'B': 20, 'C': 100, 'D': 50, 'E': 80 },
    12: { 'A': 100, 'B': 0, 'C': 60, 'D': 30, 'E': 50 },
    13: { 'A': 100, 'B': 0, 'C': 20, 'D': 80, 'E': 50 },
    14: { 'A': 80, 'B': 60, 'C': 40, 'D': 0, 'E': 50 },
    15: { 'A': 100, 'B': 50, 'C': 40, 'D': 0, 'E': 20 },
    16: { 'A': 0, 'B': 20, 'C': 100, 'D': 50, 'E': 80 }
};

const AXES = [
    { id: 'econ', name: 'Economía y Hacienda', qs: [1, 2], labelLeft: 'Estado de Bienestar', labelRight: 'Libre Mercado' },
    { id: 'trab', name: 'Trabajo y Salud', qs: [3, 4, 5], labelLeft: 'Sistema Público', labelRight: 'Privatización' },
    { id: 'seg', name: 'Seguridad y Convivencia', qs: [6, 7, 8], labelLeft: 'Prevención y Diálogo', labelRight: 'Mano Dura' },
    { id: 'amb', name: 'Ambiente y Energía', qs: [9, 10, 11], labelLeft: 'Protección Ambiental', labelRight: 'Extractivismo' },
    { id: 'edu', name: 'Educación y Desarrollo', qs: [12, 13], labelLeft: 'Gratuidad Universal', labelRight: 'Mérito y Crédito' },
    { id: 'inst', name: 'Estado e Instituciones', qs: [14, 15, 16], labelLeft: 'Reforma Popular', labelRight: 'Apertura Pro-Mercado' }
];

function calculateAxisScore(answers, qs) {
    let total = 0;
    let count = 0;
    qs.forEach(q => {
        if (answers[q] && OPTION_SCORES[q] && OPTION_SCORES[q][answers[q]] !== undefined) {
            total += OPTION_SCORES[q][answers[q]];
            count++;
        }
    });
    return count > 0 ? total / count : 50;
}

// assignVoterProfile: devuelve el perfil con mayor similitud
function assignVoterProfile(userAnswers, voterProfiles) {
    if (!voterProfiles || voterProfiles.length === 0) return null;
    const ranked = rankVoterProfiles(userAnswers, voterProfiles);
    return ranked.length > 0 ? ranked[0].profile : voterProfiles[0];
}

// rankVoterProfiles: devuelve todos los perfiles ordenados por % de similitud
function rankVoterProfiles(userAnswers, voterProfiles) {
    const results = [];
    voterProfiles.forEach(profile => {
        const typeAnswers = profile.type_answers || {};
        const keys = Object.keys(typeAnswers);
        if (keys.length === 0) return;
        let matches = 0;
        keys.forEach(qid => {
            if (userAnswers[qid] && userAnswers[qid] === typeAnswers[qid]) matches++;
        });
        results.push({
            profile,
            score: matches / keys.length,
            percentage: Math.round((matches / keys.length) * 100)
        });
    });
    results.sort((a, b) => b.score - a.score);
    return results;
}

async function saveResponse(answers, sortedCandidates, voterProfileId) {
    try {
        const row = {
            respondent_name: userName || 'Anónimo',
            top_candidate: sortedCandidates[0].name,
            top_percentage: sortedCandidates[0].percentage,
            results: sortedCandidates.map(c => ({ name: c.name, percentage: c.percentage })),
            voter_profile_id: voterProfileId || null
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
            const btn = document.getElementById('feedback-submit-btn');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Enviar comentario';
            }
        } else {
            const errText = await response.text();
            console.warn('[Supabase] Error al guardar:', response.status, errText);
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
            `${SUPABASE_URL}/rest/v1/rpc/save_session_comment`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ response_id: lastResponseId, comment_text: comment })
            }
        );
        return response.ok;
    } catch (e) {
        console.warn('[Supabase] Error al guardar comentario:', e);
        return false;
    }
}

// --- Fin Supabase ---

// --- Compartir resultados ---
const MEDALS = ['🥇', '🥈', '🥉'];

function populateShareCard(top3, voterProfile) {
    const title = document.getElementById('share-card-title');
    const container = document.getElementById('share-card-candidates');
    title.textContent = userName
        ? `${userName}, estos son tus candidatos:`
        : 'Mis candidatos con mayor afinidad:';
    container.innerHTML = top3.map((c, i) => `
        <div class="share-candidate-row">
            <span class="share-medal">${MEDALS[i]}</span>
            <img src="${c.photo || ''}" class="share-candidate-photo" crossorigin="anonymous" onerror="this.style.display='none'">
            <div class="share-candidate-info">
                <span class="share-candidate-name">${c.name}</span>
                <span class="share-candidate-party">${c.party}</span>
            </div>
        </div>
    `).join('');

    // Perfil del votante en la tarjeta
    const profileEl = document.getElementById('share-card-profile');
    if (profileEl && voterProfile) {
        const meta = getProfileMeta(voterProfile.name);
        const iconSvg = getProfileIconSVG(voterProfile.name, meta.color, 26);
        profileEl.style.display = 'block';
        profileEl.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.7rem; background:${meta.bg};
                        border:1.5px solid ${meta.color}40; border-radius:12px;
                        padding:0.55rem 0.9rem;">
                <div style="width:26px;height:26px;flex-shrink:0;">${iconSvg}</div>
                <div>
                    <span style="font-size:0.6rem;font-weight:700;color:#64748b;
                                 text-transform:uppercase;letter-spacing:.08em;display:block;">Tu perfil</span>
                    <span style="font-size:0.88rem;font-weight:700;color:${meta.color};">${voterProfile.name}</span>
                </div>
            </div>`;
    }
}

async function captureCard() {
    const card = document.getElementById('share-card');
    card.style.position = 'fixed';
    card.style.left = '-9999px';
    card.style.top = '0';
    card.style.display = 'block';
    await new Promise(r => setTimeout(r, 150));
    const canvas = await html2canvas(card, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
    });
    card.style.display = 'none';
    card.style.position = '';
    card.style.left = '';
    card.style.top = '';
    return canvas;
}

async function captureAndDownload() {
    const btn = document.getElementById('btn-download');
    btn.textContent = 'Generando...';
    btn.disabled = true;
    try {
        const canvas = await captureCard();
        const link = document.createElement('a');
        link.download = `convergencia-electoral-${(userName || 'resultados').replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } finally {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar imagen`;
        btn.disabled = false;
    }
}

function getShareText(top3) {
    const names = top3.slice(0, 3).map((c, i) => `${MEDALS[i]} ${c.name}`).join(' ');
    const siteUrl = 'https://test-dilema-production.up.railway.app/';
    return userName
        ? `${userName} hizo el test Convergencia Electoral 2026 del Govlab de la Universidad de la Sabana 🗳️\n\nSus candidatos con mayor afinidad son:\n${names}\n\n¿Cuál es el tuyo? ${siteUrl}`
        : `Hice el test Convergencia Electoral 2026 \n\nMis candidatos con mayor afinidad:\n${names}\n\n¿Cuál es el tuyo? ${siteUrl}`;
}

async function shareToPlatform(platform, top3) {
    const text = getShareText(top3);
    const siteUrl = 'https://test-dilema-production.up.railway.app/';

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && navigator.share && navigator.canShare) {
        try {
            const canvas = await captureCard();
            const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
            const file = new File([blob], 'convergencia-electoral.png', { type: 'image/png' });

            let shareText = text;
            if (platform === 'instagram') {
                shareText = "Toma pantalla o comparte tus resultados directamente 😎";
            }

            const shareData = { files: [file], title: 'Convergencia Electoral 2026', text: shareText };
            if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
                return;
            }
        } catch (e) {
            console.warn("Error en Web Share API", e);
            if (e.name !== 'AbortError') captureAndDownload();
            return;
        }
    }

    if (platform === 'native') {
        captureAndDownload();
        setTimeout(() => {
            alert("Tu imagen de resultados ha sido descargada. Compártela con tus amigos.");
            if (navigator.share) {
                navigator.share({ title: 'Convergencia Electoral 2026', text: '¿Cuál es tu candidato?', url: siteUrl }).catch(() => { });
            }
        }, 500);
        return;
    }

    try {
        await captureAndDownload();
        let url = '';

        if (platform === 'twitter') {
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        } else if (platform === 'facebook') {
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
        } else if (platform === 'whatsapp') {
            url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        } else if (platform === 'instagram') {
            setTimeout(() => {
                alert("Tu imagen de resultados ha sido descargada.\n\nSúbela a tu perfil o historia de Instagram y etiqueta a @govlab_unisabana");
            }, 600);
            return;
        }

        if (url) {
            setTimeout(() => {
                const proceed = confirm(`Tu imagen ha sido descargada.\n\nAl continuar se abrirá ${platform}. ¡Asegúrate de adjuntar la imagen descargada a tu publicación!`);
                if (proceed) {
                    window.open(url, '_blank', 'noopener');
                }
            }, 600);
        }

    } catch (e) {
        console.error("Error al compartir", e);
    }
}
// --- Fin compartir ---

let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let cameFromResults = false;
let userName = '';

const landing = document.getElementById('landing');
const nameScreen = document.getElementById('name-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const answersScreen = document.getElementById('answers-screen');

const startBtn = document.getElementById('start-btn');
const nameContinueBtn = document.getElementById('name-continue-btn');
const nameInput = document.getElementById('name-input');
const restartBtn = document.getElementById('restart-btn');
const viewAnswersBtn = document.getElementById('view-answers-btn');
const backToLandingBtn = document.getElementById('back-to-landing-btn');

const feedbackText = document.getElementById('feedback-text');
const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackCharCount = document.getElementById('feedback-char-count');

// Contador de palabras del textarea
feedbackText.addEventListener('input', () => {
    const text = feedbackText.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    feedbackCharCount.textContent = `${words} / 200 palabras`;

    if (words > 200) {
        feedbackCharCount.style.color = 'var(--danger, red)';
        feedbackSubmitBtn.disabled = true;
    } else {
        feedbackCharCount.style.color = '';
        feedbackSubmitBtn.disabled = false;
    }
});

// Enviar comentario
feedbackSubmitBtn.addEventListener('click', async () => {
    const text = feedbackText.value.trim();
    const words = text ? text.split(/\s+/).length : 0;

    if (!text) {
        feedbackStatus.textContent = '⚠️ Por favor escribe algo antes de enviar.';
        feedbackStatus.className = 'feedback-status error';
        return;
    }
    if (words > 200) {
        feedbackStatus.textContent = '⚠️ El comentario no puede exceder las 200 palabras.';
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
        feedbackCharCount.textContent = '0 / 200 palabras';
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
const detailProfile = document.getElementById('detail-profile');
const answersList = document.getElementById('answers-list');

// Load data desde Supabase
async function init() {
    try {
        const headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        };

        // Carga en paralelo: preguntas + candidatos + perfiles de votante
        const [qRes, cRes, vpRes] = await Promise.all([
            fetch(`${SUPABASE_URL}/rest/v1/questions?select=id,text,context,question_options(option_key,option_text)&order=id`, { headers }),
            fetch(`${SUPABASE_URL}/rest/v1/candidates?select=id,name,party,profile,description,campaign_url,photo_url,party_logo_url,profile_pic_url,candidate_answers(question_id,answer)&order=id`, { headers }),
            fetch(`${SUPABASE_URL}/rest/v1/voter_profiles?select=id,name,description,icon_url,type_answers&order=id`, { headers })
        ]);

        if (!qRes.ok || !cRes.ok) throw new Error('Error al cargar datos de Supabase');

        const [rawQuestions, rawCandidates] = await Promise.all([qRes.json(), cRes.json()]);

        // Los perfiles de votante pueden fallar sin romper la app (tabla puede no existir aún)
        let voterProfiles = [];
        if (vpRes.ok) {
            voterProfiles = await vpRes.json();
        } else {
            console.warn('[Supabase] No se pudo cargar voter_profiles:', vpRes.status);
        }

        const questions = rawQuestions.map(q => ({
            id: q.id,
            text: q.text,
            context: q.context,
            options: Object.fromEntries(
                (q.question_options || []).map(o => [o.option_key, o.option_text])
            )
        }));

        function resolveImgUrl(url, folder) {
            if (!url) return null;
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
            // Si ya tiene una barra (subcarpeta), lo dejamos tal cual
            if (url.includes('/')) return url;
            return `${folder}/${url}`;
        }

        const candidates = rawCandidates.map(c => ({
            id: c.id,
            name: c.name,
            party: c.party,
            profile: c.profile,
            description: c.description,
            campaignUrl: c.campaign_url,
            photo: resolveImgUrl(c.photo_url, 'Candidatos'),
            partyLogo: resolveImgUrl(c.party_logo_url, 'Partidos'),
            profilePic: resolveImgUrl(c.profile_pic_url, 'Íconos'),
            answers: Object.fromEntries(
                (c.candidate_answers || []).map(a => [String(a.question_id), a.answer])
            )
        }));

        quizData = { questions, candidates, voterProfiles };
        console.log(`[Supabase] Datos cargados: ${questions.length} preguntas, ${candidates.length} candidatos, ${voterProfiles.length} perfiles de votante`);
    } catch (error) {
        console.error('[Supabase] Error cargando datos:', error);
        alert('Error al cargar los datos. Por favor recarga la página.');
    }
}

function showNameScreen() {
    landing.classList.add('hidden');
    answersScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    nameScreen.classList.remove('hidden');
    nameScreen.classList.add('animate-in');
    nameInput.value = '';
    nameContinueBtn.disabled = true;
    setTimeout(() => nameInput.focus(), 300);
}

function startQuiz() {
    nameScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('animate-in');
    currentQuestionIndex = 0;
    userAnswers = {};
    showQuestion();
}

// Habilitar botón Continuar solo si hay nombre
nameInput.addEventListener('input', () => {
    nameContinueBtn.disabled = nameInput.value.trim().length === 0;
});

// Presionar Enter en el input también continúa
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && nameInput.value.trim().length > 0) {
        userName = nameInput.value.trim();
        startQuiz();
    }
});

nameContinueBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    startQuiz();
});

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
        const profilePath = candidate.profilePic ? `<img src="${candidate.profilePic}" style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 6px;">` : '';
        card.innerHTML = `
            <img src="${candidate.photo || 'https://via.placeholder.com/80'}" alt="${candidate.name}">
            <h3>${candidate.name}</h3>
            <p style="margin-bottom: 8px;">${candidate.party}</p>
            <div class="profile-tag profile-${(candidate.profile || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\/_]+/g, '-')}">${profilePath}${(candidate.profile || '').replace(/_/g, ' ')}</div>
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

    const detailPhotoPath = candidate.photo || 'https://via.placeholder.com/150?text=Candidato';
    const detailPartyPath = candidate.partyLogo || 'https://via.placeholder.com/60?text=P';
    detailPhoto.src = detailPhotoPath;
    detailName.innerText = candidate.name;
    detailParty.innerHTML = `<img src="${detailPartyPath}" style="height: 24px; vertical-align: middle; margin-right: 8px;"> ${candidate.party}`;
    detailProfile.innerHTML = '';

    const campaignBtn = document.getElementById('campaign-url-btn');
    if (candidate.campaignUrl) {
        campaignBtn.href = candidate.campaignUrl;
        campaignBtn.classList.remove('hidden');
    } else {
        campaignBtn.href = `https://www.google.com/search?q=${encodeURIComponent(candidate.name + ' candidato presidencia Colombia 2026')}`;
        campaignBtn.classList.remove('hidden');
    }

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

    // Calcular y mostrar la afinidad del candidato en los ejes
    if (quizData.voterProfiles && quizData.voterProfiles.length > 0) {
        const candidateProfiles = rankVoterProfiles(candidate.answers, quizData.voterProfiles);
        let profilesHtml = '<div style="margin: 2rem 0 1.5rem;">';

        // Show the top matched profile info briefly
        const topProfile = candidateProfiles[0];
        const meta = getProfileMeta(topProfile.profile.name);
        const iconSvg = getProfileIconSVG(topProfile.profile.name, meta.color, 24);
        profilesHtml += `<div style="display:flex; align-items:center; gap:0.5rem; margin-bottom: 1rem;">
            <span style="display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; background:${meta.color}18; color:${meta.color};">${iconSvg}</span>
            <span style="font-weight:600; color:var(--text-main); font-size:1.05rem;">Perfil de votante más afín: <span style="color:${meta.color};">${topProfile.profile.name}</span></span>
        </div>`;

        profilesHtml += generateAxesHtml(candidate.answers, candidateProfiles, false);
        profilesHtml += '</div><h4 style="margin-bottom: 1rem; color: var(--text-main); border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">Respuestas al cuestionario:</h4>';
        answersList.innerHTML += profilesHtml;
    }


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
    const question = quizData.questions[currentQuestionIndex];

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

async function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    resultsScreen.classList.add('animate-in');

    // Personalizar título con el nombre del usuario
    const resultsTitle = document.getElementById('results-title');
    const resultsSubtitle = document.getElementById('results-subtitle');
    if (userName) {
        resultsTitle.textContent = `${userName}, estos son tus resultados`;
        resultsSubtitle.textContent = `Estos son los candidatos con mayor afinidad a tus respuestas:`;
    } else {
        resultsTitle.textContent = 'Tus Resultados';
        resultsSubtitle.textContent = 'Este es el ranking de afinidad con los candidatos basado en tus respuestas:';
    }

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

    candidates.sort((a, b) => b.percentage - a.percentage);

    // Asignar perfil de votante
    const voterProfiles = quizData.voterProfiles || [];
    const normalizedAnswers = Object.fromEntries(Object.entries(userAnswers).map(([k, v]) => [String(k), v]));
    const rankedProfiles = rankVoterProfiles(normalizedAnswers, voterProfiles);
    const assignedProfile = rankedProfiles.length > 0 ? rankedProfiles[0].profile : null;

    // Mostrar perfil del votante
    renderVoterProfileCard(assignedProfile, rankedProfiles, normalizedAnswers);

    // Deshabilitar botón de comentario hasta que el guardado termine
    const fbBtn = document.getElementById('feedback-submit-btn');
    if (fbBtn) {
        fbBtn.disabled = true;
        fbBtn.textContent = 'Guardando...';
    }

    // Guardar en Supabase (sin bloquear la UI)
    saveResponse(userAnswers, candidates, assignedProfile ? assignedProfile.id : null);

    // Renderizar candidatos CON porcentajes
    resultsList.innerHTML = '';
    candidates.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card rank-only';
        card.style.cursor = 'pointer';
        card.onclick = () => showCandidateDetail(c, true);

        const photoPath = c.photo || 'https://via.placeholder.com/150?text=Candidato';
        const partyPath = c.partyLogo || 'https://via.placeholder.com/60?text=P';

        card.innerHTML = `
            <div class="rank-number">#${index + 1}</div>
            <div class="candidate-image-container">
                <img src="${photoPath}" alt="${c.name}" class="candidate-photo">
                <img src="${partyPath}" alt="${c.party}" class="party-logo-mini">
            </div>
            <div class="candidate-info">
                <div class="candidate-name">${c.name}</div>
                <div class="candidate-party" style="display:flex; align-items:center; gap:0.5rem;">
                    ${c.party}
                    <span style="font-size:0.85rem; font-weight:700; color:var(--primary); margin-left:auto;">${c.percentage}%</span>
                </div>
                <div style="height:5px; background:rgba(30,59,112,0.1); border-radius:99px; margin:0.4rem 0 0.3rem; overflow:hidden;">
                    <div style="height:100%; width:${c.percentage}%; background:var(--primary); border-radius:99px; transition:width 0.6s ease;"></div>
                </div>
                <div class="know-answers-link">Conoce las respuestas de este candidato</div>
            </div>
        `;
        resultsList.appendChild(card);
    });

    // Conectar botones de compartir
    const top3 = candidates.slice(0, 3);
    populateShareCard(top3, assignedProfile);
    document.getElementById('btn-download').onclick = () => captureAndDownload();
    document.getElementById('btn-share-native').onclick = () => shareToPlatform('native', top3);
    document.getElementById('btn-twitter').onclick = () => shareToPlatform('twitter', top3);
    document.getElementById('btn-facebook').onclick = () => shareToPlatform('facebook', top3);
    document.getElementById('btn-whatsapp').onclick = () => shareToPlatform('whatsapp', top3);
    document.getElementById('btn-instagram').onclick = () => shareToPlatform('instagram', top3);
}

function generateAxesHtml(targetAnswers, rankedProfiles, isUser = true) {
    if (!targetAnswers || !rankedProfiles || rankedProfiles.length === 0) return '';
    const topProfile = rankedProfiles[0].profile;
    const topMeta = getProfileMeta(topProfile.name);

    // Reverse so the top profile is rendered last (on top)
    const sortedRenderProfiles = [...rankedProfiles].reverse();
    const title = isUser ? 'Tu posición vs. los perfiles' : 'Afinidad del candidato vs. los perfiles';
    const targetLabel = isUser ? 'Tú' : 'Candidato';

    const allProfilesLegend = sortedRenderProfiles.map(rp => {
        const pMeta = getProfileMeta(rp.profile.name);
        return `<span style="display:flex; align-items:center; gap:3px;"><div style="width:7px;height:7px;border-radius:50%;background:${pMeta.color};"></div><span style="font-size:0.6rem;opacity:0.8;">${rp.profile.name.replace('El ', '')}</span></span>`;
    }).join('');

    return `
    <div class="axes-container" style="margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(30,59,112,0.1);">
        <div style="margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.5rem;">
                <h4 style="margin:0; color: var(--text-main); font-size: 0.95rem;">${title}</h4>
                <div style="display:flex; gap:0.6rem; font-size:0.75rem; color:var(--text-muted); font-weight:600;">
                    <span style="display:flex; align-items:center; gap:4px;"><div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:13px solid #1e3b70;filter:drop-shadow(0 0 2px #1e3b7088);"></div>${targetLabel}</span>
                    <span style="display:flex; align-items:center; gap:4px;"><div style="width:10px;height:10px;border-radius:50%;background:${topMeta.color}; border: 1px solid rgba(0,0,0,0.1);"></div>Perfil Afín</span>
                </div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem 0.6rem; margin-top:0.4rem; padding: 0.4rem; background:rgba(30,59,112,0.03); border-radius:8px;">
                ${allProfilesLegend}
            </div>
        </div>
        ${AXES.map(axis => {
        const uScore = calculateAxisScore(targetAnswers, axis.qs);

        const profilesDots = sortedRenderProfiles.map(rp => {
            const pScore = calculateAxisScore(rp.profile.type_answers || {}, axis.qs);
            const pMeta = getProfileMeta(rp.profile.name);
            const isTop = (rp.profile.name === topProfile.name);
            const size = isTop ? 14 : 10;
            const opacity = isTop ? 1 : 0.6;
            const zIndex = isTop ? 5 : 1;
            const border = isTop ? '1px solid rgba(0,0,0,0.2)' : 'none';
            return `<div style="position: absolute; top: 50%; left: ${pScore}%; transform: translate(-50%, -50%); width: ${size}px; height: ${size}px; border-radius: 50%; background: ${pMeta.color}; opacity: ${opacity}; border: ${border}; z-index: ${zIndex};" title="${rp.profile.name}"></div>`;
        }).join('');

        return `
            <div class="axis-row" style="margin-bottom: 1.2rem;">
                <div style="display: flex; justify-content: center; font-size: 0.85rem; color: var(--text-main); font-weight:600; margin-bottom: 4px;">
                    <span>${axis.name}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 6px;">
                    <span>${axis.labelLeft}</span>
                    <span>${axis.labelRight}</span>
                </div>
                <div style="position: relative; height: 8px; background: rgba(30,59,112,0.06); border-radius: 99px;">
                    ${profilesDots}
                    <div style="position: absolute; top: 50%; left: ${uScore}%; transform: translate(-50%, -50%) translateY(-2px); width: 0; height: 0; border-left: 11px solid transparent; border-right: 11px solid transparent; border-top: 20px solid ${topMeta.color}; border-radius: 0; z-index: 10; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));" title="${targetLabel}"></div>
                </div>
            </div>`;
    }).join('')}
    </div>`;
}

function renderVoterProfileCard(profile, rankedProfiles, userAnswers) {
    const section = document.getElementById('voter-profile-section');
    if (!section) return;

    if (!profile) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    const meta = getProfileMeta(profile.name);
    const iconSvg = getProfileIconSVG(profile.name, meta.color, 44);

    let axesHtml = '';
    if (userAnswers) {
        axesHtml = generateAxesHtml(userAnswers, rankedProfiles, true);
    }

    section.innerHTML = `
        <h3 class="voter-profile-heading">Tu perfil de votante</h3>
        <div class="voter-profile-card animate-in" id="voter-profile-card-btn"
             style="--profile-color: ${meta.color}; --profile-bg: ${meta.bg}; cursor: default;">
            
            <div class="voter-profile-content" style="cursor: pointer;" title="Haz clic para ver el ranking de todos los perfiles">
                <div class="voter-profile-icon-placeholder" style="background: ${meta.bg}; border-color: ${meta.color};">${iconSvg}</div>
                <div class="voter-profile-info">
                    <div class="voter-profile-name" style="color: ${meta.color};">${profile.name}</div>
                    ${profile.description ? `<div class="voter-profile-description">${profile.description}</div>` : ''}
                </div>
                <div class="voter-profile-chevron" style="align-self: center;">Tipos de perfil de votante ›</div>
            </div>
            
            ${axesHtml}
            
        </div>
    `;

    document.querySelector('.voter-profile-content').addEventListener('click', () => {
        showProfilesModal(rankedProfiles);
    });
}

function showProfilesModal(rankedProfiles) {
    const existing = document.getElementById('profiles-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'profiles-modal';
    modal.className = 'profiles-modal-overlay';
    modal.innerHTML = `
        <div class="profiles-modal-box animate-in">
            <div class="profiles-modal-header">
                <h3 class="profiles-modal-title">Ranking de perfiles de votante</h3>
                <button class="profiles-modal-close" id="profiles-modal-close">✕</button>
            </div>
            <p class="profiles-modal-subtitle">Similitud de tus respuestas con cada perfil</p>
            <div class="profiles-modal-list">
                ${rankedProfiles.map((item, i) => {
        const meta = getProfileMeta(item.profile.name);
        const iconSvg = getProfileIconSVG(item.profile.name, meta.color, 32);
        const rowBg = meta.color + '18'; // ~9% opacity — always a diluted version of the border color
        const desc = item.profile.description || '';
        return `
                    <div class="profile-rank-row" style="--profile-color: ${meta.color}; background: ${rowBg}; border-color: ${meta.color}40;">
                        <span class="profile-rank-pos">#${i + 1}</span>
                        <span class="profile-rank-icon">${iconSvg}</span>
                        <div class="profile-rank-info">
                            <span class="profile-rank-name" style="color: ${meta.color};">${item.profile.name}</span>
                            ${desc ? `<span class="profile-rank-desc">${desc}</span>` : ''}
                            <div class="profile-rank-bar-bg">
                                <div class="profile-rank-bar-fill" style="width: ${item.percentage}%; background: ${meta.color};"></div>
                            </div>
                        </div>
                        <span class="profile-rank-pct" style="color: ${meta.color};">${item.percentage}%</span>
                    </div>`;
    }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('profiles-modal-close').addEventListener('click', closeProfilesModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeProfilesModal(); });
    document.addEventListener('keydown', escCloseModal);
}

function escCloseModal(e) {
    if (e.key === 'Escape') closeProfilesModal();
}

function closeProfilesModal() {
    const modal = document.getElementById('profiles-modal');
    if (modal) modal.remove();
    document.removeEventListener('keydown', escCloseModal);
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

startBtn.onclick = showNameScreen;
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
    landing.classList.add('animate-in');
};

init();
