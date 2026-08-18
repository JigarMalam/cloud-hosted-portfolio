(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Cursor glow ----------
  const glow = $('#cursor-glow');
  if (glow && !reducedMotion) {
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  // ---------- Mobile navigation ----------
  const header = $('.site-header');
  const menuToggle = $('.menu-toggle');
  if (header && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-links a').forEach(link => link.addEventListener('click', () => {
      header.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---------- Theme toggle ----------
  const themeToggle = $('#theme-toggle');
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') document.body.classList.add('light');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
      });
    }
  } catch (_) {
    // localStorage can be restricted in some local-file/browser configurations.
  }

  // ---------- Typing loop ----------
  const roles = [
    'AWS / DevOps Engineer',
    'Cloud Infrastructure Builder',
    'CI/CD Automation Learner',
    'Infrastructure Troubleshooter'
  ];
  const typedRole = $('#typed-role');
  if (typedRole && !reducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedRole.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          window.setTimeout(typeLoop, 1200);
          return;
        }
      } else {
        charIndex--;
        typedRole.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      window.setTimeout(typeLoop, deleting ? 34 : 65);
    }
    window.setTimeout(typeLoop, 900);
  }

  // ---------- AOS ----------
  if (window.AOS) {
    AOS.init({ once: true, offset: 90, duration: 800, easing: 'ease-out-cubic' });
  } else {
    // Never leave data-aos elements invisible if the CDN is unavailable.
    $$('[data-aos]').forEach(el => el.removeAttribute('data-aos'));
  }

  // ---------- GSAP / ScrollTrigger ----------
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.site-header', { y: -25, opacity: 0, duration: .8, ease: 'power3.out' });
      gsap.to('.hero-copy', {
        y: -35, opacity: .99, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.hero-terminal', {
        y: 70, rotate: 1.5, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
      });
      $$('.project-card').forEach(card => {
        gsap.fromTo(card, { y: 35, opacity: .65 }, {
          y: 0, opacity: 1, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%' }
        });
      });
    } else {
      gsap.from('.site-header', { y: -25, opacity: 0, duration: .8, ease: 'power3.out' });
    }
  }

  // ---------- Magnetic buttons ----------
  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(button => {
      button.addEventListener('pointermove', (e) => {
        const r = button.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * .16;
        const y = (e.clientY - (r.top + r.height / 2)) * .16;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  // ---------- 3D / local fallback ----------
  const canvas = $('#hero-3d');
  function startFallbackParticles() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const particles = [];
    const count = window.innerWidth < 700 ? 80 : 130;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.4 + .3,
        a: Math.random() * .45 + .15
      });
    }
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    window.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; }, { passive: true });
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = window.innerWidth + 10;
          if (p.x > window.innerWidth + 10) p.x = -10;
          if (p.y < -10) p.y = window.innerHeight + 10;
          if (p.y > window.innerHeight + 10) p.y = -10;
        }
        ctx.fillStyle = `rgba(103,232,249,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          const distPointer = Math.hypot(a.x - px, a.y - py);
          if (distPointer < 130) {
            ctx.strokeStyle = `rgba(96,165,250,${(1 - distPointer / 130) * .16})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        }
        requestAnimationFrame(draw);
      }
    }
    draw();
    window.addEventListener('resize', resize, { passive: true });
  }

  function startThree() {
    if (!canvas || reducedMotion) return false;
    return import('https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js')
      .then(THREE => {
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x05080e, 0.035);
        const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
        camera.position.set(0, 0, 8);
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
        renderer.setSize(innerWidth, innerHeight);

        const group = new THREE.Group();
        scene.add(group);
        const geometry = new THREE.IcosahedronGeometry(1.65, 1);
        group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: .25 })));
        group.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x0b1830, metalness: .8, roughness: .26, transparent: true, opacity: .9 })));
        group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1), new THREE.MeshBasicMaterial({ color: 0x67e8f9, wireframe: true, transparent: true, opacity: .12 })));
        const ringGeo = new THREE.TorusGeometry(2.1, .012, 10, 180);
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: i === 1 ? 0xa78bfa : 0x67e8f9, transparent: true, opacity: .35 }));
          ring.rotation.x = i * .75;
          ring.rotation.y = i * .38;
          group.add(ring);
        }
        const pointLight = new THREE.PointLight(0x67e8f9, 18, 16);
        pointLight.position.set(3, 2, 4);
        scene.add(pointLight);
        const violetLight = new THREE.PointLight(0xa78bfa, 12, 14);
        violetLight.position.set(-3, -2, 3);
        scene.add(violetLight);

        const starCount = innerWidth < 700 ? 600 : 1100;
        const pointsGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
          positions[i * 3] = (Math.random() - .5) * 22;
          positions[i * 3 + 1] = (Math.random() - .5) * 16;
          positions[i * 3 + 2] = (Math.random() - .5) * 14 - 2;
        }
        pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        scene.add(new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: 0x8fb7ff, size: .025, transparent: true, opacity: .62 })));

        let pointerX = 0, pointerY = 0;
        window.addEventListener('pointermove', e => {
          pointerX = e.clientX / innerWidth - .5;
          pointerY = e.clientY / innerHeight - .5;
        }, { passive: true });
        function render(time) {
          const t = time * .00035;
          group.rotation.y += .0018;
          group.rotation.x += .0007;
          group.position.x += (pointerX * .65 - group.position.x) * .025;
          group.position.y += (-pointerY * .38 - group.position.y) * .025;
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
        const onResize = () => {
          camera.aspect = innerWidth / innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(innerWidth, innerHeight);
          renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
        };
        window.addEventListener('resize', onResize, { passive: true });
      })
      .catch(() => {
        startFallbackParticles();
      });
  }
  /* =========================================
   DEPLOY JIGAR
   ========================================= */

function deployJigar() {

    const modal = document.getElementById("deployModal");
    const terminal = document.getElementById("terminalOutput");
    const result = document.getElementById("deployResult");

    modal.classList.add("active");

    terminal.innerHTML = "";
    result.classList.remove("show");

    const messages = [

        {
            text: "$ ./deploy-jigar.sh",
            className: "terminal-info"
        },

        {
            text: "[INFO] Connecting to AWS...",
            className: "terminal-info"
        },

        {
            text: "[OK] AWS connection established ✓",
            className: "terminal-success"
        },

        {
            text: "[INFO] Starting Docker container...",
            className: "terminal-info"
        },

        {
            text: "[OK] Container started ✓",
            className: "terminal-success"
        },

        {
            text: "[INFO] Running CI/CD pipeline...",
            className: "terminal-info"
        },

        {
            text: "[OK] Pipeline completed ✓",
            className: "terminal-success"
        },

        {
            text: "[INFO] Checking infrastructure...",
            className: "terminal-info"
        },

        {
            text: "[OK] Terraform state verified ✓",
            className: "terminal-success"
        },

        {
            text: "[INFO] Checking monitoring...",
            className: "terminal-info"
        },

        {
            text: "[OK] Prometheus healthy ✓",
            className: "terminal-success"
        },

        {
            text: "[OK] Grafana healthy ✓",
            className: "terminal-success"
        }

    ];

    let index = 0;

    function showNextLine() {

        if (index >= messages.length) {

            setTimeout(() => {

                result.classList.add("show");

            }, 500);

            return;
        }

        const line = document.createElement("div");

        line.className =
            "terminal-line " +
            messages[index].className;

        line.textContent =
            messages[index].text;

        terminal.appendChild(line);

        index++;

        setTimeout(showNextLine, 500);
    }

    showNextLine();
}


/* =========================================
   CLOSE DEPLOY MODAL
   ========================================= */

function closeDeploy() {

    const modal =
        document.getElementById("deployModal");

    modal.classList.remove("active");

}


/* =========================================
   CLOSE WITH ESC KEY
   ========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeDeploy();

    }

});

window.deployJigar = deployJigar;
window.closeDeploy = closeDeploy;

function showNextLine() {

        if (index >= messages.length) {

            setTimeout(() => {
                result.classList.add("show");
                // Auto-scroll to the bottom when the result box appears
                const body = document.querySelector(".deploy-modal .terminal-body");
                if (body) body.scrollTop = body.scrollHeight;
            }, 500);

            return;
        }

        const line = document.createElement("div");
        line.className = "terminal-line " + messages[index].className;
        line.textContent = messages[index].text;
        terminal.appendChild(line);

        // Auto-scroll as each log line is printed
        const body = document.querySelector(".deploy-modal .terminal-body");
        if (body) body.scrollTop = body.scrollHeight;

        index++;
        setTimeout(showNextLine, 500);
    }



  // A file:// URL cannot reliably load an ES module from a remote CDN because of browser origin rules.
  // Use a local 2D fallback there; the full Three.js scene runs on Cloudflare/HTTP(S).
  if (location.protocol === 'file:') {
    startFallbackParticles();
  } else {
    startThree().catch(startFallbackParticles);
  }

  // ---------- Tilt cards ----------
  if (window.matchMedia('(pointer:fine)').matches && !reducedMotion) {
    $$('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - .5) * -5;
        const ry = ((e.clientX - r.left) / r.width - .5) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  // ---------- Back to top ----------
  const backTop = $('#back-top');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 700), { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
