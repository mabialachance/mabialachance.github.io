/* ─────────────────────────────────────────────
   main.js — Portfolio interactivity
───────────────────────────────────────────── */

/* ── 1. NAV: add .scrolled class on scroll ── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── 2. ACTIVE NAV LINK on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observerNav = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => observerNav.observe(s));

/* ── 3. SCROLL REVEAL for section content ── */
const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .stat, .about-text p'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observerReveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger each card slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (i % 4) * 80);
        observerReveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observerReveal.observe(el));

/* ── 4. TERMINAL TYPEWRITER effect ── */
const terminalLines = [
  { type: 'cmd',  text: 'kubectl get nodes -o wide' },
  { type: 'out',  text: 'NAME            STATUS   AGE' },
  { type: 'out',  text: 'node-01         \u001b[32mReady\u001b[0m    42d' },
  { type: 'out',  text: 'node-02         \u001b[32mReady\u001b[0m    42d' },
  { type: 'out',  text: 'node-03         \u001b[32mReady\u001b[0m    41d' },
  { type: 'blank' },
  { type: 'cmd',  text: 'terraform plan' },
  { type: 'out',  text: '\u2714 Plan: 12 to add, 3 to change, 0 to destroy.' },
  { type: 'blank' },
  { type: 'cmd',  text: 'cat .env | grep UPTIME' },
  { type: 'out',  text: 'UPTIME="99.98%"' },
  { type: 'out',  text: 'INCIDENTS_THIS_MONTH="0"' },
];

const terminalBody = document.querySelector('.terminal-body');

function buildTerminal() {
  if (!terminalBody) return;
  terminalBody.innerHTML = '';

  let delay = 200;

  terminalLines.forEach((line) => {
    if (line.type === 'blank') {
      delay += 120;
      setTimeout(() => {
        terminalBody.appendChild(document.createElement('br'));
      }, delay);
      return;
    }

    if (line.type === 'cmd') {
      delay += 300;
      setTimeout(() => {
        const row = document.createElement('div');
        row.className = 't-line';

        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = '❯';

        const cmd = document.createElement('span');
        cmd.className = 't-cmd';
        row.appendChild(prompt);
        row.appendChild(cmd);
        terminalBody.appendChild(row);

        // cursor blink at end of command
        let i = 0;
        const typeInterval = setInterval(() => {
          cmd.textContent += line.text[i++];
          if (i >= line.text.length) clearInterval(typeInterval);
        }, 40);
      }, delay);

      delay += line.text.length * 40 + 100;
    }

    if (line.type === 'out') {
      delay += 80;
      setTimeout(() => {
        const out = document.createElement('div');
        out.className = 't-out';
        // colour-code known patterns
        let html = line.text
          .replace(/Ready/g, '<span class="t-success">Ready</span>')
          .replace(/✔/g, '<span class="t-success">✔</span>')
          .replace(/(UPTIME|INCIDENTS_THIS_MONTH)=/g, '<span class="t-key">$1=</span>')
          .replace(/"([^"]+)"/g, '<span class="t-val">"$1"</span>');
        out.innerHTML = html;
        terminalBody.appendChild(out);
      }, delay);
    }
  });

  // final blinking cursor line
  delay += 200;
  setTimeout(() => {
    const row = document.createElement('div');
    row.className = 't-line';
    const prompt = document.createElement('span');
    prompt.className = 't-prompt';
    prompt.textContent = '❯';
    const cursor = document.createElement('span');
    cursor.className = 't-cursor';
    row.appendChild(prompt);
    row.appendChild(cursor);
    terminalBody.appendChild(row);
  }, delay);
}

// Replay terminal when hero is in view
const heroObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) buildTerminal();
  },
  { threshold: 0.3 }
);

const hero = document.querySelector('#hero');
if (hero) heroObserver.observe(hero);

/* ── 5. SMOOTH ANCHOR SCROLL (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 6. CURRENT YEAR in footer ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
