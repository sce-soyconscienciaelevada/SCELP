'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Is this just another quiz?',
    a: 'No. A quiz categorizes you into a type. This diagnostic identifies the specific mechanism driving your execution failures from your specific answers. The output is not a personality category — it is a named behavioral loop, a root conflict, and one change.',
  },
  {
    q: "I'm already self-aware. What will this tell me that I don't already know?",
    a: "Most self-aware people know the pattern. They don't know the mechanism — the specific structural reason the pattern keeps running despite awareness. That gap is what this closes.",
  },
  {
    q: 'How is this different from therapy or coaching?',
    a: 'Therapy works with history. Coaching works with goals. This works with the structural mechanism between them — the self-concept that overrides both. It is a diagnostic, not a treatment.',
  },
  {
    q: 'What happens after I buy?',
    a: "You're redirected to the assessment form immediately after purchase. Complete the 20 questions — takes 30–40 minutes. Your personalized report is delivered to your inbox after submission.",
  },
  {
    q: 'Why $37?',
    a: "The price filters browsers. The person who pays $37 to understand what's blocking them is ready to use what they find.",
  },
];

const delays = ['rv-d1', 'rv-d2', 'rv-d3', 'rv-d4', 'rv-d5'];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item rv ${delays[i]}${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {faq.q}
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-a">{faq.a}</div>
        </div>
      ))}
    </div>
  );
}
