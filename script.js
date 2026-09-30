/**
 * ==========================================================================
 * PORTOFOLIO ELEGAN & LENGKAP - SATRIA PRATAMA
 * Logika Interaktif, Multi-Tema, CLI Terminal, Game, Profil Keluarga & Audio
 * (Vanilla JavaScript ES6+ Murni)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MANAJEMEN TEMA & AUDIO FX ENGINE (Web Audio API Synthesizer)
  // --------------------------------------------------------------------------
  const rootHtml = document.documentElement;
  const switchSoundFx = document.getElementById('switchSoundFx');
  const btnToggleSound = document.getElementById('btnToggleSound');
  const soundIcon = document.getElementById('soundIcon');
  let isSoundEnabled = localStorage.getItem('satria_sound') !== 'false';

  // Inisialisasi Audio Context untuk Sintesis Efek Suara (No External Audio Files)
  let sfxAudioCtx = null;
  function getSfxContext() {
    if (!sfxAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) sfxAudioCtx = new AudioCtx();
    }
    if (sfxAudioCtx && sfxAudioCtx.state === 'suspended') {
      sfxAudioCtx.resume();
    }
    return sfxAudioCtx;
  }

  // Generator Efek Suara Sintetis
  const playSound = {
    click: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } catch (e) { }
    },
    success: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.05, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.2);
        });
      } catch (e) { }
    },
    laser: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } catch (e) { }
    },
    explosion: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.23);
      } catch (e) { }
    },
    powerup: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [440, 554, 659, 880].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.05, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.16);
        });
      } catch (e) { }
    },
    dimension3d: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [220, 440, 880, 1320].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + idx * 0.04 + 0.12);
          gain.gain.setValueAtTime(0.04, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.15);
        });
      } catch (e) { }
    },
    warp: () => {
      if (!isSoundEnabled) return;
      try {
        const ctx = getSfxContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) { }
    }
  };

  // Toggle Sound FX
  function updateSoundUI() {
    if (switchSoundFx) switchSoundFx.checked = isSoundEnabled;
    if (soundIcon) {
      soundIcon.className = isSoundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
    localStorage.setItem('satria_sound', isSoundEnabled);
  }
  updateSoundUI();

  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      updateSoundUI();
      if (isSoundEnabled) playSound.success();
      showToast(isSoundEnabled ? 'Suara efek UI diaktifkan.' : 'Suara efek UI dimatikan.', 'info');
    });
  }

  if (switchSoundFx) {
    switchSoundFx.addEventListener('change', (e) => {
      isSoundEnabled = e.target.checked;
      updateSoundUI();
      if (isSoundEnabled) playSound.click();
    });
  }

  // Global Click sound effect for buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .filter-btn, .skill-card, .cmd-item')) {
      playSound.click();
    }
  });

  // Tema Warna Switcher
  const savedTheme = localStorage.getItem('satria_theme') || 'cyan';
  setTheme(savedTheme);

  function setTheme(themeName) {
    rootHtml.setAttribute('data-theme', themeName);
    localStorage.setItem('satria_theme', themeName);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName);
    });
    if (window.updateParticleColors) window.updateParticleColors(themeName);
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      playSound.success();
      showToast(`Tema warna diubah ke: ${btn.querySelector('.theme-name').textContent}`, 'info');
    });
  });

  // --------------------------------------------------------------------------
  // 2. SISTEM KANVAS PARTIKEL 2D RESPONSIF & RINGAN (Clean Performance Canvas)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particleCanvas');
  let currentParticleMode = localStorage.getItem('satria_particle_mode') || 'constellation';
  if (['cybercore', 'galaxy', 'matrix', 'none', 'constellation', 'starfield'].includes(currentParticleMode)) {
    if (['cybercore', 'galaxy'].includes(currentParticleMode)) {
      currentParticleMode = 'constellation';
      localStorage.setItem('satria_particle_mode', 'constellation');
    }
  } else {
    currentParticleMode = 'constellation';
  }

  // Helper Warna Tema untuk Kanvas (Hex dan HSL)
  function getThemeColors() {
    const currentTheme = rootHtml.getAttribute('data-theme') || 'cyan';
    switch (currentTheme) {
      case 'matrix': return ['#00ff87', '#60efff', '#00b4d8'];
      case 'violet': return ['#f72585', '#b5179e', '#7209b7'];
      case 'solar': return ['#f6d365', '#fda085', '#f5576c'];
      case 'crimson': return ['#ff0844', '#ff4d6d', '#ffb199'];
      default: return ['#00f2fe', '#4facfe', '#9d4edd'];
    }
  }

  // 2D Canvas State
  let ctx2D = null;
  let particles2DArray = [];
  let animFrame2DId = null;
  let matrixDrops = [];
  const matrixChars = '01SATRIA01DEV<>/#*&{}[]!@';
  const matrixFontSize = 14;
  let stars2DArray = [];
  let isHeroSectionInView = true;
  const heroSectionEl = document.getElementById('hero');

  // --------------------------------------------------------------------------
  // LOGIKA 2D CANVAS (Constellation, Matrix, Starfield)
  // --------------------------------------------------------------------------
  function init2DMode(mode) {
    if (animFrame2DId) {
      cancelAnimationFrame(animFrame2DId);
      animFrame2DId = null;
    }
    if (!canvas) return;
    ctx2D = canvas.getContext('2d');
    if (!ctx2D) return;

    function resize2D() {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    resize2D();

    particles2DArray = [];
    matrixDrops = [];
    stars2DArray = [];

    if (mode === 'constellation') {
      const count = Math.min(Math.max(Math.floor((canvas.width * canvas.height) / 14000), 25), 70);
      for (let i = 0; i < count; i++) {
        particles2DArray.push(new ConstellationParticle2D());
      }
    } else if (mode === 'matrix') {
      const cols = Math.floor(canvas.width / matrixFontSize);
      for (let i = 0; i < cols; i++) matrixDrops[i] = Math.random() * -100;
    } else if (mode === 'starfield') {
      const num = Math.min(Math.floor((canvas.width * canvas.height) / 7000), 120);
      for (let i = 0; i < num; i++) {
        stars2DArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.8 + 0.5,
          speed: Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
    }

    if (mode !== 'none') {
      animate2D(mode);
    } else {
      ctx2D.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  class ConstellationParticle2D {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      const colors = getThemeColors();
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
      ctx2D.beginPath();
      ctx2D.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx2D.fillStyle = this.color;
      ctx2D.globalAlpha = this.opacity;
      ctx2D.fill();
      ctx2D.globalAlpha = 1;
    }
  }

  function animate2D(mode) {
    if (!ctx2D || !isHeroSectionInView || mode === 'none') return;
    ctx2D.clearRect(0, 0, canvas.width, canvas.height);

    if (mode === 'constellation') {
      particles2DArray.forEach(p => { p.update(); p.draw(); });
      const strokeColor = getThemeColors()[0];
      for (let a = 0; a < particles2DArray.length; a++) {
        for (let b = a + 1; b < particles2DArray.length; b++) {
          const dx = particles2DArray[a].x - particles2DArray[b].x;
          const dy = particles2DArray[a].y - particles2DArray[b].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx2D.strokeStyle = strokeColor;
            ctx2D.globalAlpha = (1 - (dist / 110)) * 0.18;
            ctx2D.lineWidth = 0.8;
            ctx2D.beginPath();
            ctx2D.moveTo(particles2DArray[a].x, particles2DArray[a].y);
            ctx2D.lineTo(particles2DArray[b].x, particles2DArray[b].y);
            ctx2D.stroke();
            ctx2D.globalAlpha = 1;
          }
        }
      }
    } else if (mode === 'matrix') {
      ctx2D.fillStyle = 'rgba(8, 9, 14, 0.12)';
      ctx2D.fillRect(0, 0, canvas.width, canvas.height);
      ctx2D.fillStyle = getThemeColors()[0];
      ctx2D.font = `${matrixFontSize}px monospace`;
      for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx2D.fillText(text, i * matrixFontSize, matrixDrops[i] * matrixFontSize);
        if (matrixDrops[i] * matrixFontSize > canvas.height && Math.random() > 0.975) matrixDrops[i] = 0;
        matrixDrops[i]++;
      }
    } else if (mode === 'starfield') {
      const colors = getThemeColors();
      stars2DArray.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx2D.beginPath();
        ctx2D.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx2D.fillStyle = colors[0];
        ctx2D.globalAlpha = star.opacity;
        ctx2D.fill();
        ctx2D.globalAlpha = 1;
      });
    }

    animFrame2DId = requestAnimationFrame(() => animate2D(mode));
  }

  // --------------------------------------------------------------------------
  // KONTROL MODE KANVAS
  // --------------------------------------------------------------------------
  function setParticleMode(mode) {
    currentParticleMode = mode;
    localStorage.setItem('satria_particle_mode', mode);

    // Update UI Status Button
    document.querySelectorAll('.particle-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-particle-mode') === mode);
    });

    init2DMode(mode);
  }

  // Alias kompatibilitas
  function set3DMode(mode) {
    if (['cybercore', 'galaxy'].includes(mode)) mode = 'constellation';
    setParticleMode(mode);
  }

  function initParticles() {
    setParticleMode(currentParticleMode);
  }

  // Sinkronisasi Warna Tema Realtime ke Kanvas
  window.updateParticleColors = (themeName) => {
    if (currentParticleMode !== 'none') {
      init2DMode(currentParticleMode);
    }
  };

  // Resize Handler
  window.addEventListener('resize', () => {
    if (currentParticleMode !== 'none') {
      init2DMode(currentParticleMode);
    }
  });

  // Observer Performa (Hentikan Render saat Hero Keluar Layar)
  if (heroSectionEl && 'IntersectionObserver' in window) {
    const heroPerfObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroSectionInView = entry.isIntersecting;
        if (isHeroSectionInView) {
          if (currentParticleMode !== 'none' && !animFrame2DId) {
            init2DMode(currentParticleMode);
          }
        } else if (animFrame2DId) {
          cancelAnimationFrame(animFrame2DId);
          animFrame2DId = null;
        }
      });
    }, { threshold: 0.05 });
    heroPerfObserver.observe(heroSectionEl);
  }

  // Inisialisasi Mode Awal
  initParticles();

  // Mode Selector Handlers dari Drawer Settings
  document.querySelectorAll('.particle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-particle-mode');
      setParticleMode(mode);
      if (playSound && playSound.success) playSound.success();
    });
  });

  // --------------------------------------------------------------------------
  // 3. SCROLL PROGRESS BAR, SCROLLSPY & BACK TO TOP
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const btnBackToTop = document.getElementById('btnBackToTop');
  const progressRingIndicator = document.getElementById('progressRingIndicator');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollFraction = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const progressPercent = Math.min(Math.max(scrollFraction * 100, 0), 100);

    // Top Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // Circular Ring Progress Back-to-Top
    if (progressRingIndicator) {
      const circumference = 2 * Math.PI * 21; // r = 21 -> ~132
      const offset = circumference - (scrollFraction * circumference);
      progressRingIndicator.style.strokeDashoffset = offset;
    }

    if (btnBackToTop) {
      if (scrollTop > 300) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    }

    // Navbar Scrolled State
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy
    const scrollPos = scrollTop + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 4. LIVE DIGITAL CLOCK (Ruteng, NTT - WITA UTC+8)
  // --------------------------------------------------------------------------
  const localClockEl = document.getElementById('localClock');
  function updateRutengClock() {
    if (!localClockEl) return;
    try {
      // Zona Waktu WITA: Asia/Makassar
      const now = new Date();
      const options = { timeZone: 'Asia/Makassar', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const timeStr = new Intl.DateTimeFormat('id-ID', options).format(now);
      localClockEl.textContent = `${timeStr} WITA`;
    } catch (e) {
      const now = new Date();
      localClockEl.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WITA`;
    }
  }
  updateRutengClock();
  setInterval(updateRutengClock, 1000);

  // --------------------------------------------------------------------------
  // 5. ANIMATED STATS COUNTERS DI HERO SECTION
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateHeroStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    statNumbers.forEach(numEl => {
      const target = parseInt(numEl.getAttribute('data-target'), 10);
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          numEl.textContent = target;
          clearInterval(timer);
        } else {
          numEl.textContent = count;
        }
      }, 35);
    });
  }

  // Observer untuk Stats
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateHeroStats();
        statObserver.disconnect();
      }
    }, { threshold: 0.2 });
    statObserver.observe(heroSection);
  } else {
    animateHeroStats();
  }

  // --------------------------------------------------------------------------
  // 6. TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'Front-End Specialist',
      'Creative Web Architect',
      'UI/UX Design Craftsman',
      'Digital Experience Engineer'
    ];
    let pIdx = 0;
    let cIdx = 0;
    let deleting = false;

    function runTypewriter() {
      const cur = phrases[pIdx];
      if (deleting) {
        typewriterElement.textContent = cur.substring(0, cIdx - 1);
        cIdx--;
      } else {
        typewriterElement.textContent = cur.substring(0, cIdx + 1);
        cIdx++;
      }

      let speed = deleting ? 40 : 90;
      if (!deleting && cIdx === cur.length) {
        speed = 2000;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        speed = 400;
      }
      setTimeout(runTypewriter, speed);
    }
    runTypewriter();
  }

  // --------------------------------------------------------------------------
  // 7. SPOTLIGHT COMMAND PALETTE (Ctrl+K / Cmd+K)
  // --------------------------------------------------------------------------
  const cmdPaletteModal = document.getElementById('commandPaletteModal');
  const cmdPaletteBackdrop = document.getElementById('cmdPaletteBackdrop');
  const btnOpenSearch = document.getElementById('btnOpenSearch');
  const cmdInput = document.getElementById('cmdInput');
  const cmdResultsList = document.getElementById('cmdResultsList');

  function openCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.add('active');
    cmdPaletteModal.setAttribute('aria-hidden', 'false');
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    filterCmdItems('');
    playSound.click();
  }

  function closeCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.remove('active');
    cmdPaletteModal.setAttribute('aria-hidden', 'true');
  }

  if (btnOpenSearch) btnOpenSearch.addEventListener('click', openCommandPalette);
  if (cmdPaletteBackdrop) cmdPaletteBackdrop.addEventListener('click', closeCommandPalette);

  // Shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteModal && cmdPaletteModal.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
      closeTerminalModal();
      closeCaseStudy();
      closeSettingsDrawer();
    }
  });

  // Filter Command Items
  function filterCmdItems(query) {
    if (!cmdResultsList) return;
    const items = cmdResultsList.querySelectorAll('.cmd-item');
    const q = query.toLowerCase().trim();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterCmdItems(e.target.value);
    });
  }

  // Execute Command Action
  if (cmdResultsList) {
    cmdResultsList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (!item) return;
      const action = item.getAttribute('data-action');
      const target = item.getAttribute('data-target');

      closeCommandPalette();

      if (action === 'goto' && target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'terminal') {
        openTerminalModal();
      } else if (action === 'theme-drawer') {
        openSettingsDrawer();
      } else if (action === 'toggle-music') {
        togglePlay();
      } else if (action === 'download-cv') {
        showToast('Resume Satria Pratama (PDF) siap diunduh dalam versi produksi!', 'info');
      } else if (action === 'copy-email') {
        navigator.clipboard.writeText('satriajehadu@gmail.com');
        showToast('Alamat email disalin ke clipboard: satriajehadu@gmail.com', 'success');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. SATRIA OS DEVELOPER TERMINAL (CLI INTERACTION)
  // --------------------------------------------------------------------------
  const terminalModal = document.getElementById('terminalModal');
  const terminalBackdrop = document.getElementById('terminalBackdrop');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const btnTermClose = document.getElementById('btnTermClose');
  const btnTermClear = document.getElementById('btnTermClear');
  const btnOpenTerminal = document.getElementById('btnOpenTerminal');
  const btnHeroTerminal = document.getElementById('btnHeroTerminal');
  const btnOpenTerminalAbout = document.getElementById('btnOpenTerminalAbout');

  let termHistory = [];
  let termHistoryIdx = -1;

  function openTerminalModal() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    terminalModal.setAttribute('aria-hidden', 'false');
    if (terminalInput) terminalInput.focus();
    playSound.click();
  }

  function closeTerminalModal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.setAttribute('aria-hidden', 'true');
  }

  if (btnOpenTerminal) btnOpenTerminal.addEventListener('click', openTerminalModal);
  if (btnHeroTerminal) btnHeroTerminal.addEventListener('click', openTerminalModal);
  if (btnOpenTerminalAbout) btnOpenTerminalAbout.addEventListener('click', openTerminalModal);
  if (btnTermClose) btnTermClose.addEventListener('click', closeTerminalModal);
  if (terminalBackdrop) terminalBackdrop.addEventListener('click', closeTerminalModal);

  if (btnTermClear) {
    btnTermClear.addEventListener('click', () => {
      terminalBody.innerHTML = '<div class="term-line term-dim">Konsol dibersihkan. Ketik <span class="term-highlight">help</span> untuk bantuan.</div>';
    });
  }

  function printTermLine(htmlContent, className = 'term-line') {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = htmlContent;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Command Execution Engine
  function execTermCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    termHistory.push(cmd);
    termHistoryIdx = termHistory.length;

    // Echo input
    printTermLine(`<span class="term-user">satria</span>@<span class="term-host">portfolio</span>:~$ ${cmd}`);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    switch (mainCmd) {
      case 'help':
        printTermLine(`
<div class="term-dim">Daftar perintah yang didukung:</div>
- <span class="term-highlight">about</span> : Ringkasan biodata & profil
- <span class="term-highlight">skills</span> : Daftar keahlian & tingkat penguasaan
- <span class="term-highlight">projects</span> : Menampilkan portofolio pilihan
- <span class="term-highlight">contact</span> : Menampilkan surel & saluran kontak
- <span class="term-highlight">theme &lt;cyan|matrix|violet|solar|crimson&gt;</span> : Mengubah tema warna
- <span class="term-highlight">particle &lt;constellation|matrix|starfield|none&gt;</span> : Mengubah mode animasi latar
- <span class="term-highlight">music &lt;play|pause|next&gt;</span> : Kontrol pemutar audio lo-fi
- <span class="term-highlight">time</span> : Cek zona waktu dunia
- <span class="term-highlight">fetch</span> : Spesifikasi sistem pengembang
- <span class="term-highlight">family</span> : Urutan 6 anggota keluarga & orang rumah
- <span class="term-highlight">clear</span> : Bersihkan layar terminal
- <span class="term-highlight">exit</span> : Tutup jendela terminal
        `);
        break;

      case 'about':
        printTermLine(`
<strong>Frederich Satria Pratama Putra Jehadu</strong>
Domisili: Ruteng, Manggarai, NTT, Indonesia
Pendidikan: Sistem Informasi (Software & UX)
Fokus: Frontend Architecture, 60fps Micro-interactions, Glassmorphism, Clean Code.
        `);
        break;

      case 'skills':
        printTermLine(`
<span class="term-green">HTML5 / Semantic:</span> [====================] 98%
<span class="term-green">Modern CSS / Grid:</span> [=================== ] 96%
<span class="term-green">JavaScript ES6+:</span>   [=================== ] 94%
<span class="term-green">React / Vite:</span>      [==================  ] 90%
<span class="term-green">UI/UX & Figma:</span>     [=================== ] 95%
<span class="term-green">Performance / SEO:</span> [==================  ] 91%
        `);
        break;

      case 'projects':
        printTermLine(`
1. Aether Financial Dashboard (UI/UX & WebGL)
2. Neon Geometry & Void (Fotografi & Arsitektur)
3. Fluidity Dimension 01 (Creative Tech 3D)
4. SmartPulse Mobile Ecosystem (Mobile UI)
5. Cybernetic Synth Lab (Web Audio Project)
6. Midnight Metropolis (Urban Cyber Photography)
7. LuxeCraft Brand Experience (E-Commerce)
8. Solitude & Light Ray (Minimalist Study)
<span class="term-dim">Ketik: <span class="term-highlight">goto portfolio</span> untuk melihat galeri visual.</span>
        `);
        break;

      case 'family':
      case 'keluarga':
        printTermLine(`
<span class="term-highlight">DAFTAR URUTAN ANGGOTA KELUARGA & ORANG RUMAH:</span>
------------------------------------------------------------
1. <strong>Kristo Candra Jehadu</strong> (Ayah / Kepala Keluarga)
   Laki-laki • Lahir: 1981 (${new Date().getFullYear() - 1981} Thn) • Wiraswasta
2. <strong>Maria Alosyia Hadiawisudah Dandut</strong> (Ibu Rumah Tangga)
   Perempuan • Lahir: 1981 (${new Date().getFullYear() - 1981} Thn) • ASN (Aparatur Sipil Negara)
3. <strong>Yustina Vania Ghaisani Jehadu</strong> (Anak Pertama / Sulung)
   Perempuan • Lahir: 2002 (${new Date().getFullYear() - 2002} Thn) • ASN (Aparatur Sipil Negara)
4. <strong>Magareta Nesa Ghaisani Jehadu</strong> (Anak Kedua)
   Perempuan • Lahir: 2005 (${new Date().getFullYear() - 2005} Thn) • Mahasiswa
5. <strong>Frederich Satria Pratama Putra Jehadu</strong> (Anak Ketiga / Laki-laki Tunggal)
   Laki-laki • Lahir: 2007 (${new Date().getFullYear() - 2007} Thn) • Front-End Dev & UI/UX
6. <strong>Gabriela Marcelina Jehadu</strong> (Anak Keempat / Bungsu)
   Perempuan • Lahir: 2008 (${new Date().getFullYear() - 2008} Thn) • Mahasiswa
------------------------------------------------------------
<span class="term-dim">Ketik <span class="term-highlight">goto family</span> di command palette untuk melihat di halaman.</span>
        `);
        break;

      case 'contact':
        printTermLine(`
Email: <a href="mailto:satriajehadu@gmail.com" class="text-accent">satriajehadu@gmail.com</a>
WhatsApp: +62 812-3456-7890
Status: Terbuka untuk freelance & kolaborasi proyek baru.
        `);
        break;

      case 'theme':
        if (['cyan', 'matrix', 'violet', 'solar', 'crimson'].includes(arg)) {
          setTheme(arg);
          printTermLine(`<span class="term-green">Tema berhasil diubah ke: ${arg}</span>`);
        } else {
          printTermLine(`<span class="text-danger">Pilihan tema tidak valid. Gunakan: cyan, matrix, violet, solar, atau crimson</span>`);
        }
        break;

      case '3d':
        printTermLine('<span class="term-dim">Fitur 3D WebGL telah dinonaktifkan sesuai preferensi antarmuka. Gunakan perintah <span class="term-highlight">particle</span> untuk efek animasi latar.</span>');
        break;

      case 'particle':
        if (['constellation', 'matrix', 'starfield', 'none'].includes(arg)) {
          setParticleMode(arg);
          printTermLine(`<span class="term-green">Mode latar diubah ke: ${arg}</span>`);
        } else {
          printTermLine(`<span class="text-danger">Gunakan: constellation, matrix, starfield, atau none</span>`);
        }
        break;

      case 'music':
        if (arg === 'play') { playAudio(); printTermLine('Memutar musik...'); }
        else if (arg === 'pause') { pauseAudio(); printTermLine('Musik dijeda.'); }
        else if (arg === 'next') { nextTrack(); printTermLine('Melompat ke trek berikutnya.'); }
        else { printTermLine('Perintah: music play | music pause | music next'); }
        break;

      case 'game':
        printTermLine('<span class="term-dim">Fitur game arcade telah dinonaktifkan.</span>');
        break;

      case 'time':
        const now = new Date();
        printTermLine(`
Ruteng (WITA): ${new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)}
Jakarta (WIB): ${new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)}
Tokyo (JST):   ${new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)}
London (GMT):  ${new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)}
        `);
        break;

      case 'fetch':
        printTermLine(`
<span class="term-highlight">satria@portfolio</span>
-----------------------
<strong>OS:</strong> Web Engine / Modern Browser
<strong>Host:</strong> Satria Pratama Digital Studio
<strong>Kernel:</strong> Vanilla JS ES6+ (0 Dependencies)
<strong>Uptime:</strong> 99.99% Cloudflare / GitHub Pages
<strong>Shell:</strong> zsh / satria-term v2.4
<strong>Resolution:</strong> ${window.innerWidth}x${window.innerHeight}
<strong>Theme:</strong> ${rootHtml.getAttribute('data-theme') || 'cyan'}
<strong>Status:</strong> Ready for Hire
        `);
        break;

      case 'clear':
        terminalBody.innerHTML = '';
        break;

      case 'exit':
        closeTerminalModal();
        break;

      case 'sudo':
        printTermLine(`<span class="text-danger">Izin ditolak: Anda tidak memiliki akses root, tetapi Anda dipersilakan mengontrak Satria!</span>`);
        break;

      default:
        printTermLine(`<span class="text-danger">Perintah tidak dikenali: '${mainCmd}'. Ketik <span class="term-highlight">help</span> untuk daftar bantuan.</span>`);
    }
    playSound.click();
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        execTermCommand(terminalInput.value);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (termHistory.length > 0 && termHistoryIdx > 0) {
          termHistoryIdx--;
          terminalInput.value = termHistory[termHistoryIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (termHistoryIdx < termHistory.length - 1) {
          termHistoryIdx++;
          terminalInput.value = termHistory[termHistoryIdx];
        } else {
          termHistoryIdx = termHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. INTERACTIVE SKILLS MATRIX & CODE PLAYGROUND
  // --------------------------------------------------------------------------
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillSearchInput = document.getElementById('skillSearchInput');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorLevel = document.getElementById('inspectorLevel');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorCode = document.getElementById('inspectorCode');
  const codeLang = document.getElementById('codeLang');
  const btnCopyInspectorCode = document.getElementById('btnCopyInspectorCode');

  // Database Code Snippets untuk Tech Inspector
  const skillSnippets = {
    html5: {
      title: 'Semantic HTML5 Architecture',
      level: 'Tingkat Penguasaan: 98%',
      desc: 'Penataan hierarki semantik menggunakan elemen landmark (main, nav, article, aside) yang menjamin skor aksesibilitas Lighthouse 100 dan indeks SEO maksimal.',
      lang: 'HTML5 Semantik',
      code: `<article class="project-showcase" role="region" aria-labelledby="proj-heading">
  <header class="showcase-header">
    <h2 id="proj-heading">Aether Financial</h2>
    <span class="badge" aria-label="Kategori UI">Fintech</span>
  </header>
  <main class="showcase-visuals">
    <img src="dashboard.webp" alt="Dashboard Analitik" loading="lazy">
  </main>
</article>`
    },
    css3: {
      title: 'Modern CSS & Grid Architecture',
      level: 'Tingkat Penguasaan: 96%',
      desc: 'Implementasi layout adaptif masa depan menggunakan CSS Subgrid, Container Queries, dan HSL custom variables yang menghasilkan tampilan responsif tanpa ketergantungan framework berat.',
      lang: 'CSS Modern',
      code: `.responsive-glass-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1rem, 2.5vw, 2.5rem);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 242, 254, 0.25);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}`
    },
    javascript: {
      title: 'Vanilla JavaScript (ES6+ Engine)',
      level: 'Tingkat Penguasaan: 94%',
      desc: 'Pemrograman logika reaktif tanpa framework, manipulasi DOM berbasis virtualisasi batching, Web Audio API synthesizer, dan arsitektur Event-Driven terstruktur.',
      lang: 'JavaScript ES6+',
      code: `export class ReactiveState {
  constructor(initialData = {}) {
    this.listeners = new Set();
    this.state = new Proxy(initialData, {
      set: (target, key, val) => {
        target[key] = val;
        this.listeners.forEach(cb => cb(this.state));
        return true;
      }
    });
  }
}`
    },
    react: {
      title: 'React.js & Vite Ecosystem',
      level: 'Tingkat Penguasaan: 90%',
      desc: 'Pengembangan Single Page Application (SPA) modular, manajemen custom hooks untuk sinkronisasi data cache, dan integrasi bundler Vite dengan HMR instan.',
      lang: 'React & TypeScript',
      code: `export const useThemeEngine = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'cyan');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return { theme, toggleTheme: (t) => setTheme(t) };
};`
    },
    figma: {
      title: 'Figma UI/UX & Design Systems',
      level: 'Tingkat Penguasaan: 95%',
      desc: 'Perancangan atomic design tokens, autolayout multi-viewport, wireframing interaktif, dan pedoman gaya yang siap diimplementasikan langsung ke kode nyata.',
      lang: 'Figma Token Schema',
      code: `{
  "color": {
    "neon": { "cyan": "#00f2fe", "purple": "#9d4edd" },
    "surface": { "glass": "rgba(21, 24, 38, 0.65)" }
  },
  "motion": {
    "smooth": "cubic-bezier(0.16, 1, 0.3, 1)"
  }
}`
    },
    canvas: {
      title: 'HTML5 Canvas 2D & Creative Code',
      level: 'Tingkat Penguasaan: 88%',
      desc: 'Pembuatan partikel visual fisika 60fps, efek gelombang audio equalizer, dan game arcade ringan menggunakan requestAnimationFrame loop murni.',
      lang: 'HTML5 Canvas API',
      code: `function renderParticleLoop() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  });
  requestAnimationFrame(renderParticleLoop);
}`
    },
    git: {
      title: 'Git, GitHub & CI/CD Pipeline',
      level: 'Tingkat Penguasaan: 92%',
      desc: 'Manajemen alur kerja Git Flow yang rapi, semantic commit messages, penyelesaian konflik merge, dan deployment otomatis tanpa downtime.',
      lang: 'Git CLI Workflow',
      code: `git checkout -b feature/interactive-terminal
git commit -m "feat(terminal): add command history and theme switcher"
git push origin feature/interactive-terminal`
    },
    perf: {
      title: 'Core Web Vitals & Performance Tuning',
      level: 'Tingkat Penguasaan: 91%',
      desc: 'Audit komprehensif performa: eliminasi render-blocking assets, font display swap, decoding gambar asinkron, dan pencapaian 99+ skor Lighthouse.',
      lang: 'Performance Audit',
      code: `// Metric Target Standards:
LCP (Largest Contentful Paint) < 1.2s
FID (First Input Delay)       < 50ms
CLS (Cumulative Layout Shift) < 0.02
Performance Score             = 99/100`
    }
  };

  function updateInspector(skillKey) {
    const data = skillSnippets[skillKey] || skillSnippets.css3;
    if (inspectorTitle) inspectorTitle.textContent = data.title;
    if (inspectorLevel) inspectorLevel.textContent = data.level;
    if (inspectorDesc) inspectorDesc.textContent = data.desc;
    if (codeLang) codeLang.textContent = data.lang;
    if (inspectorCode) inspectorCode.textContent = data.code;
  }

  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      skillCards.forEach(c => c.classList.remove('active-inspect'));
      card.classList.add('active-inspect');
      const name = card.getAttribute('data-name');
      updateInspector(name);
      playSound.click();
    });
  });

  // Filter Keahlian
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search Filter Keahlian
  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      skillCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Copy Code Button
  if (btnCopyInspectorCode && inspectorCode) {
    btnCopyInspectorCode.addEventListener('click', () => {
      navigator.clipboard.writeText(inspectorCode.textContent);
      showToast('Kode berhasil disalin ke clipboard!', 'success');
      playSound.success();
    });
  }

  // --------------------------------------------------------------------------
  // 10. CAREER & EDUCATION JOURNEY TIMELINE FILTERING
  // --------------------------------------------------------------------------
  const tlFilterBtns = document.querySelectorAll('.tl-filter-btn');
  const tlNodes = document.querySelectorAll('.timeline-node');

  tlFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tlFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-tl-filter');

      tlNodes.forEach(node => {
        const type = node.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
      });
      playSound.click();
    });
  });

  // --------------------------------------------------------------------------
  // 11. ENHANCED PORTFOLIO & INTERACTIVE PROJECT CASE STUDY
  // --------------------------------------------------------------------------
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseStudyBackdrop = document.getElementById('caseStudyBackdrop');
  const caseStudyClose = document.getElementById('caseStudyClose');
  const csTitle = document.getElementById('csTitle');
  const csCatBadge = document.getElementById('csCatBadge');
  const csProblem = document.getElementById('csProblem');
  const csSolution = document.getElementById('csSolution');
  const csHeroImg = document.getElementById('csHeroImg');
  const csCodeSnippet = document.getElementById('csCodeSnippet');
  const csTabBtns = document.querySelectorAll('.cs-tab-btn');
  const csTabPanes = document.querySelectorAll('.cs-tab-pane');
  const btnRunDemoSimulation = document.getElementById('btnRunDemoSimulation');
  const demoOutputScreen = document.getElementById('demoOutputScreen');

  // Database Proyek untuk Case Study
  const caseStudies = {
    1: {
      title: 'Aether Financial Dashboard',
      cat: 'UI/UX & Web Architecture',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
      problem: 'Klien membutuhkan antarmuka analitik keuangan berskala enterprise yang dapat memproses jutaan transaksi per detik tanpa penurunan performa visual, sekaligus mempertahankan estetika neon glow yang elegan untuk trader aktif.',
      solution: 'Kami merancang arsitektur antarmuka berbasis Vanilla JS dan WebGL visualizer dengan virtualisasi tabel DOM, menghilangkan lag rendering dan mencapai frame rate stabil 60fps.',
      code: `// Modul Data Stream Virtualizer
export class DataStreamEngine {
  constructor(socketUrl, chartInstance) {
    this.socket = new WebSocket(socketUrl);
    this.chart = chartInstance;
    this.buffer = [];
  }
  syncFrame() {
    requestAnimationFrame(() => this.chart.render(this.buffer));
  }
}`
    },
    2: {
      title: 'Neon Geometry & Void',
      cat: 'Creative Photography & Visual Architecture',
      img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
      problem: 'Dokumentasi fotografi arsitektur perkotaan modern yang membutuhkan penangkapan rentang dinamis tinggi (HDR) di bawah pencahayaan malam ekstrem tanpa noise visual berlebihan.',
      solution: 'Teknik long-exposure berpresisi multi-shot dengan grading warna neon cyberpunk yang diselaraskan dengan estetika desain digital portofolio.',
      code: `// Profil Grading Warna Sinematik
const colorGradingMatrix = {
  highlights: '#00f2fe',
  shadows: '#08090e',
  midtones: '#9d4edd',
  contrastRatio: 1.45
};`
    },
    3: {
      title: 'Fluidity Dimension 01',
      cat: 'Creative Tech & 3D Shaders',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
      problem: 'Merender grafis fluida digital interaktif di browser web pengguna tanpa membebani GPU perangkat berdaya rendah.',
      solution: 'Menggunakan fragment shader GLSL ringan dengan algoritma Perlin Noise sintetis yang dioptimalkan untuk respons pointer mouse secara real-time.',
      code: `// Fragment Shader Perlin Noise
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  gl_FragColor = vec4(sin(st.x + u_time), cos(st.y), 1.0, 1.0);
}`
    },
    4: {
      title: 'SmartPulse Mobile Ecosystem',
      cat: 'UI/UX Mobile Design System',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop',
      problem: 'Pengguna kesulitan mengontrol banyak perangkat smart home ketika menggunakan smartphone dengan satu tangan di situasi minim cahaya.',
      solution: 'Perancangan antarmuka adaptif dengan navigasi Bottom Thumb-Zone ergonomis, feedback getar haptic, dan kontras tema gelap otomatis.',
      code: `// Ergonomic Thumb-Zone Layout
.smart-control-dock {
  position: fixed;
  bottom: 0;
  height: 45vh;
  touch-action: pan-y;
  padding-bottom: env(safe-area-inset-bottom);
}`
    }
  };

  function openCaseStudy(projId) {
    const data = caseStudies[projId] || caseStudies[1];
    if (csTitle) csTitle.textContent = data.title;
    if (csCatBadge) csCatBadge.textContent = data.cat;
    if (csHeroImg) {
      csHeroImg.src = data.img;
      csHeroImg.alt = data.title;
    }
    if (csProblem) csProblem.textContent = data.problem;
    if (csSolution) csSolution.textContent = data.solution;
    if (csCodeSnippet) csCodeSnippet.textContent = data.code;

    // Reset tab to overview
    csTabBtns.forEach(b => b.classList.remove('active'));
    csTabPanes.forEach(p => p.classList.remove('active'));
    const firstTab = document.querySelector('[data-cs-tab="overview"]');
    const firstPane = document.getElementById('csPane-overview');
    if (firstTab) firstTab.classList.add('active');
    if (firstPane) firstPane.classList.add('active');

    if (caseStudyModal) {
      caseStudyModal.classList.add('active');
      caseStudyModal.setAttribute('aria-hidden', 'false');
    }
    playSound.click();
  }

  function closeCaseStudy() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('active');
    caseStudyModal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openCaseStudy(projId);
    });
  });

  if (caseStudyClose) caseStudyClose.addEventListener('click', closeCaseStudy);
  if (caseStudyBackdrop) caseStudyBackdrop.addEventListener('click', closeCaseStudy);

  // Case Study Tab Switching
  csTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      csTabBtns.forEach(b => b.classList.remove('active'));
      csTabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabName = btn.getAttribute('data-cs-tab');
      const targetPane = document.getElementById(`csPane-${tabName}`);
      if (targetPane) targetPane.classList.add('active');
      playSound.click();
    });
  });

  // Interactive Demo Simulation inside Case Study
  if (btnRunDemoSimulation && demoOutputScreen) {
    btnRunDemoSimulation.addEventListener('click', () => {
      demoOutputScreen.innerHTML = `
        <div style="width: 100%; text-align: left;">
          <div style="color: #34d399; font-weight: bold; margin-bottom: 6px;">[Engine 60fps Active]</div>
          <div>Rendering: 120 FPS target (VSync synchronized)</div>
          <div>Memory footprint: 14.2 MB</div>
          <div style="margin-top: 6px; background: rgba(0, 242, 254, 0.1); padding: 8px; border-radius: 4px; color: #00f2fe;">
            Simulation pass: All component metrics within nominal tolerances!
          </div>
        </div>
      `;
      playSound.success();
    });
  }

  // --------------------------------------------------------------------------
  // 12. URUTAN ANGGOTA KELUARGA & ORANG RUMAH (INTERACTIVE FAMILY DIRECTORY)
  // --------------------------------------------------------------------------
  const familyFilterPills = document.querySelectorAll('#familyFilterGroup .fam-pill-btn');
  const familySearchInput = document.getElementById('familySearchInput');
  const familyClearSearch = document.getElementById('familyClearSearch');
  const familySortSelect = document.getElementById('familySortSelect');
  const familyGrid = document.getElementById('familyGrid');
  const familyEmptyState = document.getElementById('familyEmptyState');
  const btnResetFamilySearch = document.getElementById('btnResetFamilySearch');
  const familyDetailModal = document.getElementById('familyDetailModal');
  const familyModalClose = document.getElementById('familyModalClose');
  const familyModalBackdrop = document.getElementById('familyModalBackdrop');
  const btnGreetFamilyMember = document.getElementById('btnGreetFamilyMember');

  // Database 6 Anggota Keluarga
  const familyMembersData = {
    1: {
      order: 1,
      name: 'Kristo Candra Jehadu',
      alias: 'Bapa Ito',
      gender: 'Laki-laki',
      genderClass: 'male',
      genderIcon: 'fa-mars',
      birthYear: 1981,
      role: 'Ayah / Kepala Rumah Tangga',
      roleBadge: 'role-head',
      roleIcon: 'fa-user-tie',
      profession: 'Wiraswasta',
      bloodType: 'A',
      zodiac: 'Capricorn ♑',
      avatarGlow: 'male-glow',
      avatarImg: 'ayah.jpg',
      initials: 'KJ',
      hobbies: ['Berkebun', 'Wiraswasta & Bisnis', 'Membaca Berita', 'Diskusi Kemasyarakatan'],
      quote: 'Disiplin, kejujuran, dan keteladanan orang tua adalah fondasi utama kehormatan keluarga.',
      greeting: 'Doa dan salam hormat terkirim untuk Bapa Kristo! Semoga senantiasa sehat, bijaksana, dan sukses dalam setiap usaha.'
    },
    2: {
      order: 2,
      name: 'Maria Alosyia Hadiawisudah Dandut',
      alias: 'Mama Wiss',
      gender: 'Perempuan',
      genderClass: 'female',
      genderIcon: 'fa-venus',
      birthYear: 1981,
      role: 'Ibu / Pengelola Rumah Tangga',
      roleBadge: 'role-mom',
      roleIcon: 'fa-person-dress',
      profession: 'ASN (Aparatur Sipil Negara)',
      bloodType: 'A',
      zodiac: 'Libra ♎',
      avatarGlow: 'female-glow',
      avatarImg: 'ibu.jpg',
      initials: 'MH',
      hobbies: ['Kuliner Khas Flores', 'Tanaman Hias', 'Menjahit', 'Menyanyi Rohani'],
      quote: 'Kasih sayang seorang ibu dan kehangatan rumah adalah tempat berlabuh teraman bagi anak-anak.',
      greeting: 'Salam hangat penuh cinta untuk Mama Wiss! Semoga selalu dilimpahi kesehatan dan sukacita dalam pengabdian sebagai ASN.'
    },
    3: {
      order: 3,
      name: 'Yustina Vania Ghaisani Jehadu',
      alias: 'Vania',
      gender: 'Perempuan',
      genderClass: 'female',
      genderIcon: 'fa-venus',
      birthYear: 2002,
      role: 'Anak Pertama (Sulung)',
      roleBadge: 'role-daughter',
      roleIcon: 'fa-person-dress',
      profession: 'ASN (Aparatur Sipil Negara)',
      bloodType: 'A',
      zodiac: 'Leo ♌',
      avatarGlow: 'female-glow',
      avatarImg: 'anak-pertama.jpg',
      initials: 'VG',
      hobbies: ['Fotografi Alam', 'Desain Interior', 'Gitar Akustik', 'Traveling'],
      quote: 'Menjadi anak sulung perempuan berarti memberi teladan ketulusan, mengayomi adik-adik, dan memikul tanggung jawab dengan bangga.',
      greeting: 'Salam semangat dan pengabdian untuk Kak Vania! Sukses selalu dalam kariernya sebagai ASN.'
    },
    4: {
      order: 4,
      name: 'Magareta Nesa Ghaisani Jehadu',
      alias: 'Nessa',
      gender: 'Perempuan',
      genderClass: 'female',
      genderIcon: 'fa-venus',
      birthYear: 2005,
      role: 'Anak Kedua (Kakak Perempuan)',
      roleBadge: 'role-daughter',
      roleIcon: 'fa-person-dress',
      profession: 'Mahasiswa',
      bloodType: 'A',
      zodiac: 'Scorpio ♏',
      avatarGlow: 'female-glow',
      avatarImg: 'anak-kedua.jpg',
      initials: 'MN',
      hobbies: ['Desain Grafis', 'Membaca Novel', 'Bulutangkis', 'Menulis Cerita'],
      quote: 'Kreativitas yang dipadukan dengan senyuman tulus akan selalu menebarkan keceriaan dan inspirasi bagi sekitar.',
      greeting: 'Salam sukses dan ceria untuk Nessa! Semoga studinya lancar dan selalu penuh inspirasi.'
    },
    5: {
      order: 5,
      name: 'Frederich Satria Pratama Putra Jehadu',
      alias: 'Satria (Laki-laki Tunggal)',
      gender: 'Laki-laki',
      genderClass: 'male',
      genderIcon: 'fa-mars',
      birthYear: 2007,
      role: 'Anak Ketiga (Laki-laki Tunggal)',
      roleBadge: 'role-satria',
      roleIcon: 'fa-laptop-code',
      profession: 'Front-End Developer & UI/UX Designer',
      bloodType: 'A',
      zodiac: 'Virgo ♍',
      avatarGlow: 'satria-glow',
      avatarImg: 'satria-profile.jpg',
      isSatria: true,
      hobbies: ['Creative Coding', 'Arcade Gaming', 'Desain UI/UX', 'Synth Music'],
      quote: 'Apa yang ditanam hari ini tumbuh jadi kekuatan di masa depan; sebagai satu-satunya anak laki-laki, tekad menjaga dan membanggakan keluarga adalah komitmen seumur hidup.',
      greeting: 'Maju terus Satria! Bangun karya web kelas dunia dan terus banggakan keluarga!'
    },
    6: {
      order: 6,
      name: 'Gabriela Marcelina Jehadu',
      alias: 'Marcela (Bungsu)',
      gender: 'Perempuan',
      genderClass: 'female',
      genderIcon: 'fa-venus',
      birthYear: 2008,
      role: 'Anak Keempat (Bungsu)',
      roleBadge: 'role-daughter',
      roleIcon: 'fa-person-dress',
      profession: 'Mahasiswa',
      bloodType: 'A',
      zodiac: 'Libra ♎',
      avatarGlow: 'female-glow',
      avatarImg: 'anak-keempat.jpg',
      initials: 'GM',
      hobbies: ['Seni Tari & Teater', 'Animasi Digital', 'Robotika', 'Kreativitas Sains'],
      quote: 'Semangat belajar hal baru dan rasa ingin tahu yang tinggi adalah kunci untuk meraih impian masa depan.',
      greeting: 'Semangat kuliah Marcela adik bungsu kesayangan keluarga! Raih cita-cita setinggi langit.'
    }
  };

  let activeMemberId = 1;
  let currentFamilyFilter = 'all';

  // Kalkulasi Umur Dinamis Berdasarkan Tahun Sekarang
  function updateFamilyAges() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.fam-calc-age').forEach(el => {
      const birth = parseInt(el.getAttribute('data-birth'), 10);
      if (birth && !isNaN(birth)) {
        const calculatedAge = currentYear - birth;
        el.textContent = `${calculatedAge} Tahun`;
      }
    });
  }
  updateFamilyAges();

  // Filter & Search Logic
  function applyFamilyFilters() {
    if (!familyGrid) return;
    const cards = familyGrid.querySelectorAll('.family-card');
    const query = familySearchInput ? familySearchInput.value.toLowerCase().trim() : '';

    if (familyClearSearch) {
      familyClearSearch.style.display = query ? 'block' : 'none';
    }

    let visibleCount = 0;

    cards.forEach(card => {
      const gender = card.getAttribute('data-gender');
      const group = card.getAttribute('data-group');
      const cardText = card.textContent.toLowerCase();

      // Check Category Filter
      let matchesCategory = false;
      if (currentFamilyFilter === 'all') matchesCategory = true;
      else if (currentFamilyFilter === 'male' && gender === 'male') matchesCategory = true;
      else if (currentFamilyFilter === 'female' && gender === 'female') matchesCategory = true;
      else if (currentFamilyFilter === 'parents' && group === 'parents') matchesCategory = true;
      else if (currentFamilyFilter === 'children' && group === 'children') matchesCategory = true;

      // Check Search Query
      const matchesSearch = !query || cardText.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (familyEmptyState) {
      familyEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter Pills Event Listeners
  familyFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      familyFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFamilyFilter = pill.getAttribute('data-filter') || 'all';
      applyFamilyFilters();
      playSound.click();
    });
  });

  // Search Input Listener
  if (familySearchInput) {
    familySearchInput.addEventListener('input', applyFamilyFilters);
  }

  if (familyClearSearch) {
    familyClearSearch.addEventListener('click', () => {
      if (familySearchInput) familySearchInput.value = '';
      applyFamilyFilters();
      playSound.click();
    });
  }

  if (btnResetFamilySearch) {
    btnResetFamilySearch.addEventListener('click', () => {
      currentFamilyFilter = 'all';
      familyFilterPills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
      });
      if (familySearchInput) familySearchInput.value = '';
      applyFamilyFilters();
      playSound.click();
    });
  }

  // Sorting Logic
  if (familySortSelect && familyGrid) {
    familySortSelect.addEventListener('change', () => {
      const val = familySortSelect.value;
      const cards = Array.from(familyGrid.querySelectorAll('.family-card'));

      cards.sort((a, b) => {
        const orderA = parseInt(a.getAttribute('data-order'), 10);
        const orderB = parseInt(b.getAttribute('data-order'), 10);
        const birthA = parseInt(a.getAttribute('data-birth'), 10);
        const birthB = parseInt(b.getAttribute('data-birth'), 10);
        const nameA = a.getAttribute('data-name') || '';
        const nameB = b.getAttribute('data-name') || '';

        if (val === 'order-asc') return orderA - orderB;
        if (val === 'age-desc') return birthA - birthB; // Lahir lebih awal = lebih tua
        if (val === 'age-asc') return birthB - birthA;  // Lahir lebih akhir = lebih muda
        if (val === 'name-asc') return nameA.localeCompare(nameB);
        return 0;
      });

      cards.forEach(card => familyGrid.appendChild(card));
      if (familyEmptyState) familyGrid.appendChild(familyEmptyState);
      playSound.click();
    });
  }

  // Modal Detail Anggota Keluarga
  function openFamilyModal(memberId) {
    const data = familyMembersData[memberId];
    if (!data || !familyDetailModal) return;

    activeMemberId = memberId;
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.birthYear;

    // Avatar Area
    const avatarArea = document.getElementById('modalFamAvatarArea');
    if (avatarArea) {
      if (data.avatarImg) {
        avatarArea.innerHTML = `
          <div class="family-avatar-wrap ${data.avatarGlow}">
            <img src="${data.avatarImg}" alt="${data.name}" class="fam-avatar-img">
            <span class="gender-icon-badge ${data.genderClass}"><i class="fa-solid ${data.genderIcon}"></i></span>
          </div>`;
      } else if (data.isSatria) {
        avatarArea.innerHTML = `
          <div class="family-avatar-wrap ${data.avatarGlow}">
            <img src="satria-profile.jpg" alt="${data.name}" class="fam-avatar-img">
            <span class="gender-icon-badge ${data.genderClass}"><i class="fa-solid ${data.genderIcon}"></i></span>
          </div>`;
      } else {
        avatarArea.innerHTML = `
          <div class="family-avatar-wrap ${data.avatarGlow}">
            <div class="avatar-initials">${data.initials}</div>
            <span class="gender-icon-badge ${data.genderClass}"><i class="fa-solid ${data.genderIcon}"></i></span>
          </div>`;
      }
    }

    // Heading & Badges
    const badgesArea = document.getElementById('modalFamBadges');
    if (badgesArea) {
      badgesArea.innerHTML = `
        <span class="order-badge"><i class="fa-solid fa-crown"></i> Urutan #${data.order}</span>
        <span class="role-badge ${data.roleBadge}"><i class="fa-solid ${data.roleIcon}"></i> ${data.role}</span>
      `;
    }

    const nameEl = document.getElementById('modalFamName');
    if (nameEl) nameEl.textContent = data.name;

    const aliasEl = document.getElementById('modalFamAlias');
    if (aliasEl) aliasEl.textContent = `"${data.alias}"`;

    // Info List
    const infoList = document.getElementById('modalFamInfoList');
    if (infoList) {
      infoList.innerHTML = `
        <div class="spec-line">
          <span class="label"><i class="fa-solid fa-venus-mars"></i> Jenis Kelamin:</span>
          <span class="val"><span class="gender-pill ${data.genderClass}"><i class="fa-solid ${data.genderIcon}"></i> ${data.gender}</span></span>
        </div>
        <div class="spec-line">
          <span class="label"><i class="fa-solid fa-sitemap"></i> Hubungan Keluarga:</span>
          <span class="val">${data.role}</span>
        </div>
        <div class="spec-line">
          <span class="label"><i class="fa-regular fa-calendar-days"></i> Tahun Kelahiran:</span>
          <span class="val val-accent">${data.birthYear}</span>
        </div>
        <div class="spec-line">
          <span class="label"><i class="fa-solid fa-hourglass-half"></i> Usia Saat Ini:</span>
          <span class="val val-accent">${age} Tahun</span>
        </div>
        <div class="spec-line">
          <span class="label"><i class="fa-solid fa-briefcase"></i> Profesi / Kegiatan:</span>
          <span class="val">${data.profession}</span>
        </div>
        <div class="spec-line">
          <span class="label"><i class="fa-solid fa-droplet"></i> Golongan Darah & Zodiak:</span>
          <span class="val">${data.bloodType} • ${data.zodiac}</span>
        </div>
      `;
    }

    // Hobbies
    const hobbiesArea = document.getElementById('modalFamHobbies');
    if (hobbiesArea) {
      hobbiesArea.innerHTML = data.hobbies.map(h => `<span class="fam-tag">${h}</span>`).join('');
    }

    // Quote
    const quoteEl = document.getElementById('modalFamQuote');
    if (quoteEl) quoteEl.textContent = data.quote;

    familyDetailModal.classList.add('active');
    familyDetailModal.setAttribute('aria-hidden', 'false');
    playSound.click();
  }

  function closeFamilyModal() {
    if (!familyDetailModal) return;
    familyDetailModal.classList.remove('active');
    familyDetailModal.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-open-fam-modal');
    if (btn) {
      const memberId = btn.getAttribute('data-member');
      openFamilyModal(memberId);
    }
  });

  if (familyModalClose) familyModalClose.addEventListener('click', closeFamilyModal);
  if (familyModalBackdrop) familyModalBackdrop.addEventListener('click', closeFamilyModal);

  if (btnGreetFamilyMember) {
    btnGreetFamilyMember.addEventListener('click', () => {
      const data = familyMembersData[activeMemberId];
      if (data) {
        showToast(data.greeting, 'success');
        playSound.success();
      }
      closeFamilyModal();
    });
  }

  // --------------------------------------------------------------------------
  // 14. CERTIFICATE MODAL VERIFICATION
  // --------------------------------------------------------------------------
  const certModal = document.getElementById('certificateModal');
  const certModalBackdrop = document.getElementById('certModalBackdrop');
  const certModalClose = document.getElementById('certModalClose');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalIssuer = document.getElementById('certModalIssuer');
  const certModalNumber = document.getElementById('certModalNumber');
  const certModalSkills = document.getElementById('certModalSkills');

  const certData = {
    1: {
      title: 'Menjadi Front-End Web Developer Expert',
      issuer: 'Dicoding Indonesia & IDCamp',
      number: 'CERT-FE-9921-2024',
      skills: 'Progressive Web Apps, Accessibility WCAG, Clean Architecture, Web Workers'
    },
    2: {
      title: 'Google UX Design Professional Certificate',
      issuer: 'Google Coursera Specialization',
      number: 'CERT-UX-7742-2023',
      skills: 'Design Sprints, Figma Interactive Prototypes, Usability Testing, Empathy Maps'
    },
    3: {
      title: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp International',
      number: 'CERT-JS-3310-2023',
      skills: 'Big-O Analysis, Recursion, Functional Programming, Data Structures'
    },
    4: {
      title: 'Cloud Computing Foundations & Web Deployment',
      issuer: 'AWS Educate & Cloud Academy',
      number: 'CERT-CLOUD-1099-2024',
      skills: 'Serverless Functions, S3 Storage, CDN CloudFront, DNS Routing'
    }
  };

  document.querySelectorAll('.btn-verify-cert').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cert');
      const data = certData[id] || certData[1];
      if (certModalTitle) certModalTitle.textContent = data.title;
      if (certModalIssuer) certModalIssuer.textContent = data.issuer;
      if (certModalNumber) certModalNumber.textContent = data.number;
      if (certModalSkills) certModalSkills.textContent = data.skills;

      if (certModal) certModal.classList.add('active');
      playSound.click();
    });
  });

  function closeCertModal() {
    if (certModal) certModal.classList.remove('active');
  }
  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

  // --------------------------------------------------------------------------
  // 17. FLOATING ACTION HUB (FAB) MENU
  // --------------------------------------------------------------------------
  const floatingActionHub = document.getElementById('floatingActionHub');
  const fabTrigger = document.getElementById('fabTrigger');
  const fabIcon = document.getElementById('fabIcon');
  const fabSearch = document.getElementById('fabSearch');
  const fabTerminal = document.getElementById('fabTerminal');
  const fabFamily = document.getElementById('fabFamily');
  const fabGame = document.getElementById('fabGame');
  const fabTheme = document.getElementById('fabTheme');

  if (fabTrigger && floatingActionHub) {
    fabTrigger.addEventListener('click', () => {
      const isOpen = floatingActionHub.classList.toggle('open');
      if (fabIcon) {
        fabIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bolt';
      }
      playSound.click();
    });
  }

  if (fabSearch) fabSearch.addEventListener('click', openCommandPalette);
  if (fabTerminal) fabTerminal.addEventListener('click', openTerminalModal);
  if (fabFamily) {
    fabFamily.addEventListener('click', () => {
      const sec = document.getElementById('family');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (fabTheme) fabTheme.addEventListener('click', openSettingsDrawer);

  // --------------------------------------------------------------------------
  // 18. SETTINGS DRAWER (VISUAL CUSTOMIZER)
  // --------------------------------------------------------------------------
  const settingsDrawer = document.getElementById('settingsDrawer');
  const btnOpenSettings = document.getElementById('btnOpenSettings');
  const btnSettingsClose = document.getElementById('btnSettingsClose');
  const btnResetThemeSettings = document.getElementById('btnResetThemeSettings');

  function openSettingsDrawer() {
    if (!settingsDrawer) return;
    settingsDrawer.classList.add('active');
    settingsDrawer.setAttribute('aria-hidden', 'false');
    playSound.click();
  }

  function closeSettingsDrawer() {
    if (!settingsDrawer) return;
    settingsDrawer.classList.remove('active');
    settingsDrawer.setAttribute('aria-hidden', 'true');
  }

  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettingsDrawer);
  if (btnSettingsClose) btnSettingsClose.addEventListener('click', closeSettingsDrawer);

  if (btnResetThemeSettings) {
    btnResetThemeSettings.addEventListener('click', () => {
      setTheme('cyan');
      currentParticleMode = 'constellation';
      localStorage.setItem('satria_particle_mode', 'constellation');
      isSoundEnabled = true;
      updateSoundUI();
      showToast('Pengaturan visual telah direset ke setelan awal.', 'info');
      playSound.success();
    });
  }

  // --------------------------------------------------------------------------
  // 19. LIGHTBOX PREVIEW MODAL
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let activeVisibleItems = [...galleryItems];
  let curLightIdx = 0;

  function openLightbox(index) {
    curLightIdx = index;
    const item = activeVisibleItems[index];
    if (!item) return;

    const img = item.querySelector('.gallery-img');
    const cat = item.querySelector('.item-category');
    const title = item.querySelector('.item-title');
    const desc = item.querySelector('.item-snippet');

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    if (lightboxCategory && cat) lightboxCategory.textContent = cat.textContent;
    if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
    if (lightboxDesc && desc) lightboxDesc.textContent = desc.textContent;

    if (lightboxModal) {
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    if (activeVisibleItems.length === 0) return;
    curLightIdx = (curLightIdx + 1) % activeVisibleItems.length;
    openLightbox(curLightIdx);
  }

  function prevLightbox() {
    if (activeVisibleItems.length === 0) return;
    curLightIdx = (curLightIdx - 1 + activeVisibleItems.length) % activeVisibleItems.length;
    openLightbox(curLightIdx);
  }

  document.querySelectorAll('.btn-lightbox').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentItem = btn.closest('.gallery-item');
      const itemIdx = activeVisibleItems.indexOf(parentItem);
      openLightbox(itemIdx !== -1 ? itemIdx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  // Gallery Filters
  const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });

      activeVisibleItems = galleryItems.filter(item => {
        return filterValue === 'all' || item.getAttribute('data-category') === filterValue;
      });
    });
  });

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 20. PEMUTAR MUSIK MINI KUSTOM (OFFICIAL NECK DEEP STREAM & LO-FI DOCK)
  // --------------------------------------------------------------------------
  const musicDock = document.getElementById('musicDock');
  const audioElement = document.getElementById('audioElement');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const playIcon = document.getElementById('playIcon');
  const btnPrevTrack = document.getElementById('btnPrevTrack');
  const btnNextTrack = document.getElementById('btnNextTrack');
  const btnMute = document.getElementById('btnMute');
  const volumeIcon = document.getElementById('volumeIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  const currentTimeEl = document.getElementById('currentTime');
  const musicDiscWrapper = document.getElementById('musicDiscWrapper');
  const musicTitleEl = document.getElementById('musicTitle');
  const musicArtistEl = document.getElementById('musicArtist');
  const btnDockToggle = document.getElementById('btnDockToggle');
  const musicVideoScreen = document.getElementById('musicVideoScreen');
  const btnToggleVideo = document.getElementById('btnToggleVideo');
  const btnCloseVideoScreen = document.getElementById('btnCloseVideoScreen');

  const playlist = [
    {
      title: 'Wish You Were Here',
      artist: 'Neck Deep',
      album: 'The Peace and The Panic',
      src: 'neck-deep-wish-you-were-here.m4a',
      ytId: 'VyPwEZTIpVc',
      cover: 'https://img.youtube.com/vi/VyPwEZTIpVc/hqdefault.jpg'
    },
    {
      title: 'December',
      artist: 'Neck Deep',
      album: "Life's Not Out to Get You",
      src: 'neck-deep-december.m4a',
      ytId: '8NnQs3EtoqU',
      cover: 'https://img.youtube.com/vi/8NnQs3EtoqU/hqdefault.jpg'
    },
    {
      title: 'In Bloom',
      artist: 'Neck Deep',
      album: 'The Peace and The Panic',
      src: 'neck-deep-in-bloom.m4a',
      ytId: 'd6uIsM7s6pY',
      cover: 'https://img.youtube.com/vi/d6uIsM7s6pY/hqdefault.jpg'
    },
    {
      title: 'A Part of Me',
      artist: 'Neck Deep ft. Laura Whiteside',
      album: 'Rain in Her Heart',
      src: 'neck-deep-a-part-of-me.m4a',
      ytId: 'VOyYwzkQB98',
      cover: 'https://img.youtube.com/vi/VOyYwzkQB98/hqdefault.jpg'
    },
    {
      title: 'Gold Steps',
      artist: 'Neck Deep',
      album: "Life's Not Out to Get You",
      src: 'neck-deep-gold-steps.m4a',
      ytId: 'tlO-KOvpPOw',
      cover: 'https://img.youtube.com/vi/tlO-KOvpPOw/hqdefault.jpg'
    },
    {
      title: 'Kali Ma',
      artist: 'Neck Deep',
      album: "Life's Not Out to Get You",
      src: 'neck-deep-kali-ma.m4a',
      ytId: 'wElVp9HzCt8',
      cover: 'https://img.youtube.com/vi/wElVp9HzCt8/hqdefault.jpg'
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let isCustomFile = false;
  let ytPlayer = null;
  let ytReady = false;
  let pendingAutoPlay = false;
  let progressPollTimer = null;
  let webAudioSynthActive = false;
  let synthInterval = null;

  const playlistPopover = document.getElementById('playlistPopover');
  const playlistItemsList = document.getElementById('playlistItemsList');
  const btnOpenPlaylist = document.getElementById('btnOpenPlaylist');
  const playlistPopoverClose = document.getElementById('playlistPopoverClose');
  const btnUploadSong = document.getElementById('btnUploadSong');
  const btnPickLocalSong = document.getElementById('btnPickLocalSong');
  const audioFileInput = document.getElementById('audioFileInput');
  const musicDiscImg = document.getElementById('musicDiscImg');

  // Load YouTube IFrame Player API
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      initYTPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript);
    } else {
      document.head.appendChild(tag);
    }
  }

  window.onYouTubeIframeAPIReady = function () {
    initYTPlayer();
  };

  function initYTPlayer() {
    if (ytPlayer || !document.getElementById('ytPlayerContainer')) return;
    try {
      const originParam = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : undefined;
      ytPlayer = new window.YT.Player('ytPlayerContainer', {
        height: '100%',
        width: '100%',
        videoId: playlist[currentTrackIdx].ytId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: originParam
        },
        events: {
          onReady: onYTPlayerReady,
          onStateChange: onYTPlayerStateChange,
          onError: onYTPlayerError
        }
      });
    } catch (err) {
      console.warn('YouTube Player initialization fallback:', err);
    }
  }

  function onYTPlayerReady(event) {
    ytReady = true;
    if (volumeSlider) {
      const currentVol = parseFloat(volumeSlider.value) * 100;
      try { event.target.setVolume(currentVol); } catch (e) { }
    }
    if (pendingAutoPlay) {
      pendingAutoPlay = false;
      playAudio();
    }
  }

  function onYTPlayerStateChange(event) {
    if (isCustomFile) return;
    // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
    if (event.data === 1) {
      setPlayState(true);
      startProgressPolling();
    } else if (event.data === 2) {
      setPlayState(false);
      stopProgressPolling();
    } else if (event.data === 0) {
      setPlayState(false);
      stopProgressPolling();
      nextTrack();
    }
  }

  function onYTPlayerError(e) {
    console.warn('YouTube error code:', e.data);
    startWebAudioFallback();
  }

  loadYouTubeAPI();

  function renderPlaylistUI() {
    if (!playlistItemsList) return;
    playlistItemsList.innerHTML = '';
    playlist.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${idx === currentTrackIdx ? 'active' : ''}`;
      item.innerHTML = `
        <div class="playlist-item-info">
          <span class="playlist-item-title">${track.title}</span>
          <span class="playlist-item-artist">${track.artist} • ${track.album || 'Pop-Punk'}</span>
        </div>
        <i class="playlist-item-icon ${idx === currentTrackIdx && isPlaying ? 'fa-solid fa-volume-high' : 'fa-solid fa-play'}"></i>
      `;
      item.addEventListener('click', () => {
        currentTrackIdx = idx;
        loadTrack(currentTrackIdx);
        playAudio();
        renderPlaylistUI();
        playSound.success();
      });
      playlistItemsList.appendChild(item);
    });
  }

  function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = playlist[idx];
    if (!track) return;

    if (musicTitleEl) musicTitleEl.textContent = track.title;
    if (musicArtistEl) musicArtistEl.textContent = track.artist;
    if (musicDiscImg && track.cover) musicDiscImg.src = track.cover;
    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '00:00';

    isCustomFile = !!track.isCustom;

    // Direct HTML5 Audio loading for guaranteed playback without YouTube restrictions
    if (audioElement && track.src) {
      const wasPlaying = isPlaying;
      audioElement.src = track.src;
      audioElement.load();
      if (wasPlaying) {
        audioElement.play().catch(() => { });
      }
    }

    // Update Direct Watch on YouTube button link
    const ytDirectWatchBtn = document.getElementById('ytDirectWatchBtn');
    if (ytDirectWatchBtn && track.ytId) {
      ytDirectWatchBtn.href = `https://www.youtube.com/watch?v=${track.ytId}`;
    }

    // Cue YouTube video for optional MV screen view (muted to avoid double sound)
    if (ytPlayer && typeof ytPlayer.cueVideoById === 'function' && track.ytId) {
      try {
        if (isPlaying) {
          ytPlayer.loadVideoById(track.ytId);
          ytPlayer.mute();
        } else {
          ytPlayer.cueVideoById(track.ytId);
        }
      } catch (e) {
        console.warn('loadVideoById error:', e);
      }
    }

    renderPlaylistUI();
  }
  loadTrack(currentTrackIdx);

  // Toggle Video Screen (MV View)
  if (btnToggleVideo && musicVideoScreen) {
    btnToggleVideo.addEventListener('click', () => {
      musicVideoScreen.classList.toggle('active');
      playSound.click();
    });
  }

  if (btnCloseVideoScreen && musicVideoScreen) {
    btnCloseVideoScreen.addEventListener('click', () => {
      musicVideoScreen.classList.remove('active');
      playSound.click();
    });
  }

  // Toggle Playlist Popover
  if (btnOpenPlaylist && playlistPopover) {
    btnOpenPlaylist.addEventListener('click', (e) => {
      e.stopPropagation();
      playlistPopover.classList.toggle('active');
      renderPlaylistUI();
      playSound.click();
    });
  }

  if (playlistPopoverClose && playlistPopover) {
    playlistPopoverClose.addEventListener('click', () => {
      playlistPopover.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (playlistPopover && playlistPopover.classList.contains('active')) {
      if (!playlistPopover.contains(e.target) && (!btnOpenPlaylist || !btnOpenPlaylist.contains(e.target))) {
        playlistPopover.classList.remove('active');
      }
    }
  });

  // Upload & Putar MP3 Milik Sendiri dari Komputer
  function triggerLocalAudioPicker() {
    if (audioFileInput) audioFileInput.click();
  }

  if (btnUploadSong) btnUploadSong.addEventListener('click', triggerLocalAudioPicker);
  if (btnPickLocalSong) btnPickLocalSong.addEventListener('click', triggerLocalAudioPicker);

  if (audioFileInput) {
    audioFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '');

      const customTrack = {
        title: cleanTitle,
        artist: 'Neck Deep (File MP3 Lokal)',
        album: 'File Laptop',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
        src: fileUrl,
        isCustom: true
      };

      playlist.unshift(customTrack);
      currentTrackIdx = 0;
      loadTrack(0);
      playAudio();

      if (playlistPopover) playlistPopover.classList.remove('active');
      showToast(`Memutar file MP3 Neck Deep: "${cleanTitle}"`, 'success');
      playSound.success();
    });
  }

  function togglePlay() {
    if (isPlaying) pauseAudio();
    else playAudio();
  }

  function playAudio() {
    // Un-suspend Web Audio Context on user gesture
    try {
      if (typeof sfxAudioCtx !== 'undefined' && sfxAudioCtx && sfxAudioCtx.state === 'suspended') {
        sfxAudioCtx.resume();
      }
    } catch (e) { }

    if (audioElement) {
      if (volumeSlider) audioElement.volume = parseFloat(volumeSlider.value);
      if (!audioElement.src && playlist[currentTrackIdx] && playlist[currentTrackIdx].src) {
        audioElement.src = playlist[currentTrackIdx].src;
      }
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setPlayState(true);
          startProgressPolling();
        }).catch((err) => {
          console.warn('Direct audio play error, trying Web Audio fallback:', err);
          startWebAudioFallback();
          setPlayState(true);
        });
      }
    } else {
      startWebAudioFallback();
      setPlayState(true);
    }

    // Sync YouTube video for optional MV screen (muted to prevent echo)
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.mute();
        ytPlayer.playVideo();
      } catch (e) { }
    }
  }

  function pauseAudio() {
    if (audioElement) {
      audioElement.pause();
    }
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) { }
    }
    stopWebAudioFallback();
    stopProgressPolling();
    setPlayState(false);
  }

  function setPlayState(playing) {
    isPlaying = playing;
    if (playIcon) playIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    if (musicDiscWrapper) {
      if (playing) musicDiscWrapper.classList.add('playing');
      else musicDiscWrapper.classList.remove('playing');
    }
    renderPlaylistUI();
  }

  function startProgressPolling() {
    if (progressPollTimer) clearInterval(progressPollTimer);
    progressPollTimer = setInterval(() => {
      if (!isPlaying) return;
      if (audioElement && audioElement.duration) {
        const cur = audioElement.currentTime || 0;
        const dur = audioElement.duration || 0;
        const pct = dur > 0 ? (cur / dur) * 100 : 0;
        if (progressBar) progressBar.style.width = `${pct}%`;
        const curMins = Math.floor(cur / 60).toString().padStart(2, '0');
        const curSecs = Math.floor(cur % 60).toString().padStart(2, '0');
        const durMins = Math.floor(dur / 60).toString().padStart(2, '0');
        const durSecs = Math.floor(dur % 60).toString().padStart(2, '0');
        if (currentTimeEl) currentTimeEl.textContent = `${curMins}:${curSecs} / ${durMins}:${durSecs}`;
      }
    }, 250);
  }

  function stopProgressPolling() {
    if (progressPollTimer) {
      clearInterval(progressPollTimer);
      progressPollTimer = null;
    }
  }

  function startWebAudioFallback() {
    if (webAudioSynthActive) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!sfxAudioCtx) sfxAudioCtx = new AudioContext();
      if (sfxAudioCtx.state === 'suspended') sfxAudioCtx.resume();
      webAudioSynthActive = true;
      const chords = [
        [329.63, 415.30, 493.88],
        [246.94, 311.13, 369.99],
        [277.18, 329.63, 415.30],
        [220.00, 277.18, 329.63]
      ];
      let chordIndex = 0;

      synthInterval = setInterval(() => {
        if (!webAudioSynthActive) return;
        const currentChord = chords[chordIndex % chords.length];
        const randomFreq = currentChord[Math.floor(Math.random() * currentChord.length)];
        chordIndex++;

        const osc = sfxAudioCtx.createOscillator();
        const gain = sfxAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(randomFreq, sfxAudioCtx.currentTime);
        const currentVol = volumeSlider ? parseFloat(volumeSlider.value) : 0.5;
        gain.gain.setValueAtTime(currentVol * 0.08, sfxAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, sfxAudioCtx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(sfxAudioCtx.destination);
        osc.start();
        osc.stop(sfxAudioCtx.currentTime + 1.9);
      }, 500);
    } catch (e) { }
  }

  function stopWebAudioFallback() {
    webAudioSynthActive = false;
    if (synthInterval) clearInterval(synthInterval);
  }

  if (audioElement) {
    audioElement.addEventListener('ended', () => nextTrack());
    audioElement.addEventListener('timeupdate', () => {
      if (!audioElement.duration) return;
      const cur = audioElement.currentTime || 0;
      const dur = audioElement.duration || 0;
      const pct = (cur / dur) * 100;
      if (progressBar) progressBar.style.width = `${pct}%`;
      const curMins = Math.floor(cur / 60).toString().padStart(2, '0');
      const curSecs = Math.floor(cur % 60).toString().padStart(2, '0');
      const durMins = Math.floor(dur / 60).toString().padStart(2, '0');
      const durSecs = Math.floor(dur % 60).toString().padStart(2, '0');
      if (currentTimeEl) currentTimeEl.textContent = `${curMins}:${curSecs} / ${durMins}:${durSecs}`;
    });
    audioElement.addEventListener('play', () => setPlayState(true));
    audioElement.addEventListener('pause', () => {
      if (!webAudioSynthActive) setPlayState(false);
    });
  }

  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audioElement && audioElement.duration) {
        audioElement.currentTime = ratio * audioElement.duration;
      }
      if (ytPlayer && typeof ytPlayer.getDuration === 'function' && typeof ytPlayer.seekTo === 'function') {
        try {
          const dur = ytPlayer.getDuration();
          if (dur > 0) ytPlayer.seekTo(ratio * dur, true);
        } catch (e) { }
      }
    });
  }

  function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    loadTrack(currentTrackIdx);
    if (isPlaying) playAudio();
  }

  function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIdx);
    if (isPlaying) playAudio();
  }

  if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
  if (btnNextTrack) btnNextTrack.addEventListener('click', nextTrack);
  if (btnPrevTrack) btnPrevTrack.addEventListener('click', prevTrack);

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      if (audioElement) audioElement.volume = vol;
      if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        try {
          ytPlayer.setVolume(vol * 100);
          if (vol === 0) ytPlayer.mute();
          else if (typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
        } catch (err) { }
      }
      if (volumeIcon) {
        if (vol === 0) volumeIcon.className = 'fa-solid fa-volume-xmark';
        else if (vol < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
        else volumeIcon.className = 'fa-solid fa-volume-high';
      }
    });
  }

  if (btnMute) {
    let lastVol = 0.75;
    btnMute.addEventListener('click', () => {
      const currentVol = volumeSlider ? parseFloat(volumeSlider.value) : 0.75;
      if (currentVol > 0) {
        lastVol = currentVol;
        if (volumeSlider) volumeSlider.value = 0;
        if (audioElement) audioElement.volume = 0;
        if (ytPlayer && typeof ytPlayer.mute === 'function') {
          try { ytPlayer.mute(); } catch (e) { }
        }
        if (volumeIcon) volumeIcon.className = 'fa-solid fa-volume-xmark';
      } else {
        const restoreVol = lastVol || 0.75;
        if (volumeSlider) volumeSlider.value = restoreVol;
        if (audioElement) audioElement.volume = restoreVol;
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
          try {
            ytPlayer.unMute();
            ytPlayer.setVolume(restoreVol * 100);
          } catch (e) { }
        }
        if (volumeIcon) volumeIcon.className = 'fa-solid fa-volume-high';
      }
    });
  }

  if (btnDockToggle && musicDock) {
    btnDockToggle.addEventListener('click', () => {
      musicDock.classList.toggle('minimized');
    });
  }

  // Keyboard shortcut M to toggle music
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 'm') {
      togglePlay();
      showToast(isPlaying ? 'Musik Lo-Fi Diputar' : 'Musik Lo-Fi Dijeda', 'info');
    }
  });

  // --------------------------------------------------------------------------
  // 21. CONTACT FORM WITH VALIDATION & SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userMessage = document.getElementById('userMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateContactInputs() {
    let valid = true;
    if (!userName.value.trim() || userName.value.trim().length < 3) {
      userName.classList.add('input-error');
      if (nameError) nameError.textContent = 'Nama lengkap minimal 3 karakter.';
      valid = false;
    } else {
      userName.classList.remove('input-error');
      if (nameError) nameError.textContent = '';
    }

    if (!userEmail.value.trim() || !isValidEmail(userEmail.value.trim())) {
      userEmail.classList.add('input-error');
      if (emailError) emailError.textContent = 'Format email tidak valid.';
      valid = false;
    } else {
      userEmail.classList.remove('input-error');
      if (emailError) emailError.textContent = '';
    }

    if (!userMessage.value.trim() || userMessage.value.trim().length < 8) {
      userMessage.classList.add('input-error');
      if (messageError) messageError.textContent = 'Deskripsi pesan minimal 8 karakter.';
      valid = false;
    } else {
      userMessage.classList.remove('input-error');
      if (messageError) messageError.textContent = '';
    }
    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateContactInputs()) return;

      btnSubmitForm.classList.add('loading');
      btnSubmitForm.disabled = true;

      setTimeout(() => {
        btnSubmitForm.classList.remove('loading');
        btnSubmitForm.disabled = false;
        showToast(`Terima kasih ${userName.value.trim()}! Pesan Anda telah diterima. Saya akan segera merespons.`, 'success');
        playSound.success();
        contactForm.reset();
      }, 1400);
    });
  }

  // --------------------------------------------------------------------------
  // 22. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastDesc = document.getElementById('toastDesc');
  const toastClose = document.getElementById('toastClose');
  let toastTimer = null;

  function showToast(message, type = 'success') {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);

    if (toastDesc) toastDesc.textContent = message;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  // --------------------------------------------------------------------------
  // 23. NAVBAR MOBILE TOGGLE & SCROLL REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE HANGING LANYARD NAME TAG BADGE (PHYSICS SIMULATION)
  // --------------------------------------------------------------------------
  (function initHangingNametag() {
    const stage = document.getElementById('nametagStage');
    const nametag = document.getElementById('hangingNametag');
    const path = document.getElementById('nametagLanyardPath');
    const sheen = document.getElementById('nametagHoloSheen');
    const hint = document.getElementById('nametagDragHint');

    if (!stage || !nametag || !path) return;

    // Physics parameters
    const REST_LENGTH = 110;        // Panjang tali saat istirahat (px)
    const GRAVITY = 0.55;           // Gaya pemulih gravitasi pendulum
    const ANGULAR_DAMPING = 0.982;  // Redaman osilasi sudut (ayunan halus)
    const SPRING_K = 0.085;         // Konstanta pegas kelenturan tali
    const SPRING_DAMPING = 0.88;    // Redaman pegas tali
    const MAX_RADIUS = 280;         // Jangkauan maksimal tarikan (px)

    let stageRect = stage.getBoundingClientRect();
    let mountX = stageRect.width / 2;
    let mountY = 22;

    let angle = 0;                  // Sudut ayunan (radian)
    let angularVel = 0;             // Kecepatan sudut
    let length = REST_LENGTH;       // Panjang tali saat ini
    let lengthVel = 0;              // Kecepatan regangan tali

    let isDragging = false;
    let dragOffsetCardX = 0;
    let dragOffsetCardY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerVelX = 0;
    let pointerVelY = 0;
    let lastTime = performance.now();
    let pointerMoved = false;

    let targetCardX = mountX;
    let targetCardY = mountY + REST_LENGTH;
    let currentCardX = targetCardX;
    let currentCardY = targetCardY;

    let idlePhase = 0;

    function updateDimensions() {
      stageRect = stage.getBoundingClientRect();
      mountX = stageRect.width / 2;
      mountY = 22;
    }

    window.addEventListener('resize', updateDimensions);

    // Pointer Drag Listeners
    nametag.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging = true;
      pointerMoved = false;
      nametag.setPointerCapture(e.pointerId);

      if (hint) hint.classList.add('hide');

      if (window.playSound && window.playSound.click) {
        window.playSound.click();
      }

      updateDimensions();
      const nametagRect = nametag.getBoundingClientRect();
      dragOffsetCardX = e.clientX - (nametagRect.left + nametagRect.width / 2);
      dragOffsetCardY = e.clientY - nametagRect.top;

      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      pointerVelX = 0;
      pointerVelY = 0;
      lastTime = performance.now();

      nametag.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) {
        // Subtle magnetic breeze on hover nearby
        const mouseXOnStage = e.clientX - stageRect.left;
        const deltaFromMount = mouseXOnStage - mountX;
        if (Math.abs(deltaFromMount) < 200 && e.clientY >= stageRect.top && e.clientY <= stageRect.bottom) {
          angularVel += (deltaFromMount > 0 ? 0.0003 : -0.0003);
        }
        return;
      }

      e.preventDefault();
      pointerMoved = true;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      pointerVelX = ((e.clientX - lastPointerX) / dt) * 16;
      pointerVelY = ((e.clientY - lastPointerY) / dt) * 16;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastTime = now;

      const mouseXOnStage = e.clientX - stageRect.left - dragOffsetCardX;
      const mouseYOnStage = e.clientY - stageRect.top - dragOffsetCardY;

      const dx = mouseXOnStage - mountX;
      const dy = Math.max(25, mouseYOnStage - mountY);
      const dist = Math.hypot(dx, dy);

      const clampedDist = Math.min(dist, MAX_RADIUS);
      const pullAngle = Math.atan2(dx, dy);

      targetCardX = mountX + Math.sin(pullAngle) * clampedDist;
      targetCardY = mountY + Math.cos(pullAngle) * clampedDist;

      angle = pullAngle;
      length = clampedDist;
      angularVel = 0;
      lengthVel = 0;
    }, { passive: false });

    function handlePointerRelease(e) {
      if (!isDragging) return;
      isDragging = false;
      nametag.classList.remove('is-dragging');

      if (!pointerMoved) {
        // Simple tap / click: impulse swing!
        angularVel = (Math.random() > 0.5 ? 0.08 : -0.08);
        return;
      }

      // Convert release momentum to angular & radial velocity
      const tangentVel = pointerVelX * Math.cos(angle) - pointerVelY * Math.sin(angle);
      angularVel = (tangentVel / Math.max(length, 60)) * 0.42;

      const radialVel = pointerVelX * Math.sin(angle) + pointerVelY * Math.cos(angle);
      lengthVel = radialVel * 0.35;
    }

    window.addEventListener('pointerup', handlePointerRelease);
    window.addEventListener('pointercancel', handlePointerRelease);

    // Physics Animation Loop
    function step() {
      if (!isDragging) {
        // Pendulum restoring torque from gravity
        const restoringTorque = -(GRAVITY / Math.max(length, 50)) * Math.sin(angle);
        angularVel += restoringTorque;
        angularVel *= ANGULAR_DAMPING;
        angle += angularVel;

        // Spring restoration of lanyard length
        const deltaL = length - REST_LENGTH;
        lengthVel += -SPRING_K * deltaL;
        lengthVel *= SPRING_DAMPING;
        length += lengthVel;

        // Subtle ambient natural sway
        idlePhase += 0.018;
        const idleSway = Math.sin(idlePhase) * 0.012;
        const effectiveAngle = angle + (Math.abs(angularVel) < 0.001 ? idleSway : 0);

        targetCardX = mountX + Math.sin(effectiveAngle) * length;
        targetCardY = mountY + Math.cos(effectiveAngle) * length;

        currentCardX += (targetCardX - currentCardX) * 0.65;
        currentCardY += (targetCardY - currentCardY) * 0.65;
      } else {
        currentCardX += (targetCardX - currentCardX) * 0.45;
        currentCardY += (targetCardY - currentCardY) * 0.45;
      }

      // Update card position and natural 3D tilt
      const cardWidth = nametag.offsetWidth || 320;
      const posX = currentCardX - cardWidth / 2;
      const posY = currentCardY;

      const currentAngleDeg = (Math.atan2(currentCardX - mountX, currentCardY - mountY) * 180) / Math.PI;
      const tiltZ = currentAngleDeg * 0.88;
      const tiltY = Math.max(-28, Math.min(28, currentAngleDeg * 0.5));
      const tiltX = Math.max(-15, Math.min(25, (length - REST_LENGTH) * 0.16));

      nametag.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) rotateZ(${tiltZ.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg)`;

      // Render dynamic flexible lanyard ribbon path in SVG
      const midX = (mountX + currentCardX) / 2 + (currentCardX - mountX) * 0.08;
      const midY = (mountY + currentCardY) / 2 + Math.max(0, 10 - Math.hypot(currentCardX - mountX, currentCardY - mountY) * 0.04);
      path.setAttribute('d', `M ${mountX.toFixed(1)} ${mountY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${currentCardX.toFixed(1)} ${currentCardY.toFixed(1)}`);

      // Dynamic holographic glint based on angle
      if (sheen) {
        const sheenX = 50 + currentAngleDeg * 1.6;
        const sheenY = 50 + (length - REST_LENGTH) * 0.5;
        sheen.style.transform = `translate(${sheenX * 0.25}%, ${sheenY * 0.25}%) rotate(${currentAngleDeg * 0.4}deg)`;
      }

      requestAnimationFrame(step);
    }

    // Gentle welcome swing when scrolled into view
    let welcomeSwung = false;
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !welcomeSwung) {
          welcomeSwung = true;
          updateDimensions();
          angularVel = 0.085;
        }
      });
    }, { threshold: 0.25 });

    stageObserver.observe(stage);

    updateDimensions();
    requestAnimationFrame(step);
  })();

  // Resume Download Demo
  const btnDownloadResume = document.getElementById('btnDownloadResume');
  if (btnDownloadResume) {
    btnDownloadResume.addEventListener('click', () => {
      showToast('Curriculum Vitae Satria Pratama (PDF) siap diunduh!', 'info');
      playSound.success();
    });
  }
});
