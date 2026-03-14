/* ============================================================
   RSK pour les nuls — Script principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile sidebar toggle ── */
  const hamburger = document.querySelector('.hamburger');
  const sidebar   = document.querySelector('.sidebar');
  let overlay     = document.querySelector('.sidebar-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  /* ── Copy buttons ── */
  document.querySelectorAll('.code-header').forEach(header => {
    const btn  = header.querySelector('.copy-btn');
    const pre  = header.nextElementSibling;
    if (!btn || !pre) return;

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText ?? pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✓ Copié !';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copier';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        btn.textContent = 'Erreur';
        setTimeout(() => { btn.textContent = 'Copier'; }, 2000);
      });
    });
  });

  /* ── Active sidebar link on scroll ── */
  const sections = document.querySelectorAll('h2[id], h3[id]');
  const sideLinks = document.querySelectorAll('.sidebar-sub-link, .sidebar-link[href*="#"]');

  if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sideLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.endsWith('#' + id)) {
              sideLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Highlight.js on all code blocks not already highlighted ── */
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }
});
