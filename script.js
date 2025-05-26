function showDay(dayId) {
  const sections = document.querySelectorAll('.day-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  const active = document.getElementById(dayId);
  if (active) active.style.display = 'block';
}
