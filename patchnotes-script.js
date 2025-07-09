fetch('patchnotes.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('patchnotes-container');
    data.forEach(note => {
      const div = document.createElement('div');
      div.className = 'patchnote';
      div.textContent = `${note.version}: ${note.text}`;
      container.appendChild(div);
    });
  });

const menuToggleBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
if (menuToggleBtn && sidebar) {
  menuToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
}

function toggleTheme() {
  const htmlEl = document.documentElement;
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
}

const themeToggleBtn = document.getElementById('theme-toggle-bottom');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

function setInitialTheme() {
  const htmlEl = document.documentElement;
  if (!htmlEl.hasAttribute('data-theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlEl.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}
setInitialTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const htmlEl = document.documentElement;
  if (!htmlEl.hasAttribute('data-theme')) {
    htmlEl.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});
