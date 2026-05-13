// =============================================================
// hydrohea-landing-sections.jsx — non-hero sections of landing page
// =============================================================

/* ----------- Problem strip ----------- */
function HHProblem() {
  return (
    <section id="problem" className="hh-section-pad-sm" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-1)' }}>
      <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'start' }}>
        <div>
          <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--coral)', boxShadow: '0 0 8px var(--coral)' }} />WHY IT MATTERS</div>
          <h2 className="hh-display" style={{ fontSize: 'clamp(24px, 3.5vw, 30px)', margin: 0, lineHeight: 1.1 }}>The hydrogen-storage materials problem.</h2>
        </div>
        <div className="hh-outcomes" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {[
            { num: '$120B', label: 'Hydrogen storage R&D budget wasted on physical trial-and-error each year', color: 'var(--coral)' },
            { num: '14 mo', label: 'Average time to qualify a new alloy composition for hydrogen service', color: 'var(--gold)' },
            { num: '< 6%', label: 'Of high-entropy alloys ever experimentally screened for H₂ uptake', color: 'var(--violet)' },
          ].map((s, i) => (
            <div key={i}>
              <div className="hh-num" style={{ fontSize: 48, color: s.color, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Pipeline ----------- */
function HHPipeline() {
  const steps = [
    { n: '01', t: 'Compose', d: 'Define alloy stoichiometry, lattice phase (BCC/FCC), boundary conditions and operating window.', icon: '⬢' },
    { n: '02', t: 'Simulate', d: 'Run coupled diffusion · heat · mechanics on validated COMSOL-grade solver in the cloud.', icon: '◈' },
    { n: '03', t: 'Predict', d: 'AI surrogate models extrapolate to thousands of compositions in seconds (XGBoost · GPR · NN).', icon: '✦' },
    { n: '04', t: 'Validate', d: 'Mesh-sensitivity sweep, literature cross-check, Arrhenius fit — confidence bands on every output.', icon: '◐' },
    { n: '05', t: 'Optimize', d: 'Pareto frontier of capacity vs. stress vs. cycling stability — export-ready engineering reports.', icon: '◊' },
  ];
  return (
    <section id="pipeline" className="hh-radial-cyan hh-section-pad" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 60px)' }}>
        <div className="hh-eyebrow" style={{ marginBottom: 16, justifyContent: 'center' }}><span className="dot" />PLATFORM PIPELINE</div>
        <h2 className="hh-display" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', margin: 0, marginBottom: 14 }}>From composition to optimised alloy in five steps.</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: 640, margin: '0 auto', lineHeight: 1.55 }}>
          End-to-end workflow with audit-trail and reproducibility built in. Every result traceable to the input parameters and the solver version.
        </p>
      </div>

      <div className="hh-pipeline" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, rowGap: 0 }}>
        {/* connecting line */}
        <div className="hh-pipeline-line" style={{ position: 'absolute', top: 50, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), var(--cyan), var(--violet), transparent)', opacity: 0.4 }} />

        {steps.map((s, i) => (
          <div key={s.n} style={{ position: 'relative', padding: '0 16px', textAlign: 'center' }}>
            {/* node */}
            <div style={{
              width: 64, height: 64, margin: '0 auto 22px', position: 'relative',
              background: 'var(--bg-0)', border: '1px solid var(--border-strong)',
              borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: 'var(--cyan)',
              boxShadow: '0 0 24px rgba(0,229,255,0.15), inset 0 0 14px rgba(0,229,255,0.06)',
            }}>
              {s.icon}
              <div style={{ position: 'absolute', top: -6, right: -6, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-4)', background: 'var(--bg-0)', padding: '1px 5px', borderRadius: 4, border: '1px solid var(--border)' }}>{s.n}</div>
            </div>
            <h3 className="hh-display" style={{ fontSize: 18, margin: 0, marginBottom: 8 }}>{s.t}</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------- Capabilities bento ----------- */
function HHCapabilities() {
  const ctx = window.useHH && window.useHH();
  const go = id => () => ctx && ctx.navigate(id);
  return (
    <section id="capabilities" className="hh-section-pad" style={{ paddingTop: 'clamp(36px, 6vw, 60px)' }}>
      <div className="hh-grid-2" style={{ marginBottom: 'clamp(32px, 5vw, 48px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'end' }}>
        <div>
          <div className="hh-eyebrow" style={{ marginBottom: 16 }}><span className="dot" style={{ background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)' }} />CAPABILITIES</div>
          <h2 className="hh-display" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', margin: 0, maxWidth: 720, lineHeight: 1.1 }}>A unified cockpit for hydrogen-storage R&amp;D.</h2>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', maxWidth: 360, lineHeight: 1.5 }}>
          Six modules built on the same kinetic, thermal and mechanical physics — so every team works from the same source of truth.
        </div>
      </div>

      <div className="hh-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 240, gap: 16 }}>
        {/* big card: simulator */}
        <div onClick={go('simulator')} className="hh-card hh-card-elev" style={{ gridColumn: 'span 2', gridRow: 'span 2', padding: 24, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(circle at top right, rgba(0,229,255,0.18), transparent 60%)' }} />
          <span className="hh-chip hh-chip-cyan">FLAGSHIP</span>
          <h3 className="hh-display" style={{ fontSize: 26, margin: '14px 0 8px' }}>Multi-Physics Simulator</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.55, margin: 0, maxWidth: 360 }}>
            Coupled diffusion + heat transfer + solid mechanics on a fine mesh, with adaptive time-stepping and Arrhenius temperature dependence. Drop-in replacement for hand-tuned COMSOL studies.
          </p>
          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, display: 'flex', gap: 8 }}>
            <span className="hh-chip">Transport of diluted species</span>
            <span className="hh-chip">Heat transfer in solids</span>
            <span className="hh-chip">Solid mechanics</span>
          </div>
          {/* mini 3d-ish viz */}
          <svg viewBox="0 0 200 140" style={{ position: 'absolute', right: 20, top: 56, width: 220, opacity: 0.85 }}>
            <defs>
              <linearGradient id="capg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={50 + i * 4} y={10 + i * 4} width={100} height={100} fill="none" stroke="url(#capg1)" strokeWidth="0.5" />
            ))}
            <path d="M 60 70 Q 80 30 110 70 T 160 70" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* AI */}
        <div onClick={go('ai')} className="hh-card hh-card-elev" style={{ gridColumn: 'span 2', padding: 22, position: 'relative', overflow: 'hidden', borderColor: 'rgba(255,181,71,0.25)', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(circle at top right, rgba(255,181,71,0.16), transparent 60%)' }} />
          <span className="hh-chip hh-chip-gold">AI</span>
          <h3 className="hh-display" style={{ fontSize: 20, margin: '12px 0 6px' }}>Composition Predictor</h3>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5, margin: 0 }}>
            Gaussian Process surrogate + XGBoost ensemble trained on 12 400 HEA compositions. SHAP-explained predictions in &lt; 200 ms.
          </p>
          <div style={{ position: 'absolute', right: 16, bottom: 14, display: 'flex', gap: 4 }}>
            {[26, 36, 22, 30, 18, 40, 28, 34].map((h, i) => (
              <div key={i} style={{ width: 6, height: h, background: i === 5 ? 'var(--gold)' : 'rgba(255,181,71,0.5)', borderRadius: 1 }} />
            ))}
          </div>
        </div>

        {/* materials library */}
        <div onClick={go('library')} className="hh-card" style={{ padding: 22, cursor: 'pointer' }}>
          <span className="hh-chip">DATABASE</span>
          <h3 className="hh-display" style={{ fontSize: 18, margin: '12px 0 6px' }}>Materials Library</h3>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>
            12 400+ vetted HEAs with thermo-physical, mechanical and diffusion properties cross-validated against peer-reviewed literature.
          </p>
        </div>

        {/* validation */}
        <div onClick={go('validation')} className="hh-card" style={{ padding: 22, cursor: 'pointer' }}>
          <span className="hh-chip hh-chip-emerald">VALIDATION</span>
          <h3 className="hh-display" style={{ fontSize: 18, margin: '12px 0 6px' }}>Mesh Sensitivity Studio</h3>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>
            Auto-run coarse / medium / fine mesh sweeps and report ≤5% convergence error. Audit-ready validation traces.
          </p>
        </div>

        {/* report */}
        <div onClick={go('reports')} className="hh-card hh-card-elev" style={{ gridColumn: 'span 2', padding: 22, position: 'relative', overflow: 'hidden', borderColor: 'rgba(167,139,250,0.25)', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(circle at top right, rgba(167,139,250,0.14), transparent 60%)' }} />
          <span className="hh-chip hh-chip-violet">EXPORT</span>
          <h3 className="hh-display" style={{ fontSize: 20, margin: '12px 0 6px' }}>Engineering Reports</h3>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5, margin: 0 }}>
            One-click PDF / DOCX engineering reports with all figures, tables and validation appendices ready for board review.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------- AI band ----------- */
function HHAIBand() {
  const models = [
    { name: 'XGBoost-HEA-v3', mae: '0.0024', rmse: '0.0031', r2: '0.962', leader: true },
    { name: 'Gaussian Process Reg.', mae: '0.0028', rmse: '0.0036', r2: '0.954', leader: false },
    { name: 'Neural Net (MLP)', mae: '0.0034', rmse: '0.0042', r2: '0.941', leader: false },
    { name: 'Random Forest', mae: '0.0041', rmse: '0.0048', r2: '0.927', leader: false },
    { name: 'CALPHAD baseline', mae: '0.0092', rmse: '0.0108', r2: '0.812', leader: false },
  ];
  return (
    <section id="ai-band" className="hh-section-pad" style={{ background: 'linear-gradient(180deg, var(--bg-0), var(--bg-1), var(--bg-0))', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.08), transparent 70%)' }} />
      <div className="hh-aiband" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center' }}>
        <div>
          <div className="hh-eyebrow" style={{ marginBottom: 16 }}><span className="dot" style={{ background: 'var(--violet)' }} />AI MODEL LEADERBOARD</div>
          <h2 className="hh-display" style={{ fontSize: 44, margin: 0, marginBottom: 16, lineHeight: 1.1 }}>
            Predict <span style={{ color: 'var(--gold)' }}>H₂ uptake</span> before you simulate.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 28, maxWidth: 480 }}>
            An ensemble of surrogate models — trained on AlFeNi, TiVNbCr, TiZrNbFeNi and 87 other HEA families — narrows your design space from 10⁵ compositions to the &lt; 20 worth running a full multi-physics study on.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['Hydride formation enthalpy', '−25 to −39 kJ/mol predicted within experimental error'],
              ['Composition-property maps', 'Interactive ternary diagrams for Al × Fe × Ni systems'],
              ['SHAP explainability', 'See exactly which atomic features drive each prediction'],
            ].map(([t, d], i) => (
              <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 6, background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)', fontSize: 12 }}>✓</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="hh-card hh-card-elev" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Surrogate model performance</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Holdout RMSE · wt% H₂ uptake</div>
            </div>
            <span className="hh-chip hh-chip-violet">RETRAINED 4h AGO</span>
          </div>

          {models.map((m, i) => (
            <div key={m.name} style={{ padding: '12px 0', borderTop: i ? '1px solid var(--border-soft)' : 'none', display: 'grid', gridTemplateColumns: '20px 1.5fr 1fr 1fr 1fr', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: m.leader ? 'var(--gold)' : 'var(--ink-4)' }}>{m.leader ? '★' : (i + 1)}</span>
              <div>
                <div style={{ fontSize: 13, color: m.leader ? 'var(--ink)' : 'var(--ink-2)', fontWeight: m.leader ? 600 : 400 }}>{m.name}</div>
                {m.leader && <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>● LEADER · DEPLOYED</div>}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>{m.mae}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>{m.rmse}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--emerald)' }}>{m.r2}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Outcomes / Results ----------- */
function HHOutcomes() {
  return (
    <section id="outcomes" className="hh-section-pad-sm" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--emerald)' }} />FIELD-PROVEN RESULTS</div>
      <h2 className="hh-display" style={{ fontSize: 36, margin: 0, marginBottom: 48, maxWidth: 700, lineHeight: 1.15 }}>
        Cut hydrogen-storage R&amp;D timelines from quarters to weeks.
      </h2>

      <div className="hh-outcomes" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { v: '47×', l: 'Faster screening', d: 'vs hand-built COMSOL studies', c: 'var(--cyan)' },
          { v: '92%', l: 'Cost reduction', d: 'on early-stage alloy down-selection', c: 'var(--gold)' },
          { v: '3.2 wt%', l: 'Best HEA discovered', d: 'TiZrNbFeNi @ ambient T (2024)', c: 'var(--emerald)' },
          { v: '–37 kJ/mol', l: 'Hydride enthalpy', d: 'tuned within ±2% of experiment', c: 'var(--violet)' },
        ].map((s, i) => (
          <div key={i} className="hh-card" style={{ padding: 22 }}>
            <div className="hh-num" style={{ fontSize: 40, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 14 }}>{s.l}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* testimonial */}
      <div className="hh-card hh-card-elev hh-testimonial" style={{ padding: 'clamp(20px, 3vw, 32px)', marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'clamp(20px, 3vw, 32px)', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 24, left: 28, fontSize: 80, lineHeight: 0.6, color: 'rgba(0,229,255,0.15)', fontFamily: 'var(--font-display)' }}>“</div>
        <div style={{ paddingLeft: 56 }}>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: 0, marginBottom: 22, color: 'var(--ink)', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
            HydroHEA collapsed what used to be a six-month CALPHAD + COMSOL loop into a single afternoon. We re-prioritised our entire alloy portfolio in two weeks.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--gold))' }} />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Dr. Amani Mokoena</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>HEAD OF MATERIALS R&amp;D · GLOBAL MINERAL CORP</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--bg-0)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>QUARTERLY IMPACT</div>
          <div className="hh-num" style={{ fontSize: 32, color: 'var(--emerald)', margin: '8px 0' }}>$4.8M</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Saved on physical sample synthesis & testing</div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>ALLOYS QUALIFIED</div>
            <div className="hh-num" style={{ fontSize: 20, marginTop: 4 }}>118 → 12</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------- CTA + footer ----------- */
function HHCTAFooter() {
  const ctx = window.useHH && window.useHH();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <>
      <section id="cta" className="hh-section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.12), transparent 65%), linear-gradient(135deg, #0A1830, var(--bg-0))' }} />
        <div className="hh-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <h2 className="hh-display" style={{ fontSize: 'clamp(34px, 5.5vw, 56px)', margin: 0, marginBottom: 18, lineHeight: 1.05 }}>
            Build the alloys of the<br/><span style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>hydrogen economy.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 540, margin: '0 auto 32px', lineHeight: 1.55 }}>
            Free 14-day pilot for R&amp;D teams. Bring your composition target — we'll deliver a validated multi-physics workspace.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="hh-btn hh-btn-primary" style={{ padding: '14px 24px', fontSize: 14 }} onClick={() => ctx && ctx.navigate('signin')}>Start pilot — free →</button>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '14px 24px', fontSize: 14 }} onClick={() => ctx && ctx.openModal({ content: <window.HHModalDemo ctx={ctx} /> })}>Book intro call</button>
          </div>
        </div>
      </section>

      <footer className="hh-footer" style={{ padding: 'clamp(28px, 4vw, 40px) clamp(20px, 6vw, 80px) 32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-1)', gap: 16 }}>
        <window.HHLogo />
        <div className="hh-footer-links" style={{ display: 'flex', gap: 32, fontSize: 12, color: 'var(--ink-3)' }}>
          <a onClick={() => scrollTo('capabilities')} style={{ color: 'inherit', cursor: 'pointer' }}>Platform</a>
          <a onClick={() => scrollTo('pipeline')} style={{ color: 'inherit', cursor: 'pointer' }}>Science</a>
          <a onClick={() => scrollTo('cta')} style={{ color: 'inherit', cursor: 'pointer' }}>Pricing</a>
          <a onClick={() => scrollTo('ai-band')} style={{ color: 'inherit', cursor: 'pointer' }}>Research</a>
          <a onClick={() => ctx && ctx.toast('Careers page is under construction', 'info')} style={{ color: 'inherit', cursor: 'pointer' }}>Careers</a>
        </div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-4)' }}>
          © 2025 HydroHEA · Built on metallurgy research by C. Lukwichi
        </div>
      </footer>
    </>
  );
}

/* ============ COMPOSER ============ */
function HHLanding() {
  return (
    <div className="hh-art hh-noise" style={{ position: 'relative' }}>
      <window.HHMarketingNav />
      <window.HHLandingHero />
      <HHProblem />
      <HHPipeline />
      <HHCapabilities />
      <HHAIBand />
      <HHOutcomes />
      <HHCTAFooter />
    </div>
  );
}

Object.assign(window, { HHProblem, HHPipeline, HHCapabilities, HHAIBand, HHOutcomes, HHCTAFooter, HHLanding });
