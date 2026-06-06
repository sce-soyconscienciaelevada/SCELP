'use client';
import { useEffect } from 'react';

function animateCounter(el: Element, target: number) {
  let start = 0;
  const step = () => {
    start += Math.ceil(target / 40);
    if (start >= target) {
      (el as HTMLElement).textContent = String(target);
      return;
    }
    (el as HTMLElement).textContent = String(start);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function PageAnimations() {
  useEffect(() => {
    // ── Hero H1 word reveal ──────────────────────────────────────
    const h1 = document.getElementById('hero-h1');
    if (h1) {
      const text =
        "Most people don’t have a discipline problem. They have an identity problem.";
      h1.innerHTML = text
        .split(' ')
        .map((w) => `<span class="word">${w} </span>`)
        .join('');
      setTimeout(() => {
        h1.querySelectorAll<HTMLElement>('.word').forEach((w, i) => {
          setTimeout(() => w.classList.add('on'), i * 48);
        });
      }, 200);
    }

    // ── Data pills ───────────────────────────────────────────────
    setTimeout(() => {
      ['dp1', 'dp2', 'dp3', 'dp4'].forEach((id, i) => {
        setTimeout(() => document.getElementById(id)?.classList.add('on'), i * 220);
      });
    }, 2400);

    // ── IntersectionObserver: reveal + scan ──────────────────────
    const rvObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll<HTMLElement>('[data-count]').forEach((c) => {
              animateCounter(c, parseInt(c.dataset.count ?? '0'));
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach((el) => rvObs.observe(el));

    const scanObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('scanned');
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.scan').forEach((el) => scanObs.observe(el));

    return () => {
      rvObs.disconnect();
      scanObs.disconnect();
    };
  }, []);

  return null;
}
