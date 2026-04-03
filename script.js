// Glow follow
document.addEventListener('mousemove', e => {
  const g = document.getElementById('glow');
  g.style.left = e.clientX + 'px';
  g.style.top = e.clientY + 'px';
});

// Accordion
function toggleExp(el) {
  el.classList.toggle('open');
}

// Animate bars on scroll
const bars = document.querySelectorAll('.bar-fill');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = `scaleX(${e.target.dataset.w})`;
    }
  });
}, { threshold: 0.1 });
bars.forEach(b => {
  b.style.transition = `transform ${0.8 + Math.random() * 0.6}s cubic-bezier(.16,1,.3,1) ${Math.random() * 0.3}s`;
  observer.observe(b);
});

// Animate pipeline dots
const svg = document.getElementById('pipeline-svg');
if (svg) {
  const paths = [
    { el: 'dot1', path: [{x:10,y:52},{x:60,y:52},{x:110,y:52},{x:150,y:80},{x:170,y:110}] },
    { el: 'dot2', path: [{x:10,y:112},{x:60,y:112},{x:110,y:112},{x:150,y:112},{x:170,y:112}] },
    { el: 'dot3', path: [{x:10,y:172},{x:60,y:172},{x:110,y:172},{x:150,y:140},{x:170,y:115}] },
    { el: 'dot4', path: [{x:275,y:111},{x:310,y:111},{x:330,y:111}] },
    { el: 'dot5', path: [{x:380,y:144},{x:380,y:200},{x:330,y:200},{x:275,y:190},{x:165,y:190}] },
    { el: 'dot6', path: [{x:380,y:144},{x:380,y:350},{x:330,y:350},{x:275,y:350},{x:165,y:350}] },
  ];

  const dotState = paths.map(p => ({ t: Math.random(), speed: 0.003 + Math.random() * 0.003 }));

  function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }

  function getPos(pts, t) {
    const n = pts.length - 1;
    const seg = Math.min(Math.floor(t * n), n - 1);
    const lt = (t * n) - seg;
    return lerp(pts[seg], pts[seg + 1], lt);
  }

  function animateDots() {
    paths.forEach((p, i) => {
      dotState[i].t += dotState[i].speed;
      if (dotState[i].t > 1) dotState[i].t = 0;
      const pos = getPos(p.path, dotState[i].t);
      const dot = document.getElementById(p.el);
      if (dot) {
        dot.setAttribute('cx', pos.x);
        dot.setAttribute('cy', pos.y);
      }
    });
    requestAnimationFrame(animateDots);
  }
  animateDots();
}
