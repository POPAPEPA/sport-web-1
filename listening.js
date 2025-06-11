 const words = [
    { english: "apple", russian: "яблоко" },
    { english: "book", russian: "книга" },
    { english: "computer", russian: "компьютер" },
    { english: "dog", russian: "собака" },
    { english: "elephant", russian: "слон" },
    { english: "flower", russian: "цветок" },
    { english: "garden", russian: "сад" },
    { english: "house", russian: "дом" },
    { english: "internet", russian: "интернет" },
    { english: "journey", russian: "путешествие" },
    { english: "kangaroo", russian: "кенгуру" },
    { english: "language", russian: "язык" },
    { english: "mountain", russian: "гора" },
    { english: "night", russian: "ночь" },
    { english: "ocean", russian: "океан" },
    { english: "pencil", russian: "карандаш" },
    { english: "question", russian: "вопрос" },
    { english: "river", russian: "река" },
    { english: "sun", russian: "солнце" },
    { english: "tree", russian: "дерево" }
];

const playBtn = document.getElementById('playBtn');
const playCountElement = document.getElementById('playCount');
const wordInput = document.getElementById('wordInput');
const message = document.getElementById('message');
const hintContainer = document.getElementById('hintContainer');
const optionsContainer = document.getElementById('optionsContainer');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const correctCountElement = document.getElementById('correctCount');
const totalCountElement = document.getElementById('totalCount');

let score = 0;
let streak = 0;
let correctCount = 0;
let totalCount = 0;
let currentWord = null;
let usedWords = [];
let playCount = 3;
let gameActive = true;

function initGame() {
    if (!('speechSynthesis' in window)) {
        message.textContent = "Ваш браузер не поддерживает синтез речи. Пожалуйста, используйте Chrome, Edge или Safari.";
        playBtn.style.display = 'none';
        return;
    }
    
    playBtn.addEventListener('click', playWord);
    checkBtn.addEventListener('click', checkAnswer);
    nextBtn.addEventListener('click', nextWord);
    
    wordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    loadProgress();
    
    // Начало игры
    nextWord();
}

function nextWord() {
    resetRound();
    
    let availableWords = words.filter(word => !usedWords.includes(word));
    
    if (availableWords.length === 0) {
        
        usedWords = [];
        availableWords = [...words];
        message.textContent = "Вы прошли все слова! Начинаем заново.";
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];
    usedWords.push(currentWord);
    
    totalCount++;
    totalCountElement.textContent = totalCount;
    
    wordInput.value = '';
    hintContainer.textContent = "Подсказка появится здесь после первой попытки";
    message.textContent = "Слушайте внимательно!";
    playCount = 3;
    playCountElement.textContent = `Осталось попыток прослушать: ${playCount}`;
    playBtn.classList.remove('playing');

    generateOptions();
}

function playWord() {
    if (!gameActive || playCount <= 0) return;
    
    playCount--;
    playCountElement.textContent = `Осталось попыток прослушать: ${playCount}`;
    
    playBtn.classList.add('playing');
    
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; 
    utterance.pitch = 1.0; 

    utterance.volume = 1;
    
    utterance.onend = function() {
        playBtn.classList.remove('playing');
    };
    
    speechSynthesis.speak(utterance);
}

function checkAnswer() {
    if (!gameActive) return;
    
    const userAnswer = wordInput.value.trim().toLowerCase();
    
    if (!userAnswer) {
        message.textContent = "Пожалуйста, введите слово или выберите вариант";
        return;
    }
    
    gameActive = false;
    
    if (userAnswer === currentWord.english) {
        message.textContent = 'Правильно!';
        message.style.color = '#00b09b';
        
        score += 10 + streak * 5;
        streak++;
        correctCount++;
        
        hintContainer.innerHTML = `<strong>${currentWord.english}</strong> - ${currentWord.russian}`;
    } else {
        message.textContent = `Неправильно! Правильный ответ: ${currentWord.english}`;
        message.style.color = '#ff416c';
        streak = 0;
        
        hintContainer.innerHTML = `<strong>${currentWord.english}</strong> - ${currentWord.russian}`;
    }
    
    updateStats();
}

function generateOptions() {
    optionsContainer.innerHTML = '';
    
    const options = [currentWord.english];
    
    while (options.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)].english;
        if (!options.includes(randomWord) && randomWord !== currentWord.english) {
            options.push(randomWord);
        }
    }
    
    shuffleArray(options);
    
    options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => {
            wordInput.value = option;
        });
        optionsContainer.appendChild(button);
    });
}

function resetRound() {
    gameActive = true;
    wordInput.value = '';
    hintContainer.textContent = "Подсказка появится здесь после первой попытки";
    message.textContent = "Слушайте внимательно!";
    message.style.color = '#4361ee';
    playCount = 3;
    playCountElement.textContent = `Осталось попыток прослушать: ${playCount}`;
}

function updateStats() {
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    correctCountElement.textContent = correctCount;
    
    saveProgress();
}

function saveProgress() {
    const progressData = {
        score: score,
        streak: streak,
        correctCount: correctCount,
        totalCount: totalCount,
        usedWords: usedWords.map(word => word.english)
    };
    
    localStorage.setItem('audioChallengeProgress', JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('audioChallengeProgress');
    
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        score = progressData.score || 0;
        streak = progressData.streak || 0;
        correctCount = progressData.correctCount || 0;
        totalCount = progressData.totalCount || 0;
        
        if (progressData.usedWords) {
            usedWords = progressData.usedWords.map(eng => {
                return words.find(word => word.english === eng);
            }).filter(word => word !== undefined);
        }
        
        updateStats();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.addEventListener('DOMContentLoaded', initGame);