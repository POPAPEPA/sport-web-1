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
