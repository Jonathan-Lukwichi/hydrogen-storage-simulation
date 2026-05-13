// hydrohea-validation.jsx — Mesh validation studio
function HHValidation() {
  const ctx = window.useHH();
  const [activeVar, setActiveVar] = React.useState('Concentration');
  const rows = [
    { var: 'H concentration (mol/m³)', fine: '8.00×10³', med: '7.95×10³', medE: '0.6%', coarse: '7.85×10³', coarseE: '1.9%' },
    { var: 'Surface temperature (K)', fine: '500', med: '490', medE: '2.0%', coarse: '480', coarseE: '4.0%' },
    { var: 'von Mises stress (Pa)', fine: '4.32×10⁴', med: '4.18×10⁴', medE: '3.2%', coarse: '3.98×10⁴', coarseE: '7.9%' },
    { var: 'Diffusion depth (mm)', fine: '0.98', med: '0.96', medE: '2.0%', coarse: '0.91', coarseE: '7.1%' },
  ];
  const curves = {
    Concentration: [[1, 7.9], [3, 4.8], [6, 3.0], [10, 2.0], [14, 1.1], [20, 0.6]],
    Temp:          [[1, 6.5], [3, 4.2], [6, 2.9], [10, 2.0], [14, 1.4], [20, 0.9]],
    Stress:        [[1, 8.6], [3, 5.4], [6, 3.6], [10, 3.2], [14, 2.4], [20, 1.6]],
  };

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="validation" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Validation Studio" subtitle="Mesh sweep · t = 3600s" actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.exportItem('Validation audit PDF')}>Export audit</button>
            <button className="hh-btn hh-btn-primary" disabled={ctx.running} style={{ padding: '8px 16px', fontSize: 12, opacity: ctx.running ? 0.7 : 1 }} onClick={ctx.runMeshSweep}>
              {ctx.running ? '◐ Running sweep…' : '▶ Re-run sweep'}
            </button>
          </>
        }/>
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          {/* mesh comparison */}
          <div className="hh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
              { name: 'Coarse', elems: '2 140', err: '4.0%', color: 'var(--coral)', t: 0.55 },
              { name: 'Medium', elems: '6 720', err: '2.0%', color: 'var(--gold)', t: 0.65 },
              { name: 'Fine (Reference)', elems: '14 280', err: '—', color: 'var(--emerald)', t: 0.75 },
            ].map(m => (
              <div key={m.name} className="hh-card hh-card-elev" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{m.name.toUpperCase()}</div>
                    <div className="hh-num" style={{ fontSize: 22, color: m.color, marginTop: 2 }}>{m.elems}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>triangular elements</div>
                  </div>
                  <window.HHRing value={1 - Math.min(0.5, parseFloat(m.err) / 8 || 0)} size={50} label={m.err} sublabel="error" color={m.color} />
                </div>
                <window.HHHeatmap data={window.genField({ type: 'concentration', t: m.t, rows: 30, cols: 8 })} cmap="h2" width={200} height={140} />
              </div>
            ))}
          </div>

          {/* convergence table */}
          <div className="hh-card" style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Mesh sensitivity report</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Error vs fine-mesh reference · accept threshold ≤ 5%</div>
              </div>
              <span className="hh-chip hh-chip-emerald">● ALL CONVERGED</span>
            </div>
            <table className="hh-table">
              <thead><tr><th>VARIABLE</th><th>FINE (ref)</th><th>MEDIUM</th><th>Δ</th><th>COARSE</th><th>Δ</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--ink)' }}>{r.var}</td>
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

          {/* convergence curve */}
          <div className="hh-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Convergence vs mesh density</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{activeVar} error % vs elements (log scale)</div>
              </div>
              <window.HHPillRow items={['Concentration', 'Temp', 'Stress']} active={activeVar} onChange={setActiveVar} />
            </div>
            <window.HHLine
              width={900} height={220}
              series={[
                { name: `${activeVar} error %`, points: curves[activeVar], color: '#00E5FF', strokeWidth: 2, markers: true, areas: true },
                { name: 'Acceptance (5%)', points: [[1, 5], [20, 5]], color: '#FFB547', dashed: true, strokeWidth: 1.5 },
              ]}
              xLabel="Elements (× 1000)" yLabel="Error %" yMin={0} yMax={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHValidation = HHValidation;
