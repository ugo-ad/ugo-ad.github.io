const canvas = document.getElementById('matrix-bg');
if (!canvas) {
  // Canvas absent : on ne fait rien
  console.warn('matrix-bg canvas not found');
} else {
  const ctx = canvas.getContext('2d');
  const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 16;

  let columns;
  let drops;
  let frameCount = 0;

  function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize) || 1;
    drops = Array(columns).fill(0);
  }

  initMatrix();
  window.addEventListener('resize', initMatrix);

  function draw() {
    frameCount++;

    // ~30 FPS
    if (frameCount % 2 !== 0) {
      requestAnimationFrame(draw);
      return;
    }

    // voile noir pour la traînée
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#22c55e';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i] += 0.5;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}
