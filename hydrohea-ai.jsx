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
    ctx.toast('Running AI surrogate inference…', 'info');
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

  // SHAP attribution comes from the surrogate; each row's `impact` is the
  // marginal change in predicted uptake when that feature alone moves from
  // baseline to current value. So bars actually move when the user tunes.
  const shapData = React.useMemo(
    () => (ctx.shapAttribution ? ctx.shapAttribution().map(s => ({
      ...s, color: s.impact >= 0 ? 'var(--emerald)' : 'var(--coral)',
    })) : []),
    [ctx.shapAttribution, ctx.composition, ctx.opTemp]
  );
  // Plain-language interpretation reacts to current composition + T.
  const interp = window.HHPhysics
    ? window.HHPhysics.interpret(p, temp)
    : [];
  const toneColor = { success: 'var(--emerald)', info: 'var(--cyan)', warn: 'var(--coral)' };

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="ai" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="AI Composition Predictor" subtitle="✦ AI Model A · production" actions={
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

          {/* interpretation card — plain-language reading of the current prediction */}
          <div className="hh-card hh-card-elev" style={{ padding: 22, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'radial-gradient(circle at top right, rgba(167,139,250,0.10), transparent 70%)', pointerEvents: 'none' }} />
            <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" style={{ background: 'var(--violet)' }} />WHAT THIS RECIPE MEANS</div>
            <h3 className="hh-display" style={{ fontSize: 18, margin: '0 0 12px' }}>Plain-language interpretation</h3>
            <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {interp.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: 'var(--bg-0)', borderRadius: 10, border: `1px solid ${toneColor[line.tone]}30` }}>
                  <span style={{ color: toneColor[line.tone], fontFamily: 'var(--font-mono)', flexShrink: 0, width: 14, textAlign: 'center', marginTop: 1 }}>{line.icon}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ternary preview + history */}
          <div className="hh-grid-main" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
            <div className="hh-card" style={{ padding: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Al × Fe × Ni response map</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>Predicted H₂ uptake at {temp} K · live surrogate</div>
              <HHTernaryHeatmap composition={ctx.composition} opTemp={temp} />
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
                    ['Al₂₂Fe₃₀Ni₄₈', 'Al22Fe30Ni48', '0.132 wt%', '0.812', 'AI Model A', 94],
                    ['Al₂₈Fe₃₂Ni₄₀', 'Al28Fe32Ni40', '0.124 wt%', '0.798', 'AI Model B', 91],
                    ['Al₃₀Fe₃₅Ni₃₅', 'Al30Fe35Ni35', '0.114 wt%', '0.781', 'AI Model A', 96],
                    ['Al₂₆Fe₃₆Ni₃₈', 'Al26Fe36Ni38', '0.108 wt%', '0.770', 'AI Model C', 87],
                    ['Al₃₆Fe₂₆Ni₃₈', 'Al36Fe26Ni38', '0.101 wt%', '0.762', 'AI Model A', 90],
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

/* =============================================================
   HHTernaryHeatmap — live Al × Fe × Ni response map.
   Samples the surrogate on a barycentric grid at the current
   operating temperature and renders each cell as a hex-coloured
   point. Re-renders automatically when composition or T change.
   ============================================================= */
function HHTernaryHeatmap({ composition, opTemp }) {
  const N = 18;
  const padX = 32, padY = 24;
  const W = 300 - padX * 2;       // triangle horizontal span (px in viewBox)
  const H = 240 - padY * 2;       // triangle vertical span
  // Equilateral triangle: Al at top, Fe at bottom-right, Ni at bottom-left.
  const apex = { x: padX + W / 2, y: padY };
  const right = { x: padX + W,     y: padY + H };
  const left  = { x: padX,         y: padY + H };

  // Build cells along the simplex Al + Fe + Ni = N
  const cells = React.useMemo(() => {
    if (!window.HHSurrogate) return [];
    const out = [];
    let max = -Infinity, min = Infinity;
    for (let iAl = 0; iAl <= N; iAl++) {
      for (let iFe = 0; iFe <= N - iAl; iFe++) {
        const iNi = N - iAl - iFe;
        const al = (iAl / N) * 100;
        const fe = (iFe / N) * 100;
        const ni = (iNi / N) * 100;
        // Clamp to slider domain to avoid extrapolating wildly at the corners.
        if (al < 5 || fe < 5 || ni < 5) continue;
        const u = window.HHSurrogate.predict({ al, fe, ni }, opTemp).uptake;
        max = Math.max(max, u); min = Math.min(min, u);
        // Barycentric -> cartesian
        const a = iAl / N, f = iFe / N, n = iNi / N;
        const x = a * apex.x + f * right.x + n * left.x;
        const y = a * apex.y + f * right.y + n * left.y;
        out.push({ x, y, u, al, fe, ni });
      }
    }
    return out.map(c => ({ ...c, t: max > min ? (c.u - min) / (max - min) : 0.5, _max: max, _min: min }));
  }, [opTemp]);

  const lo = cells[0]?._min ?? 0, hi = cells[0]?._max ?? 1;
  // Plasma-like ramp: violet → cyan → gold → coral
  const cmap = (t) => {
    const stops = [
      [167, 139, 250],   // violet
      [0,   229, 255],   // cyan
      [255, 181,  71],   // gold
      [255,  84, 112],   // coral
    ];
    const seg = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)));
    const frac = t * (stops.length - 1) - seg;
    const a = stops[seg], b = stops[seg + 1];
    const r = Math.round(a[0] + (b[0] - a[0]) * frac);
    const g = Math.round(a[1] + (b[1] - a[1]) * frac);
    const bl = Math.round(a[2] + (b[2] - a[2]) * frac);
    return `rgb(${r},${g},${bl})`;
  };

  // Current composition marker
  const total = (composition.al + composition.fe + composition.ni) || 1;
  const a = composition.al / total, f = composition.fe / total, n = composition.ni / total;
  const markerX = a * apex.x + f * right.x + n * left.x;
  const markerY = a * apex.y + f * right.y + n * left.y;

  return (
    <div>
      <svg viewBox="0 0 300 260" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <clipPath id="tern-clip">
            <polygon points={`${apex.x},${apex.y} ${right.x},${right.y} ${left.x},${left.y}`} />
          </clipPath>
        </defs>
        <g clipPath="url(#tern-clip)">
          {cells.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={11} fill={cmap(c.t)} opacity={0.85} />
          ))}
        </g>
        <polygon points={`${apex.x},${apex.y} ${right.x},${right.y} ${left.x},${left.y}`} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
        {/* current marker */}
        <circle cx={markerX} cy={markerY} r={5.5} fill="#fff" stroke="var(--cyan)" strokeWidth={2} />
        <circle cx={markerX} cy={markerY} r={11} fill="none" stroke="var(--cyan)" strokeWidth={1} opacity={0.5} />
        <text x={markerX + 9} y={markerY - 8} fontSize="9" fill="var(--cyan)" fontFamily="var(--font-mono)">current</text>
        {/* axis labels */}
        <text x={apex.x}  y={apex.y - 8}  fontSize="11" fill="var(--cyan)"   textAnchor="middle" fontFamily="var(--font-mono)">Al</text>
        <text x={right.x + 8} y={right.y + 8} fontSize="11" fill="var(--violet)" textAnchor="start"  fontFamily="var(--font-mono)">Fe</text>
        <text x={left.x - 8}  y={left.y + 8}  fontSize="11" fill="var(--gold)"   textAnchor="end"    fontFamily="var(--font-mono)">Ni</text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 10.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
        <span>{lo.toFixed(3)}</span>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(90deg, rgb(167,139,250), rgb(0,229,255), rgb(255,181,71), rgb(255,84,112))' }} />
        <span>{hi.toFixed(3)} wt%</span>
      </div>
    </div>
  );
}
window.HHTernaryHeatmap = HHTernaryHeatmap;
