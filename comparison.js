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

// Элементы DOM
const wordDisplay = document.getElementById('wordDisplay');
const optionsContainer = document.getElementById('optionsContainer');
const message = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const hintBtn = document.getElementById('hintBtn');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const correctCountElement = document.getElementById('correctCount');
const totalCountElement = document.getElementById('totalCount');
const progress = document.getElementById('progress');

// Переменные состояния игры
let score = 0;
let streak = 0;
let correctCount = 0;
let totalCount = 0;
let currentWord = null;
let usedWords = [];
let gameActive = true;

// Инициализация игры
function initGame() {
    nextBtn.addEventListener('click', nextWord);
    hintBtn.addEventListener('click', showHint);
    
    // Загрузка сохранённого прогресса
    loadProgress();
    
    // Начало игры
    nextWord();
}

// Переход к следующему слову
function nextWord() {
    message.textContent = '';
    gameActive = true;
    
    // Выбор случайного слова, которое еще не использовалось
    let availableWords = words.filter(word => !usedWords.includes(word));
    
    if (availableWords.length === 0) {
        // Если все слова использованы, сбросим использованные слова
        usedWords = [];
        availableWords = [...words];
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];
    usedWords.push(currentWord);
    
    // Отображение слова
    wordDisplay.textContent = currentWord.english;
    
    // Генерация вариантов ответов
    generateOptions();
    
    // Обновление счётчиков
    totalCount++;
    totalCountElement.textContent = totalCount;
    updateProgress();
}

// Генерация вариантов ответов
function generateOptions() {
    optionsContainer.innerHTML = '';
    
    // Создаем массив с правильным ответом и тремя случайными неправильными
    const options = [currentWord.russian];
    
    while (options.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)].russian;
        if (!options.includes(randomWord) && randomWord !== currentWord.russian) {
            options.push(randomWord);
        }
    }
    
    // Перемешиваем варианты
    shuffleArray(options);
    
    // Создаем кнопки для каждого варианта
    options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Проверка ответа
function checkAnswer(selected) {
    if (!gameActive) return;
    
    gameActive = false;
    const options = document.querySelectorAll('.option');
    let correctOption = null;
    
    options.forEach(option => {
        if (option.textContent === currentWord.russian) {
            option.classList.add('correct');
            correctOption = option;
        }
        
        if (option.textContent === selected && selected !== currentWord.russian) {
            option.classList.add('incorrect');
        }
        
        option.style.pointerEvents = 'none';
    });
    
    if (selected === currentWord.russian) {
        // Правильный ответ
        message.textContent = 'Правильно!';
        score += 10 + streak * 5;
        streak++;
        correctCount++;
        
        // Анимация для правильного ответа
        correctOption.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ], {
            duration: 500,
            iterations: 2
        });
    } else {
        // Неправильный ответ
        message.textContent = `Неправильно! Правильный ответ: ${currentWord.russian}`;
        streak = 0;
    }
    
    // Обновление статистики
    updateStats();
}

// Показать подсказку
function showHint() {
    if (!gameActive) return;
    
    message.textContent = `Первая буква: ${currentWord.russian[0]}`;
    score = Math.max(0, score - 5);
    updateStats();
}

// Обновление статистики
function updateStats() {
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    correctCountElement.textContent = correctCount;
    
    // Сохранение прогресса
    saveProgress();
}

// Обновление прогресс-бара
function updateProgress() {
    const percentage = Math.min(100, Math.floor((usedWords.length / words.length) * 100));
    progress.style.width = `${percentage}%`;
}

// Сохранение прогресса
function saveProgress() {
    const progressData = {
        score: score,
        streak: streak,
        correctCount: correctCount,
        totalCount: totalCount,
        usedWords: usedWords.map(word => word.english)
    };
    
    localStorage.setItem('wordMasterProgress', JSON.stringify(progressData));
}

// Загрузка прогресса
function loadProgress() {
    const savedProgress = localStorage.getItem('wordMasterProgress');
    
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        score = progressData.score || 0;
        streak = progressData.streak || 0;
        correctCount = progressData.correctCount || 0;
        totalCount = progressData.totalCount || 0;
        
        // Восстановление использованных слов
        if (progressData.usedWords) {
            usedWords = progressData.usedWords.map(eng => {
                return words.find(word => word.english === eng);
            }).filter(word => word !== undefined);
        }
        
        updateStats();
    }
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Запуск игры при загрузке страницы
window.addEventListener('DOMContentLoaded', initGame);