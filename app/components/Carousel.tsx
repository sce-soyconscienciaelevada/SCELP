'use client';
import { useEffect, useState } from 'react';

const slides = [
  {
    quote:
      "I've done therapy, read every productivity book, hired a coach. This assessment named something none of them did. I recognized it immediately.",
    attr: 'Daniel R., Founder',
  },
  {
    quote:
      "The part that hit hardest wasn't the mechanism. It was the root conflict. I'd been treating the symptom for years without realizing it.",
    attr: 'Lucas M., Independent Trader',
  },
  {
    quote:
      "I expected a quiz. I got a mirror. The one non-negotiable change it gave me was the exact thing I'd been avoiding naming.",
    attr: 'Sofia V., Creative Consultant',
  },
  {
    quote:
      "I've known the theory for years. This didn't add more theory. It showed me the exact place where I stop myself — every single time.",
    attr: 'Andrés G., Freelancer',
  },
  {
    quote: 'The diagnosis tells you what. The session tells you what to do with it.',
    attr: 'Chris W., Content Creator',
  },
  {
    quote:
      'By question 8 I wanted to stop. That reaction was the most useful thing about the whole experience.',
    attr: 'Priya S., Designer',
  },
];

export default function Carousel() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="carousel-wrap rv rv-d2">
      <div className="carousel-track">
        {slides.map((s, i) => (
          <div key={i} className={`slide${i === cur ? ' active' : ''}`}>
            <div className="slide-quote">{s.quote}</div>
            <div className="slide-attr">— {s.attr}</div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`cdot${i === cur ? ' on' : ''}`}
            onClick={() => setCur(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
