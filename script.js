// Показ дня
function showDay(dayId) {
  const sections = document.querySelectorAll(".day-section");
  const active = document.getElementById(dayId);

  if (active.classList.contains("show")) {
    active.classList.remove("show");
    setTimeout(() => (active.style.display = "none"), 300);
    return;
  }

  sections.forEach((section) => {
    section.classList.remove("show");
    section.style.display = "none";
  });

  active.style.display = "block";
  setTimeout(() => active.classList.add("show"), 10);
}

// Смена темы
function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

// Переводы
const translations = {
  ru: {
    selectDay: "Выберите день недели, чтобы посмотреть программу тренировки:",
    footer: "Сайт создан примерным пользователем: Ермаханов А.К. | +7 (705) 515-87-10",
    days: {
      monday: { title: "Понедельник", items: ["Жим лёжа", "Присед", "Тяга верхняя"] },
      tuesday: { title: "Вторник", items: ["Кардио 30 мин"] },
      wednesday: { title: "Среда", items: ["Становая тяга", "Выпады", "Подтягивания"] },
      thursday: { title: "Четверг", items: ["Отдых"] },
      friday: { title: "Пятница", items: ["Жим гантелей", "Сгибания рук", "Пресс"] },
      saturday: { title: "Суббота", items: ["Плавание", "Растяжка"] },
      sunday: { title: "Воскресенье", items: ["Отдых"] }
    }
  },
  kz: {
    selectDay: "Аптаның күнін таңдап, жаттығу бағдарламасын қараңыз:",
    footer: "Сайтты жасаған: Ермаханов А.К. | +7 (705) 515-87-10",
    days: {
      monday: { title: "Дүйсенбі", items: ["Гүлдену", "Аяқ итеру", "Жоғарғы тарту"] },
      tuesday: { title: "Сейсенбі", items: ["Кардио 30 мин"] },
      wednesday: { title: "Сәрсенбі", items: ["Дедлифт", "Қадамдар", "Тартылу"] },
      thursday: { title: "Бейсенбі", items: ["Демалыс"] },
      friday: { title: "Жұма", items: ["Гантельмен жаттығу", "Қол бүгу", "Пресс"] },
      saturday: { title: "Сенбі", items: ["Жүзу", "Созылу"] },
      sunday: { title: "Жексенбі", items: ["Демалыс"] }
    }
  }
};

// Смена языка
function changeLanguage() {
  const lang = document.getElementById("language-select").value;
  const t = translations[lang];

  if (!t) return;

  document.getElementById("day-select-text").textContent = t.selectDay;
  document.getElementById("footer-text").textContent = t.footer;

  for (const day in t.days) {
    const section = document.getElementById(day);
    if (!section) continue;

    const h2 = section.querySelector("h2");
    const ul = section.querySelector("ul");
    const p = section.querySelector("p");

    h2.textContent = t.days[day].title;

    if (ul) {
      ul.innerHTML = "";
      t.days[day].items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
    }

    if (p) {
      p.textContent = t.days[day].items.join(", ");
    }
  }
}

// Инициализация при загрузке
window.addEventListener("DOMContentLoaded", () => {
  changeLanguage(); // Установим язык по умолчанию (ru)
});
