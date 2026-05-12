// =============================================================
// hydrohea-shell.jsx — shared atoms: Logo, TopBar, SideNav, KPI cards,
// micro charts, status pill, ring, etc. Exposed on window.HH.*
// =============================================================

const { useState, useEffect, useRef, useMemo } = React;

/* ---------------- LOGO ---------------- */
function HHLogo({ size = 28, label = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="hh-lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <path d="M20 3 L34 11 L34 29 L20 37 L6 29 L6 11 Z" fill="none" stroke="url(#hh-lg)" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#00E5FF" />
        <circle cx="12" cy="14" r="1.8" fill="#00E5FF" opacity="0.7" />
        <circle cx="28" cy="14" r="1.8" fill="#A78BFA" opacity="0.7" />
        <circle cx="12" cy="26" r="1.8" fill="#A78BFA" opacity="0.7" />
        <circle cx="28" cy="26" r="1.8" fill="#00E5FF" opacity="0.7" />
        <line x1="20" y1="20" x2="12" y2="14" stroke="#00E5FF" strokeWidth="0.7" opacity="0.5" />
        <line x1="20" y1="20" x2="28" y2="14" stroke="#A78BFA" strokeWidth="0.7" opacity="0.5" />
        <line x1="20" y1="20" x2="12" y2="26" stroke="#A78BFA" strokeWidth="0.7" opacity="0.5" />
        <line x1="20" y1="20" x2="28" y2="26" stroke="#00E5FF" strokeWidth="0.7" opacity="0.5" />
      </svg>
      {label && (
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Hydro<span style={{ color: 'var(--cyan)' }}>HEA</span>
        </div>
      )}
    </div>
  );
}

/* ---------------- MARKETING TOP BAR ---------------- */
function HHMarketingNav() {
  const ctx = window.useHH && window.useHH();
  const items = [
    { label: 'Platform',  anchor: 'capabilities' },
    { label: 'Science',   anchor: 'pipeline' },
    { label: 'Customers', anchor: 'outcomes' },
    { label: 'Pricing',   anchor: 'cta' },
    { label: 'Research',  anchor: 'ai-band' },
  ];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(35,44,70,0.5)',
      background: 'rgba(5,8,17,0.65)', backdropFilter: 'blur(20px)',
    }}>
      <div style={{ cursor: 'pointer' }} onClick={() => ctx && ctx.navigate('landing')}><HHLogo /></div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 13, color: 'var(--ink-2)' }}>
        {items.map((it, i) => (
          <a key={it.label} onClick={() => scrollTo(it.anchor)} style={{ color: i === 0 ? 'var(--ink)' : 'var(--ink-3)', textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            {it.label}
            {i === 0 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx && ctx.navigate('signin')}>Sign in</button>
        <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx && ctx.openModal({ content: <window.HHModalDemo ctx={ctx} /> })}>
          Request demo <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- APP SIDE NAV ---------------- */
function HHSideNav({ active = 'simulator' }) {
  const ctx = window.useHH && window.useHH();
  const items = [
    { id: 'home', icon: '◇', label: 'Overview' },
    { id: 'simulator', icon: '⬡', label: 'Simulator' },
    { id: 'ai', icon: '✦', label: 'AI Predictor' },
    { id: 'library', icon: '◈', label: 'Materials' },
    { id: 'validation', icon: '◐', label: 'Validation' },
    { id: 'reports', icon: '▤', label: 'Reports' },
  ];
  const bottom = [
    { id: 'docs', icon: '?', label: 'Docs' },
    { id: 'settings', icon: '⚙', label: 'Settings' },
  ];
  const navTo = (id) => { if (ctx) ctx.navigate(id); };
  const lastRun = ctx?.runs?.[0];
  const user = ctx?.user || { name: 'C. Lukwichi', org: 'ESIS · Metallurgy', initials: 'CL' };
  return (
    <aside style={{
      width: 240, background: 'var(--bg-1)', borderRight: '1px solid var(--border-soft)',
      display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0,
    }}>
      <div style={{ padding: '0 24px 28px', cursor: 'pointer' }} onClick={() => navTo('landing')}>
        <HHLogo />
      </div>
      <div style={{ padding: '0 12px' }}>
        <div style={{ padding: '0 12px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-4)' }}>WORKSPACE</div>
        {items.map(it => (
          <div key={it.id} onClick={() => navTo(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '9px 12px', borderRadius: 8,
            color: it.id === active ? 'var(--ink)' : 'var(--ink-3)',
            background: it.id === active ? 'rgba(0,229,255,0.08)' : 'transparent',
            border: it.id === active ? '1px solid rgba(0,229,255,0.20)' : '1px solid transparent',
            cursor: 'pointer', fontSize: 13, marginBottom: 2,
            position: 'relative',
          }}
          onMouseEnter={e => { if (it.id !== active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseLeave={e => { if (it.id !== active) e.currentTarget.style.background = 'transparent'; }}>
            <span style={{ color: it.id === active ? 'var(--cyan)' : 'var(--ink-4)', fontSize: 14, width: 14, display: 'inline-block', textAlign: 'center' }}>{it.icon}</span>
            {it.label}
            {it.id === active && <span style={{ position: 'absolute', right: 10, width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, padding: '0 12px' }}>
        <div style={{ padding: '0 12px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-4)' }}>ACTIVE PROJECT</div>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ctx ? window.HHfmtAlloy(ctx.composition) : 'AlFeNi'} · v3.2</div>
            <span className={`hh-chip ${ctx?.running ? 'hh-chip-gold' : 'hh-chip-emerald'}`} style={{ padding: '2px 6px', fontSize: 9 }}>{ctx?.running ? 'RUNNING' : 'LIVE'}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>{lastRun?.id || 'run-78f3a'} · t = {ctx?.tSec ?? 3600}s</div>
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '0 12px' }}>
        {bottom.map(it => (
          <div key={it.id} onClick={() => navTo(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 12px', borderRadius: 8,
            color: it.id === active ? 'var(--ink)' : 'var(--ink-3)',
            background: it.id === active ? 'rgba(0,229,255,0.06)' : 'transparent',
            fontSize: 13, cursor: 'pointer',
          }}>
            <span style={{ color: it.id === active ? 'var(--cyan)' : 'var(--ink-4)', width: 14, textAlign: 'center' }}>{it.icon}</span>{it.label}
          </div>
        ))}
        <div onClick={() => navTo('settings')} style={{ padding: '14px 12px', marginTop: 8, borderTop: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#001' }}>{user.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.org}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- APP TOP BAR ---------------- */
function HHTopBar({ title, subtitle, actions }) {
  const ctx = window.useHH && window.useHH();
  const lastRun = ctx?.runs?.[0];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 32px', borderBottom: '1px solid var(--border-soft)',
      background: 'var(--bg-1)', flexShrink: 0,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>HydroHEA / Projects /</div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
          <span className="hh-chip hh-chip-cyan">{subtitle || (ctx ? window.HHfmtAlloy(ctx.composition) + ' · BCC' : 'AlFeNi · BCC')}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          Last solver run · {lastRun?.id || 'run-78f3a'} · Δerror &lt; 0.4% · mesh: fine (14 280 elems)
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {actions || (
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx && ctx.exportItem('Run PDF')}>Export</button>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx && ctx.shareLink()}>Share</button>
            <button className="hh-btn hh-btn-primary" disabled={ctx?.running} style={{ padding: '8px 16px', fontSize: 12, opacity: ctx?.running ? 0.7 : 1 }} onClick={() => ctx && ctx.runSimulation()}>
              {ctx?.running ? '◐ Running…' : '▶ Run simulation'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KPI CARD ---------------- */
function HHKpi({ label, value, unit, delta, accent = 'cyan', spark }) {
  const accentColor = { cyan: 'var(--cyan)', gold: 'var(--gold)', emerald: 'var(--emerald)', coral: 'var(--coral)', violet: 'var(--violet)' }[accent];
  return (
    <div className="hh-card hh-card-glow" style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: accentColor, opacity: 0.7 }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="hh-num" style={{ fontSize: 30 }}>{value}</span>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{unit}</span>
      </div>
      {delta && (
        <div style={{ fontSize: 11, color: delta.startsWith('-') ? 'var(--coral)' : 'var(--emerald)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
          {delta.startsWith('-') ? '↓' : '↑'} {delta.replace(/^-/, '')} vs baseline
        </div>
      )}
      {spark && (
        <svg viewBox="0 0 100 24" style={{ width: '100%', height: 24, marginTop: 10 }} preserveAspectRatio="none">
          <path d={spark} stroke={accentColor} strokeWidth="1.5" fill="none" />
          <path d={spark + ' L100 24 L0 24 Z'} fill={accentColor} opacity="0.10" />
        </svg>
      )}
    </div>
  );
}

/* ---------------- STATUS RING ---------------- */
function HHRing({ value = 0.7, size = 78, label, sublabel, color = 'var(--cyan)' }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={c - c * value} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hh-num" style={{ fontSize: 18 }}>{label}</div>
        {sublabel && <div style={{ fontSize: 9, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{sublabel}</div>}
      </div>
    </div>
  );
}

/* ---------------- MINI HEATMAP (2D grid) ---------------- */
/* values: 2D array normalised 0..1; cmap = 'plasma' | 'viridis' | 'rdbu' */
function HHHeatmap({ data, width = 280, height = 360, cmap = 'plasma', label, contour = true }) {
  const rows = data.length, cols = data[0].length;
  const cw = width / cols, ch = height / rows;
  const colors = {
    plasma: t => `rgb(${Math.round(13 + 240*t*t)},${Math.round(8 + 100*t)},${Math.round(135 - 100*t + 80*(1-t)*(1-t))})`,
    viridis: t => `rgb(${Math.round(68 + 180*t)},${Math.round(1 + 220*t)},${Math.round(84 + 50*(1-t)*(1-t))})`,
    rdbu: t => t < 0.5 ? `rgb(${Math.round(20+80*t*2)},${Math.round(80+120*t*2)},${Math.round(150+90*t*2)})` : `rgb(${Math.round(255-50*(1-t)*2)},${Math.round(150-100*(t-0.5)*2)},${Math.round(40+30*(1-t)*2)})`,
    h2: t => `rgb(${Math.round(0 + 0*t)},${Math.round(60 + 180*t)},${Math.round(120 + 130*t)})`,
  };
  const cmapFn = colors[cmap] || colors.plasma;
  return (
    <div style={{ position: 'relative' }}>
      {label && <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.06em' }}>{label}</div>}
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8, background: 'var(--bg-0)' }}>
        {data.map((row, i) => row.map((v, j) => (
          <rect key={`${i}-${j}`} x={j*cw} y={i*ch} width={cw+0.5} height={ch+0.5} fill={cmapFn(v)} />
        )))}
        {/* axis labels */}
        <text x="6" y="14" fontSize="9" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.5)">5 mm</text>
        <text x={width-30} y={height-6} fontSize="9" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.5)">1 mm</text>
      </svg>
    </div>
  );
}

/* ---------- procedurally generate a smooth gradient field 0..1 ---------- */
function genField({ rows = 36, cols = 12, type = 'horizontal', t = 1, seed = 1 }) {
  // type: 'horizontal' (high at left/exposed face), 'vertical' (gradient top to bottom),
  // 'concentration' diffusion-like (penetration depth grows with t), 'stress' (gradient with hot spots), 'temperature'
  const out = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const x = j / (cols - 1); // 0..1
      const y = i / (rows - 1);
      let v = 0;
      if (type === 'concentration') {
        // penetration: more uniform as t increases
        const k = 0.05 + 0.95 * t;
        v = 1 - (1 - k) * Math.pow(1 - x, 1 / (0.3 + 0.7 * t));
        v += 0.04 * Math.sin(8 * y + seed);
      } else if (type === 'temperature') {
        v = (1 - x) * (0.3 + 0.7 * t) + 0.3 * t;
        v += 0.05 * Math.cos(6 * y + seed * 1.7);
      } else if (type === 'stress') {
        // hot spot near hydrogen entry
        const dx = 1 - x;
        const dy = Math.abs(y - 0.5);
        v = 0.2 + 0.85 * Math.exp(-(dx*dx*3 + dy*dy*2)) * (0.4 + 0.6 * t);
        v += 0.05 * Math.sin(5 * y + 3 * x);
      } else {
        v = x;
      }
      out.push(Math.max(0, Math.min(1, v)));
      row.push(Math.max(0, Math.min(1, v)));
    }
    out[out.length] = row;
  }
  return out.filter(Array.isArray);
}

/* ---------------- COLORBAR ---------------- */
function HHColorbar({ cmap = 'plasma', min, max, unit, vertical = false }) {
  const colors = {
    plasma: ['#0d0887', '#7e03a8', '#cb4778', '#f89540', '#f0f921'],
    viridis: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
    rdbu: ['#053061', '#4393c3', '#f7f7f7', '#d6604d', '#67001f'],
    h2: ['#001428', '#003c6e', '#0078b4', '#28b4f0', '#a0e4ff'],
  };
  const stops = colors[cmap] || colors.plasma;
  const grad = `linear-gradient(${vertical ? 'to top' : 'to right'}, ${stops.join(',')})`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>
      <span>{min}</span>
      <div style={{ width: vertical ? 6 : 140, height: vertical ? 100 : 6, background: grad, borderRadius: 3 }} />
      <span>{max}</span>
      {unit && <span style={{ marginLeft: 4 }}>{unit}</span>}
    </div>
  );
}

/* ---------------- LINE CHART ---------------- */
function HHLine({ series, width = 600, height = 220, xLabel, yLabel, yMin, yMax, areas = false, legend = true }) {
  const w = width, h = height;
  const padL = 50, padR = 18, padT = 20, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  // determine ranges
  const allPts = series.flatMap(s => s.points);
  const xs = allPts.map(p => p[0]);
  const ys = allPts.map(p => p[1]);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yLo = yMin != null ? yMin : Math.min(...ys);
  const yHi = yMax != null ? yMax : Math.max(...ys);
  const xs2px = x => padL + ((x - xMin) / (xMax - xMin)) * innerW;
  const ys2px = y => padT + (1 - (y - yLo) / (yHi - yLo)) * innerH;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block', fontFamily: 'var(--font-mono)' }}>
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = padT + t * innerH;
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={padL+innerW} y2={y} stroke="rgba(46,58,94,0.5)" strokeWidth="0.5" />
            <text x={padL - 8} y={y + 3} fontSize="9" fill="var(--ink-4)" textAnchor="end">
              {(yHi - t * (yHi - yLo)).toFixed(yHi > 100 ? 0 : 2)}
            </text>
          </g>
        );
      })}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const x = padL + t * innerW;
        return (
          <g key={'x'+t}>
            <line x1={x} y1={padT+innerH} x2={x} y2={padT+innerH+4} stroke="var(--ink-4)" strokeWidth="0.5" />
            <text x={x} y={padT+innerH+16} fontSize="9" fill="var(--ink-4)" textAnchor="middle">
              {(xMin + t * (xMax - xMin)).toFixed(0)}
            </text>
          </g>
        );
      })}
      {/* axes labels */}
      <text x={padL + innerW/2} y={h - 6} fontSize="10" fill="var(--ink-3)" textAnchor="middle">{xLabel}</text>
      <text x={14} y={padT + innerH/2} fontSize="10" fill="var(--ink-3)" textAnchor="middle" transform={`rotate(-90 14 ${padT + innerH/2})`}>{yLabel}</text>
      {/* series */}
      {series.map((s, idx) => {
        const d = s.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs2px(p[0])} ${ys2px(p[1])}`).join(' ');
        const fill = `${s.color || '#00E5FF'}`;
        return (
          <g key={idx}>
            {areas && (
              <path d={d + ` L ${xs2px(s.points[s.points.length-1][0])} ${padT+innerH} L ${xs2px(s.points[0][0])} ${padT+innerH} Z`} fill={fill} opacity="0.10" />
            )}
            <path d={d} stroke={fill} strokeWidth={s.strokeWidth || 1.8} fill="none" strokeDasharray={s.dashed ? '4 4' : ''} />
            {s.markers && s.points.map((p, i) => <circle key={i} cx={xs2px(p[0])} cy={ys2px(p[1])} r="2.5" fill={fill} />)}
          </g>
        );
      })}
      {/* legend */}
      {legend && (
        <g transform={`translate(${padL + 8}, ${padT + 8})`}>
          {series.map((s, i) => (
            <g key={i} transform={`translate(0, ${i * 14})`}>
              <line x1="0" y1="6" x2="14" y2="6" stroke={s.color || '#00E5FF'} strokeWidth="2" strokeDasharray={s.dashed ? '3 3' : ''} />
              <text x="18" y="9" fontSize="9.5" fill="var(--ink-2)" fontFamily="var(--font-body)">{s.name}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ---------------- PILL ROW ---------------- */
function HHPillRow({ items, active, onChange }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: 'var(--bg-0)', borderRadius: 999, border: '1px solid var(--border-soft)' }}>
      {items.map(it => (
        <div key={it} onClick={() => onChange && onChange(it)} style={{
          padding: '6px 14px', fontSize: 11.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
          borderRadius: 999, cursor: 'pointer',
          background: it === active ? 'var(--surface-2)' : 'transparent',
          color: it === active ? 'var(--ink)' : 'var(--ink-3)',
          border: it === active ? '1px solid var(--border-strong)' : '1px solid transparent',
        }}>{it}</div>
      ))}
    </div>
  );
}

Object.assign(window, {
  HHLogo, HHMarketingNav, HHSideNav, HHTopBar,
  HHKpi, HHRing, HHHeatmap, HHColorbar, HHLine, HHPillRow,
  genField,
});
