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
    title: 'Dónde estás',
    subtitle: 'Preguntas 1–3',
    items: [
      {
        id: 'q1', n: '01',
        text: '¿En qué área de tu vida sientes más estancamiento, pesadez o repetición en este momento?',
        hint: 'Salud / dinero / relaciones / propósito / trabajo / autoconfianza — sé específico/a.',
        type: 'text',
      },
      {
        id: 'q2', n: '02',
        text: '¿Qué problema sigue apareciendo sin importar cuánto trabajo hagas en ti mismo/a?',
        hint: 'El loop que sigue corriendo. El mecanismo del que estás cansado/a.',
        type: 'text',
      },
      {
        id: 'q3', n: '03',
        text: 'Si tu vida siguiera exactamente igual durante los próximos 5 años, ¿qué es lo que más te asusta?',
        hint: 'Responde desde el instinto, no desde la mente.',
        type: 'text',
      },
    ],
  },
  {
    title: 'Cómo te detienes',
    subtitle: 'Preguntas 4–7',
    items: [
      {
        id: 'q4', n: '04',
        text: 'Cuando se requiere crecimiento o cambio, ¿cómo tiendes a evitarlo?',
        hint: 'Procrastinación / distracción / sobre-planificar / mantenerse ocupado/a / entumecerse / controlar.',
        type: 'text',
      },
      {
        id: 'q5', n: '05',
        text: '¿Qué empiezas con entusiasmo y luego abandonas?',
        hint: 'Sé específico/a. Nombra algo real.',
        type: 'text',
      },
      {
        id: 'q6', n: '06',
        text: '¿Qué compromiso contigo mismo/a sigues rompiendo, una y otra vez?',
        hint: 'No con otros — contigo.',
        type: 'text',
      },
      {
        id: 'q7', n: '07',
        text: '¿Qué has intentado ya para resolver esto? ¿Qué pasó?',
        hint: 'Lista 2–3 intentos específicos. Qué funcionó brevemente — y qué falló completamente.',
        type: 'text',
      },
    ],
  },
  {
    title: 'La identidad debajo',
    subtitle: 'Preguntas 8–10',
    items: [
      {
        id: 'q8', n: '08',
        text: '¿Qué parte de tu identidad actual tendría que cambiar — o desaparecer — para que pudieras llegar al siguiente nivel?',
        hint: '¿Qué versión de ti tendría que morir?',
        type: 'text',
      },
      {
        id: 'q9', n: '09',
        text: '¿Qué miedo te parece "irracional", pero aún así controla decisiones importantes?',
        hint: 'El que sabes que no tiene sentido, pero actúa de todas formas.',
        type: 'text',
      },
      {
        id: 'q10', n: '10',
        text: '¿Qué rol tiendes a repetir en la vida — en el trabajo, relaciones y desafíos?',
        hint: 'Víctima / rescatador/a / sobre-logrador/a / complaciente / evasivo/a / rebelde / el que sostiene todo.',
        type: 'text',
      },
    ],
  },
  {
    title: 'La señal del cuerpo',
    subtitle: 'Preguntas 11–12',
    items: [
      {
        id: 'q11', n: '11',
        text: '¿Cómo responde tu cuerpo cuando estás a punto de crecer, ser visto/a, o dar un paso significativo?',
        hint: 'Describe la sensación física — no la interpretes, solo descríbela.',
        type: 'text',
      },
      {
        id: 'q12', n: '12',
        text: '¿Qué sensación o estado sobrepassas habitualmente para seguir funcionando?',
        hint: 'Fatiga / emociones / necesidades / incomodidad — ¿qué ignorás para "seguir adelante"?',
        type: 'text',
      },
    ],
  },
  {
    title: 'Lo que ya sabes',
    subtitle: 'Preguntas 13–15',
    items: [
      {
        id: 'q13', n: '13',
        text: '¿Qué verdad sobre ti mismo/a estás cansado/a de saber pero no de actuar en consecuencia?',
        hint: 'La que ya escuchaste antes. La que siempre está ahí.',
        type: 'text',
      },
      {
        id: 'q14', n: '14',
        text: '¿Qué parte de esta evaluación ya quisiste saltarte o apresurarte?',
        hint: null,
        type: 'text',
      },
      {
        id: 'q15', n: '15',
        text: '¿Qué cambiaría en tu vida diaria si dejaras de culpar las circunstancias, el tiempo o a otras personas?',
        hint: 'Una cosa específica.',
        type: 'text',
      },
    ],
  },
  {
    title: 'Tu disposición',
    subtitle: 'Preguntas 16–18',
    items: [
      {
        id: 'q16', n: '16',
        text: 'Ahora mismo, ¿estás más apegado/a a la comodidad o a la coherencia?',
        hint: 'Sé honesto/a. No hay respuesta incorrecta — solo una precisa.',
        type: 'text',
      },
      {
        id: 'q17', n: '17',
        text: '¿Qué hábitos o bucles mantienen tu energía baja, dispersa o inconsistente?',
        hint: 'Nombra al menos 2 específicos.',
        type: 'text',
      },
      {
        id: 'q18', n: '18',
        text: '¿Por qué debe cambiar esto ahora — no en 6 meses, no "eventualmente"?',
        hint: '¿Qué te está costando realmente? Sé específico/a.',
        type: 'text',
      },
    ],
  },
  {
    title: 'Tu horizonte',
    subtitle: 'Preguntas 19–21',
    items: [
      {
        id: 'q19', n: '19',
        text: '¿Cuánto tiempo lleva presente en tu vida el mecanismo de ejecución principal que identificaste?',
        hint: null,
        type: 'radio',
        options: ['Menos de 1 año', '1–3 años', '3–10 años', 'Más de 10 años'],
      },
      {
        id: 'q20', n: '20',
        text: '¿Cuántas áreas de tu vida afecta?',
        hint: null,
        type: 'radio',
        options: ['1 área', '2–3 áreas', 'La mayoría de las áreas', 'Todas las áreas'],
      },
      {
        id: 'q21', n: '21',
        text: 'Basándote en todo lo que respondiste: ¿qué nivel de apoyo necesitas realmente en este momento?',
        hint: null,
        type: 'radio',
        options: [
          'Necesito claridad primero',
          'Necesito un sistema estructurado',
          'Necesito responsabilidad + coaching',
          'Necesito transformación profunda',
        ],
      },
    ],
  },
];

const TOTAL_PARTS = PARTS.length;

function validateStep(step: number, answers: Answers, name: string, email: string): string[] {
  const errs: string[] = [];
  if (step === 0) {
    if (!name.trim()) errs.push('Por favor ingresa tu nombre.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Por favor ingresa un email válido.');
    return errs;
  }
  const part = PARTS[step - 1];
  if (!part) return errs;
  for (const q of part.items) {
    if (!answers[q.id]?.trim()) {
      errs.push(`Completa la pregunta ${q.n}.`);
    }
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

  // No tier guard
  if (!tier) {
    return (
      <main className="assess-main">
        <div ref={topRef} />
        <div className="assess-wrap" style={{ textAlign: 'center', paddingTop: '140px' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Acceso requerido</span>
          <h1 className="sec-title" style={{ marginBottom: '20px' }}>Acceso no encontrado</h1>
          <p className="sec-sub" style={{ margin: '0 auto 36px' }}>
            Para completar tu evaluación, necesitas haber adquirido el Identity Audit Protocol primero.
          </p>
          <a href="/" className="btn btn-solid btn-lg">
            <span>Ver el protocolo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="assess-main">
      <div ref={topRef} style={{ position: 'absolute', top: 0 }} />

      {/* Progress bar — visible on steps 1–7 */}
      {step >= 1 && step <= TOTAL_PARTS && (
        <div className="assess-progress-wrap">
          <div className="assess-progress">
            <div className="assess-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span className="assess-progress-label">Parte {step} de {TOTAL_PARTS}</span>
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
              <h1 className="assess-h1">Evaluación de Identidad</h1>
              <p className="assess-lead">
                Lo que estás a punto de completar no es un test de personalidad.<br />
                Es un mapa de los mecanismos internos que determinan lo que puedes y no puedes ejecutar.
              </p>
            </div>

            <div className="assess-intro-rules">
              <div className="assess-rule-item">
                <span className="assess-rule-n">01</span>
                <span className="assess-rule-text">Responde desde lo que es verdad, no desde lo que suena bien.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">02</span>
                <span className="assess-rule-text">No hay respuestas correctas. Solo respuestas honestas.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">03</span>
                <span className="assess-rule-text">Tómate el tiempo que necesites. La velocidad no es la meta.</span>
              </div>
              <div className="assess-rule-item">
                <span className="assess-rule-n">04</span>
                <span className="assess-rule-text">Recibirás tu análisis {tier === 'vip' ? 'en 24 horas' : 'en 48 horas'} en tu email.</span>
              </div>
            </div>

            <div className="assess-user-fields">
              <div className="assess-field-group">
                <label className="assess-label" htmlFor="assess-name">Tu nombre</label>
                <input
                  id="assess-name"
                  type="text"
                  className="assess-input"
                  placeholder="¿Cómo te llamás?"
                  value={name}
                  onChange={e => { setName(e.target.value); if (errors.length) setErrors([]); }}
                  autoComplete="given-name"
                />
              </div>
              <div className="assess-field-group">
                <label className="assess-label" htmlFor="assess-email">Tu email</label>
                <input
                  id="assess-email"
                  type="email"
                  className="assess-input"
                  placeholder="Aquí recibirás tu análisis"
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
                <span>Comenzar la evaluación</span>
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
                        placeholder="Escribe aquí…"
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
                  <span>Atrás</span>
                </button>
                {isLastPart ? (
                  <button className="btn btn-solid btn-lg" onClick={handleSubmit}>
                    <span>Enviar evaluación</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arr"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                ) : (
                  <button className="btn btn-solid btn-lg" onClick={goNext}>
                    <span>Continuar</span>
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
            <p className="assess-state-text">Enviando tu evaluación…</p>
          </div>
        )}

        {/* ── STEP 9: SUCCESS ── */}
        {step === 9 && (
          <div className="assess-step assess-state-center">
            <div className="assess-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Evaluación recibida</span>
            <h2 className="assess-h1" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>Tu análisis está en proceso</h2>
            <p className="assess-lead" style={{ maxWidth: '460px', margin: '0 auto 16px' }}>
              {tier === 'vip'
                ? 'Recibirás tu análisis de identidad completo en las próximas 24 horas. Tu sesión de integración será coordinada por separado.'
                : 'Recibirás tu análisis de identidad completo en las próximas 48 horas en el email que ingresaste.'}
            </p>
            <p className="assess-hint-text" style={{ textAlign: 'center' }}>
              Revisá tu carpeta de spam si no lo ves llegar.
            </p>
          </div>
        )}

        {/* ── STEP 10: ERROR ── */}
        {step === 10 && (
          <div className="assess-step assess-state-center">
            <div className="assess-error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /><circle cx="12" cy="12" r="10" /></svg>
            </div>
            <h2 className="assess-h1" style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>Algo salió mal</h2>
            <p className="assess-lead" style={{ maxWidth: '440px', margin: '0 auto 32px' }}>
              No pudimos enviar tu evaluación. Por favor contáctanos en{' '}
              <a href="mailto:soyconscienciaelevada@gmail.com" style={{ color: 'var(--acc)' }}>
                soyconscienciaelevada@gmail.com
              </a>{' '}
              y la procesamos manualmente.
            </p>
            <button
              className="btn btn-solid"
              onClick={() => { setSubmitState('idle'); transition(TOTAL_PARTS); }}
            >
              <span>Intentar de nuevo</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
