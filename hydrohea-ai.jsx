// =============================================================
// hydrohea-ai.jsx — AI Composition Predictor
// =============================================================

function HHAIPredictor() {
  const ctx = window.useHH();
  const al = ctx.composition.al, fe = ctx.composition.fe, ni = ctx.composition.ni;
  const setAl = v => ctx.setComposition({ ...ctx.composition, al: v });
  const setFe = v => ctx.setComposition({ ...ctx.composition, fe: v });
  const setNi = v => ctx.setComposition({ ...ctx.composition, ni: v });
  const temp = ctx.opTemp;
  const setTemp = ctx.setOpTemp;

  const [predicting, setPredicting] = React.useState(false);
  const runPredict = async () => {
    if (predicting) return;
    setPredicting(true);
    ctx.toast('XGBoost-HEA v3 inference…', 'info');
    await new Promise(r => setTimeout(r, 700));
    setPredicting(false);
    const p = window.HHpredict(ctx.composition, temp);
    ctx.toast(`Prediction · ${p.uptake.toFixed(3)} wt% · 94% confidence`, 'success');
  };

  const p = window.HHpredict(ctx.composition, temp);
  const pred = {
    uptake: p.uptake.toFixed(3),
    enthalpy: p.enthalpy.toFixed(1),
    diffusivity: p.diffusivity.toFixed(2),
    stability: p.stability.toFixed(3),
  };

  const shapData = [
    { feat: 'Ni content', impact: +0.041, color: 'var(--emerald)' },
    { feat: 'Lattice param.', impact: +0.028, color: 'var(--emerald)' },
    { feat: 'Al content', impact: +0.018, color: 'var(--emerald)' },
    { feat: 'Atomic radius δ', impact: -0.012, color: 'var(--coral)' },
    { feat: 'Operating T', impact: -0.022, color: 'var(--coral)' },
    { feat: 'Mixing entropy', impact: +0.009, color: 'var(--emerald)' },
    { feat: 'VEC', impact: -0.005, color: 'var(--coral)' },
  ];

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="ai" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="AI Composition Predictor" subtitle="✦ XGBoost-HEA v3" actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.openModal({ wide: true, content: <window.HHModalOptimize ctx={ctx} /> })}>Optimize (Pareto)</button>
            <button className="hh-btn hh-btn-gold" disabled={predicting} style={{ padding: '8px 16px', fontSize: 12, opacity: predicting ? 0.7 : 1 }} onClick={runPredict}>
              {predicting ? '◐ Predicting…' : '✦ Predict'}
            </button>
          </>
        }/>

        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          {/* hero predictions — AI screen, gold is the primary accent */}
          <div className="hh-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi primary label="Predicted H₂ uptake" value={pred.uptake} unit="wt%" delta="+8.4%" accent="gold"
              spark="M0 22 C20 18, 40 12, 60 7 S90 4, 100 4" />
            <window.HHKpi label="Hydride enthalpy" value={pred.enthalpy} unit="kJ/mol" accent="neutral" />
            <window.HHKpi label="Diffusivity D(T)" value={pred.diffusivity} unit="×10⁻¹⁰ m²/s" accent="neutral" />
            <window.HHKpi label="Cycling stability" value={pred.stability} unit="" accent="neutral" />
          </div>

          <div className="hh-grid-main" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 16, marginBottom: 16 }}>
            {/* composition designer */}
            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--gold)' }} />ALLOY DESIGNER</div>
              <h3 className="hh-display" style={{ fontSize: 22, margin: 0, marginBottom: 16 }}>Tune atomic composition</h3>

              {[
                { label: 'Aluminum (Al)', val: al, set: setAl, min: 5, max: 50, color: 'var(--cyan)', sym: 'Al' },
                { label: 'Iron (Fe)',     val: fe, set: setFe, min: 5, max: 60, color: 'var(--violet)', sym: 'Fe' },
                { label: 'Nickel (Ni)',   val: ni, set: setNi, min: 5, max: 60, color: 'var(--gold)', sym: 'Ni' },
              ].map(s => (
                <div key={s.sym} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: s.color, color: '#001', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>{s.sym}</div>
                      <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{s.label}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: s.color }}>{s.val} at.%</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(+e.target.value)} className="hh-slider" style={{ '--p': `${((s.val-s.min)/(s.max-s.min))*100}%` }} />
                </div>
              ))}

              <div style={{ marginBottom: 18, paddingTop: 12, borderTop: '1px solid var(--border-soft)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>Operating temperature</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--coral)' }}>{temp} K</span>
                </div>
                <input type="range" min={298} max={700} value={temp} onChange={e => setTemp(+e.target.value)} className="hh-slider" style={{ '--p': `${((temp-298)/402)*100}%` }} />
              </div>

              <div style={{ padding: 14, background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)' }}>COMPOSITION SIGNATURE</span>
                  <span className="hh-chip hh-chip-cyan">Al{al}Fe{fe}Ni{ni}</span>
                </div>
                <div style={{ display: 'flex', gap: 2, height: 24, borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ flex: al, background: 'var(--cyan)' }} />
                  <div style={{ flex: fe, background: 'var(--violet)' }} />
                  <div style={{ flex: ni, background: 'var(--gold)' }} />
                </div>
                <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>
                  Total: {al + fe + ni} at.% · {al + fe + ni === 100 ? <span style={{ color: 'var(--emerald)' }}>● balanced</span> : <span style={{ color: 'var(--coral)' }}>● rebalancing</span>}
                </div>
              </div>
            </div>

            {/* SHAP + model leaderboard */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16 }}>
              {/* SHAP */}
              <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div className="hh-eyebrow" style={{ marginBottom: 4 }}><span className="dot" style={{ background: 'var(--violet)' }} />WHY THIS PREDICTION?</div>
                    <h3 style={{ fontSize: 15, margin: 0 }}>SHAP feature attribution</h3>
                  </div>
                  <span className="hh-chip hh-chip-violet">Δ wt% H₂</span>
                </div>
                {shapData.map(s => {
                  const w = Math.abs(s.impact) * 400;
                  return (
                    <div key={s.feat} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 50px', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 11.5, color: 'var(--ink-2)' }}>{s.feat}</span>
                      <div style={{ position: 'relative', height: 14, background: 'var(--bg-0)', borderRadius: 3 }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'var(--ink-5)' }} />
                        <div style={{ position: 'absolute', top: 0, bottom: 0,
                          [s.impact > 0 ? 'left' : 'right']: '50%',
                          width: w, background: s.color, borderRadius: 3, opacity: 0.8 }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color, textAlign: 'right' }}>{s.impact > 0 ? '+' : ''}{s.impact}</span>
                    </div>
                  );
                })}
              </div>

              {/* recommendations */}
              <div className="hh-card hh-card-elev" style={{ padding: 22, borderColor: 'rgba(255,181,71,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--gold), var(--coral))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#1a0e00' }}>✦</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>AI optimisation suggestions</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>BAYESIAN ACQUISITION · 3 CANDIDATES</div>
                  </div>
                </div>

                {[
                  { name: 'Al₂₂Fe₃₀Ni₄₈', apply: 'Al22Fe30Ni48', delta: '+18.2%', target: 'uptake', conf: 94 },
                  { name: 'Al₃₂Fe₂₈Ni₄₀', apply: 'Al32Fe28Ni40', delta: '+12.7%', target: 'stability', conf: 89 },
                  { name: 'Al₂₈Fe₄₀Ni₃₂', apply: 'Al28Fe40Ni32', delta: '+9.4%', target: 'diffusivity', conf: 86 },
                ].map((r, i) => (
                  <div key={i} style={{ padding: '10px 0', borderTop: i ? '1px solid var(--border-soft)' : 'none', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 70px', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)' }}>{r.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--emerald)' }}>{r.delta} {r.target}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--bg-0)', borderRadius: 999 }}>
                        <div style={{ width: `${r.conf}%`, height: '100%', background: 'var(--gold)', borderRadius: 999 }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)' }}>{r.conf}%</span>
                    </div>
                    <button className="hh-btn hh-btn-ghost" style={{ padding: '4px 8px', fontSize: 10 }} onClick={() => ctx.applyComposition(r.apply)}>Apply</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ternary preview + history */}
          <div className="hh-grid-main" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
            <div className="hh-card" style={{ padding: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Al × Fe × Ni response map</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>Predicted H₂ uptake · isocontours</div>
              <svg viewBox="0 0 280 240" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <radialGradient id="ternHot" cx="0.65" cy="0.45">
                    <stop offset="0%" stopColor="#FFB547" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.15" />
                  </radialGradient>
                </defs>
                <polygon points="140,20 260,220 20,220" fill="url(#ternHot)" stroke="var(--border-strong)" />
                {/* contour lines */}
                {[0.35, 0.55, 0.75].map(r => (
                  <ellipse key={r} cx={185} cy={130} rx={60*r} ry={45*r} fill="none" stroke="rgba(255,255,255,0.15)" />
                ))}
                {/* current alloy marker */}
                <circle cx="180" cy="130" r="5" fill="#fff" stroke="var(--cyan)" strokeWidth="2" />
                <text x="186" y="124" fontSize="9" fill="var(--cyan)" fontFamily="var(--font-mono)">current</text>
                {/* labels */}
                <text x="140" y="14" fontSize="11" fill="var(--cyan)" textAnchor="middle" fontFamily="var(--font-mono)">Al</text>
                <text x="266" y="234" fontSize="11" fill="var(--violet)" textAnchor="middle" fontFamily="var(--font-mono)">Fe</text>
                <text x="14"  y="234" fontSize="11" fill="var(--gold)" textAnchor="middle" fontFamily="var(--font-mono)">Ni</text>
              </svg>
            </div>

            <div className="hh-card" style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Recent predictions</span>
                <span className="hh-chip">14 today</span>
              </div>
              <table className="hh-table">
                <thead><tr><th>ALLOY</th><th>UPTAKE</th><th>STABILITY</th><th>MODEL</th><th>CONF.</th></tr></thead>
                <tbody>
                  {[
                    ['Al₂₂Fe₃₀Ni₄₈', 'Al22Fe30Ni48', '0.132 wt%', '0.812', 'XGBoost-v3', 94],
                    ['Al₂₈Fe₃₂Ni₄₀', 'Al28Fe32Ni40', '0.124 wt%', '0.798', 'GPR', 91],
                    ['Al₃₀Fe₃₅Ni₃₅', 'Al30Fe35Ni35', '0.114 wt%', '0.781', 'XGBoost-v3', 96],
                    ['Al₂₆Fe₃₆Ni₃₈', 'Al26Fe36Ni38', '0.108 wt%', '0.770', 'NN-MLP', 87],
                    ['Al₃₆Fe₂₆Ni₃₈', 'Al36Fe26Ni38', '0.101 wt%', '0.762', 'XGBoost-v3', 90],
                  ].map((r, i) => (
                    <tr key={i} onClick={() => ctx.applyComposition(r[1])} style={{ cursor: 'pointer' }}>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>{r[0]}</td>
                      <td style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{r[2]}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{r[3]}</td>
                      <td><span className="hh-chip hh-chip-gold" style={{ padding: '2px 6px', fontSize: 9 }}>{r[4]}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>{r[5]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HHAIPredictor = HHAIPredictor;
