function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setYear() {
  const year = qs('#year');
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

function setupMobileNav() {
  const toggle = qs('.nav-toggle');
  const menu = qs('#nav-menu');
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    menu.dataset.open = 'true';
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    const open = menu.dataset.open === 'true';
    if (open) closeMenu();
    else openMenu();
  });

  qsa('a[href^="#"]', menu).forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

function setupAccordion() {
  const root = qs('[data-accordion]');
  if (!root) return;

  const items = qsa('.faq-item', root);

  items.forEach((item) => {
    const button = qs('.faq-q', item);
    const answer = qs('.faq-a', item);
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';

      items.forEach((other) => {
        if (other === item) return;
        const otherButton = qs('.faq-q', other);
        const otherAnswer = qs('.faq-a', other);
        if (!otherButton || !otherAnswer) return;

        other.dataset.open = 'false';
        otherButton.setAttribute('aria-expanded', 'false');
        otherAnswer.hidden = true;
      });

      item.dataset.open = String(!isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });
}

function showToast(message) {
  const toast = qs('#toast');
  if (!toast) return;
  const text = qs('.toast-text', toast);
  if (text) text.textContent = message;

  toast.hidden = false;
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function setupContactForm() {
  return;
}

function setupCtaTracking() {
  qsa('[data-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-cta');
      if (!name) return;
      try {
        sessionStorage.setItem('lastCta', name);
      } catch {
        // ignore
      }
    });
  });
}

function setupMatrixBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-bg';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;
  const connectionDistance = 150;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function drawGrid() {
    const gridSize = 60;
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawGrid();
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    drawConnections();
    
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  setupMobileNav();
  setupAccordion();
  setupContactForm();
  setupCtaTracking();
  setupMatrixBackground();
});
