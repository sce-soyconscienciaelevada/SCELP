export default function IdentityAuditLP() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "7rem 2rem 5rem",
          maxWidth: "740px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
            marginBottom: "3rem",
          }}
        >
          Soy Consciencia Elevada
        </p>

        <h1
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            color: "var(--fg)",
            marginBottom: "2rem",
          }}
        >
          You already know
          <br />
          what to do.
          <br />
          <span style={{ color: "var(--fg-secondary)" }}>
            So why aren&apos;t you doing it?
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "var(--fg-secondary)",
            maxWidth: "540px",
            marginBottom: "3.5rem",
          }}
        >
          The gap between knowing and executing is not a discipline problem.
          <br />
          It&apos;s an identity problem. And it has a name.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#pricing"
            style={{
              display: "inline-block",
              background: "var(--fg)",
              color: "var(--bg)",
              padding: "0.85rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
          >
            Begin Your Diagnostic — $37
          </a>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 1 — THE PROBLEM ───────────────────────────────── */}
      <Section>
        <SectionLabel>The Problem</SectionLabel>
        <BodyBlock>
          <p>Most people trying to improve their lives are solving the wrong problem.</p>
          <p>
            They add more habits.<br />More systems.<br />More information.<br />More tools.
          </p>
          <p>And the same loops come back.</p>
          <p>
            Because the problem is not what you&apos;re doing.<br />
            It&apos;s who you believe yourself to be when you do it.
          </p>
        </BodyBlock>
      </Section>

      <Divider />

      {/* ── SECTION 2 — WHAT THIS IS ──────────────────────────────── */}
      <Section>
        <SectionLabel>What This Is</SectionLabel>
        <h2
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            color: "var(--fg)",
            marginBottom: "2rem",
            letterSpacing: "0.02em",
          }}
        >
          The Identity Audit Protocol:<br />Execution Diagnostic
        </h2>
        <BodyBlock>
          <p>A 21-question assessment.</p>
          <p>
            It does not motivate you.<br />
            It does not give you a plan.<br />
            It does not tell you what to do.
          </p>
          <p>
            It identifies the specific execution mechanism running underneath
            your behavior — beneath your goals, your intentions, and your effort.
          </p>
          <p>
            It takes 30–40 minutes.<br />
            It requires honesty, not performance.
          </p>
        </BodyBlock>

        <div
          style={{
            marginTop: "2.5rem",
            padding: "2rem",
            background: "var(--bg-card)",
            borderLeft: "2px solid var(--accent)",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: "1.25rem",
            }}
          >
            Your report includes
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {[
              "Your execution mechanism (named specifically — not a generic type)",
              "The identity conflict at its root",
              "One non-negotiable change",
              "A realistic timeline",
              "The most aligned next step for your specific situation",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  fontSize: "0.925rem",
                  lineHeight: 1.6,
                  color: "var(--fg-secondary)",
                }}
              >
                <span style={{ color: "var(--accent)", marginTop: "0.1rem", flexShrink: 0 }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Divider />

      {/* ── SECTION 3 — WHO THIS IS FOR ───────────────────────────── */}
      <Section>
        <SectionLabel>Who This Is For</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2.5rem",
            marginTop: "0.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: "1.25rem",
              }}
            >
              This is for you if
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                "You know what to do but don't consistently do it",
                "You've started things that matter and abandoned them",
                "The same problems keep showing up no matter how much you \"work on yourself\"",
                "You're tired of adding more — you want to remove what's blocking you",
                "You're willing to look directly at what's stopping you",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "var(--fg-secondary)",
                  }}
                >
                  <span style={{ color: "var(--fg)", opacity: 0.4, flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: "1.25rem",
              }}
            >
              This is NOT for you if
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                "You want quick fixes",
                "You're not willing to answer honestly",
                "You're looking for motivation",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "var(--fg-muted)",
                  }}
                >
                  <span style={{ flexShrink: 0, opacity: 0.5 }}>×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── SECTION 4 — PRICING ───────────────────────────────────── */}
      <section
        id="pricing"
        style={{
          maxWidth: "740px",
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <SectionLabel>Choose Your Access</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {/* Standard card */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Standard
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "3.25rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "var(--fg)",
                }}
              >
                $37
              </p>
            </div>
            <div style={{ height: "1px", background: "var(--border)" }} />
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flex: 1,
              }}
            >
              {[
                "Complete the 21-question assessment",
                "Personalized report delivered by email",
                "Received within minutes of completion",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--fg-secondary)",
                  }}
                >
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://whop.com/soy-consciencia-elevada/identity-audit-protocol-cc/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                border: "1px solid var(--border)",
                color: "var(--fg-secondary)",
                padding: "0.85rem 1.5rem",
                fontSize: "0.825rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              Begin Assessment — $37
            </a>
          </div>

          {/* VIP card */}
          <div
            style={{
              background: "var(--bg-card-highlight)",
              border: "1px solid var(--accent)",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "2.25rem",
                right: "2.25rem",
                height: "2px",
                background: "var(--accent)",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.5rem",
                }}
              >
                VIP
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "3.25rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "var(--fg)",
                }}
              >
                $97
              </p>
            </div>
            <div style={{ height: "1px", background: "var(--border)" }} />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                Everything in Standard, plus the{" "}
                <em>Identity Integration Protocol</em> — a 15-minute guided
                session delivered after your report.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {[
                  "Why reading a diagnosis rarely produces change",
                  "How to locate the exact moment your mechanism activates",
                  "The one internal shift required before any external action works",
                  "How to interrupt the loop when it fires — in real time",
                  "What the next 7 days look like for your specific execution type",
                  "The difference between understanding and dissolving your mechanism",
                  "One concrete action that proves the new direction to yourself",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.65rem",
                      fontSize: "0.825rem",
                      lineHeight: 1.55,
                      color: "var(--fg-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--fg-muted)",
                  marginTop: "1.25rem",
                  lineHeight: 1.55,
                }}
              >
                No live call. Delivered by email link immediately after purchase.
              </p>
            </div>
            <a
              href="https://whop.com/soy-consciencia-elevada/identity-integration-protocol-62/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "var(--fg)",
                color: "var(--bg)",
                padding: "0.85rem 1.5rem",
                fontSize: "0.825rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              VIP Access — $97
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 5 — GUARANTEE ─────────────────────────────────── */}
      <Section>
        <SectionLabel>The Guarantee</SectionLabel>
        <BodyBlock>
          <p>Complete the full assessment honestly.</p>
          <p>
            If your report does not give you one clear, actionable insight about
            what is blocking your execution — we return your money. No questions.
          </p>
        </BodyBlock>
      </Section>

      <Divider />

      {/* ── SECTION 6 — WHAT THIS IS NOT ─────────────────────────── */}
      <Section>
        <SectionLabel>What This Is Not</SectionLabel>
        <BodyBlock>
          <p>
            This is not a personality test.<br />
            This is not therapy.<br />
            This is not a quiz.<br />
            This is not a 2-minute &quot;find your type&quot; exercise.
          </p>
          <p>
            It requires your attention and your honesty.
            <br />
            That is the price of real clarity.
          </p>
        </BodyBlock>
      </Section>

      <Divider />

      {/* ── SECTION 7 — CONTROLLED FRICTION + FINAL CTA ──────────── */}
      <Section>
        <SectionLabel>Before You Begin</SectionLabel>
        <BodyBlock>
          <p>This takes 30–40 minutes.</p>
          <p>
            Do not start if you are in a hurry.<br />
            Do not start if you plan to skim.
          </p>
          <p>
            The assessment only works if you answer from experience,
            not from how you want to appear.
          </p>
          <p>If that is something you are willing to do:</p>
        </BodyBlock>

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://whop.com/soy-consciencia-elevada/identity-audit-protocol-cc/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "var(--fg)",
              color: "var(--bg)",
              padding: "0.9rem 2.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
          >
            Begin Your Assessment — $37
          </a>
          <a
            href="https://whop.com/soy-consciencia-elevada/identity-integration-protocol-62/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              padding: "0.9rem 2.25rem",
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
          >
            VIP Access — $97
          </a>
        </div>
      </Section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "3rem 2rem",
          maxWidth: "740px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
          }}
        >
          SCE — Soy Consciencia Elevada
        </p>
        <p
          style={{
            fontSize: "0.7rem",
            color: "var(--fg-muted)",
            maxWidth: "380px",
            textAlign: "right",
            lineHeight: 1.6,
          }}
        >
          This is a structured self-diagnostic tool.
          It is not a clinical or psychological assessment.
        </p>
      </footer>
    </main>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: "740px", margin: "0 auto", padding: "0 2rem" }}>
      <div style={{ height: "1px", background: "var(--border)" }} />
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{ maxWidth: "740px", margin: "0 auto", padding: "5rem 2rem" }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--fg-muted)",
        marginBottom: "2rem",
      }}
    >
      {children}
    </p>
  );
}

function BodyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        fontSize: "1rem",
        lineHeight: 1.8,
        color: "var(--fg-secondary)",
        maxWidth: "560px",
      }}
    >
      {children}
    </div>
  );
}
