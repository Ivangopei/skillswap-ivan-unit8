// AI-generated: dummy skill data

const skills = [
  { title: 'Intro to Python', category: 'Programming', price: 15, provider: 'Maya R.',
    description: 'Learn variables, loops, and functions by building small projects.',
    details: 'Available weekday evenings in the library. Beginners welcome, bring a laptop.' },
  { title: 'Web Development', category: 'Programming', price: 20, provider: 'Ivan',
    description: 'Build your first website with HTML, CSS, and JavaScript.',
    details: 'Flexible schedule. We will build and publish a small site together.' },
  { title: 'Guitar Basics', category: 'Music', price: 10, provider: 'Jake T.',
    description: 'Learn basic chords, strumming patterns, and your first song.',
    details: 'Weekends in the music building. Guitars available to borrow.' },
  { title: 'Resume Review', category: 'Career', price: 0, provider: 'Sofia L.',
    description: 'Get feedback on your resume before applying for internships.',
    details: 'Free 30-minute sessions. Bring a printed or digital copy.' }
];

const grid = document.getElementById('skills-grid');

// Draws a list of skills as cards
function renderSkills(list) {
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<p>No skills found.</p>';
    return;
  }

  list.forEach(skill => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p class="provider">Taught by ${skill.provider}</p>
      <p class="price">${skill.price === 0 ? 'Free' : '$' + skill.price + ' / hour'}</p>
      <p>${skill.description}</p>
      <p class="hint">Click to see more</p>
      <p class="details">${skill.details}</p>
    `;

    // Click a card to show/hide its details
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
      const hint = card.querySelector('.hint');
      hint.textContent = card.classList.contains('expanded')
        ? 'Click to hide details'
        : 'Click to see more';
    });

    grid.appendChild(card);
  });
}

// Filter buttons call filterSkillsByCategory and redraw the cards
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;
    renderSkills(filterSkillsByCategory(skills, category));
  });
});

// Show all skills when the page loads
renderSkills(skills);

document.getElementById('calc-btn').addEventListener('click', () => {
  const rate = Number(document.getElementById('rate-input').value);
  const hours = Number(document.getElementById('hours-input').value);

  const total = calculateTotalCost(rate, hours);
  document.getElementById('calc-result').textContent = `Total cost: $${total.toFixed(2)}`;
});

document.getElementById('match-btn').addEventListener('click', () => {
  const userNeeds = {
    category: document.getElementById('match-category').value,
    maxPrice: Number(document.getElementById('match-price').value)
  };

  const matches = matchSkillsToUser(userNeeds, skills);
  const results = document.getElementById('match-results');
  results.innerHTML = '';

  if (matches.length === 0) {
    results.innerHTML = '<p>No matches found. Try a higher max price or another category.</p>';
    return;
  }

  matches.forEach(skill => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p class="provider">Taught by ${skill.provider}</p>
      <p class="price">${skill.price === 0 ? 'Free' : '$' + skill.price + ' / hour'}</p>
      <p>${skill.description}</p>
    `;
    results.appendChild(card);
  });
});