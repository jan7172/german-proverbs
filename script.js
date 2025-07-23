// Load and render proverbs
fetch('proverbs.json')
  .then(res => res.json())
  .then(proverbs => {
    // Sort alphabetically
    proverbs.sort((a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }));

    const list = document.getElementById('proverb-list');
    const nav = document.getElementById('letter-links');
    const usedLetters = new Set();

    // Create content with letter anchors
    for (const text of proverbs) {
      const firstLetter = text[0].toUpperCase();

      if (!usedLetters.has(firstLetter)) {
        const anchor = document.createElement('div');
        anchor.id = `letter-${firstLetter}`;
        anchor.style.height = '1px';
        list.appendChild(anchor);
        usedLetters.add(firstLetter);
      }

      const p = document.createElement('p');
      p.textContent = `„${text}“`;
      list.appendChild(p);
    }

    // Divider in navigation
    const divider = document.createElement('li');
    divider.classList.add('divider');
    divider.style.listStyle = 'none';
    divider.style.borderBottom = '1px solid var(--nav-border)';
    divider.style.margin = '0.5rem 0';
    nav.parentElement.insertBefore(divider, nav);

    // Navigation A–ZÄÖÜ
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'.split('');
    for (const letter of alphabet) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#letter-${letter}">${letter}</a>`;
      nav.appendChild(li);
    }
  });

// Toggle menu (mobile nav)
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('letter-nav').classList.toggle('hidden');
});

// Theme toggle logic
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
}

// Theme toggle buttons
document.getElementById('theme-toggle-menu').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-footer').addEventListener('click', toggleTheme);

// Set system default theme on first load
if (!document.documentElement.hasAttribute('data-theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}
