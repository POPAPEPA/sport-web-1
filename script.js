// Объект с переводами
const translations = {
  ru: {
    selectDay: 'Выберите день недели, чтобы увидеть тренировку:',
    footer: 'Сделано с ❤️ для тренировок',
    buttons: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    days: {
      monday: {
        title: 'Понедельник — Грудь и трицепс',
        items: ['Жим лёжа', 'Разводка гантелей', 'Французский жим', 'Отжимания на брусьях']
      },
      tuesday: {
        title: 'Вторник — Спина и бицепс',
        items: ['Подтягивания', 'Тяга штанги в наклоне', 'Сгибания рук со штангой', 'Молотковые сгибания']
      },
      wednesday: {
        title: 'Среда — Отдых или кардио',
        items: ['Отдых или лёгкое кардио']
      },
      thursday: {
        title: 'Четверг — Ноги',
        items: ['Приседания', 'Жим ногами', 'Выпады', 'Подъёмы на носки стоя']
      },
      friday: {
        title: 'Пятница — Плечи и пресс',
        items: ['Жим штанги над головой', 'Подъёмы гантелей в стороны', 'Скручивания', 'Планка']
      },
      saturday: {
        title: 'Суббота — Функциональная тренировка',
        items: ['Берпи', 'Скакалка', 'Тяга гири в рывке', 'Бег']
      },
      sunday: {
        title: 'Воскресенье — Отдых',
        items: ['Полный отдых']
      }
    }
  },
  kz: {
    selectDay: 'Аптаның күнін таңдап, жаттығуды көріңіз:',
    footer: '❤️ арқылы жасалған жаттығу үшін',
    buttons: ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі', 'Жексенбі'],
    days: {
      monday: {
        title: 'Дүйсенбі — Кеуде және трицепс',
        items: ['Жатып штанганы көтеру', 'Гантельмен ашу', 'Француз жатығуы', 'Брусьяға жаттығу']
      },
      tuesday: {
        title: 'Сейсенбі — Арқа және бицепс',
        items: ['Тарту', 'Бұрылып штанга тарту', 'Штанга көтеру', 'Гантельмен көтеру']
      },
      wednesday: {
        title: 'Сәрсенбі — Демалыс немесе кардио',
        items: ['Демалыс немесе жеңіл кардио']
      },
      thursday: {
        title: 'Бейсенбі — Аяқтар',
        items: ['Отыру', 'Аяқпен итеру', 'Аяқпен алға шығу', 'Тұрып аяқ ұшына көтерілу']
      },
      friday: {
        title: 'Жұма — Иық және пресс',
        items: ['Штанганы жоғары көтеру', 'Гантельді екі жаққа көтеру', 'Пресс жасау', 'Планка']
      },
      saturday: {
        title: 'Сенбі — Функционалдық жаттығу',
        items: ['Бёрпи', 'Арқанмен секіру', 'Гиря тарту', 'Жүгіру']
      },
      sunday: {
        title: 'Жексенбі — Демалыс',
        items: ['Толық демалыс']
      }
    }
  }
};

// Сохраняем ссылку на текущий язык
let currentLang = localStorage.getItem('lang') || 'ru';
document.getElementById('language-select').value = currentLang;

// Применяем перевод
function changeLanguage() {
  const lang = document.getElementById('language-select').value;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];

  // Обновляем основной текст
  document.querySelector('header p').textContent = t.selectDay;
  document.querySelector('footer p').textContent = t.footer;

  // Обновляем кнопки
  const dayButtons = document.querySelectorAll('#day-buttons button');
  dayButtons.forEach((btn, idx) => {
    btn.textContent = t.buttons[idx];
  });

  // Обновляем содержимое каждой секции
  Object.keys(t.days).forEach(day => {
    const section = document.getElementById(day);
    const dayData = t.days[day];
    section.querySelector('h2').textContent = dayData.title;

    const ul = section.querySelector('ul');
    const p = section.querySelector('p');

    if (ul) {
      ul.innerHTML = '';
      dayData.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    }

    if (p && !ul) {
      p.textContent = dayData.items[0];
    }
  });
}

// Переключение секций по кнопкам
function showSection(dayId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  const target = document.getElementById(dayId);
  if (target) {
    target.classList.add('active');
  }
}

// Назначаем обработчики событий
document.getElementById('language-select').addEventListener('change', changeLanguage);
document.querySelectorAll('#day-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const dayId = button.getAttribute('data-day');
    showSection(dayId);
  });
});

// Первичная инициализация
changeLanguage();
