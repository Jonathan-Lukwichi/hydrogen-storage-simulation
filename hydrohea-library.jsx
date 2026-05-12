// hydrohea-library.jsx — Materials Library
function HHLibrary() {
  const alloys = [
    { name: 'AlFeNi · BCC', uptake: 0.114, enth: -32.1, dif: 2.4, stab: 0.78, status: 'ACTIVE', tag: 'flagship' },
    { name: 'TiZrNbFeNi', uptake: 0.164, enth: -28.7, dif: 3.1, stab: 0.81, status: 'TESTED' },
    { name: 'TiVNbCr · BCC', uptake: 0.142, enth: -34.5, dif: 2.7, stab: 0.74, status: 'TESTED' },
    { name: 'FeNiCoCrMn', uptake: 0.082, enth: -22.4, dif: 1.9, stab: 0.86, status: 'TESTED' },
    { name: 'TiVZrNbHf', uptake: 0.198, enth: -36.2, dif: 3.4, stab: 0.69, status: 'EXP' },
    { name: 'AlCoCrFeNi · FCC', uptake: 0.094, enth: -25.1, dif: 2.1, stab: 0.82, status: 'TESTED' },
    { name: 'TiZrNbV · C15', uptake: 0.121, enth: -30.8, dif: 2.2, stab: 0.71, status: 'TESTED' },
    { name: 'Mg-Ni-Ti-Al', uptake: 0.156, enth: -29.3, dif: 2.9, stab: 0.65, status: 'EXP' },
    { name: 'CrMnFeCoNi · Cantor', uptake: 0.071, enth: -19.8, dif: 1.6, stab: 0.91, status: 'TESTED' },
    { name: 'AlFeNiCu', uptake: 0.108, enth: -31.4, dif: 2.3, stab: 0.76, status: 'TESTED' },
  ];

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="library" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Materials Library" subtitle="12 400 HEAs · v3.2" actions={
          <><button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }}>Import CSV</button>
            <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>+ New alloy</button></>
        }/>
        <div className="hh-scroll" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi label="Total alloys" value="12 400" unit="" accent="cyan" />
            <window.HHKpi label="Lab-validated" value="3 218" unit="" accent="emerald" />
            <window.HHKpi label="AI-predicted" value="9 182" unit="" accent="violet" />
            <window.HHKpi label="Best uptake" value="3.2" unit="wt%" accent="gold" />
          </div>

          {/* search + filters */}
          <div className="hh-card" style={{ padding: 14, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <input placeholder="🔍  Search alloys by composition, phase, element..." style={{ flex: 1, padding: '9px 14px', background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
            {['Phase: All', 'wt% > 0.10', 'Validated only', '+'].map((f, i) => (
              <span key={i} className="hh-chip" style={{ padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>{f}</span>
            ))}
          </div>

          {/* table */}
          <div className="hh-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="hh-table">
              <thead><tr>
                <th>ALLOY</th><th>H₂ UPTAKE</th><th>ΔH (kJ/mol)</th><th>D ×10⁻⁷</th><th>STABILITY</th><th>STATUS</th><th></th>
              </tr></thead>
              <tbody>
                {alloys.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, var(--cyan), var(--violet))`, opacity: 0.8 }} />
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)', fontWeight: 500 }}>{a.name}</div>
                          {a.tag && <div style={{ fontSize: 9.5, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>★ {a.tag.toUpperCase()}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--cyan)' }}>{a.uptake.toFixed(3)}</span> wt%
                      <div style={{ marginTop: 4, height: 3, background: 'var(--bg-0)', borderRadius: 999, overflow: 'hidden', width: 80 }}>
                        <div style={{ width: `${Math.min(100, a.uptake / 0.2 * 100)}%`, height: '100%', background: 'var(--cyan)', borderRadius: 999 }} />
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--violet)' }}>{a.enth}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{a.dif}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <window.HHRing value={a.stab} size={32} label={a.stab.toFixed(2)} color={a.stab > 0.8 ? 'var(--emerald)' : 'var(--gold)'} />
                      </div>
                    </td>
                    <td>
                      <span className={`hh-chip ${a.status === 'ACTIVE' ? 'hh-chip-cyan' : a.status === 'EXP' ? 'hh-chip-violet' : 'hh-chip-emerald'}`}>{a.status}</span>
                    </td>
                    <td><button className="hh-btn hh-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}>Open →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHLibrary = HHLibrary;
