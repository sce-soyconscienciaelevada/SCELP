'use client';
import { useEffect, useRef } from 'react';

export default function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    let W = 0, H = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let animId: number;
    let lastTime = 0;
    const isMobile = () => window.innerWidth < 768;
    const FPS = isMobile() ? 20 : 30;
    const FRAME_MS = 1000 / FPS;

    function resize() {
      W = c!.width = window.innerWidth;
      H = c!.height = window.innerHeight;
    }

    function init() {
      pts = [];
      const density = isMobile() ? 40000 : 22000;
      const n = Math.min(Math.floor((W * H) / density), 60);
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.2 + 0.4,
        });
      }
    }

    function draw(ts: number) {
      animId = requestAnimationFrame(draw);
      if (ts - lastTime < FRAME_MS) return;
      lastTime = ts;

      ctx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const dotColor = isLight ? 'rgba(47,107,98,.32)' : 'rgba(159,199,191,.25)';
      const lineRGB  = isLight ? '47,107,98' : '159,199,191';
      const lineAlpha = isLight ? 0.13 : 0.07;
      const mobile = isMobile();

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      if (!mobile) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${lineRGB},${(1 - d / 120) * lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }

    resize();
    init();
    animId = requestAnimationFrame(draw);

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);

    const onVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animId = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
