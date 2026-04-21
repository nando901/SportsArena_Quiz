/**
 * THE SPORTS ARENA - Lògica de Programació Professional
 * - 10 preguntes per categoria (total 20)
 * - Selecció aleatòria de 6 preguntes per partida
 * - Algorisme de barreja Fisher-Yates
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

/**
 * Funció per barrejar arrays (Algorisme Fisher-Yates)
 * Això assegura que l'ordre sigui totalment aleatori
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Gestiona el canvi visual de pantalles
 */
function showScreen(screenId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

/**
 * Valida l'usuari i passa a la selecció de categoria
 */
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

/**
 * Prepara la partida: tria 6 preguntes aleatòries de la categoria
 */
function loadQuiz(category) {
    // Copiem les preguntes de la categoria escollida
    let allQuestions = [...quizData[category]];
    
    // Barregem totes les preguntes (10) i en triem només les primeres 6
    shuffleArray(allQuestions);
    currentQuestions = allQuestions.slice(0, 6);

    questionIndex = 0;
    score = 0;
    showScreen('screen-game');
    renderQuestion();
}

/**
 * Mostra la pregunta i les seves opcions
 */
function renderQuestion() {
    if (questionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const data = currentQuestions[questionIndex];
    document.getElementById('question-text').innerText = data.q;
    
    // Actualitzem el comptador visual (Ex: 01 / 06)
    const currentNum = questionIndex + 1;
    document.getElementById('progress').innerText = `${currentNum < 10 ? '0' + currentNum : currentNum} / 06`;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    // Creem els botons de les respostes
    data.a.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option;
        btn.onclick = () => handleAnswer(i);
        container.appendChild(btn);
    });

    startTimer();
}

/**
 * Control del temporitzador de 15 segons
 */
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Pasa a la siguiente si el tiempo se agota
        }
    }, 1000);
}

/**
 * Comprova si la resposta premuda és la correcta (index c)
 */
function handleAnswer(selectedIndex) {
    clearInterval(timer);
    if (selectedIndex === currentQuestions[questionIndex].c) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    questionIndex++;
    // Petita pausa per feedback visual (opcional)
    setTimeout(renderQuestion, 200);
}

/**
 * Pantalla final amb la puntuació
 */
function showResults() {
    clearInterval(timer);
    showScreen('screen-results');
    document.getElementById('final-score').innerText = score;
}

/**
 * Torna a la selecció de categoria
 */
function restart() {
    showScreen('screen-select');
}

/**
 * Surt del joc (torna a l'inici)
 */
function exit() {
    location.reload();
}
