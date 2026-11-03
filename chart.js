/* Hand-drawn canvas charts — no chart library (STEP 3 stub). */
window.DeskChart = {
  drawHome(canvas, points) {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || canvas.width;
    const h = canvas.clientHeight || canvas.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(84,84,88,0.55)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(16, h / 2);
    ctx.lineTo(w - 16, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    if (!points || points.length < 2) return;
    const ys = points.map((p) => p.v);
    const min = Math.min(...ys), max = Math.max(...ys);
    const span = max - min || 1;
    ctx.strokeStyle = "#00d35a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = 16 + (i / (points.length - 1)) * (w - 32);
      const y = h - 16 - ((p.v - min) / span) * (h - 32);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  },
};
