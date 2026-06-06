import BgCanvas from './components/BgCanvas';
import Nav from './components/Nav';
import PageAnimations from './components/PageAnimations';
import Carousel from './components/Carousel';
import FaqAccordion from './components/FaqAccordion';

const WHOP_STANDARD = 'https://whop.com/soy-consciencia-elevada/identity-audit-protocol-cc/';
const WHOP_VIP = 'https://whop.com/soy-consciencia-elevada/identity-integration-protocol-62/';

const ArrowIcon = () => (
  <svg className="arr" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Page() {
  return (
    <>
      <BgCanvas />
      <PageAnimations />
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="hero-section">
        <div className="hero-grid">

          {/* Left: brand mark */}
          <div className="hero-mark-wrap rv">
            <div className="mark-diagram">
              <div className="mark-glow" />
              <div className="orbit orbit-1" />
              <div className="orbit orbit-2" />
              <div className="orbit orbit-3" />
              <div className="mark-svg-wrap">
                <svg viewBox="0 0 100 100" fill="none" width="96" height="96">
                  <circle className="mark-circle" cx="50" cy="62" r="26" stroke="#9FC7BF" strokeWidth="2.8" />
                  <line className="mark-line" x1="50" y1="36" x2="50" y2="8" stroke="#9FC7BF" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="data-pill dp-top" id="dp1">Identity</div>
              <div className="data-pill dp-right" id="dp2">Mechanism</div>
              <div className="data-pill dp-bottom" id="dp3">Execution</div>
              <div className="data-pill dp-left" id="dp4">Audit</div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <div className="eyebrow eyebrow-left rv">Identity Audit Protocol</div>
            <h1 className="hero-h1" id="hero-h1" />
            <p className="hero-lead rv rv-d3">
              20 structured questions. One personalized diagnostic report. The exact mechanism
              driving your execution failures — identified, mapped, and linked to a clear direction.
            </p>
            <p className="hero-sub rv rv-d4">
              30–40 minutes · Immediate access · Report delivered to your inbox
            </p>
            <div className="hero-actions rv rv-d5">
              <a href={WHOP_STANDARD} className="btn btn-solid btn-lg" target="_blank" rel="noopener noreferrer">
                <span>Begin Assessment — $37</span>
                <ArrowIcon />
              </a>
              <a href="#howitworks" className="btn btn-lg">
                <span>How it works</span>
              </a>
            </div>
            <div className="hero-stats rv rv-d6">
              <div>
                <span className="stat-num"><span data-count="20">0</span></span>
                <span className="stat-lbl">Questions</span>
              </div>
              <div>
                <span className="stat-num"><span data-count="7">0</span></span>
                <span className="stat-lbl">Sections</span>
              </div>
              <div>
                <span className="stat-num">5</span>
                <span className="stat-lbl">Report outputs</span>
              </div>
              <div>
                <span className="stat-num">$37</span>
                <span className="stat-lbl">One-time</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOR WHO ───────────────────────────────────────────── */}
      <section id="forwho" className="scan">
        <div className="wrap">
          <div className="forwho-intro">
            <div className="eyebrow rv">Who this is for</div>
            <h2 className="sec-title rv rv-d1">This is not a motivation tool.</h2>
            <p className="sec-sub rv rv-d2" style={{ margin: '0 auto' }}>
              This assessment was built for a specific type of person: someone who already knows
              what they need to do — and consistently doesn&apos;t do it. Not because of laziness.
              Not because of a lack of information.
            </p>
          </div>
          <div className="forwho-items">
            {[
              { n: '01', strong: 'You start things with clarity and abandon them before completion', rest: ' — not once, but in a recognizable pattern.' },
              { n: '02', strong: 'You keep breaking commitments to yourself.', rest: ' Not to others — you\'re reliable there. To yourself, specifically.' },
              { n: '03', strong: 'You\'ve done the inner work.', rest: ' Read the books. You understand the psychology. You still don\'t move.' },
              { n: '04', strong: 'You can explain exactly why you\'re stuck', rest: ' — but explaining it doesn\'t change it.' },
            ].map((item, i) => (
              <div key={i} className={`fw-item rv rv-d${i + 1}`}>
                <div className="fw-num">{item.n}</div>
                <div className="fw-text">
                  <strong>{item.strong}</strong>{item.rest}
                </div>
              </div>
            ))}
          </div>
          <div className="fw-close rv rv-d5">
            If the problem were information, you would have fixed it years ago. The problem is
            identity. This assessment finds the specific conflict.{' '}
            <strong>
              Every month that passes without identifying the mechanism is another month executing
              against yourself.
            </strong>{' '}
            The loop doesn&apos;t resolve on its own.
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="howitworks" className="scan">
        <div className="wrap">
          <div className="section-header">
            <div className="eyebrow rv">The process</div>
            <h2 className="sec-title rv rv-d1">Three steps. No fluff.</h2>
          </div>
          <div className="process-card rv rv-d2">
            <div className="process-steps">
              {[
                { n: '01', title: 'Complete 20 questions', desc: 'Across 7 sections targeting different layers: where you\'re stuck, how you stop yourself, the identity underneath, your body\'s signal, what you already know.', tag: '30–40 minutes' },
                { n: '02', title: 'Receive your report', desc: 'Built from your specific responses. Delivered to your inbox immediately. Identifies the execution mechanism, root identity conflict, and one non-negotiable change.', tag: 'Immediate delivery' },
                { n: '03', title: 'VIP: Integration session', desc: 'A 15-minute recorded session that translates your results into daily behavior — what your mechanism looks like in real life, and what the identity shift requires.', tag: 'VIP only' },
              ].map((step) => (
                <div key={step.n} className="proc">
                  <div className="proc-ring"><span className="proc-n">{step.n}</span></div>
                  <div className="proc-title">{step.title}</div>
                  <div className="proc-desc">{step.desc}</div>
                  <div className="proc-tag">{step.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REPORT OUTPUT ─────────────────────────────────────── */}
      <section id="report" className="scan">
        <div className="wrap">
          <div className="section-header">
            <div className="eyebrow rv">Report output</div>
            <h2 className="sec-title rv rv-d1">Five outputs. Each specific to your answers.</h2>
            <p className="sec-sub rv rv-d2" style={{ margin: '0 auto' }}>
              Not generic advice. Not a personality type. A diagnostic built from your specific responses.
            </p>
          </div>
          <div className="report-table" style={{ marginTop: '48px' }}>
            {[
              { n: '01', name: 'The Mechanism', desc: 'The specific execution mechanism your answers reveal. Named so you can recognize it when it activates.' },
              { n: '02', name: 'The Root', desc: 'The identity conflict at the root. What self-concept is in tension with what you say you want.' },
              { n: '03', name: 'Execution Failure Type', desc: 'The exact way you interrupt yourself. Procrastination, over-preparation, visibility avoidance, re-starting.' },
              { n: '04', name: 'One Non-Negotiable Change', desc: 'Not a list. One specific, concrete change that operates at the identity level. Timeline: 14, 30, 60, or 90 days.' },
              { n: '05', name: 'Your Next Step', desc: 'Based on your answers, the clearest direction for your next move — structural, behavioral, or identity-level.' },
            ].map((row, i) => (
              <div key={row.n} className={`rpt-row rv rv-d${i + 1}`}>
                <div className="rpt-index">
                  <span className="rpt-n">{row.n}</span>
                  <span className="rpt-name">{row.name}</span>
                </div>
                <div className="rpt-desc">{row.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="testimonials" className="scan">
        <div className="wrap-sm">
          <div className="section-header">
            <div className="eyebrow rv">What people found</div>
            <h2 className="sec-title rv rv-d1">The result isn&apos;t a category. It&apos;s a mirror.</h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="scan">
        <div className="wrap">
          <div className="section-header">
            <div className="eyebrow rv">Choose your access level</div>
            <h2 className="sec-title rv rv-d1">Same diagnostic engine. Two delivery options.</h2>
            <p className="sec-sub rv rv-d2" style={{ margin: '0 auto' }}>
              Both start with the same 20 questions and deliver the same personalized report.
              The difference is what happens after you read it.
            </p>
          </div>
          <div className="pricing-grid" style={{ marginTop: '56px' }}>
            {/* Standard */}
            <div className="pkg rv rv-d1">
              <div className="pkg-tier">Standard</div>
              <div className="pkg-name">Diagnostic Report</div>
              <div className="pkg-tagline">The assessment and your full personalized report.</div>
              <div className="pkg-price">$37</div>
              <div className="pkg-price-note">USD · One-time · Immediate access</div>
              <a href={WHOP_STANDARD} className="btn btn-lg pkg-cta" target="_blank" rel="noopener noreferrer">
                <span>Begin Assessment</span>
                <ArrowIcon />
              </a>
              <hr className="pkg-hr" />
              <ul className="pkg-features">
                {['Complete the 20-question assessment', 'Personalized diagnostic report', 'Identified mechanism, root conflict, failure type', 'One Non-Negotiable Change', 'Timeline recommendation'].map((f) => (
                  <li key={f} className="pkg-feat">
                    <span className="feat-check">✓</span>{f}
                  </li>
                ))}
              </ul>
              <div className="pkg-upgrade">
                <div className="pkg-upgrade-label">Want diagnosis + integration?</div>
                <a href={WHOP_VIP} className="pkg-upgrade-link" target="_blank" rel="noopener noreferrer">
                  Upgrade to VIP — $97
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* VIP */}
            <div className="pkg featured rv rv-d2">
              <div className="pkg-badge">Most complete</div>
              <div className="pkg-tier">VIP</div>
              <div className="pkg-name">Diagnosis + Integration</div>
              <div className="pkg-tagline">The report plus a recorded session that tells you what to do with it.</div>
              <div className="pkg-price">$97</div>
              <div className="pkg-price-note">USD · One-time · Immediate access</div>
              <a href={WHOP_VIP} className="btn btn-solid btn-lg pkg-cta" target="_blank" rel="noopener noreferrer">
                <span>VIP Access</span>
                <ArrowIcon />
              </a>
              <hr className="pkg-hr" />
              <ul className="pkg-features">
                {['Everything in Standard', 'Identity Integration Protocol — 15-min recorded session', 'What your mechanism looks like in real daily behavior', 'What the identity shift actually requires', 'How to use your One Non-Negotiable Change as a starting point'].map((f) => (
                  <li key={f} className="pkg-feat">
                    <span className="feat-check">✓</span>{f}
                  </li>
                ))}
              </ul>
              <div className="pkg-insight">
                The diagnosis tells you what.<br />The session tells you what to do with it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ─────────────────────────────────────────── */}
      <section id="guarantee" className="scan">
        <div className="wrap-sm">
          <div className="guarantee-card rv rv-d1">
            <div className="guarantee-icon">↩</div>
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}>
              The Guarantee
            </div>
            <div className="guarantee-h">
              Complete it honestly. If it doesn&apos;t name something real — full refund.
            </div>
            <div className="guarantee-body">
              Complete the full 20-question assessment and if the report doesn&apos;t give you one
              specific insight you recognize as true about what is blocking your execution — email us
              within 7 days.{' '}
              <strong>Full refund. No form to fill out, no questions asked.</strong>
              <br /><br />
              This works because the questions are designed to surface what&apos;s already there. If
              you answer honestly, the output is accurate.
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="scan">
        <div className="wrap-sm">
          <div className="section-header">
            <div className="eyebrow rv">FAQ</div>
            <h2 className="sec-title rv rv-d1">Common questions</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section id="cta">
        <div className="cta-glow" />
        <div className="cta-inner">
          <div className="eyebrow rv" style={{ justifyContent: 'center', marginBottom: '22px' }}>
            SCE
          </div>
          <h2 className="cta-title rv rv-d1">
            We do not teach you what to do.
            <br />
            <em>We remove what prevents you from becoming someone who does it.</em>
          </h2>
          <p className="cta-sub rv rv-d2">
            The assessment is the first step. 30 minutes. $37. Full refund if it doesn&apos;t name
            something real.
          </p>
          <div className="cta-actions rv rv-d3">
            <a href={WHOP_STANDARD} className="btn btn-lg" target="_blank" rel="noopener noreferrer">
              <span>Standard — $37</span>
              <ArrowIcon />
            </a>
            <a href={WHOP_VIP} className="btn btn-solid btn-lg" target="_blank" rel="noopener noreferrer">
              <span>VIP — $97</span>
              <ArrowIcon />
            </a>
          </div>
          <div className="cta-note rv rv-d4">
            Risk-free · 7-day full refund · No form · No questions asked
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer>
        <div className="footer-in">
          <div className="footer-logo">
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <circle cx="50" cy="62" r="26" stroke="#9FC7BF" strokeWidth="3" opacity="0.6" />
              <line x1="50" y1="36" x2="50" y2="8" stroke="#9FC7BF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            </svg>
            SCE
          </div>
          <div className="footer-copy">
            © 2026 Soy Consciencia Elevada · soyconscienciaelevada@gmail.com
          </div>
          <div className="footer-disc">
            This is a structured self-diagnostic tool. It is not a clinical or psychological assessment.
          </div>
        </div>
      </footer>
    </>
  );
}
