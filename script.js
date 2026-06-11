// --- SYNTHESIZED AUDIO SYSTEM (Web Audio API) ---
let audioCtx = null;
let soundMuted = false;

// --- TOUCH / MOBILE DETECTION ---
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Check local storage for initial mute state
    const savedMute = localStorage.getItem('portfolio-muted');
    if (savedMute === 'true') {
      soundMuted = true;
      updateMuteButtonUI();
    }
  }
}

function playHoverSound() {
  initAudio();
  if (soundMuted || !audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.04);
  
  gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.04);
}

function playSelectSound() {
  initAudio();
  if (soundMuted || !audioCtx) return;
  
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.setValueAtTime(1200, now + 0.06);
  
  gain.gain.setValueAtTime(0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.18);
}

function playIntroSound() {
  initAudio();
  if (soundMuted || !audioCtx) return;
  
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(1100, now + 0.7);
  
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.7);
}

// Toggle mute
const muteToggle = document.getElementById('mute-toggle');
const speakerWaves = document.getElementById('speaker-waves');
const equalizerBars = document.querySelectorAll('.audio-bar');

function updateMuteButtonUI() {
  if (soundMuted) {
    if (speakerWaves) speakerWaves.style.display = 'none';
    muteToggle.style.color = 'var(--text-muted)';
    muteToggle.style.borderColor = 'rgba(255,255,255,0.05)';
    equalizerBars.forEach(bar => bar.classList.remove('playing'));
  } else {
    if (speakerWaves) speakerWaves.style.display = 'block';
    muteToggle.style.color = 'var(--accent-cyan)';
    muteToggle.style.borderColor = 'var(--accent-cyan)';
    equalizerBars.forEach(bar => bar.classList.add('playing'));
  }
}

if (muteToggle) {
  muteToggle.addEventListener('click', () => {
    initAudio();
    soundMuted = !soundMuted;
    localStorage.setItem('portfolio-muted', soundMuted);
    updateMuteButtonUI();
    
    // Temporary HUD notification
    const hint = document.getElementById('audio-hint-box');
    if (hint) {
      hint.innerText = soundMuted ? "INTERFACE SOUNDS OFF" : "INTERFACE SOUNDS ACTIVE";
      hint.style.display = 'block';
      setTimeout(() => {
        hint.style.display = 'none';
      }, 2000);
    }
    
    if (!soundMuted) playSelectSound();
  });
}

// Attach hover listener to class 'hover-effect'
document.querySelectorAll('.hover-effect').forEach(el => {
  el.addEventListener('mouseenter', () => {
    playHoverSound();
    document.body.classList.add('hover-interactive');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hover-interactive');
  });
  el.addEventListener('click', () => {
    playSelectSound();
  });
});


// --- DYNAMIC PRELOADER BOOT SEQUENCE ---
const bootConsoleLines = [
  "INITIALIZING QUANTUM PROTOCOL...",
  "LOADING SYSTEM DRIVERS...",
  "BUILDING THREEJS PARTICLE MATRIX...",
  "CONNECTING TO .NET PORT CHANNELS...",
  "FETCHING ENTERPRISE CORE...",
  "DECRYPTING PORTFOLIO DATA...",
  "CALCULATING SYSTEM VARIABLES...",
  "ESTABLISHING HIGH-SPEED LINK...",
  "LAUNCHING INTERFACE..."
];

document.addEventListener("DOMContentLoaded", () => {
  // Set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear().toString();
  
  let count = 0;
  const percentage = document.getElementById("loader-percentage");
  const fill = document.getElementById("loader-fill");
  const consoleText = document.getElementById("loader-console-text");
  const preloader = document.getElementById("preloader");

  // Rotate console loader statements
  let lineIndex = 0;
  const consoleTimer = setInterval(() => {
    if (consoleText && lineIndex < bootConsoleLines.length - 1) {
      lineIndex++;
      consoleText.innerText = bootConsoleLines[lineIndex];
    }
  }, 300);

  // Main percentage loader
  const loadTimer = setInterval(() => {
    count += Math.floor(Math.random() * 4) + 1;
    if (count >= 100) {
      count = 100;
      clearInterval(loadTimer);
      clearInterval(consoleTimer);
      if (consoleText) consoleText.innerText = "PORTFOLIO ONLINE.";
      
      setTimeout(() => {
        if (preloader) preloader.classList.add("loaded");
        document.body.classList.add("ready");
        initAudio();
        playIntroSound();
      }, 450);
    }
    if (percentage) percentage.innerText = count.toString().padStart(3, "0");
    if (fill) fill.style.width = count + "%";
  }, 30);
});


// --- CUSTOM CURSOR INTERPOLATION ---
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

// Only run cursor tracking on non-touch devices
if (!isTouchDevice) {
  let mouse = { x: 0, y: 0 };
  let ringPos = { x: 0, y: 0 };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (dot) {
      dot.style.left = mouse.x + 'px';
      dot.style.top = mouse.y + 'px';
    }
  });

  function updateCursor() {
    ringPos.x += (mouse.x - ringPos.x) * 0.15;
    ringPos.y += (mouse.y - ringPos.y) * 0.15;
    if (ring) {
      ring.style.left = ringPos.x + 'px';
      ring.style.top = ringPos.y + 'px';
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();
} else {
  // Hide cursor elements on touch devices
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
}


// --- SCROLL PROGRESS BAR ---
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';

  // Navbar scroll effect
  const header = document.getElementById('main-header');
  if (header) {
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// --- MAGNETIC BUTTONS ---
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


// --- HERO SECTION TYPEWRITER EFFECT ---
const typewriterElement = document.getElementById('typewriter');
const roles = [
  "Full Stack .NET Developer",
  "Software Engineering Student",
  "Problem Solver",
  "Backend Architect"
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 100;

function handleTypewriter() {
  if (!typewriterElement) return;
  const currentRole = roles[roleIdx];
  
  if (isDeleting) {
    typewriterElement.innerText = currentRole.substring(0, charIdx - 1);
    charIdx--;
    typingSpeed = 50; // faster deletion
  } else {
    typewriterElement.innerText = currentRole.substring(0, charIdx + 1);
    charIdx++;
    typingSpeed = 100; // standard writing speed
  }

  if (!isDeleting && charIdx === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // pause at end of text
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    typingSpeed = 500; // pause before next word
  }

  setTimeout(handleTypewriter, typingSpeed);
}

// Start typing after loading screen finishes
setTimeout(handleTypewriter, 4000);


// --- THREE.JS PARTICLES CONSTALLATION GRID ---
let scene, camera, renderer, starParticles, constellationLines;
// Reduce particle count on mobile for better performance
let particlesCount = isTouchDevice ? 800 : 2200;
let pGeometry, pMaterial;
let targetCameraX = 0, targetCameraY = 0;

function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
  grad.addColorStop(0.6, 'rgba(124,58,237,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  return new THREE.CanvasTexture(canvas);
}

function initThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container) return;
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 250;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create Particle Coordinates
  pGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorCyan = new THREE.Color('#00f0ff');
  const colorPurple = new THREE.Color('#7c3aed');

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Random spherical dispersion
    const radius = Math.random() * 300 + 50;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i+2] = radius * Math.cos(phi);

    // Mix Cyan and Purple colors
    const mixRatio = Math.random();
    const mixedColor = new THREE.Color().lerpColors(colorCyan, colorPurple, mixRatio);
    colors[i] = mixedColor.r;
    colors[i+1] = mixedColor.g;
    colors[i+2] = mixedColor.b;
  }

  pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Material
  pMaterial = new THREE.PointsMaterial({
    size: 3.5,
    map: createParticleTexture(),
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  starParticles = new THREE.Points(pGeometry, pMaterial);
  scene.add(starParticles);

  // Create lines connecting nearby particles (constellation grid)
  const linePositions = [];
  const linePoints = [];
  
  // Select 180 points to build constellation lines (keeping it fast and responsive)
  for (let i = 0; i < 180; i++) {
    const radius = Math.random() * 260 + 40;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    linePoints.push(new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    ));
  }
  
  for (let i = 0; i < linePoints.length; i++) {
    for (let j = i + 1; j < linePoints.length; j++) {
      const dist = linePoints[i].distanceTo(linePoints[j]);
      if (dist < 52) {
        linePositions.push(linePoints[i].x, linePoints[i].y, linePoints[i].z);
        linePositions.push(linePoints[j].x, linePoints[j].y, linePoints[j].z);
      }
    }
  }
  
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f0ff'),
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(constellationLines);

  // Resize Listener
  window.addEventListener('resize', onWindowResize);

  // Mouse Parallax Track — only on non-touch devices
  if (!isTouchDevice) {
    window.addEventListener('mousemove', e => {
      targetCameraX = (e.clientX - window.innerWidth / 2) * 0.08;
      targetCameraY = (e.clientY - window.innerHeight / 2) * 0.08;
    });
  }

  animateThreeJS();
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);

  if (!starParticles || !scene || !camera || !renderer) return;

  // Slow orbital rotate
  starParticles.rotation.y += 0.0006;
  starParticles.rotation.x += 0.0003;
  if (constellationLines) {
    constellationLines.rotation.y += 0.0006;
    constellationLines.rotation.x += 0.0003;
  }

  // Smooth camera interpolation based on cursor tracking
  camera.position.x += (targetCameraX - camera.position.x) * 0.05;
  camera.position.y += (-targetCameraY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Initialize Star Matrix Background
initThreeJS();


// --- DYNAMIC ACCENT THEME SWITCHER CONTROLLER ---
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const theme = btn.getAttribute('data-theme');
    applyTheme(theme);
    
    // Play click sound as a nice interactive feedback
    playSelectSound();
  });
});

function applyTheme(theme) {
  const root = document.documentElement;
  let primaryColor, secondaryColor, primaryRgb, secondaryRgb;
  
  if (theme === 'cyan') {
    primaryColor = '#00f0ff';
    secondaryColor = '#7c3aed';
    primaryRgb = '0, 240, 255';
    secondaryRgb = '124, 58, 237';
  } else if (theme === 'green') {
    primaryColor = '#39ff14';
    secondaryColor = '#0f766e';
    primaryRgb = '57, 255, 20';
    secondaryRgb = '15, 118, 110';
  } else if (theme === 'red') {
    primaryColor = '#ff0055';
    secondaryColor = '#f97316';
    primaryRgb = '255, 0, 85';
    secondaryRgb = '249, 115, 22';
  } else if (theme === 'gold') {
    primaryColor = '#ffaa00';
    secondaryColor = '#854d0e';
    primaryRgb = '255, 170, 0';
    secondaryRgb = '133, 77, 14';
  }

  root.style.setProperty('--accent-cyan', primaryColor);
  root.style.setProperty('--accent-purple', secondaryColor);
  root.style.setProperty('--accent-cyan-rgb', primaryRgb);
  root.style.setProperty('--accent-purple-rgb', secondaryRgb);
  
  localStorage.setItem('portfolio-accent-theme', theme);

  // Re-fill the Three.js particle colors dynamically to match the new accent palette!
  if (starParticles && constellationLines) {
    const colorsAttr = pGeometry.getAttribute('color');
    const colorCyan = new THREE.Color(primaryColor);
    const colorPurple = new THREE.Color(secondaryColor);
    
    for (let i = 0; i < particlesCount; i++) {
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().lerpColors(colorCyan, colorPurple, mixRatio);
      colorsAttr.setXYZ(i, mixedColor.r, mixedColor.g, mixedColor.b);
    }
    colorsAttr.needsUpdate = true;

    // Dynamic line color transition
    constellationLines.material.color.set(primaryColor);
    constellationLines.material.needsUpdate = true;
  }
}

// Restore saved accent theme on load
const savedAccentTheme = localStorage.getItem('portfolio-accent-theme');
if (savedAccentTheme && savedAccentTheme !== 'cyan') {
  const activeBtn = document.querySelector(`.theme-btn[data-theme="${savedAccentTheme}"]`);
  if (activeBtn) {
    themeButtons.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    // Let preloader finish loading before modifying colors to prevent visual jumps
    setTimeout(() => applyTheme(savedAccentTheme), 100);
  }
}


// --- 3D TILT EFFECT ON HOVER ---
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = rect.width;
    const height = rect.height;
    
    // Dynamic tilt matrix angles (cap at 12 deg)
    const rx = ((y / height) - 0.5) * 12;
    const ry = ((x / width) - 0.5) * -12;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});


// --- INTERSECTION OBSERVER FOR SCROLL REVEAL & SKILLS ---
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
let skillBarsFired = false;

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // 1. Skill Progress Bars — trigger on about section OR skills container
      if ((entry.target.id === 'about' || entry.target.classList.contains('skills-container')) && !skillBarsFired) {
        skillBarsFired = true;
        document.querySelectorAll('.progress-fill').forEach(fill => {
          const targetWidth = fill.getAttribute('data-width');
          fill.style.width = targetWidth;
        });
      }

      // 2. Achievements animated counter & ring
      if (entry.target.classList.contains('achieve-card') && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        const counter = entry.target.querySelector('.achieve-number');
        const targetVal = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const steps = 40;
        const increment = targetVal / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetVal) {
            if (counter) counter.innerText = targetVal + suffix;
            clearInterval(timer);
          } else {
            if (counter) counter.innerText = Math.floor(current) + suffix;
          }
        }, 1500 / steps);
      }

      // 3. Timeline node activation
      if (entry.target.classList.contains('timeline-item')) {
        entry.target.classList.add('active');
      }
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => scrollObserver.observe(el));

const aboutSection = document.getElementById('about');
if (aboutSection) scrollObserver.observe(aboutSection);

document.querySelectorAll('.achieve-card').forEach(card => scrollObserver.observe(card));
document.querySelectorAll('.timeline-item').forEach(item => scrollObserver.observe(item));

// Observe skills-container specifically
document.querySelectorAll('.skills-container').forEach(sc => scrollObserver.observe(sc));

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active-link');
          link.style.color = 'var(--accent-cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeObserver.observe(s));
