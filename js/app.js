/**
 * THE SPORTS ARENA - Lògica de Programació Professional
 */
//** PREGUNTES DEL QUIZ */
const quizData = {
    A: [ // CATEGORIA A: JOCS OLÍMPICS
        { q: "Qui té el rècord de més medalles d'or olímpiques?", a: ["Michael Phelps", "Usain Bolt", "Larisa Latynina"], c: 0 },
        { q: "A quina ciutat es van celebrar els Jocs de 1992?", a: ["Seül", "Barcelona", "Atenes"], c: 1 },
        { q: "Cada quants anys es celebren els Jocs Olímpics d'estiu?", a: ["2 anys", "4 anys", "6 anys"], c: 1 },
        { q: "Quin d'aquests països ha guanyat més medalles totals?", a: ["Xina", "Rússia", "Estats Units"], c: 2 },
        { q: "On es van inventar els Jocs Olímpics originals?", a: ["Grècia", "Itàlia", "Egipte"], c: 0 },
        { q: "Quin atleta té el rècord mundial de 100m i 200m?", a: ["Tyson Gay", "Yohan Blake", "Usain Bolt"], c: 2 },
        { q: "Quants anells formen la bandera olímpica?", a: ["5", "6", "4"], c: 0 },
        { q: "Quin esport es juga amb una raqueta i un volant?", a: ["Tennis de taula", "Bàdminton", "Squash"], c: 1 },
        { q: "Quina ciutat acollirà els Jocs Olímpics de 2024?", a: ["Los Angeles", "Tòquio", "París"], c: 2 },
        { q: "Quin metall forma la medalla del primer classificat?", a: ["Plata", "Or", "Bronze"], c: 1 }
    ],
    B: [ // CATEGORIA B: MÓN GAMER
        { q: "Quin equip ha guanyat més mundials (Worlds) de LoL?", a: ["G2 Esports", "T1", "Fnatic"], c: 1 },
        { q: "Quin és el videojoc més venut de la història?", a: ["Minecraft", "Tetris", "GTA V"], c: 0 },
        { q: "Com es diu el mapa principal de League of Legends?", a: ["Dust II", "Miramar", "L'Esquerda de l'Invocador"], c: 2 },
        { q: "Quin personatge és la cara oficial de Nintendo?", a: ["Link", "Mario", "Pikachu"], c: 1 },
        { q: "Quin d'aquests jocs és un 'Battle Royale'?", a: ["Fortnite", "Valorant", "FIFA"], c: 0 },
        { q: "A quina saga pertany el personatge 'Master Chief'?", a: ["Halo", "Doom", "Mass Effect"], c: 0 },
        { q: "Quin d'aquests és un joc de Valve?", a: ["Overwatch", "Counter-Strike", "League of Legends"], c: 1 },
        { q: "Com es diu la plataforma de streaming líder per a gamers?", a: ["Twitch", "Mixer", "Facebook Gaming"], c: 0 },
        { q: "Quin any es va llançar la primera PlayStation?", a: ["1990", "1994", "2000"], c: 1 },
        { q: "Quin d'aquests jocs és del gènere 'Soulslike'?", a: ["Elden Ring", "The Sims", "Candy Crush"], c: 0 }
    ]
};

let currentQuestions = [];
let questionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userName = "";
let userHistory = []; // NOU: Historial de respostes

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showScreen(screenId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function checkUser() {
    const input = document.getElementById('username');
    userName = input.value.trim();
    if (userName.length < 2) {
        alert("Si us plau, introdueix el teu nom per jugar.");
        return;
    }
    document.getElementById('welcome-user').innerText = `Hola, ${userName}!`;
    showScreen('screen-select');
}

function loadQuiz(category) {
    let allQuestions = [...quizData[category]];
    shuffleArray(allQuestions);
    currentQuestions = allQuestions.slice(0, 6);
    questionIndex = 0;
    score = 0;
    userHistory = []; // NOU: Reiniciar historial
    showScreen('screen-game');
    renderQuestion();
}

function renderQuestion() {
    if (questionIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    const data = currentQuestions[questionIndex];
    document.getElementById('question-text').innerText = data.q;
    const currentNum = questionIndex + 1;
    document.getElementById('progress').innerText = `${currentNum < 10 ? '0' + currentNum : currentNum} / 06`;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    data.a.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option;
        btn.onclick = () => handleAnswer(i);
        container.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        }
    }, 1000);
}

function handleAnswer(selectedIndex) {
    clearInterval(timer);
    const currentQ = currentQuestions[questionIndex];
    const isCorrect = selectedIndex === currentQ.c;
    
    // NOU: Guardar resposta al historial
    userHistory.push({
        question: currentQ.q,
        userAnswer: selectedIndex === -1 ? "Temps esgotat ⏱️" : currentQ.a[selectedIndex],
        correctAnswer: currentQ.a[currentQ.c],
        correct: isCorrect
    });

    if (isCorrect) score++;
    nextQuestion();
}

function nextQuestion() {
    // NOU: Validar si s'ha guardat la resposta (per si el temps s'esgota)
    if(userHistory.length <= questionIndex) {
        const currentQ = currentQuestions[questionIndex];
        userHistory.push({
            question: currentQ.q,
            userAnswer: "Temps esgotat ⏱️",
            correctAnswer: currentQ.a[currentQ.c],
            correct: false
        });
    }
    questionIndex++;
    setTimeout(renderQuestion, 200);
}

function showResults() {
    clearInterval(timer);
    showScreen('screen-results');
    document.getElementById('final-score').innerText = score;
}

// NOU: Funció per mostrar detalls
function showDetailedResults() {
    const container = document.getElementById('details-list');
    container.innerHTML = '';
    userHistory.forEach((item, index) => {
        const detailItem = document.createElement('div');
        detailItem.className = `detail-item ${item.correct ? 'correct-border' : 'wrong-border'}`;
        detailItem.innerHTML = `
            <p style="margin: 0; font-weight: bold; color: var(--accent);">#${index + 1}: ${item.question}</p>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem;">
                Tu: <span style="color: ${item.correct ? '#2ecc71' : '#ff4757'}">${item.userAnswer}</span><br>
                ${!item.correct ? `Correcta: <span style="color: #2ecc71">${item.correctAnswer}</span>` : ''}
            </p>
            <hr style="opacity: 0.1; margin: 10px 0;">
        `;
        container.appendChild(detailItem);
    });
    showScreen('screen-detail');
}

function restart() {
    showScreen('screen-select');
}

function exit() {
    location.reload();
}
