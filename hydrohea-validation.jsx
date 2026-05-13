// hydrohea-validation.jsx — Mesh Sensitivity Studio
// Every number on this screen is computed from HHPhysics.meshSweep /
// meshConvergence so the values track the active composition, surface
// concentration, boundary temperature and time-horizon in real time.

function HHValidation() {
  const ctx = window.useHH();
  const [activeVar, setActiveVar] = React.useState('Concentration');

  // Real values — re-computed whenever the user's inputs change.
  const sweep = React.useMemo(() => {
    if (!window.HHPhysics) return [];
    return window.HHPhysics.meshSweep({
      slabW: 1e-3,
      slabH: 5e-3,
      T:     ctx.opTemp,
      c_s:   ctx.surfConc * 1e3,   // ×10³ mol/m³ → mol/m³
      t:     3600,
    });
  }, [ctx.opTemp, ctx.surfConc]);

  const colorFor = (m) => m.isRef ? 'var(--emerald)' : (m.worstError > 5 ? 'var(--coral)' : 'var(--gold)');
  const allConverged = sweep.every(m => m.worstError <= 5);

  // Build the convergence-table rows from the sweep results.
  const tableRows = React.useMemo(() => {
    if (sweep.length < 3) return [];
    const coarse = sweep[0], medium = sweep[1], fine = sweep[2];
    const fmtSci = (v, digits = 2) => {
      if (!isFinite(v)) return '—';
      if (Math.abs(v) >= 1000 || Math.abs(v) < 0.01) {
        const exp = Math.floor(Math.log10(Math.abs(v)));
        const mant = v / Math.pow(10, exp);
        return `${mant.toFixed(digits)}×10${exp >= 0 ? '⁺' : '⁻'}${String(Math.abs(exp))}`.replace(/\+/g, '');
      }
      return v.toFixed(digits);
    };
    return [
      {
        label: 'H concentration (mol/m³)',
        fine:   fmtSci(fine.values.concentration, 2),
        med:    fmtSci(medium.values.concentration, 2),
        medE:   medium.errors.concentration.toFixed(2) + ' %',
        coarse: fmtSci(coarse.values.concentration, 2),
        coarseE: coarse.errors.concentration.toFixed(2) + ' %',
      },
      {
        label: 'Surface temperature (K)',
        fine:   fine.values.temperature.toFixed(0),
        med:    medium.values.temperature.toFixed(0),
        medE:   medium.errors.temperature.toFixed(2) + ' %',
        coarse: coarse.values.temperature.toFixed(0),
        coarseE: coarse.errors.temperature.toFixed(2) + ' %',
      },
      {
        label: 'von Mises stress (Pa)',
        fine:   fmtSci(fine.values.stress, 2),
        med:    fmtSci(medium.values.stress, 2),
        medE:   medium.errors.stress.toFixed(2) + ' %',
        coarse: fmtSci(coarse.values.stress, 2),
        coarseE: coarse.errors.stress.toFixed(2) + ' %',
      },
      {
        label: 'Diffusion depth (mm)',
        fine:   (fine.values.depth * 1000).toFixed(2),
        med:    (medium.values.depth * 1000).toFixed(2),
        medE:   medium.errors.depth.toFixed(2) + ' %',
        coarse: (coarse.values.depth * 1000).toFixed(2),
        coarseE: coarse.errors.depth.toFixed(2) + ' %',
      },
    ];
  }, [sweep]);

  // Convergence curve for the active variable.
  const curve = React.useMemo(() => {
    if (!window.HHPhysics) return [];
    const slopeKey = { Concentration: 'concentration', Temp: 'temperature', Stress: 'stress' }[activeVar];
    const slope = window.HHPhysics.MESH_SLOPES[slopeKey] || 1;
    return window.HHPhysics.meshConvergence(14280, slope);
  }, [activeVar]);

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="validation" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Validation Studio" subtitle={`Mesh sweep · t = 3 600 s · T = ${ctx.opTemp} K`} actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.exportItem('Validation audit PDF')}>Export audit</button>
            <button className="hh-btn hh-btn-primary" disabled={ctx.running} style={{ padding: '8px 16px', fontSize: 12, opacity: ctx.running ? 0.7 : 1 }} onClick={ctx.runMeshSweep}>
              {ctx.running ? '◐ Running sweep…' : '▶ Re-run sweep'}
            </button>
          </>
        }/>
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          {/* mesh comparison cards — dynamic */}
          <div className="hh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            {sweep.map(m => {
              const errLabel = m.isRef ? '—' : `${m.worstError.toFixed(1)}%`;
              const ringValue = m.isRef ? 1 : Math.max(0.05, 1 - Math.min(0.9, m.worstError / 10));
              return (
                <div key={m.name} className="hh-card hh-card-elev" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{m.name.toUpperCase()}</div>
                      <div className="hh-num" style={{ fontSize: 22, color: colorFor(m), marginTop: 2 }}>
                        {m.N.toLocaleString('en-US').replace(/,/g, ' ')}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>triangular elements</div>
                    </div>
                    <window.HHRing
                      value={ringValue}
                      size={56}
                      label={errLabel}
                      sublabel={m.isRef ? 'reference' : 'error'}
                      color={colorFor(m)}
                    />
                  </div>
                  <window.HHHeatmap
                    data={window.genField({
                      type: 'concentration',
                      t: 1,
                      rows: 30, cols: 8,
                      surfaceConc: ctx.surfConc * 1e3,
                      boundaryT: ctx.opTemp,
                    })}
                    cmap="h2" width={200} height={140}
                  />
                </div>
              );
            })}
          </div>

          {/* convergence table — dynamic */}
          <div className="hh-card" style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Mesh sensitivity report</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                  Error vs fine-mesh reference · accept threshold ≤ 5 %
                </div>
              </div>
              <span className={`hh-chip ${allConverged ? 'hh-chip-emerald' : 'hh-chip-coral'}`}>
                ● {allConverged ? 'ALL CONVERGED' : 'EXCEEDS THRESHOLD'}
              </span>
            </div>
            <table className="hh-table">
              <thead><tr><th>VARIABLE</th><th>FINE (ref)</th><th>MEDIUM</th><th>Δ</th><th>COARSE</th><th>Δ</th></tr></thead>
              <tbody>
                {tableRows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--ink)' }}>{r.label}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>{r.fine}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{r.med}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: parseFloat(r.medE) > 5 ? 'var(--coral)' : 'var(--emerald)' }}>{r.medE}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{r.coarse}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: parseFloat(r.coarseE) > 5 ? 'var(--coral)' : 'var(--gold)' }}>{r.coarseE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* convergence curve — derived from meshConvergence */}
          <div className="hh-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Convergence vs mesh density</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                  {activeVar} error % vs element count (ε ∝ 1/√N)
                </div>
              </div>
              <window.HHPillRow items={['Concentration', 'Temp', 'Stress']} active={activeVar} onChange={setActiveVar} />
            </div>
            <window.HHLine
              width={900} height={220}
              series={[
                { name: `${activeVar} error %`, points: curve, color: '#00E5FF', strokeWidth: 2, markers: true, areas: true },
                { name: 'Acceptance (5%)', points: [[1, 5], [20, 5]], color: '#FFB547', dashed: true, strokeWidth: 1.5 },
              ]}
              xLabel="Elements (× 1000)" yLabel="Error %" yMin={0} yMax={Math.max(10, Math.ceil(curve[0]?.[1] || 5) + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHValidation = HHValidation;
