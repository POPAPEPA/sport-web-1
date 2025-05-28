function showDay(dayId) {
  const sections = document.querySelectorAll('.day-section');
  const active = document.getElementById(dayId);

  if (active.classList.contains('show')) {
    active.classList.remove('show');
    setTimeout(() => {
      active.style.display = 'none';
    }, 300);
    return;
  }

  sections.forEach(section => {
    section.classList.remove('show');
    section.style.display = 'none';
  });

  active.style.display = 'block';
  setTimeout(() => {
    active.classList.add('show');
  }, 10);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

const translations = {
  ru: {
    welcome: "Добро пожаловать в программу тренировок",
    select_day: "Выберите день недели, чтобы посмотреть программу тренировки:",
    nutrition: "Питание",
    fitness: "Фитнес",
    contacts: "Контакты",
    contact_info: "Свяжитесь с нами по телефону: +7 (705) 515-87-10"
  },
  kk: {
    welcome: "Жаттығу бағдарламасына қош келдіңіз",
    select_day: "Жаттығу бағдарламасын көру үшін аптаның күнін таңдаңыз:",
    nutrition: "Тамақтану",
    fitness: "Фитнес",
    contacts: "Байланыс",
    contact_info: "Бізбен байланысыңыз: +7 (705) 515-87-10"
  }
};

function setLanguage(lang) {
  document.getElementById('main-title').textContent = translations[lang].welcome;
  document.getElementById('main-subtitle').textContent = translations[lang].select_day;
  document.querySelector('a[href="#nutrition"]').textContent = translations[lang].nutrition;
  document.querySelector('a[href="#fitness"]').textContent = translations[lang].fitness;
  document.querySelector('a[href="#contact"]').textContent = translations[lang].contacts;
  document.getElementById('contact-text').textContent = translations[lang].contact_info;
}
