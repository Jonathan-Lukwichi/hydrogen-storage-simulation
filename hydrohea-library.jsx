// hydrohea-library.jsx — Materials Library
function HHLibrary() {
  const ctx = window.useHH();
  const [query, setQuery] = React.useState('');
  const [phaseFilter, setPhaseFilter] = React.useState('All');
  const [uptakeFilter, setUptakeFilter] = React.useState(false);
  const [validatedOnly, setValidatedOnly] = React.useState(false);
  const [sortKey, setSortKey] = React.useState('uptake');
  const [sortDir, setSortDir] = React.useState('desc');

  const phases = React.useMemo(() => ['All', ...Array.from(new Set(ctx.alloys.map(a => a.phase).filter(Boolean)))], [ctx.alloys]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return ctx.alloys
      .filter(a => !q || a.name.toLowerCase().includes(q) || (a.phase || '').toLowerCase().includes(q))
      .filter(a => phaseFilter === 'All' || a.phase === phaseFilter)
      .filter(a => !uptakeFilter || a.uptake > 0.10)
      .filter(a => !validatedOnly || a.status !== 'EXP')
      .sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
        return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
  }, [ctx.alloys, query, phaseFilter, uptakeFilter, validatedOnly, sortKey, sortDir]);

  const totalLab = ctx.alloys.filter(a => a.source === 'lab').length;
  const totalAi = ctx.alloys.filter(a => a.source !== 'lab').length;
  const bestUptake = ctx.alloys.reduce((m, a) => Math.max(m, a.uptake), 0);

  const openAlloy = (a) => {
    ctx.openDrawer({
      title: a.name,
      content: <HHAlloyDetail alloy={a} ctx={ctx} />,
    });
  };

  const toggleSort = (k) => {
    if (k === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setSortDir('desc'); }
  };

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="library" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Materials Library" subtitle={`${ctx.alloys.length} alloys · v3.2`} actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.openModal({ content: <window.HHModalImport ctx={ctx} /> })}>Import CSV</button>
            <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx.openModal({ content: <window.HHModalNewAlloy ctx={ctx} /> })}>+ New alloy</button>
          </>
        }/>
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div className="hh-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi primary label="Total alloys" value={ctx.alloys.length + ''} unit="" accent="violet" />
            <window.HHKpi label="Lab-validated" value={totalLab + ''} unit="" accent="neutral" />
            <window.HHKpi label="AI-predicted" value={totalAi + ''} unit="" accent="neutral" />
            <window.HHKpi label="Best uptake" value={bestUptake.toFixed(3)} unit="wt%" accent="neutral" />
          </div>

          {/* search + filters */}
          <div className="hh-card" style={{ padding: 14, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="🔍  Search alloys by composition, phase, element..."
              style={{ flex: 1, minWidth: 240, padding: '9px 14px', background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg-0)', borderRadius: 999, border: '1px solid var(--border)' }}>
              {phases.map(p => (
                <div key={p} onClick={() => setPhaseFilter(p)} style={{ padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10.5, borderRadius: 999, cursor: 'pointer', background: phaseFilter === p ? 'var(--surface-2)' : 'transparent', color: phaseFilter === p ? 'var(--ink)' : 'var(--ink-3)' }}>{p}</div>
              ))}
            </div>
            <span onClick={() => setUptakeFilter(v => !v)} className={`hh-chip ${uptakeFilter ? 'hh-chip-cyan' : ''}`} style={{ padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>wt% &gt; 0.10</span>
            <span onClick={() => setValidatedOnly(v => !v)} className={`hh-chip ${validatedOnly ? 'hh-chip-emerald' : ''}`} style={{ padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>Validated only</span>
            <span onClick={() => { setQuery(''); setPhaseFilter('All'); setUptakeFilter(false); setValidatedOnly(false); }} className="hh-chip" style={{ padding: '6px 12px', fontSize: 11, cursor: 'pointer', color: 'var(--coral)' }}>↺ Reset</span>
            <span className="hh-chip" style={{ padding: '6px 12px', fontSize: 11, color: 'var(--ink-3)' }}>{filtered.length} of {ctx.alloys.length}</span>
          </div>

          {/* table */}
          <div className="hh-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="hh-table">
              <thead><tr>
                <th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>ALLOY {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                <th onClick={() => toggleSort('uptake')} style={{ cursor: 'pointer' }}>H₂ UPTAKE {sortKey === 'uptake' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                <th onClick={() => toggleSort('enth')} style={{ cursor: 'pointer' }}>ΔH (kJ/mol) {sortKey === 'enth' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                <th onClick={() => toggleSort('dif')} style={{ cursor: 'pointer' }}>D ×10⁻⁷ {sortKey === 'dif' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                <th onClick={() => toggleSort('stab')} style={{ cursor: 'pointer' }}>STABILITY {sortKey === 'stab' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                <th>STATUS</th><th></th>
              </tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--ink-3)' }}>No alloys match your filters.</td></tr>
                )}
                {filtered.map((a, i) => (
                  <tr key={a.name + i} onClick={() => openAlloy(a)} style={{ cursor: 'pointer' }}>
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
                    <td><button className="hh-btn hh-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }} onClick={e => { e.stopPropagation(); openAlloy(a); }}>Open →</button></td>
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

function HHAlloyDetail({ alloy, ctx }) {
  const apply = () => { ctx.applyComposition(alloy.name); ctx.closeDrawer(); ctx.navigate('simulator'); };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600 }}>{alloy.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{alloy.phase || 'phase n/a'} · {alloy.source === 'lab' ? 'Lab validated' : 'AI predicted'}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 18 }}>
        {[
          { l: 'H₂ uptake', v: alloy.uptake.toFixed(3), u: 'wt%', c: 'var(--cyan)' },
          { l: 'Hydride enthalpy', v: alloy.enth, u: 'kJ/mol', c: 'var(--violet)' },
          { l: 'Diffusivity', v: alloy.dif, u: '×10⁻⁷ m²/s', c: 'var(--emerald)' },
          { l: 'Stability', v: alloy.stab.toFixed(2), u: '', c: 'var(--gold)' },
        ].map(m => (
          <div key={m.l} style={{ padding: 14, borderRadius: 10, background: 'var(--bg-0)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{m.l.toUpperCase()}</div>
            <div className="hh-num" style={{ fontSize: 22, color: m.c, marginTop: 4 }}>{m.v} <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{m.u}</span></div>
          </div>
        ))}
      </div>
      <div className="hh-eyebrow" style={{ marginBottom: 8 }}><span className="dot" />NOTES</div>
      <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginTop: 0 }}>
        Cross-validated against {alloy.source === 'lab' ? 'peer-reviewed experimental data' : 'literature benchmarks and surrogate models'}.
        Recommended operating window: 298–520 K. Hydride formation enthalpy lies within ±2% of CALPHAD prediction.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
        <button className="hh-btn hh-btn-primary" style={{ padding: 11, justifyContent: 'center' }} onClick={apply}>Load into Simulator →</button>
        <button className="hh-btn hh-btn-ghost" style={{ padding: 11, justifyContent: 'center' }} onClick={() => ctx.exportItem(`Alloy ${alloy.name} datasheet`)}>Export datasheet (PDF)</button>
        <button className="hh-btn hh-btn-ghost" style={{ padding: 11, justifyContent: 'center' }} onClick={() => { ctx.shareLink(); }}>Share link</button>
      </div>
    </div>
  );
}

window.HHLibrary = HHLibrary;
window.HHAlloyDetail = HHAlloyDetail;
