
function setLanguage(lang) {
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

function showDay(dayId) {
  document.querySelectorAll('.day-section').forEach(section => {
    section.style.display = 'none';
  });
  const target = document.getElementById(dayId);
  if (target) target.style.display = 'block';
}
