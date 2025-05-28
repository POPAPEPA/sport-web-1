document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const toggleLangBtn = document.getElementById("toggle-lang");
  const scheduleButtons = document.querySelectorAll(".schedule-button");
  const languageElements = document.querySelectorAll("[data-lang]");

  // Смена темы
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const themeIcon = toggleThemeBtn.querySelector("i");
    themeIcon.classList.toggle("fa-sun");
    themeIcon.classList.toggle("fa-moon");
  });

  // Смена языка
  toggleLangBtn.addEventListener("click", () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "ru" ? "kk" : "ru";
    document.documentElement.lang = newLang;

    languageElements.forEach((el) => {
      const langKey = el.dataset.lang;
      el.textContent = translations[langKey][newLang];
    });
  });

  // Переводы
  const translations = {
    title: { ru: "Программа тренировок", kk: "Жаттығу бағдарламасы" },
    week1: { ru: "Неделя 1", kk: "1-апта" },
    week2: { ru: "Неделя 2", kk: "2-апта" },
    // Добавьте остальные ключи по аналогии
  };

  // Переключение расписаний по неделям
  scheduleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const week = button.dataset.week;
      const schedule = document.getElementById(`schedule-week-${week}`);

      // Скрыть все расписания
      document.querySelectorAll(".schedule-week").forEach((el) => {
        el.style.display = "none";
      });

      // Показать выбранное
      if (schedule) {
        schedule.style.display = "block";
      }
    });
  });
});
