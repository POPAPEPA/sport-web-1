// gallows.js - Скрипт для игры Виселица
const words = {
  фрукты: ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango'],
  животные: ['tiger', 'elephant', 'lion', 'giraffe', 'zebra', 'penguin'],
  профессии: ['doctor', 'teacher', 'engineer', 'artist', 'chef', 'pilot'],
  цвета: ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
};

let selectedWord = '';
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

function startGame() {
  const category = document.getElementById('categorySelect').value;
  if (!category || !words[category]) {
    alert("Пожалуйста, выберите тему!");
    return;
  }

  selectedWord = words[category][Math.floor(Math.random() * words[category].length)];
  guessedLetters = [];
  mistakes = 0;

  document.getElementById('mistakes').textContent = mistakes;
  document.getElementById('resultMessage').textContent = '';
  document.getElementById('gameArea').classList.remove('hidden');

  renderWord();
  renderButtons();

  // Сбросить части тела
  document.querySelectorAll('.part').forEach(p => p.style.display = 'none');
}

function renderWord() {
  const display = selectedWord
    .split('')
    .map(l => (guessedLetters.includes(l) ? l : '_'))
    .join(' ');
  document.getElementById('wordDisplay').textContent = display;

  if (!display.includes('_')) {
    document.getElementById('resultMessage').textContent = "🎉 Победа!";
    document.getElementById('resultMessage').style.color = "#4CAF50";
    disableAllButtons();
  }
}

function renderButtons() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const container = document.getElementById('letters');
  container.innerHTML = '';
  
  for (const letter of alphabet) {
    const btn = document.createElement('button');
    btn.textContent = letter.toUpperCase();
    btn.onclick = () => handleGuess(letter, btn);
    container.appendChild(btn);
  }
}

function handleGuess(letter, button) {
  button.disabled = true;
  
  if (selectedWord.includes(letter)) {
    button.style.background = '#4CAF50';
    button.style.color = 'white';
    guessedLetters.push(letter);
    renderWord();
  } else {
    button.style.background = '#F44336';
    button.style.color = 'white';
    mistakes++;
    document.getElementById('mistakes').textContent = mistakes;
    showHangmanPart(mistakes);

    if (mistakes >= maxMistakes) {
      document.getElementById('resultMessage').textContent = `💀 Игра окончена! Слово: ${selectedWord}`;
      document.getElementById('resultMessage').style.color = "#F44336";
      disableAllButtons();
    }
  }
}

function showHangmanPart(mistakeCount) {
  const parts = document.querySelectorAll('.part');
  if (mistakeCount <= parts.length) {
    parts[mistakeCount - 1].style.display = 'block';
  }
}

function disableAllButtons() {
  document.querySelectorAll('#letters button').forEach(btn => {
    btn.disabled = true;
  });
}