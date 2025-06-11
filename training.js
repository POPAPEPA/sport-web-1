document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.training-tab-btn');
    const tabContents = document.querySelectorAll('.training-tab-content');
    const topicItems = document.querySelectorAll('.training-topic-item');
    const exercisesContainers = {
        easy: document.getElementById('easy-exercises'),
        medium: document.getElementById('medium-exercises'),
        hard: document.getElementById('hard-exercises')
    };
    
    // Текущее состояние
    let currentLevel = 'easy';
    let currentTopic = null;
    let currentExerciseIndex = 0;
    
    // Упражнения для каждой темы
    const exercises = {
        "present-simple": [
            "She usually ______ (drink) coffee in the morning.",
            "They ______ (not/like) spicy food.",
            "______ he ______ (play) tennis every weekend?"
        ],
        "past-simple": [
            "I ______ (go) to school yesterday.",
            "She ______ (not/finish) her homework last night.",
            "______ you ______ (see) that movie last week?"
        ],
        "future-simple": [
            "We ______ (travel) to Spain next summer.",
            "He ______ (not/attend) the meeting tomorrow.",
            "______ she ______ (graduate) next year?"
        ],
        "present-continuous": [
            "I ______ (read) a book right now.",
            "They ______ (not/watch) TV at the moment.",
            "______ she ______ (work) on her project now?"
        ],
        "present-simple-passive": [
            "English ______ (speak) all over the world.",
            "The car ______ (not/wash) every week.",
            "______ the room ______ (clean) every day?"
        ],
        "future-simple-passive": [
            "The project ______ (complete) by next month.",
            "The package ______ (not/deliver) tomorrow.",
            "______ the results ______ (announce) next week?"
        ],
        "ordinal-numerals": [
            "This is my ______ (one) visit to London.",
            "She finished in ______ (three) place.",
            "December is the ______ (twelve) month."
        ],
        "degree-of-adjectives": [
            "This book is ______ (interesting) than that one.",
            "She is the ______ (tall) girl in our class.",
            "This is ______ (good) solution of all."
        ],
        "general-questions": [
            "______ you like coffee?",
            "______ she speak French?",
            "______ they live in London?"
        ],
        "there-is-are": [
            "______ a cat on the roof.",
            "______ many books on the shelf?",
            "______ not enough time to finish."
        ],
        "used-to": [
            "I ______ (play) tennis when I was younger.",
            "She ______ (not/smoke) before she started working.",
            "______ you ______ (live) in Moscow?"
        ],
        "going-to": [
            "I ______ (study) medicine next year.",
            "They ______ (not/travel) to Italy this summer.",
            "______ she ______ (buy) a new car?"
        ],
        "past-continuous": [
            "I ______ (read) when the phone rang.",
            "They ______ (not/watch) TV at 8 PM yesterday.",
            "______ you ______ (work) when I called?"
        ],
        "future-continuous": [
            "This time tomorrow, I ______ (fly) to Paris.",
            "She ______ (not/work) at this time tomorrow.",
            "______ they ______ (wait) for us when we arrive?"
        ],
        "present-perfect": [
            "I ______ (visit) London three times.",
            "She ______ (not/finish) her homework yet.",
            "______ you ever ______ (see) the Eiffel Tower?"
        ],
        "past-perfect": [
            "By the time we arrived, the movie ______ (start).",
            "She ______ (not/visit) that museum before yesterday.",
            "______ he ______ (eat) when you called him?"
        ],
        "future-perfect": [
            "By next year, I ______ (graduate) from university.",
            "She ______ (not/complete) the project by Friday.",
            "______ they ______ (move) to their new house by then?"
        ],
        "present-perfect-continuous": [
            "I ______ (study) English for three years.",
            "She ______ (not/work) here for long.",
            "______ you ______ (wait) long?"
        ],
        "past-perfect-continuous": [
            "I ______ (work) for hours when she arrived.",
            "They ______ (not/live) there long when they moved.",
            "______ he ______ (study) before the exam?"
        ],
        "future-in-past": [
            "He said he ______ (come) to the party.",
            "She told me she ______ (not/attend) the meeting.",
            "______ they say they ______ (help) us?"
        ],
        "past-simple-passive": [
            "The building ______ (build) in 1905.",
            "The letter ______ (not/send) yesterday.",
            "______ the cake ______ (make) by Mary?"
        ],
        "present-perfect-passive": [
            "The work ______ (finish) already.",
            "The documents ______ (not/sign) yet.",
            "______ the invitations ______ (send) out?"
        ],
        "irregular-verbs": [
            "I ______ (swim) in the lake yesterday.",
            "She ______ (not/know) the answer to the question.",
            "______ you ______ (take) the book yesterday?"
        ],
        "order-of-adjectives": [
            "She has a ______ (red/large/beautiful) dress.",
            "It was a ______ (metal/round/small) table.",
            "They bought ______ (wooden/Italian/expensive) chairs."
        ],
        "wh-questions": [
            "______ do you live?",
            "______ time does the train leave?",
            "______ book is this?"
        ],
        "modal-verbs": [
            "You ______ (should/see) a doctor.",
            "She ______ (can/speak) three languages.",
            "______ I ______ (may/use) your phone?"
        ],
        "future-perfect-continuous": [
            "By next month, I ______ (work) here for 5 years.",
            "They ______ (not/live) in Paris for long when they move.",
            "______ she ______ (study) long before the exam?"
        ],
        "present-continuous-passive": [
            "The house ______ (paint) right now.",
            "The documents ______ (not/prepare) at the moment.",
            "______ the meal ______ (cook) now?"
        ],
        "past-continuous-passive": [
            "The road ______ (repair) when we passed.",
            "The song ______ (not/perform) when I arrived.",
            "______ the letter ______ (write) yesterday at 5 PM?"
        ],
        "past-perfect-passive": [
            "The car ______ (repair) before the accident.",
            "The report ______ (not/complete) by the deadline.",
            "______ the keys ______ (find) before you left?"
        ],
        "future-perfect-passive": [
            "The project ______ (finish) by tomorrow.",
            "The tickets ______ (not/book) by next week.",
            "______ the building ______ (construct) by December?"
        ],
        "conditional-clauses": [
            "If it rains, we ______ (stay) home.",
            "If I ______ (know), I would have helped.",
            "Unless she ______ (hurry), she'll miss the bus."
        ],
        "sequence-of-tenses": [
            "He said he ______ (be) busy.",
            "She told me she ______ (finish) her work.",
            "They thought we ______ (leave) already."
        ],
        "indirect-speech": [
            "She said, 'I am tired.' → She said that ______ .",
            "He asked, 'Where do you live?' → He asked ______ .",
            "They said, 'We will come.' → They said that ______ ."
        ],
        "phrasal-verbs": [
            "Please ______ (turn off) the lights.",
            "We need to ______ (put off) the meeting.",
            "He ______ (look after) his little sister."
        ],
        "all-grammar": [
            "She ______ (study) when I called yesterday.",
            "By next year, they ______ (complete) the project.",
            "If I ______ (have) time, I would help you."
        ]
    };
    
    // Правильные ответы для упражнений
    const correctAnswers = {
        "present-simple": ["drinks", "don't like", "Does; play"],
        "past-simple": ["went", "didn't finish", "Did; see"],
        "future-simple": ["will travel", "won't attend", "Will; graduate"],
        "present-continuous": ["am reading", "aren't watching", "Is; working"],
        "present-simple-passive": ["is spoken", "isn't washed", "Is; cleaned"],
        "future-simple-passive": ["will be completed", "won't be delivered", "Will; be announced"],
        "ordinal-numerals": ["first", "third", "twelfth"],
        "degree-of-adjectives": ["more interesting", "tallest", "the best"],
        "general-questions": ["Do", "Does", "Do"],
        "there-is-are": ["There is", "Are there", "There is"],
        "used-to": ["used to play", "didn't use to smoke", "Did; use to live"],
        "going-to": ["am going to study", "aren't going to travel", "Is; going to buy"],
        "past-continuous": ["was reading", "weren't watching", "Were; working"],
        "future-continuous": ["will be flying", "won't be working", "Will; be waiting"],
        "present-perfect": ["have visited", "hasn't finished", "Have; seen"],
        "past-perfect": ["had started", "hadn't visited", "Had; eaten"],
        "future-perfect": ["will have graduated", "won't have completed", "Will; have moved"],
        "present-perfect-continuous": ["have been studying", "hasn't been working", "Have; been waiting"],
        "past-perfect-continuous": ["had been working", "hadn't been living", "Had; been studying"],
        "future-in-past": ["would come", "wouldn't attend", "Would; help"],
        "past-simple-passive": ["was built", "wasn't sent", "Was; made"],
        "present-perfect-passive": ["has been finished", "haven't been signed", "Have; been sent"],
        "irregular-verbs": ["swam", "didn't know", "Did; take"],
        "order-of-adjectives": ["beautiful large red", "small round metal", "expensive Italian wooden"],
        "wh-questions": ["Where", "What", "Whose"],
        "modal-verbs": ["should see", "can speak", "May; use"],
        "future-perfect-continuous": ["will have been working", "won't have been living", "Will; have been studying"],
        "present-continuous-passive": ["is being painted", "aren't being prepared", "Is; being cooked"],
        "past-continuous-passive": ["was being repaired", "wasn't being performed", "Was; being written"],
        "past-perfect-passive": ["had been repaired", "hadn't been completed", "Had; been found"],
        "future-perfect-passive": ["will have been finished", "won't have been booked", "Will; have been constructed"],
        "conditional-clauses": ["will stay", "had known", "hurries"],
        "sequence-of-tenses": ["was", "had finished", "had left"],
        "indirect-speech": ["she was tired", "where I lived", "they would come"],
        "phrasal-verbs": ["turn off", "put off", "looks after"],
        "all-grammar": ["was studying", "will have completed", "had"]
    };
    
    // Подсказки для каждой темы
    const hints = {
        "present-simple": "Используйте форму глагола без 'to'. Для he/she/it добавляйте окончание -s/-es.",
        "past-simple": "Для правильных глаголов используйте окончание -ed. Неправильные глаголы имеют особые формы.",
        "future-simple": "Используйте 'will' + глагол без 'to'.",
        "present-continuous": "Используйте am/is/are + глагол с окончанием -ing.",
        "present-simple-passive": "Формула: am/is/are + past participle (3 форма глагола).",
        "future-simple-passive": "Формула: will be + past participle.",
        "ordinal-numerals": "Добавляйте -th к числительным (first, second, third - исключения).",
        "degree-of-adjectives": "Сравнительная степень: прилагательное + -er. Превосходная: the + прилагательное + -est.",
        "general-questions": "Начинайте вопрос с do/does. Для he/she/it используйте does.",
        "there-is-are": "Используйте 'there is' для единственного числа, 'there are' для множественного.",
        "used-to": "Используется для описания прошлых привычек. Форма: used to + глагол.",
        "going-to": "Используется для планов и намерений. Форма: am/is/are going to + глагол.",
        "past-continuous": "Формула: was/were + глагол с -ing. Используется для действий в процессе в прошлом.",
        "future-continuous": "Формула: will be + глагол с -ing. Описывает действия в процессе в будущем.",
        "present-perfect": "Формула: have/has + past participle. Связывает прошлое с настоящим.",
        "past-perfect": "Формула: had + past participle. Описывает действие, произошедшее до другого действия в прошлом.",
        "future-perfect": "Формула: will have + past participle. Описывает завершенные действия к определенному моменту в будущем.",
        "present-perfect-continuous": "Формула: have/has been + глагол с -ing. Подчеркивает длительность действия.",
        "past-perfect-continuous": "Формула: had been + глагол с -ing. Длительное действие перед другим действием в прошлом.",
        "future-in-past": "Используйте 'would' для описания будущего с точки зрения прошлого.",
        "past-simple-passive": "Формула: was/were + past participle.",
        "present-perfect-passive": "Формула: have/has been + past participle.",
        "irregular-verbs": "Неправильные глаголы имеют особые формы прошедшего времени и причастия.",
        "order-of-adjectives": "Порядок прилагательных: мнение, размер, возраст, форма, цвет, происхождение, материал, назначение.",
        "wh-questions": "Вопросы начинаются с вопросительных слов: what, where, when, why, how, who, whom, whose, which.",
        "modal-verbs": "Модальные глаголы: can, could, may, might, must, shall, should, will, would.",
        "future-perfect-continuous": "Формула: will have been + глагол с -ing. Длительное действие, завершенное к моменту в будущем.",
        "present-continuous-passive": "Формула: am/is/are being + past participle.",
        "past-continuous-passive": "Формула: was/were being + past participle.",
        "past-perfect-passive": "Формула: had been + past participle.",
        "future-perfect-passive": "Формула: will have been + past participle.",
        "conditional-clauses": "Условные предложения: нулевой тип (if + present, present), первый (if + present, future), второй (if + past, would + verb), третий (if + past perfect, would have + participle).",
        "sequence-of-tenses": "При согласовании времен: present становится past, future становится future-in-the-past (would).",
        "indirect-speech": "Изменяйте время глагола, местоимения и обстоятельства места/времени.",
        "phrasal-verbs": "Фразовые глаголы состоят из глагола + частица (предлог/наречие), значение часто отличается от компонентов.",
        "all-grammar": "Комбинируйте различные грамматические конструкции в зависимости от контекста."
    };
    
    // Функция переключения вкладок
    function switchTab(level) {
        currentLevel = level;
        currentTopic = null;
        currentExerciseIndex = 0;
        
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === level);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${level}-tab`);
        });
        
        Object.values(exercisesContainers).forEach(container => {
            container.style.display = 'none';
        });
        
        document.querySelectorAll('.training-topic-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Функция отображения упражнений
    function showExercises(topic, level) {
        currentExerciseIndex = 0;
        
        // Прокрутка к упражнениям
        exercisesContainers[level].scrollIntoView({ behavior: 'smooth' });
        
        Object.values(exercisesContainers).forEach(container => {
            container.style.display = 'none';
        });
        
        const activeContainer = exercisesContainers[level];
        if (activeContainer) {
            activeContainer.style.display = 'block';
            activeContainer.innerHTML = '';
            
            if (!exercises[topic] || exercises[topic].length === 0) {
                activeContainer.innerHTML = `
                    <div class="no-exercises">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Упражнения для этой темы пока недоступны</p>
                    </div>
                `;
                return;
            }
            
            // Отображаем только текущее упражнение
            renderExercise(topic, level, currentExerciseIndex);
        }
    }
    
    // Функция отображения одного упражнения
    function renderExercise(topic, level, index) {
        const activeContainer = exercisesContainers[level];
        activeContainer.innerHTML = '';
        
        const totalExercises = exercises[topic].length;
        const exercise = exercises[topic][index];
        
        // Заголовок темы
        const topicHeader = document.createElement('h4');
        topicHeader.className = 'exercise-topic-header';
        topicHeader.textContent = document.querySelector(`[data-topic="${topic}"] .topic-name`).textContent;
        activeContainer.appendChild(topicHeader);
        
        // Прогресс
        const progress = document.createElement('div');
        progress.className = 'exercise-progress';
        progress.textContent = `Упражнение ${index + 1} из ${totalExercises}`;
        activeContainer.appendChild(progress);
        
        // Упражнение
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise';
        exerciseElement.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-number">${index + 1}.</div>
                <button class="hint-btn">
                    <i class="fas fa-lightbulb"></i> Подсказка
                </button>
            </div>
            <div class="exercise-text">${exercise}</div>
            <div class="exercise-input">
                <input type="text" placeholder="Введите ответ..." id="exercise-input-field">
                <button class="check-btn">
                    <i class="fas fa-check"></i> Проверить
                </button>
            </div>
            <div class="exercise-feedback"></div>
            <div class="exercise-navigation" style="display: none;">
                <button class="next-btn">Следующее упражнение <i class="fas fa-arrow-right"></i></button>
            </div>
        `;
        activeContainer.appendChild(exerciseElement);
        
        // Элементы управления
        const checkBtn = exerciseElement.querySelector('.check-btn');
        const hintBtn = exerciseElement.querySelector('.hint-btn');
        const inputField = exerciseElement.querySelector('input');
        const feedbackEl = exerciseElement.querySelector('.exercise-feedback');
        const navigationEl = exerciseElement.querySelector('.exercise-navigation');
        const nextBtn = exerciseElement.querySelector('.next-btn');
        
        // Обработчики
        hintBtn.addEventListener('click', () => {
            feedbackEl.textContent = hints[topic] || 'Подсказка недоступна';
            feedbackEl.className = 'exercise-feedback hint';
        });
        
        checkBtn.addEventListener('click', () => {
            const userAnswer = inputField.value.trim();
            if (!userAnswer) {
                feedbackEl.textContent = 'Пожалуйста, введите ответ';
                feedbackEl.className = 'exercise-feedback error';
                return;
            }
            
            // Проверка ответа
            const correctAnswer = correctAnswers[topic][index];
            const normalizedUserAnswer = userAnswer.toLowerCase().replace(/\s+/g, ' ');
            const normalizedCorrectAnswer = correctAnswer.toLowerCase().replace(/\s+/g, ' ');
            
            if (normalizedUserAnswer === normalizedCorrectAnswer) {
                feedbackEl.innerHTML = `
                    <i class="fas fa-check-circle"></i> Правильно! 
                    <span class="correct-answer">${correctAnswer}</span>
                `;
                feedbackEl.className = 'exercise-feedback success';
                
                // Показываем кнопку "Следующее"
                navigationEl.style.display = 'block';
            } else {
                feedbackEl.innerHTML = `
                    <i class="fas fa-times-circle"></i> Неправильно. 
                    <span class="correct-answer">Правильный ответ: ${correctAnswer}</span>
                `;
                feedbackEl.className = 'exercise-feedback error';
            }
        });
        
        nextBtn.addEventListener('click', () => {
            currentExerciseIndex++;
            if (currentExerciseIndex < exercises[topic].length) {
                renderExercise(topic, level, currentExerciseIndex);
            } else {
                // Все упражнения выполнены
                renderCompletion(topic, level);
            }
        });
    }
    
    // Функция отображения экрана завершения
    function renderCompletion(topic, level) {
        const activeContainer = exercisesContainers[level];
        activeContainer.innerHTML = '';
        
        activeContainer.innerHTML = `
            <div class="completion-message">
                <i class="fas fa-check-circle"></i>
                <h3>Тема завершена!</h3>
                <p>Вы успешно выполнили все упражнения по теме "${document.querySelector(`[data-topic="${topic}"] .topic-name`).textContent}".</p>
                <button class="continue-btn">
                    <i class="fas fa-arrow-right"></i> Продолжить обучение
                </button>
            </div>
        `;
        
        activeContainer.querySelector('.continue-btn').addEventListener('click', () => {
            // Сброс выбранной темы
            document.querySelectorAll('.training-topic-item.active').forEach(item => {
                item.classList.remove('active');
            });
            currentTopic = null;
            activeContainer.innerHTML = '';
            activeContainer.style.display = 'none';
            
            // Прокрутка к списку тем
            document.querySelector(`#${level}-tab h3`).scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Обработчики событий для вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });
    
    // Обработчики событий для тем
    topicItems.forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.dataset.topic;
            
            topicItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            currentTopic = topic;
            showExercises(currentTopic, currentLevel);
        });
    });
    
    // Инициализация
    switchTab('easy');
});