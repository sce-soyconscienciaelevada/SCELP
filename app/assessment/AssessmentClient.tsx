'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

type Tier = 'standard' | 'vip';
type Answers = Record<string, string>;

interface QuestionItem {
  id: string;
  n: string;
  text: string;
  hint?: string | null;
  type: 'text' | 'radio';
  options?: string[];
}

interface Part {
  title: string;
  subtitle: string;
  items: QuestionItem[];
}

const PARTS: Part[] = [
  {
    title: 'Where You Are',
    subtitle: 'Questions 1–3',
    items: [
      {
        id: 'q1', n: '01',
        text: 'In which area of your life do you feel the most stagnation, heaviness, or repetition right now?',
        hint: 'Health / money / relationships / purpose / work / self-trust — be specific.',
        type: 'text',
      },
      {
        id: 'q2', n: '02',
        text: 'What problem keeps reappearing no matter how much work you do on yourself?',
        hint: 'The loop that keeps running. The mechanism you\'re tired of.',
        type: 'text',
      },
      {
        id: 'q3', n: '03',
        text: 'If your life stayed exactly the same for the next 5 years, what scares you most?',
        hint: 'Answer from the gut, not the mind.',
        type: 'text',
      },
    ],
  },
  {
    title: 'How You Stop Yourself',
    subtitle: 'Questions 4–7',
    items: [
      {
        id: 'q4', n: '04',
        text: 'When growth or change is required, how do you tend to avoid it?',
        hint: 'Procrastination / distraction / over-planning / staying busy / numbing / controlling.',
        type: 'text',
      },
      {
        id: 'q5', n: '05',
        text: 'What do you start with enthusiasm and then abandon?',
        hint: 'Be specific. Name something real.',
        type: 'text',
      },
      {
        id: 'q6', n: '06',
        text: 'What commitment to yourself do you keep breaking, over and over?',
        hint: 'Not to others — to yourself.',
        type: 'text',
      },
      {
        id: 'q7', n: '07',
        text: 'What have you already tried to solve this? What happened?',
        hint: 'List 2–3 specific attempts. What worked briefly — and what failed completely.',
        type: 'text',
      },
    ],
  },
  {
    title: 'The Identity Underneath',
    subtitle: 'Questions 8–10',
    items: [
      {
        id: 'q8', n: '08',
        text: 'What part of your current identity would have to change — or disappear — for you to reach the next level?',
        hint: 'What version of you would need to die?',
        type: 'text',
      },
      {
        id: 'q9', n: '09',
        text: 'What fear feels "irrational" to you, yet still controls important decisions?',
        hint: 'The one you know doesn\'t make sense but acts anyway.',
        type: 'text',
      },
      {
        id: 'q10', n: '10',
        text: 'What role do you tend to repeat in life — in work, relationships, and challenges?',
        hint: 'Victim / rescuer / over-achiever / people-pleaser / avoider / rebel / the one who holds it all together.',
        type: 'text',
      },
    ],
  },
  {
    title: "Your Body's Signal",
    subtitle: 'Questions 11–12',
    items: [
      {
        id: 'q11', n: '11',
        text: "How does your body respond when you're about to grow, be seen, or take a significant step?",
        hint: 'Describe the physical sensation — don\'t interpret it, just describe it.',
        type: 'text',
      },
      {
        id: 'q12', n: '12',
        text: 'What sensation or state do you habitually override to keep functioning?',
        hint: 'Fatigue / emotions / needs / discomfort — what do you push past to "keep going"?',
        type: 'text',
      },
    ],
  },
  {
    title: 'What You Already Know',
    subtitle: 'Questions 13–15',
    items: [
      {
        id: 'q13', n: '13',
        text: 'What truth about yourself are you tired of knowing but not acting on?',
        hint: "The one you've heard before. The one that's always there.",
        type: 'text',
      },
      {
        id: 'q14', n: '14',
        text: 'Which part of this assessment did you already want to skip or rush through?',
        hint: null,
        type: 'text',
      },
      {
        id: 'q15', n: '15',
        text: 'What would change in your daily life if you stopped blaming circumstances, timing, or other people?',
        hint: 'One specific thing.',
        type: 'text',
      },
    ],
  },
  {
    title: 'Your Readiness',
    subtitle: 'Questions 16–18',
    items: [
      {
        id: 'q16', n: '16',
        text: 'Right now, are you more attached to comfort or to coherence?',
        hint: 'Be honest. There is no wrong answer — only an accurate one.',
        type: 'text',
      },
      {
        id: 'q17', n: '17',
        text: 'What habits or loops are keeping your energy low, scattered, or inconsistent?',
        hint: 'Name at least 2 specific ones.',
        type: 'text',
      },
      {
        id: 'q18', n: '18',
        text: 'Why must this change now — not in 6 months, not "eventually"?',
        hint: 'What is it actually costing you? Be specific.',
        type: 'text',
      },
    ],
  },
  {
    title: 'Your Timeline',
    subtitle: 'Questions 19–21',
    items: [
      {
        id: 'q19', n: '19',
        text: 'How long has the main execution mechanism you identified been present in your life?',
        hint: null,
        type: 'radio',
        options: ['Less than 1 year', '1–3 years', '3–10 years', 'More than 10 years'],
      },
      {
        id: 'q20', n: '20',
        text: 'How many areas of your life does it affect?',
        hint: null,
        type: 'radio',
        options: ['1 area', '2–3 areas', 'Most areas', 'All areas'],
      },
      {
        id: 'q21', n: '21',
        text: 'Based on everything you\'ve answered: what level of support do you actually need right now?',
        hint: null,
        type: 'radio',
        options: [
          'I need clarity first',
          'I need a structured system',
          'I need accountability + coaching',
          'I need deep transformation',
        ],
      },
    ],
  },
];

const TOTAL_PARTS = PARTS.length;

function validateStep(step: number, answers: Answers, name: string, email: string): string[] {
  const errs: string[] = [];
  if (step === 0) {
    if (!name.trim()) errs.push('Please enter your name.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Please enter a valid email address.');
    return errs;
  }
  const part = PARTS[step - 1];
  if (!part) return errs;
  for (const q of part.items) {
    if (!answers[q.id]?.trim()) errs.push(`Complete question ${q.n}.`);
  }
  return errs;
}

export default function AssessmentClient() {
  const params = useSearchParams();
  const rawTier = params.get('tier');
  const tier: Tier | null = rawTier === 'standard' || rawTier === 'vip' ? rawTier : null;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const transition = (nextStep: number) => {
    setErrors([]);
    setVisible(false);
    setTimeout(() => {
      setStep(nextStep);
      setVisible(true);
    }, 180);
  };

  const goNext = () => {
    const errs = validateStep(step, answers, name, email);
    if (errs.length) { setErrors(errs); return; }
    transition(step + 1);
  };

  const goBack = () => transition(step - 1);

  const handleAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (errors.length) setErrors([]);
  };

  const handleSubmit = async () => {
    const errs = validateStep(step, answers, name, email);
    if (errs.length) { setErrors(errs); return; }
    setSubmitState('loading');
    transition(8);

    const payload = { name, email, tier, ...answers };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitState('success');
        transition(9);
      } else {
        setSubmitState('error');
        transition(10);
      }
    } catch {
      setSubmitState('error');
      transition(10);
    }
  };

  const isLastPart = step === TOTAL_PARTS;
  const progress = step >= 1 && step <= TOTAL_PARTS ? (step / TOTAL_PARTS) * 100 : step > TOTAL_PARTS ? 100 : 0;

  if (!tier) {
    return (
      <main className="assess-main">
        <div ref={topRef} />
        <div className="assess-wrap" style={{ textAlign: 'center', paddingTop: '140px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Access Required</span>
          <h1 className="sec-title" style={{ marginBottom: '20px' }}>Assessment Access</h1>
          <p className="sec-sub" style={{ margin: '0 auto 36px' }}>
            To complete your assessment, you need to have purchased the Identity Audit Protocol first.
          </p>
          <a href="/" className="btn btn-solid btn-lg">
            <span>View the Protocol</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="assess-main">
      <div ref={topRef} style={{ position: 'absolute', top: 0 }} />

      {step >= 1 && step <= TOTAL_PARTS && (
        <div className="assess-progress-wrap">
          <div className="assess-progress">
            <div className="assess-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span className="assess-progress-label">Part {step} of {TOTAL_PARTS}</span>
        </div>
      )}

      <div
        className="assess-wrap"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity .18s ease, transform .18s ease',
        }}
      >
        {/* ── STEP 0: INTRO ── */}
        {step === 0 && (
          <div className="assess-step">
            <div className="assess-intro-header">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>
                {tier === 'vip' ? 'Identity Integration Protocol — VIP' : 'Identity Audit Protocol — Standard'}
              </span>
              <h1 className="assess-h1">Identity Assessment</h1>
              <p className="assess-lead">
                What you are about to complete is not a personality test.<br />
                It is a map of the internal mechanisms that determine what you can and cannot execute.
              </p>
            </div>

            <div className="assess-intro-rules">
              <div className="assess-rule-item">
                <span className="assess-rule-n">01</span>
                <span className="assess-rule-text">Answer from what is true, not from what sounds good.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">02</span>
                <span className="assess-rule-text">There are no right answers. Only honest ones.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">03</span>
                <span className="assess-rule-text">Take as much time as you need. Speed is not the goal.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">04</span>
                <span className="assess-rule-text">
                  You will receive your analysis {tier === 'vip' ? 'within 24 hours' : 'within 48 hours'} to your email.
                </span>
              </div>
            </div>

            <div className="assess-user-fields">
              <div className="assess-field-group">
                <label className="assess-label" htmlFor="assess-name">Your name</label>
                <input
                  id="assess-name"
                  type="text"
                  className="assess-input"
                  placeholder="What's your name?"
                  value={name}
                  onChange={e => { setName(e.target.value); if (errors.length) setErrors([]); }}
                  autoComplete="given-name"
                />
              </div>
              <div className="assess-field-group">
                <label className="assess-label" htmlFor="assess-email">Your email</label>
                <input
                  id="assess-email"
                  type="email"
                  className="assess-input"
                  placeholder="This is where you'll receive your analysis"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (errors.length) setErrors([]); }}
                  autoComplete="email"
                />
              </div>
            </div>

            {errors.length > 0 && (
              <div className="assess-errors">
                {errors.map((e, i) => <span key={i}>{e}</span>)}
              </div>
            )}

            <div className="assess-nav assess-nav-right">
              <button className="btn btn-solid btn-lg" onClick={goNext}>
                <span>Begin Assessment</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEPS 1–7: PARTS ── */}
        {step >= 1 && step <= TOTAL_PARTS && (() => {
          const part = PARTS[step - 1];
          return (
            <div className="assess-step">
              <div className="assess-part-header">
                <span className="eyebrow">{part.subtitle}</span>
                <h2 className="assess-part-title">{part.title}</h2>
              </div>

              <div className="assess-questions">
                {part.items.map(q => (
                  <div key={q.id} className="assess-q-block">
                    <div className="assess-q-num">{q.n}</div>
                    <p className="assess-q-text">{q.text}</p>
                    {q.hint && <p className="assess-q-hint">{q.hint}</p>}

                    {q.type === 'text' && (
                      <textarea
                        className="assess-textarea"
                        rows={3}
                        value={answers[q.id] || ''}
                        onChange={e => {
                          handleAnswer(q.id, e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        placeholder="Write here…"
                      />
                    )}

                    {q.type === 'radio' && q.options && (
                      <div className="assess-radio-grid">
                        {q.options.map(opt => (
                          <label
                            key={opt}
                            className={`assess-radio-card ${answers[q.id] === opt ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={() => handleAnswer(q.id, opt)}
                              style={{ display: 'none' }}
                            />
                            <span className="assess-radio-dot" />
                            <span className="assess-radio-label">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {errors.length > 0 && (
                <div className="assess-errors">
                  {errors.map((e, i) => <span key={i}>{e}</span>)}
                </div>
              )}

              <div className="assess-nav">
                <button className="btn" onClick={goBack}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="15 18 9 12 15 6" /></svg>
                  <span>Back</span>
                </button>
                {isLastPart ? (
                  <button className="btn btn-solid btn-lg" onClick={handleSubmit}>
                    <span>Submit Assessment</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                ) : (
                  <button className="btn btn-solid btn-lg" onClick={goNext}>
                    <span>Continue</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── STEP 8: LOADING ── */}
        {step === 8 && (
          <div className="assess-step assess-state-center">
            <div className="assess-spinner" />
            <p className="assess-state-text">Submitting your assessment…</p>
          </div>
        )}

        {/* ── STEP 9: SUCCESS ── */}
        {step === 9 && (
          <div className="assess-step assess-state-center">
            <div className="assess-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Assessment Received</span>
            <h2 className="assess-h1" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>Your analysis is in progress</h2>
            <p className="assess-lead" style={{ maxWidth: '460px', margin: '0 auto 16px' }}>
              {tier === 'vip'
                ? 'You will receive your complete identity analysis within 24 hours. Your integration session will be coordinated separately.'
                : 'You will receive your complete identity analysis within 48 hours to the email you entered.'}
            </p>
            <p className="assess-hint-text" style={{ textAlign: 'center' }}>
              Check your spam folder if you don't see it arrive.
            </p>
          </div>
        )}

        {/* ── STEP 10: ERROR ── */}
        {step === 10 && (
          <div className="assess-step assess-state-center">
            <div className="assess-error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /><circle cx="12" cy="12" r="10" /></svg>
            </div>
            <h2 className="assess-h1" style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>Something went wrong</h2>
            <p className="assess-lead" style={{ maxWidth: '440px', margin: '0 auto 32px' }}>
              We couldn&apos;t submit your assessment. Please contact us at{' '}
              <a href="mailto:soyconscienciaelevada@gmail.com" style={{ color: 'var(--acc)' }}>
                soyconscienciaelevada@gmail.com
              </a>{' '}
              and we&apos;ll process it manually.
            </p>
            <button
              className="btn btn-solid"
              onClick={() => { setSubmitState('idle'); transition(TOTAL_PARTS); }}
            >
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
