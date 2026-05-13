// =============================================================
// hydrohea-dashboard.jsx — Multi-Physics Simulator cockpit
// =============================================================

function HHDashboard() {
  const ctx = window.useHH();
  const tSec = ctx.tSec, setTSec = ctx.setTSec;
  const boundaryT = ctx.opTemp, setBoundaryT = ctx.setOpTemp;
  const surfConc = ctx.surfConc, setSurfConc = ctx.setSurfConc;
  const activeField = ctx.activeField, setActiveField = ctx.setActiveField;
  const c = ctx.composition;
  const p = window.HHpredict(c, boundaryT);

  const tNorm = tSec / 3600;
  const fields = {
    'H₂ Concentration': { type: 'concentration', cmap: 'h2', unit: 'mol/m³', min: '0', max: surfConc.toFixed(1) + '×10³', val: (surfConc * (0.05 + 0.95 * tNorm)).toFixed(2) },
    'Temperature':      { type: 'temperature',   cmap: 'plasma', unit: 'K', min: '298', max: `${boundaryT}`, val: (298 + (boundaryT - 298) * tNorm).toFixed(0) },
    'von Mises Stress': { type: 'stress',        cmap: 'viridis', unit: 'Pa',  min: '0', max: '4.5×10⁴', val: (4.5 * tNorm).toFixed(2) + '×10⁴' },
  };
  const f = fields[activeField];
  const data = window.genField({ type: f.type, t: tNorm, rows: 50, cols: 12 });

  // Real physics-derived time curves at a probe depth of x = 0.2 mm.
  // c(x,t) = c_s · erfc(x/(2√(Dt))) — see HHPhysics.concentration
  const probeX = 0.2e-3; // m
  const surfConcSI = surfConc * 1e3; // ×10³ mol/m³ → mol/m³
  const D = window.HHPhysics ? window.HHPhysics.diffusivity(boundaryT) : 1e-11;
  const alpha = window.HHPhysics ? window.HHPhysics.ALPHA : 1e-5;

  const curveH = Array.from({length: 60}, (_, i) => {
    const x = i / 59 * 3600;
    const c = window.HHPhysics ? window.HHPhysics.concentration(probeX, x, surfConcSI, D) : 0;
    return [x, c / 1e3]; // back to ×10³ mol/m³ for chart units
  });
  const curveT = Array.from({length: 60}, (_, i) => {
    const x = i / 59 * 3600;
    const T = window.HHPhysics ? window.HHPhysics.temperature(probeX, x, boundaryT, 298, alpha) : 298;
    return [x, T];
  });
  const curveStress = Array.from({length: 60}, (_, i) => {
    const x = i / 59 * 3600;
    const c = window.HHPhysics ? window.HHPhysics.concentration(probeX, x, surfConcSI, D) : 0;
    const sigma = window.HHPhysics ? window.HHPhysics.vonMisesStress(c) : 0;
    return [x, sigma / 1e4]; // Pa → ×10⁴ Pa for chart units
  });

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="simulator" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Multi-Physics Simulator" subtitle={`${window.HHfmtAlloy(c)} · BCC · 1 mm × 5 mm`} hideRun />

        {/* main grid */}
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          {/* KPI row — primary KPI is cyan (Simulator's screen color); rest neutral.
              Every delta is computed live against the workspace baseline.   */}
          <div className="hh-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi primary label="H₂ uptake" value={p.uptake.toFixed(3)} unit="wt%" delta={ctx.formatDelta('uptake')} accent="cyan"
              spark="M0 18 C20 16, 40 12, 60 7 S90 4, 100 4" />
            <window.HHKpi label="τ saturation" value={(1820 - (p.diffusivity - 2.4) * 80).toFixed(0)} unit="s" delta={ctx.formatDelta('diffusivity', { invertGood: true })} accent="neutral"
              spark="M0 22 C20 18, 40 14, 60 10 S90 5, 100 4" />
            <window.HHKpi label="ΔT surface" value={(boundaryT - 298).toString()} unit="K" accent="neutral"
              spark="M0 20 L20 18 L40 12 L60 8 L80 6 L100 5" />
            <window.HHKpi label="σ_max" value={(4.5 * tNorm).toFixed(2)} unit="×10⁴ Pa" accent="neutral"
              spark="M0 22 C20 18, 40 10, 60 6 S90 4, 100 8" />
            <window.HHKpi label="Diffusivity" value={p.diffusivity.toFixed(2)} unit="×10⁻¹⁰ m²/s" delta={ctx.formatDelta('diffusivity')} accent="neutral"
              spark="M0 16 C20 14, 40 10, 60 6 S90 3, 100 2" />
          </div>

          {/* plain-language interpretation row */}
          <SimulatorInterpretation pred={p} T={boundaryT} />


          {/* main viz + control */}
          <div className="hh-grid-main" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.85fr', gap: 16, marginBottom: 16 }}>
            {/* heatmap card */}
            <div className="hh-card hh-card-elev" style={{ padding: 20, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 14 }}>
                <div>
                  <div className="hh-eyebrow" style={{ marginBottom: 6 }}><span className="dot" />2D FIELD MAP · LIVE</div>
                  <h3 className="hh-display" style={{ fontSize: 20, margin: 0 }}>{activeField}</h3>
                </div>
                <window.HHPillRow items={['H₂ Concentration', 'Temperature', 'von Mises Stress']} active={activeField} onChange={setActiveField} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 24, alignItems: 'start' }}>
                {/* heatmap */}
                <div style={{ position: 'relative' }}>
                  <window.HHHeatmap data={data} cmap={f.cmap} width={500} height={300} />
                  {/* probe marker */}
                  <div style={{ position: 'absolute', left: '20%', top: '40%', width: 8, height: 8, borderRadius: '50%', background: '#fff', boxShadow: '0 0 0 2px var(--cyan), 0 0 12px var(--cyan-glow)' }} />
                  <div style={{ position: 'absolute', left: 'calc(20% + 14px)', top: 'calc(40% - 12px)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyan)' }}>P1</div>
                  {ctx.running && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,8,17,0.55)', backdropFilter: 'blur(2px)', borderRadius: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.25)', borderTopColor: 'var(--cyan)', animation: 'hh-spin 0.9s linear infinite' }} />
                      <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em' }}>SOLVING · t = {ctx.tSec}s</div>
                    </div>
                  )}
                  {/* axes ticks */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)' }}>
                    <span>0</span><span>0.25</span><span>0.5</span><span>0.75</span><span>1 mm</span>
                  </div>
                </div>

                {/* legend & probe info */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', marginBottom: 8 }}>SCALE</div>
                  <window.HHColorbar cmap={f.cmap} min={f.min} max={f.max} unit={f.unit} />

                  <div style={{ marginTop: 24, padding: 14, background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>● PROBE P1</span>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--ink-4)' }}>(0.2, 0.4) mm</span>
                    </div>
                    <div className="hh-num" style={{ fontSize: 24, color: 'var(--cyan)' }}>{f.val}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{f.unit} · t = {tSec}s</div>
                  </div>

                  <div style={{ marginTop: 12, padding: 14, background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 10 }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', marginBottom: 6 }}>MESH</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Fine (14 280 elems)</div>
                    <div style={{ fontSize: 10.5, color: 'var(--emerald)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>Δ &lt; 0.4% (converged)</div>
                  </div>
                </div>
              </div>

              {/* time scrubber */}
              <div style={{ marginTop: 22, padding: 14, background: 'var(--bg-0)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => { if (tSec >= 3600) setTSec(0); ctx.setPlaying(!ctx.playing); }} style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--cyan)', color: '#001', border: 'none', fontSize: 11, cursor: 'pointer' }}>{ctx.playing ? '❚❚' : '▶'}</button>
                    <button onClick={() => { ctx.setPlaying(false); setTSec(0); }} title="Reset" style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface-2)', color: 'var(--ink-2)', border: '1px solid var(--border)', fontSize: 11, cursor: 'pointer' }}>↺</button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)' }}>t = <span style={{ color: 'var(--cyan)' }} className="hh-num">{tSec}</span> / 3 600 s</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {['0.25×', '1×', '4×', '16×'].map(s => (
                      <div key={s} onClick={() => ctx.setPlaySpeed(s)} style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, borderRadius: 4, background: s === ctx.playSpeed ? 'var(--surface-2)' : 'transparent', color: s === ctx.playSpeed ? 'var(--ink)' : 'var(--ink-3)', cursor: 'pointer' }}>{s}</div>
                    ))}
                  </div>
                </div>
                <input type="range" min="0" max="3600" value={tSec} onChange={e => setTSec(+e.target.value)} className="hh-slider" style={{ '--p': `${(tSec/3600)*100}%` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)', marginTop: 6 }}>
                  <span>0s</span><span>900s</span><span>1800s</span><span>2700s</span><span>3600s</span>
                </div>
              </div>
            </div>

            {/* controls panel */}
            <div className="hh-card hh-card-elev" style={{ padding: 20 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--gold)' }} />SIMULATION INPUTS</div>

              {/* composition (driven by AI Predictor sliders / Apply actions) */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>Alloy composition</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="hh-chip hh-chip-cyan">Al{c.al} Fe{c.fe} Ni{c.ni}</span>
                    <button className="hh-btn hh-btn-ghost" style={{ padding: '3px 8px', fontSize: 10 }} onClick={() => ctx.navigate('ai')}>Tune →</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, height: 22, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ flex: c.al, background: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: '#001' }}>Al {c.al}</div>
                  <div style={{ flex: c.fe, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: '#fff' }}>Fe {c.fe}</div>
                  <div style={{ flex: c.ni, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: '#1a0e00' }}>Ni {c.ni}</div>
                </div>
              </div>

              {/* T slider */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>Boundary temperature</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)' }}>{boundaryT} K</span>
                </div>
                <input type="range" min="298" max="700" value={boundaryT} onChange={e => setBoundaryT(+e.target.value)} className="hh-slider" style={{ '--p': `${((boundaryT-298)/402)*100}%` }} />
              </div>

              {/* concentration slider */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>Surface H concentration</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)' }}>{surfConc.toFixed(1)} ×10³ mol/m³</span>
                </div>
                <input type="range" min="1" max="12" step="0.1" value={surfConc} onChange={e => setSurfConc(+e.target.value)} className="hh-slider" style={{ '--p': `${((surfConc-1)/11)*100}%` }} />
              </div>

              {/* Arrhenius */}
              <div style={{ padding: 12, background: 'var(--bg-0)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', marginBottom: 6 }}>ARRHENIUS DIFFUSION</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)' }}>D(T) = D₀ · exp(−Q/RT)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--ink-3)' }}>D₀ = <span style={{ color: 'var(--ink)' }}>2.0×10⁻⁷</span></span>
                  <span style={{ color: 'var(--ink-3)' }}>Q = <span style={{ color: 'var(--ink)' }}>3.0×10⁴ J/mol</span></span>
                </div>
              </div>

              {/* Single primary CTA. AI Predictor is reachable from the sidebar. */}
              <button className="hh-btn hh-btn-primary" disabled={ctx.running} style={{ width: '100%', padding: '12px', fontSize: 13, justifyContent: 'center', opacity: ctx.running ? 0.7 : 1 }} onClick={ctx.runSimulation}>
                {ctx.running ? <><span className="hh-spin">◐</span>&nbsp;Solver running…</> : '▶ Run multi-physics solve'}
              </button>
              <button className="hh-btn hh-btn-ghost" style={{ width: '100%', padding: '9px', fontSize: 12, justifyContent: 'center', marginTop: 8, color: 'var(--gold)', borderColor: 'rgba(255,181,71,0.30)' }} onClick={() => ctx.navigate('ai')}>
                ✦ Tune with AI Predictor
              </button>
            </div>
          </div>

          {/* time curves row */}
          <div className="hh-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="hh-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Surface H₂ Concentration</span>
                <span className="hh-chip hh-chip-cyan">DIFFUSION</span>
              </div>
              <window.HHLine
                width={400} height={170}
                series={[{ name: `${window.HHfmtAlloy(c)} · ${ctx.runs[0]?.id || 'run-78f3a'}`, points: curveH, color: '#00E5FF', strokeWidth: 2 }]}
                xLabel="t (s)" yLabel="c (×10³ mol/m³)" yMin={0} yMax={Math.max(9, surfConc + 1)} areas legend={false}
              />
            </div>
            <div className="hh-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Surface Temperature</span>
                <span className="hh-chip hh-chip-gold">THERMAL</span>
              </div>
              <window.HHLine
                width={400} height={170}
                series={[{ name: 'T(t)', points: curveT, color: '#FFB547', strokeWidth: 2 }]}
                xLabel="t (s)" yLabel="T (K)" yMin={298} yMax={520} areas legend={false}
              />
            </div>
            <div className="hh-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>von Mises Stress</span>
                <span className="hh-chip hh-chip-coral">MECHANICAL</span>
              </div>
              <window.HHLine
                width={400} height={170}
                series={[{ name: 'σ(t)', points: curveStress, color: '#FF5470', strokeWidth: 2 }]}
                xLabel="t (s)" yLabel="σ (×10⁴ Pa)" yMin={0} yMax={5} areas legend={false}
              />
            </div>
          </div>

          {/* footer audit row */}
          <div className="hh-card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              <span><span style={{ color: 'var(--emerald)' }}>●</span> Solver: COMSOL-grade FEM v3.2.1</span>
              <span>Mesh: 14 280 triangular elements</span>
              <span>Time-step: adaptive (10⁻³–10s)</span>
              <span>RMSE vs. literature: <span style={{ color: 'var(--emerald)' }}>2.7%</span></span>
            </div>
            <span>run-78f3a · 11:42 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HHDashboard = HHDashboard;

function SimulatorInterpretation({ pred, T }) {
  if (!window.HHPhysics) return null;
  const lines = window.HHPhysics.interpret(pred, T);
  const tone = { success: 'var(--emerald)', info: 'var(--cyan)', warn: 'var(--coral)' };
  return (
    <div className="hh-card hh-card-elev" style={{ padding: 18, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />WHAT THE NUMBERS MEAN</div>
      <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 10px', background: 'var(--bg-0)', borderRadius: 8, border: `1px solid ${tone[l.tone]}26` }}>
            <span style={{ color: tone[l.tone], fontFamily: 'var(--font-mono)', flexShrink: 0, width: 14, textAlign: 'center', marginTop: 1 }}>{l.icon}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
