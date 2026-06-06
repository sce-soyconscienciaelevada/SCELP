'use client';
import { useEffect, useState } from 'react';

const MOON = 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z';
const SUN_PARTS = [
  '<circle cx="12" cy="12" r="5"/>',
  '<line x1="12" y1="1" x2="12" y2="3"/>',
  '<line x1="12" y1="21" x2="12" y2="23"/>',
  '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>',
  '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>',
  '<line x1="1" y1="12" x2="3" y2="12"/>',
  '<line x1="21" y1="12" x2="23" y2="12"/>',
  '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>',
  '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
].join('');

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    if (isLight) {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', 'light');
    }
    setIsLight(!isLight);
  }

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-in">
        <div className="nav-logo">
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="62" r="26" stroke="#9FC7BF" strokeWidth="3" opacity="0.85" />
            <line x1="50" y1="36" x2="50" y2="8" stroke="#9FC7BF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          </svg>
          SCE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="https://whop.com/soy-consciencia-elevada/identity-audit-protocol-cc/"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Begin Assessment</span>
            <svg className="arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              dangerouslySetInnerHTML={{ __html: isLight ? SUN_PARTS : `<path d="${MOON}"/>` }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
