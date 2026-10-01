/**
 * JAI MODI — DIGITAL BUSINESS CARD
 * Executive Suite: Formal, Elegant & Rock-Solid Interactions Engine
 * Tailored for International Business, Canton Fair & High-Stakes Trade
 */

// ============================================================================
// 1. FORMAL AMBIENT BACKGROUND (Calm, Slow, Executive Constellation)
// ============================================================================
export function initAmbientCanvas() {
  let canvas = document.getElementById('ambient-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Moderate count for calm executive feel & high mobile FPS
  const particleCount = window.innerWidth < 768 ? 14 : 32;
  const particles = [];

  const goldPalette = [
    { r: 212, g: 175, b: 55, a: 0.18 },  // Aztec gold
    { r: 247, g: 231, b: 180, a: 0.15 }, // Champagne
    { r: 200, g: 160, b: 60, a: 0.12 }   // Warm amber
  ];

  for (let i = 0; i < particleCount; i++) {
    const col = goldPalette[i % goldPalette.length];
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15, // very slow drift
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.5 + 0.8,
      color: col
    });
  }

  let animationFrameId;
  let isRunning = true;

  function render() {
    if (!isRunning) return;

    // Pause canvas updates when any modal (e.g. business card viewer) is open to eliminate lag & CPU spike
    if (document.querySelector('.modal-backdrop.open')) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Subtle connection filaments
    const maxDist = 110;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.y < -10) p.y = window.innerHeight + 10;
      if (p.y > window.innerHeight + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      animationFrameId = requestAnimationFrame(render);
    }
  });
}

// ============================================================================
// 2. FORMAL TACTILE LIQUID RIPPLE (Clean, Crisp Feedback)
// ============================================================================
export function initTactileRipples() {
  const interactiveSelectors = [
    '.primary-btn',
    '.nav-tab-btn',
    '.util-btn',
    '.btn-partner-action',
    '.partner-card-preview-btn',
    '.modal-action-btn',
    '.copy-address-btn',
    '.map-link-badge'
  ];

  document.addEventListener('click', (e) => {
    const target = e.target.closest(interactiveSelectors.join(', '));
    if (!target) return;

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch (err) {}
    }

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'gold-liquid-ripple';

    const size = Math.max(rect.width, rect.height) * 1.8;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    const computedPos = window.getComputedStyle(target).position;
    if (computedPos === 'static') {
      target.style.position = 'relative';
    }

    target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 550);
  });
}

// ============================================================================
// 3. STAGGERED ENTRANCE CASCADES & SCROLL REVEALS
// ============================================================================
export function initScrollAndStaggerCascades() {
  requestAnimationFrame(() => {
    document.body.classList.add('app-ready');
  });

  const revealTargets = document.querySelectorAll(
    '.identity-card, .business-card-section, .partner-card, .quick-contact-section, .location-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-item');
    target.style.setProperty('--reveal-delay', `${index * 0.06}s`);
    observer.observe(target);
  });
}

// ============================================================================
// 4. MASTER INITIALIZATION (Stable, Rock-Solid, Professional)
// ============================================================================
export function setupHighEndAnimations() {
  initAmbientCanvas();
  initTactileRipples();
  initScrollAndStaggerCascades();
}
