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
        <div className="hh-sidenav-logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
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
  const navTo = (id) => { if (ctx) { ctx.navigate(id); if (ctx.sidebarOpen) ctx.setSidebarOpen(false); } };
  const lastRun = ctx?.runs?.[0];
  const user = ctx?.user || { name: 'C. Lukwichi', org: 'ESIS · Metallurgy', initials: 'CL' };
  const collapsed = ctx?.sidebarCollapsed;
  const open = ctx?.sidebarOpen;

  const itemStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '9px 12px', borderRadius: 8,
    color: isActive ? 'var(--ink)' : 'var(--ink-3)',
    background: isActive ? 'rgba(0,229,255,0.08)' : 'transparent',
    border: isActive ? '1px solid rgba(0,229,255,0.20)' : '1px solid transparent',
    cursor: 'pointer', fontSize: 13, marginBottom: 2,
    position: 'relative',
  });

  return (
    <aside className={`hh-sidenav ${collapsed ? 'is-collapsed' : ''} ${open ? 'is-open' : ''}`} style={{
      width: 240, background: 'var(--bg-1)', borderRight: '1px solid var(--border-soft)',
      display: 'flex', flexDirection: 'column', padding: '20px 0', flexShrink: 0,
    }}>
      <div style={{ padding: collapsed ? '0 12px 22px' : '0 16px 22px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 8 }}>
        {!collapsed && (
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => navTo('landing')} title="Back to landing">
            <HHLogo label={true} />
          </div>
        )}
        <button
          onClick={() => ctx && ctx.setSidebarCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar (])' : 'Collapse sidebar (])'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hh-sidenav-toggle"
          style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--ink-2)', cursor: 'pointer', fontSize: 13,
            display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s, border-color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--hover-tint-strong)'; e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>
      <div style={{ padding: '0 12px' }}>
        <div className="hh-sidenav-section-label" style={{ padding: '0 12px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-4)' }}>WORKSPACE</div>
        {items.map(it => (
          <div key={it.id} className="hh-sidenav-item" onClick={() => navTo(it.id)} style={itemStyle(it.id === active)}
            title={it.label}
            onMouseEnter={e => { if (it.id !== active) e.currentTarget.style.background = 'var(--hover-tint)'; }}
            onMouseLeave={e => { if (it.id !== active) e.currentTarget.style.background = 'transparent'; }}>
            <span style={{ color: it.id === active ? 'var(--cyan)' : 'var(--ink-4)', fontSize: 14, width: 14, display: 'inline-block', textAlign: 'center', flexShrink: 0 }}>{it.icon}</span>
            <span className="hh-sidenav-label">{it.label}</span>
            {it.id === active && !collapsed && <span style={{ position: 'absolute', right: 10, width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />}
          </div>
        ))}
      </div>
      <div className="hh-sidenav-project" style={{ marginTop: 24, padding: '0 12px' }}>
        <div className="hh-sidenav-section-label" style={{ padding: '0 12px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-4)' }}>ACTIVE PROJECT</div>
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
          <div key={it.id} className="hh-sidenav-item" onClick={() => navTo(it.id)} title={it.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 12px', borderRadius: 8,
            color: it.id === active ? 'var(--ink)' : 'var(--ink-3)',
            background: it.id === active ? 'rgba(0,229,255,0.06)' : 'transparent',
            fontSize: 13, cursor: 'pointer',
          }}>
            <span style={{ color: it.id === active ? 'var(--cyan)' : 'var(--ink-4)', width: 14, textAlign: 'center', flexShrink: 0 }}>{it.icon}</span>
            <span className="hh-sidenav-label">{it.label}</span>
          </div>
        ))}
        <div onClick={() => navTo('settings')} className="hh-sidenav-item" style={{ padding: '14px 12px', marginTop: 8, borderTop: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#001', flexShrink: 0 }}>{user.initials}</div>
          <div className="hh-sidenav-user-meta" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.org}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- OVERFLOW MENU ---------------- */
function HHOverflowMenu({ items }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className="hh-overflow-btn" onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open} title="More actions">⋯</button>
      {open && (
        <div className="hh-overflow-menu" role="menu">
          {items.map((it, i) => it === '-'
            ? <div key={'sep'+i} className="hh-overflow-sep" />
            : (
              <button key={it.label} role="menuitem" onClick={() => { setOpen(false); it.onClick && it.onClick(); }}>
                {it.icon && <span style={{ width: 16, color: 'var(--ink-3)' }}>{it.icon}</span>}
                {it.label}
                {it.shortcut && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)' }}>{it.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- APP TOP BAR (slim) ---------------- */
function HHTopBar({ title, subtitle, actions, hideRun }) {
  const ctx = window.useHH && window.useHH();
  const lastRun = ctx?.runs?.[0];
  const metaTooltip = `Last run ${lastRun?.id || 'run-78f3a'} · Δerror < 0.4% · mesh: fine (14 280 elems)`;

  const overflowItems = [
    { label: 'Export PDF', icon: '↓', onClick: () => ctx && ctx.exportItem('Run PDF') },
    { label: 'Export CSV', icon: '↓', onClick: () => ctx && ctx.exportItem('Run CSV') },
    '-',
    { label: 'Share link', icon: '↗', shortcut: 'S', onClick: () => ctx && ctx.shareLink() },
    { label: 'Duplicate run', icon: '⎘', onClick: () => ctx && ctx.toast('Run duplicated as draft', 'success') },
    '-',
    { label: 'Toggle sidebar', icon: ctx?.sidebarCollapsed ? '›' : '‹', shortcut: ']', onClick: () => ctx && ctx.setSidebarCollapsed(!ctx.sidebarCollapsed) },
    { label: ctx?.theme === 'light' ? 'Dark mode' : 'Light mode', icon: ctx?.theme === 'light' ? '☾' : '☀', shortcut: 'T', onClick: () => ctx && ctx.toggleTheme() },
    { label: 'Keyboard shortcuts', icon: '⌨', shortcut: '?', onClick: () => ctx && ctx.openShortcuts() },
    '-',
    { label: 'Back to landing', icon: '⌂', onClick: () => ctx && ctx.navigate('landing') },
    { label: 'Sign out', icon: '⇥', onClick: () => ctx && ctx.signOut() },
  ];

  return (
    <div className="hh-topbar" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', borderBottom: '1px solid var(--border-soft)',
      background: 'var(--bg-1)', flexShrink: 0, gap: 16,
    }}>
      <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => ctx && ctx.setSidebarOpen(!ctx.sidebarOpen)}
          aria-label="Open menu"
          className="hh-mobile-nav-inline"
          style={{
            display: 'none',
            width: 32, height: 32, borderRadius: 8,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--ink-2)', cursor: 'pointer', fontSize: 14,
          }}>☰</button>
        <div title={metaTooltip} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div className="hh-topbar-meta" style={{ fontSize: 12, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            HydroHEA /
          </div>
          <h1 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
          <span className="hh-chip hh-chip-cyan" style={{ whiteSpace: 'nowrap' }}>{subtitle || (ctx ? window.HHfmtAlloy(ctx.composition) + ' · BCC' : 'AlFeNi · BCC')}</span>
          {ctx?.running && (
            <span className="hh-chip hh-chip-gold" style={{ whiteSpace: 'nowrap' }}>
              <span className="hh-spin" style={{ marginRight: 4 }}>◐</span>RUNNING
            </span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {actions}
        {!actions && !hideRun && (
          <button className="hh-btn hh-btn-primary" disabled={ctx?.running} style={{ padding: '8px 16px', fontSize: 12, opacity: ctx?.running ? 0.7 : 1 }} onClick={() => ctx && ctx.runSimulation()}>
            {ctx?.running ? '◐ Running…' : '▶ Run'}
          </button>
        )}
        <HHOverflowMenu items={overflowItems} />
      </div>
    </div>
  );
}
window.HHOverflowMenu = HHOverflowMenu;

/* ---------------- KPI CARD ----------------
   accent = 'cyan' | 'gold' | 'emerald' | 'coral' | 'violet' | 'neutral'
   The "primary" prop draws the colored side-bar; secondary KPIs are neutral
   to give one screen a single accent color (less rainbow noise).
*/
function HHKpi({ label, value, unit, delta, accent = 'cyan', spark, primary = false }) {
  const colorMap = { cyan: 'var(--cyan)', gold: 'var(--gold)', emerald: 'var(--emerald)', coral: 'var(--coral)', violet: 'var(--violet)', neutral: 'var(--ink-3)' };
  const isNeutral = accent === 'neutral';
  const accentColor = colorMap[accent] || colorMap.cyan;
  const valueColor = isNeutral ? 'var(--ink)' : 'var(--ink)';
  const sparkStroke = isNeutral ? 'var(--ink-4)' : accentColor;

  return (
    <div className={`hh-card ${primary ? 'hh-card-elev hh-card-glow' : ''}`} style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
      {primary && !isNeutral && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: accentColor, opacity: 0.75 }} />
      )}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="hh-num" style={{ fontSize: primary ? 30 : 24, color: valueColor }}>{value}</span>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{unit}</span>
      </div>
      {delta && (
        <div style={{ fontSize: 11, color: delta.startsWith('-') ? 'var(--coral)' : 'var(--emerald)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
          {delta.startsWith('-') ? '↓' : '↑'} {delta.replace(/^-/, '')} vs baseline
        </div>
      )}
      {spark && (
        <svg viewBox="0 0 100 24" style={{ width: '100%', height: 34, marginTop: 10, display: 'block' }} preserveAspectRatio="none">
          <path d={spark} stroke={sparkStroke} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          <path d={spark + ' L100 24 L0 24 Z'} fill={sparkStroke} opacity={isNeutral ? 0.05 : 0.10} />
        </svg>
      )}
    </div>
  );
}

/* ---------------- STATUS RING ----------------
   All visual elements scale to `size` so the label & sublabel always fit
   inside the ring at any size from ~26 px up. Stroke shrinks too for small rings.
*/
function HHRing({ value = 0.7, size = 78, label, sublabel, color = 'var(--cyan)' }) {
  const stroke = Math.max(2.5, Math.round(size * 0.07));
  const r = (size - stroke - 2) / 2;
  const c = 2 * Math.PI * r;
  // Heuristic font sizing. Label takes ~30 % of diameter; sublabel ~13 %.
  // Clamp the lower bound so very small rings still produce legible glyphs.
  const labelSize    = Math.max(8, Math.round(size * (sublabel ? 0.30 : 0.34)));
  const sublabelSize = Math.max(6, Math.round(size * 0.12));
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c - c * value} strokeLinecap="round"
          style={{ filter: size >= 40 ? `drop-shadow(0 0 6px ${color})` : 'none' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', lineHeight: 1.0, padding: 2,
      }}>
        <div className="hh-num" style={{ fontSize: labelSize, fontVariantNumeric: 'tabular-nums' }}>{label}</div>
        {sublabel && (
          <div style={{ fontSize: sublabelSize, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginTop: 1, letterSpacing: '0.04em' }}>
            {sublabel}
          </div>
        )}
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

/* ---------- analytic field on a grid ----------
   Uses HHPhysics closed-form solutions (Fick erfc, heat erfc, linear-elastic).
   t is normalised 0..1 across a 3 600 s window; (x runs along the
   1 mm penetration axis, y along the 5 mm slab). Returned values are
   already normalised 0..1 for the colormap; the absolute scale is
   communicated in the per-screen color-bar legend.                          */
function genField({ rows = 36, cols = 12, type = 'concentration', t = 1, surfaceConc = 8000, boundaryT = 500, ambientT = 298, seed = 1 }) {
  const P = window.HHPhysics;
  const Lx = 1e-3;        // plate thickness (m)
  const Ly = 5e-3;        // plate height (m)
  const tSec = Math.max(0, t) * 3600;
  // Diffusion at current operating temperature.
  const D = P ? P.diffusivity(boundaryT) : 1e-11;
  const alpha = P ? P.ALPHA : 1e-5;
  // Choose normalisation reference so the colour scale stays in 0..1.
  const sigmaRef = P ? Math.max(P.vonMisesStress(surfaceConc), 1) : 5e4;

  const out = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    const y = (i / Math.max(rows - 1, 1)) * Ly;
    for (let j = 0; j < cols; j++) {
      const x = (j / Math.max(cols - 1, 1)) * Lx;
      let v = 0;
      if (type === 'concentration') {
        const c = P ? P.concentration(x, tSec, surfaceConc, D) : surfaceConc * (1 - x / Lx);
        v = c / surfaceConc;
      } else if (type === 'temperature') {
        const T = P ? P.temperature(x, tSec, boundaryT, ambientT, alpha) : ambientT + (boundaryT - ambientT) * (1 - x / Lx);
        v = (T - ambientT) / Math.max(boundaryT - ambientT, 1);
      } else if (type === 'stress') {
        const c = P ? P.concentration(x, tSec, surfaceConc, D) : surfaceConc * (1 - x / Lx);
        v = (P ? P.vonMisesStress(c) : c * 6) / sigmaRef;
      } else {
        v = 1 - x / Lx;
      }
      // tiny y-modulation so the visualisation isn't perfectly 1-D
      v += 0.03 * Math.sin(8 * (y / Ly) + seed);
      row.push(Math.max(0, Math.min(1, v)));
    }
    out.push(row);
  }
  return out;
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
