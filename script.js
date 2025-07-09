fetch('proverbs.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('proverb-list');
    const used = new Set();

    data.forEach(text => {
      const letter = text[0].toUpperCase();
      if (!used.has(letter)) {
        const anchor = document.createElement('div');
        anchor.id = 'letter-' + letter;
        anchor.style.height = '1px';
        list.appendChild(anchor);
        used.add(letter);
      }

      const p = document.createElement('p');
      p.textContent = `„${text}“`;
      list.appendChild(p);
    });

    const letterLinks = document.getElementById('letter-links');
    const navUl = letterLinks.parentElement;

    const divider = document.createElement('li');
    divider.classList.add('divider');
    divider.style.listStyle = 'none';
    divider.style.height = '1px';
    divider.style.borderBottom = '1px solid var(--nav-border)';
    divider.style.margin = '0.5rem 0';
    divider.style.padding = '0';
    navUl.insertBefore(divider, letterLinks);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'.split('');
    alphabet.forEach(l => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#letter-${l}">${l}</a>`;
      letterLinks.appendChild(li);
    });
  });

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('letter-nav').classList.toggle('hidden');
});

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
}

document.getElementById('theme-toggle-menu').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-footer').addEventListener('click', toggleTheme);

if (!document.documentElement.hasAttribute('data-theme')) {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
}
