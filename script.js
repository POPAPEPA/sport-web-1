document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Подсветка раздела при переходе
            targetElement.classList.add('highlighted');
            setTimeout(() => {
                targetElement.classList.remove('highlighted');
            }, 1500);
        }
    });
});

// Обновление активной ссылки в навигации
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.time-group');
    const navLinks = document.querySelectorAll('.grammar-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.word-set, .feature');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, 150 * index);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.word-set');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, 100 * index);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.word-set, .feature');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, 150 * index);
    });
});
function speakWord(word) {
    if ('speechSynthesis' in window) {
        // Останавливаем текущее произношение
        speechSynthesis.cancel();
        
        // Создаем utterance
        const utterance = new SpeechSynthesisUtterance(word);
        
        // Настройки голоса
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1;
        
        // Добавляем анимацию к кнопке
        const button = document.querySelector(`.speak-button[data-word="${word}"]`);
        button.classList.add('speaking');
        
        // Обработчик окончания речи
        utterance.onend = () => {
            button.classList.remove('speaking');
        };
        
        // Произносим слово
        speechSynthesis.speak(utterance);
    } else {
        alert('Ваш браузер не поддерживает функцию голосового воспроизведения. Пожалуйста, используйте современный браузер.');
    }
}

// Обработчик событий для кнопок звука
document.addEventListener('DOMContentLoaded', () => {
    const speakButtons = document.querySelectorAll('.speak-button');
    
    speakButtons.forEach(button => {
        button.addEventListener('click', () => {
            const word = button.getAttribute('data-word');
            speakWord(word);
        });
    });
});
