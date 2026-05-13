// =============================================================
// hydrohea-landing.jsx — Marketing landing page
// =============================================================

function HHLandingHero() {
  const ctx = window.useHH && window.useHH();
  return (
    <section id="hero" className="hh-radial-cyan hh-noise hh-section-pad" style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(120px, 12vw, 160px)' }}>
      {/* grid bg */}
      <div className="hh-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />

      {/* floating orbs */}
      <div style={{ position: 'absolute', top: 200, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.14), transparent 70%)', filter: 'blur(40px)' }} />

      <div className="hh-hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
        <div>
          <h1 className="hh-display hh-hero-title" style={{ fontSize: 'clamp(40px, 6vw, 76px)', margin: 0, marginTop: 24, marginBottom: 20 }}>
            Design hydrogen-storage alloys <span style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>10× faster.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0, marginBottom: 32, maxWidth: 540 }}>
            HydroHEA fuses AI-driven composition search with high-fidelity multi-physics simulation — replacing months of COMSOL trial-and-error with minutes of guided exploration. Built for metallurgists, materials scientists and mining-sector R&amp;D leaders accelerating the hydrogen economy.
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
            <button className="hh-btn hh-btn-primary" style={{ padding: '14px 22px', fontSize: 14 }} onClick={() => ctx && ctx.navigate('setup')}>
              Launch interactive demo <span>→</span>
            </button>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '14px 22px', fontSize: 14 }} onClick={() => ctx && ctx.openModal({ content: <window.HHModalDemo ctx={ctx} /> })}>
              Request a demo
            </button>
          </div>

          {/* stat strip */}
          <div className="hh-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {[
              { v: '0.114', u: 'wt%', l: 'Max H₂ uptake — AlFeNi' },
              { v: '<5%', u: 'err', l: 'Mesh-validated accuracy' },
              { v: '3', u: 'phys', l: 'Coupled physics modules' },
              { v: '47×', u: '', l: 'Faster than COMSOL alone' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="hh-num" style={{ fontSize: 28, color: 'var(--cyan)' }}>{s.v}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{s.u}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right side: live simulation preview */}
        <HHHeroPreview />
      </div>

      {/* logos */}
      <div style={{ position: 'relative', marginTop: 88, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.20em', color: 'var(--ink-4)', marginBottom: 22, textTransform: 'uppercase' }}>
          Trusted by mining, materials &amp; energy R&amp;D leaders
        </div>
        <div className="hh-logos" style={{ display: 'flex', gap: 56, alignItems: 'center', flexWrap: 'wrap', opacity: 0.6 }}>
          {['ANGLO AMERICAN', 'RIO TINTO', 'GLENCORE', 'BHP', 'GLOBAL MINERAL', 'NORTHAM', 'KUMBA', 'GÉCAMINES'].map(n => (
            <div key={n} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', color: 'var(--ink-3)' }}>{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HHHeroPreview() {
  return (
    <div style={{ position: 'relative' }}>
      {/* glow */}
      <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle at 30% 30%, rgba(0,229,255,0.25), transparent 60%)', filter: 'blur(30px)' }} />

      <div className="hh-card hh-card-elev" style={{ position: 'relative', padding: 0, borderRadius: 18, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.15)' }}>
        {/* window chrome */}
        <div style={{ padding: '10px 14px', background: 'var(--bg-1)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>hydrohea.ai/run/78f3a · AlFeNi-BCC</span>
          <span className="hh-chip hh-chip-emerald" style={{ padding: '2px 8px', fontSize: 9 }}>● LIVE</span>
        </div>

        <div style={{ padding: 20, background: 'var(--bg-0)' }}>
          {/* heatmap row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'H₂ Concentration', cmap: 'h2', t: 0.65, type: 'concentration' },
              { label: 'Temperature', cmap: 'plasma', t: 0.55, type: 'temperature' },
              { label: 'von Mises Stress', cmap: 'viridis', t: 0.5, type: 'stress' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', marginBottom: 6, letterSpacing: '0.06em' }}>{s.label}</div>
                <window.HHHeatmap data={window.genField({ type: s.type, t: s.t, rows: 30, cols: 8 })} cmap={s.cmap} width={100} height={140} />
              </div>
            ))}
          </div>

          {/* mini curve */}
          <div style={{ padding: 12, background: 'var(--bg-1)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>Surface H concentration · t = 0–3600 s</span>
              <span className="hh-chip hh-chip-cyan" style={{ padding: '2px 8px', fontSize: 9 }}>8.0 × 10³ mol/m³</span>
            </div>
            <svg viewBox="0 0 300 60" style={{ width: '100%', height: 60 }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="hpvgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 55 C 30 50, 60 38, 90 24 S 150 8, 200 6 L 300 6" stroke="#00E5FF" strokeWidth="1.8" fill="none" />
              <path d="M0 55 C 30 50, 60 38, 90 24 S 150 8, 200 6 L 300 6 L 300 60 L 0 60 Z" fill="url(#hpvgrad)" />
              <line x1="180" y1="0" x2="180" y2="60" stroke="rgba(255,181,71,0.5)" strokeDasharray="3 3" />
              <circle cx="180" cy="9" r="3" fill="#FFB547" />
            </svg>
          </div>

          {/* metric strip */}
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { l: 'wt% H₂', v: '0.114', c: 'var(--cyan)' },
              { l: 'σ_max', v: '4.3 ×10⁴ Pa', c: 'var(--gold)' },
              { l: 'τ_sat', v: '1 820 s', c: 'var(--violet)' },
            ].map((m, i) => (
              <div key={i} style={{ padding: '8px 10px', background: 'var(--bg-1)', borderRadius: 6, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{m.l}</div>
                <div style={{ fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 600, color: m.c, marginTop: 2 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating side card — AI insight */}
      <div className="hh-card hh-card-elev hh-hero-floater" style={{ position: 'absolute', right: -20, bottom: -40, width: 240, padding: 14, borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderColor: 'rgba(255,181,71,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, var(--gold), var(--coral))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#1a0e00' }}>✦</div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--gold)', letterSpacing: '0.08em' }}>AI INSIGHT</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.45 }}>
          The AI suggests increasing <span style={{ color: 'var(--cyan)' }}>Ni → 34%</span> and reducing <span style={{ color: 'var(--cyan)' }}>Al → 22%</span> to gain <span className="hh-num" style={{ color: 'var(--emerald)' }}>+18%</span> hydrogen uptake.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HHLandingHero, HHHeroPreview });
