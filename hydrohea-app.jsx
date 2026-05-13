// =============================================================
// hydrohea-app.jsx — global state, toasts, modals, missing screens.
// Provides window.HH.Provider, window.useHH(), and screens
// HHOverview, HHSignIn, HHReports, HHSettings, HHDocs.
// =============================================================

const HHContext = React.createContext(null);
window.HHContext = HHContext;
window.useHH = () => React.useContext(HHContext);

/* ---------------- shared helpers ---------------- */
function fmtAlloy(c) { return `Al${c.al}Fe${c.fe}Ni${c.ni}`; }

// Predict via the trained surrogate (ridge-regression on physics-generated
// data — see hydrohea-surrogate.js). Diffusivity is exponential in T (pure
// Arrhenius, composition-independent in our model) so we use the exact
// physics for it rather than a degree-2 polynomial approximation.
function predict(c, T) {
  if (window.HHSurrogate && window.HHPhysics) {
    const s = window.HHSurrogate.predict(c, T);
    return roundPred({
      uptake: s.uptake,
      enthalpy: s.enthalpy,
      diffusivity: window.HHPhysics.diffusivity(T) * 1e10, // ×10⁻¹⁰ m²/s
      stability: s.stability,
    });
  }
  if (window.HHPhysics) {
    const comp = { Al: c.al, Fe: c.fe, Ni: c.ni };
    return roundPred({
      uptake: window.HHPhysics.uptakeWtPct(comp, T),
      enthalpy: window.HHPhysics.hydrideEnthalpy(comp, T),
      diffusivity: window.HHPhysics.diffusivity(T) * 1e10,
      stability: window.HHPhysics.cyclingStability(comp),
    });
  }
  return { uptake: 0.114, enthalpy: -32, diffusivity: 2.4, stability: 0.78 };
}
function roundPred(p) {
  return {
    uptake: +p.uptake.toFixed(3),
    enthalpy: +p.enthalpy.toFixed(1),
    diffusivity: +p.diffusivity.toFixed(2),
    stability: +p.stability.toFixed(3),
  };
}
window.HHpredict = predict;
window.HHfmtAlloy = fmtAlloy;

/* ---------------- mock library data ---------------- */
const SEED_ALLOYS = [
  { name: 'AlFeNi · BCC',          phase: 'BCC',    uptake: 0.114, enth: -32.1, dif: 2.4, stab: 0.78, status: 'ACTIVE',  tag: 'flagship', source: 'lab' },
  { name: 'TiZrNbFeNi',            phase: 'BCC',    uptake: 0.164, enth: -28.7, dif: 3.1, stab: 0.81, status: 'TESTED',  source: 'lab' },
  { name: 'TiVNbCr · BCC',         phase: 'BCC',    uptake: 0.142, enth: -34.5, dif: 2.7, stab: 0.74, status: 'TESTED',  source: 'lab' },
  { name: 'FeNiCoCrMn',            phase: 'FCC',    uptake: 0.082, enth: -22.4, dif: 1.9, stab: 0.86, status: 'TESTED',  source: 'lab' },
  { name: 'TiVZrNbHf',             phase: 'BCC',    uptake: 0.198, enth: -36.2, dif: 3.4, stab: 0.69, status: 'EXP',     source: 'ai' },
  { name: 'AlCoCrFeNi · FCC',      phase: 'FCC',    uptake: 0.094, enth: -25.1, dif: 2.1, stab: 0.82, status: 'TESTED',  source: 'lab' },
  { name: 'TiZrNbV · C15',         phase: 'C15',    uptake: 0.121, enth: -30.8, dif: 2.2, stab: 0.71, status: 'TESTED',  source: 'lab' },
  { name: 'Mg-Ni-Ti-Al',           phase: 'mixed',  uptake: 0.156, enth: -29.3, dif: 2.9, stab: 0.65, status: 'EXP',     source: 'ai' },
  { name: 'CrMnFeCoNi · Cantor',   phase: 'FCC',    uptake: 0.071, enth: -19.8, dif: 1.6, stab: 0.91, status: 'TESTED',  source: 'lab' },
  { name: 'AlFeNiCu',              phase: 'BCC',    uptake: 0.108, enth: -31.4, dif: 2.3, stab: 0.76, status: 'TESTED',  source: 'lab' },
  { name: 'TiZrV · BCC',           phase: 'BCC',    uptake: 0.137, enth: -33.2, dif: 2.6, stab: 0.72, status: 'TESTED',  source: 'lab' },
  { name: 'NbVCrTi',               phase: 'BCC',    uptake: 0.151, enth: -35.8, dif: 2.8, stab: 0.70, status: 'EXP',     source: 'ai' },
  { name: 'AlNi₃',                 phase: 'L1₂',    uptake: 0.066, enth: -18.2, dif: 1.4, stab: 0.88, status: 'TESTED',  source: 'lab' },
  { name: 'TiFe',                  phase: 'BCC',    uptake: 0.183, enth: -28.0, dif: 3.3, stab: 0.62, status: 'TESTED',  source: 'lab' },
  { name: 'Mg₂Ni',                 phase: 'C15',    uptake: 0.247, enth: -64.5, dif: 1.1, stab: 0.55, status: 'EXP',     source: 'lab' },
];

/* ---------------- provider ---------------- */
function HHProvider({ children }) {
  const [composition, setComposition] = React.useState({ al: 30, fe: 35, ni: 35 });
  const [opTemp, setOpTemp] = React.useState(500);
  const [surfConc, setSurfConc] = React.useState(8.0);
  const [tSec, setTSec] = React.useState(1800);
  const [activeField, setActiveField] = React.useState('H₂ Concentration');
  const [playing, setPlaying] = React.useState(false);
  const [playSpeed, setPlaySpeed] = React.useState('1×');
  const [running, setRunning] = React.useState(false);

  const [toasts, setToasts] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const [drawer, setDrawer] = React.useState(null);

  const [runs, setRuns] = React.useState([
    { id: 'run-78f3a', alloy: 'Al30Fe35Ni35', uptake: 0.114, status: 'complete', ts: '11:42 UTC', mesh: 'fine', dur: '47s' },
    { id: 'run-77c12', alloy: 'Al28Fe32Ni40', uptake: 0.124, status: 'complete', ts: '11:18 UTC', mesh: 'fine', dur: '46s' },
    { id: 'run-77b3f', alloy: 'Al22Fe30Ni48', uptake: 0.132, status: 'complete', ts: '10:51 UTC', mesh: 'medium', dur: '12s' },
    { id: 'run-779a2', alloy: 'Al26Fe36Ni38', uptake: 0.108, status: 'complete', ts: '10:24 UTC', mesh: 'fine', dur: '49s' },
    { id: 'run-776df', alloy: 'Al36Fe26Ni38', uptake: 0.101, status: 'complete', ts: '09:55 UTC', mesh: 'medium', dur: '11s' },
  ]);

  const [alloys, setAlloys] = React.useState(SEED_ALLOYS);
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState({
    name: 'Christian Lukwichi',
    org: 'BEng Tech Hons · Metallurgy Engineering',
    initials: 'CL',
  });

  // Layout / theming state (persisted to localStorage so reloads remember).
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    try { return localStorage.getItem('hh.sidebar') === 'collapsed'; } catch { return false; }
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // mobile only
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('hh.theme') || 'dark'; } catch { return 'dark'; }
  });

  React.useEffect(() => {
    try { localStorage.setItem('hh.sidebar', sidebarCollapsed ? 'collapsed' : 'expanded'); } catch {}
  }, [sidebarCollapsed]);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('hh.theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = React.useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), []);
  const openShortcuts = React.useCallback(() => {
    setModal({ wide: false, content: <HHModalShortcuts /> });
  }, []);

  const toast = React.useCallback((msg, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, msg, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3600);
  }, []);

  const openModal = React.useCallback(m => setModal(m), []);
  const closeModal = React.useCallback(() => setModal(null), []);
  const openDrawer = React.useCallback(d => setDrawer(d), []);
  const closeDrawer = React.useCallback(() => setDrawer(null), []);

  const navigate = React.useCallback(route => { window.location.hash = route; }, []);

  // play loop: advance tSec by speed
  React.useEffect(() => {
    if (!playing) return;
    const mult = { '0.25×': 0.25, '1×': 1, '4×': 4, '16×': 16 }[playSpeed] || 1;
    const id = setInterval(() => {
      setTSec(t => {
        const next = t + 30 * mult;
        if (next >= 3600) { setPlaying(false); return 3600; }
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [playing, playSpeed]);

  const runSimulation = React.useCallback(async () => {
    if (running) return;
    setRunning(true);
    toast('Solver started · COMSOL-grade FEM v3.2.1', 'info');
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    await sleep(900);
    toast('Diffusion · heat · mechanics coupled · t = 3600 s', 'info');
    await sleep(900);
    const p = predict(composition, opTemp);
    const newId = 'run-' + Math.random().toString(16).slice(2, 7);
    const now = new Date().toISOString().slice(11, 16) + ' UTC';
    setRuns(r => [{ id: newId, alloy: fmtAlloy(composition), uptake: p.uptake, status: 'complete', ts: now, mesh: 'fine', dur: '47s' }, ...r].slice(0, 12));
    setRunning(false);
    toast(`Simulation complete · uptake ${p.uptake.toFixed(3)} wt% · Δerror < 0.4%`, 'success');
  }, [composition, opTemp, running, toast]);

  const runMeshSweep = React.useCallback(async () => {
    if (running) return;
    setRunning(true);
    toast('Mesh sweep started · coarse → medium → fine', 'info');
    await new Promise(r => setTimeout(r, 1500));
    toast('All meshes converged · max Δ 4.0%', 'success');
    setRunning(false);
  }, [running, toast]);

  const exportItem = React.useCallback((kind = 'PDF report', payload = null) => {
    if (!window.HHPdf || !window.HHPdf.available()) {
      toast(`PDF engine still loading — try again in a moment`, 'error');
      return;
    }
    toast(`Generating ${kind}…`, 'info');
    // Build a snapshot of the live context so the PDF reflects current state.
    const snapshot = {
      composition, opTemp, surfConc, runs, alloys, user,
    };
    let ok = false;
    try {
      const k = kind.toLowerCase();
      if (payload && payload.alloy) {
        ok = window.HHPdf.buildAlloyDatasheet(payload.alloy);
      } else if (k.includes('validation') || k.includes('audit')) {
        ok = window.HHPdf.buildValidationAudit(snapshot);
      } else if (k.includes('run') || k.includes('multi-physics') || k === 'pdf report') {
        ok = window.HHPdf.buildRunReport(snapshot, { includeRecent: true });
      } else {
        ok = window.HHPdf.buildGenericReport(kind, snapshot);
      }
    } catch (e) {
      console.error(e);
      ok = false;
    }
    if (ok) toast(`${kind} downloaded`, 'success');
    else toast(`Could not generate ${kind}`, 'error');
  }, [toast, composition, opTemp, surfConc, runs, alloys, user]);

  const shareLink = React.useCallback(() => {
    const url = `https://hydrohea.ai/run/${runs[0]?.id || '78f3a'}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    toast('Share link copied to clipboard', 'success');
  }, [runs, toast]);

  const applyComposition = React.useCallback((name) => {
    const m = name.match(/Al[₀-₉0-9]*(\d+)\s*Fe[₀-₉0-9]*(\d+)\s*Ni[₀-₉0-9]*(\d+)/i)
            || name.match(/Al(\d+)Fe(\d+)Ni(\d+)/);
    if (m) {
      setComposition({ al: +m[1], fe: +m[2], ni: +m[3] });
      toast(`Applied composition ${m[1]}·${m[2]}·${m[3]} → ready in Simulator`, 'success');
    } else {
      toast(`Loaded ${name}`, 'info');
    }
  }, [toast]);

  const signIn = React.useCallback((info) => {
    setAuthed(true);
    // Only override the profile when the caller explicitly provided a name —
    // otherwise keep the default workspace owner (Christian Lukwichi) so the
    // demo doesn't show "u22872966"-style email-derived usernames.
    const explicitName = info && info.name && info.name.trim();
    if (explicitName) {
      setUser({
        name: info.name,
        org: info.org || user.org,
        initials: info.name.split(/\s+/).map(s => s[0]).join('').slice(0, 2).toUpperCase(),
      });
    }
    const greet = explicitName ? info.name.split(' ')[0] : user.name.split(' ')[0];
    toast(`Welcome back, ${greet}`, 'success');
    closeModal();
    navigate('overview');
  }, [user, toast, closeModal, navigate]);

  const signOut = React.useCallback(() => {
    setAuthed(false);
    toast('Signed out', 'info');
    navigate('landing');
  }, [toast, navigate]);

  const addAlloy = React.useCallback((a) => {
    setAlloys(list => [{ ...a, source: 'user', status: 'EXP' }, ...list]);
    toast(`Added alloy ${a.name} to library`, 'success');
  }, [toast]);

  // ----- Global keyboard shortcuts -----
  React.useEffect(() => {
    let gMode = false; let gTimer = null;
    const isTypingTarget = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setModal({ content: <HHModalShortcuts /> });
        return;
      }
      if (e.key === 'Escape') {
        if (modal) closeModal();
        if (drawer) closeDrawer();
        return;
      }
      // Two-key combos (g <letter>) handled first so they don't conflict with single keys.
      if (gMode) {
        const map = { o: 'overview', s: 'simulator', a: 'ai', l: 'library', v: 'validation', d: 'docs', r: 'reports', h: 'landing', p: 'settings' };
        const dest = map[e.key];
        if (dest) { e.preventDefault(); navigate(dest); }
        gMode = false;
        clearTimeout(gTimer);
        return;
      }
      if (e.key === 'g') {
        gMode = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gMode = false; }, 900);
        return;
      }

      if (e.key === ']') { setSidebarCollapsed(c => !c); return; }
      if (e.key === 't') { setTheme(t => t === 'dark' ? 'light' : 'dark'); return; }
      if (e.key === 'r') { runSimulation(); return; }
      if (e.key === 'S') { // shift+s to avoid conflicts with future single-letter shortcuts
        const url = `https://hydrohea.ai/run/${runs[0]?.id || '78f3a'}`;
        if (navigator.clipboard) navigator.clipboard.writeText(url).catch(()=>{});
        toast('Share link copied', 'success');
        return;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(gTimer); };
  }, [modal, drawer, runs, navigate, runSimulation, toast, closeModal, closeDrawer]);

  const value = {
    composition, setComposition,
    opTemp, setOpTemp,
    surfConc, setSurfConc,
    tSec, setTSec, playing, setPlaying, playSpeed, setPlaySpeed,
    activeField, setActiveField,
    running, runSimulation, runMeshSweep,
    toast, modal, openModal, closeModal,
    drawer, openDrawer, closeDrawer,
    runs, alloys, addAlloy,
    authed, user, signIn, signOut,
    exportItem, shareLink, applyComposition,
    navigate,
    sidebarCollapsed, setSidebarCollapsed,
    sidebarOpen, setSidebarOpen,
    theme, setTheme, toggleTheme,
    openShortcuts,
  };

  return (
    <HHContext.Provider value={value}>
      {children}
      <HHToastHost toasts={toasts} />
      <HHModalHost modal={modal} onClose={closeModal} />
      <HHDrawerHost drawer={drawer} onClose={closeDrawer} />
    </HHContext.Provider>
  );
}
window.HHProvider = HHProvider;

/* ---------------- toast host ---------------- */
function HHToastHost({ toasts }) {
  return (
    <div style={{ position: 'fixed', top: 70, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: '11px 16px',
          background: 'rgba(10,14,28,0.95)',
          border: `1px solid ${t.type === 'success' ? 'rgba(74,222,128,0.4)' : t.type === 'error' ? 'rgba(255,84,112,0.4)' : 'var(--border-strong)'}`,
          borderLeft: `3px solid ${t.type === 'success' ? 'var(--emerald)' : t.type === 'error' ? 'var(--coral)' : 'var(--cyan)'}`,
          borderRadius: 10,
          backdropFilter: 'blur(14px)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-body)',
          fontSize: 12.5,
          minWidth: 280, maxWidth: 420,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          pointerEvents: 'auto',
          animation: 'hh-toast-in .25s ease',
        }}>
          <span style={{ color: t.type === 'success' ? 'var(--emerald)' : t.type === 'error' ? 'var(--coral)' : 'var(--cyan)' }}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '●'}
          </span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- modal host ---------------- */
function HHModalHost({ modal, onClose }) {
  if (!modal) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(2,4,10,0.7)', backdropFilter: 'blur(6px)',
      zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8px, 3vw, 24px)',
    }}>
      <div onClick={e => e.stopPropagation()} className="hh-modal-card" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 18,
        width: '100%', maxWidth: modal.wide ? 720 : 480,
        maxHeight: '90vh', overflow: 'auto',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        position: 'relative',
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 8,
          background: 'var(--bg-0)', border: '1px solid var(--border)', color: 'var(--ink-3)',
          cursor: 'pointer', fontSize: 14, zIndex: 1,
        }}>✕</button>
        {modal.content}
      </div>
    </div>
  );
}

/* ---------------- drawer host ---------------- */
function HHDrawerHost({ drawer, onClose }) {
  if (!drawer) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 850, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ flex: 1, background: 'rgba(2,4,10,0.55)', backdropFilter: 'blur(4px)' }} />
      <div className="hh-drawer" style={{
        width: 'min(480px, 95vw)', background: 'var(--bg-1)',
        borderLeft: '1px solid var(--border-strong)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{drawer.title}</div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--bg-0)', border: '1px solid var(--border)', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 14 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 22 }}>{drawer.content}</div>
      </div>
    </div>
  );
}

/* ---------------- shortcuts modal ---------------- */
function HHModalShortcuts() {
  const groups = [
    { title: 'Navigate', items: [
      ['g o', 'Overview'], ['g s', 'Simulator'], ['g a', 'AI Predictor'],
      ['g l', 'Materials Library'], ['g v', 'Validation Studio'],
      ['g r', 'Reports'], ['g d', 'Docs'], ['g p', 'Settings'], ['g h', 'Landing'],
    ]},
    { title: 'Run & actions', items: [
      ['r', 'Run simulation'], ['Shift S', 'Copy share link'],
    ]},
    { title: 'Interface', items: [
      [']', 'Toggle sidebar'], ['t', 'Toggle dark / light theme'],
      ['?', 'This help'], ['Esc', 'Close modal / drawer'],
    ]},
  ];
  return (
    <div style={{ padding: 28 }}>
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />KEYBOARD SHORTCUTS</div>
      <h3 className="hh-display" style={{ fontSize: 20, margin: '0 0 16px' }}>Move faster in HydroHEA</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {groups.map(g => (
          <div key={g.title}>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>{g.title.toUpperCase()}</div>
            {g.items.map(([k, l]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: '1px solid var(--border-soft)' }}>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{l}</span>
                <span style={{ display: 'flex', gap: 4 }}>
                  {k.split(' ').map((part, i) => <span key={i} className="hh-kbd">{part}</span>)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
window.HHModalShortcuts = HHModalShortcuts;

/* ====================================================
   MODAL CONTENT BUILDERS
   ==================================================== */
function HHModalDemo({ ctx }) {
  const [form, setForm] = React.useState({ name: '', email: '', org: '', interest: 'Mining R&D' });
  return (
    <div style={{ padding: 32 }}>
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />REQUEST A DEMO</div>
      <h3 className="hh-display" style={{ fontSize: 24, margin: '0 0 6px' }}>Book a guided HydroHEA walkthrough</h3>
      <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0, marginBottom: 18 }}>30-minute live demo with one of our metallurgy engineers. We'll cover the multi-physics solver, AI predictor and your specific alloy targets.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <HHField label="Name" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} placeholder="Dr. Amani Mokoena" />
        <HHField label="Work email" value={form.email} onChange={v => setForm(f => ({...f, email: v}))} placeholder="you@company.com" />
      </div>
      <HHField label="Organisation" value={form.org} onChange={v => setForm(f => ({...f, org: v}))} placeholder="Global Mineral Corp" />
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 6 }}>PRIMARY INTEREST</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Mining R&D', 'Materials science', 'Hydrogen storage', 'Academic'].map(t => (
            <button key={t} onClick={() => setForm(f => ({...f, interest: t}))} className={`hh-chip ${form.interest === t ? 'hh-chip-cyan' : ''}`} style={{ cursor: 'pointer', border: 'none' }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'flex-end' }}>
        <button className="hh-btn hh-btn-ghost" onClick={ctx.closeModal}>Cancel</button>
        <button className="hh-btn hh-btn-primary" onClick={() => {
          if (!form.name || !form.email) { ctx.toast('Please complete name and email', 'error'); return; }
          ctx.closeModal();
          ctx.toast(`Demo booked · we'll email ${form.email} within 1 business day`, 'success');
        }}>Book demo →</button>
      </div>
    </div>
  );
}

function HHModalSignIn({ ctx }) {
  const [mode, setMode] = React.useState('signin');
  const [form, setForm] = React.useState({ name: '', email: '', password: '', org: '' });
  const submit = () => {
    if (!form.email || !form.password) { ctx.toast('Email & password required', 'error'); return; }
    // Only pass `name` if the user explicitly typed one — otherwise the
    // provider keeps the default workspace owner (Christian Lukwichi).
    ctx.signIn({ name: form.name.trim() || undefined, org: form.org.trim() || undefined });
  };
  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <window.HHLogo />
      </div>
      <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg-0)', borderRadius: 999, border: '1px solid var(--border)', width: 'fit-content', marginBottom: 18 }}>
        {['signin', 'signup'].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '6px 14px', fontSize: 11.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
            borderRadius: 999, cursor: 'pointer', border: 'none',
            background: m === mode ? 'var(--surface-2)' : 'transparent',
            color: m === mode ? 'var(--ink)' : 'var(--ink-3)',
          }}>{m === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}</button>
        ))}
      </div>
      <h3 className="hh-display" style={{ fontSize: 22, margin: '0 0 14px' }}>{mode === 'signin' ? 'Welcome back to HydroHEA' : 'Start your free 14-day pilot'}</h3>
      {mode === 'signup' && (
        <>
          <HHField label="Full name" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} placeholder="Dr. Amani Mokoena" />
          <HHField label="Organisation" value={form.org} onChange={v => setForm(f => ({...f, org: v}))} placeholder="Global Mineral Corp" />
        </>
      )}
      <HHField label="Work email" value={form.email} onChange={v => setForm(f => ({...f, email: v}))} placeholder="you@company.com" />
      <HHField label="Password" type="password" value={form.password} onChange={v => setForm(f => ({...f, password: v}))} placeholder="••••••••" />
      <button className="hh-btn hh-btn-primary" style={{ width: '100%', padding: 12, justifyContent: 'center', marginTop: 18 }} onClick={submit}>
        {mode === 'signin' ? 'Sign in →' : 'Create account →'}
      </button>
      <div style={{ marginTop: 16, fontSize: 11.5, color: 'var(--ink-3)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        Or continue with <a onClick={() => ctx.signIn()} style={{ color: 'var(--cyan)', cursor: 'pointer' }}>SSO · GOOGLE</a>
      </div>
    </div>
  );
}

function HHModalVideo({ ctx }) {
  return (
    <div style={{ padding: 0 }}>
      <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #050811, #0F1526)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '18px 18px 0 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,229,255,0.15), transparent 60%)' }} />
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(180deg, var(--cyan), var(--cyan-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#001', boxShadow: '0 0 40px rgba(0,229,255,0.5)', cursor: 'pointer' }}>▶</div>
      </div>
      <div style={{ padding: 24 }}>
        <h3 className="hh-display" style={{ fontSize: 18, margin: '0 0 6px' }}>HydroHEA in 90 seconds</h3>
        <p style={{ fontSize: 12.5, color: 'var(--ink-3)', margin: 0 }}>How AI-driven composition search + cloud multi-physics replace 6 months of COMSOL trial-and-error.</p>
      </div>
    </div>
  );
}

function HHModalOptimize({ ctx }) {
  const candidates = [
    { name: 'Al₂₂Fe₃₀Ni₄₈', uptake: 0.132, stab: 0.812, dif: 2.6, fitness: 0.94, applyName: 'Al22Fe30Ni48' },
    { name: 'Al₂₈Fe₃₂Ni₄₀', uptake: 0.124, stab: 0.798, dif: 2.3, fitness: 0.89, applyName: 'Al28Fe32Ni40' },
    { name: 'Al₂₆Fe₃₆Ni₃₈', uptake: 0.108, stab: 0.811, dif: 2.4, fitness: 0.86, applyName: 'Al26Fe36Ni38' },
    { name: 'Al₂₀Fe₃₄Ni₄₆', uptake: 0.139, stab: 0.769, dif: 2.7, fitness: 0.83, applyName: 'Al20Fe34Ni46' },
  ];
  return (
    <div style={{ padding: 28 }}>
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" style={{ background: 'var(--violet)' }} />PARETO FRONT</div>
      <h3 className="hh-display" style={{ fontSize: 22, margin: '0 0 4px' }}>Optimal composition candidates</h3>
      <p style={{ fontSize: 12.5, color: 'var(--ink-3)', margin: 0, marginBottom: 18 }}>Multi-objective Bayesian optimisation on uptake × stability × diffusivity. Apply any candidate to push it into the simulator.</p>
      <table className="hh-table">
        <thead><tr><th>RANK</th><th>ALLOY</th><th>UPTAKE</th><th>STABILITY</th><th>D</th><th>FITNESS</th><th></th></tr></thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr key={c.name}>
              <td style={{ fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--gold)' : 'var(--ink-3)' }}>{i === 0 ? '★ 1' : `#${i+1}`}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{c.name}</td>
              <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{c.uptake.toFixed(3)}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{c.stab.toFixed(3)}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{c.dif.toFixed(1)}</td>
              <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>{c.fitness.toFixed(2)}</td>
              <td><button className="hh-btn hh-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => { ctx.applyComposition(c.applyName); ctx.closeModal(); ctx.navigate('simulator'); }}>Apply →</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HHModalNewAlloy({ ctx }) {
  const [form, setForm] = React.useState({ name: '', phase: 'BCC', uptake: '0.10', enth: '-30', dif: '2.0', stab: '0.75' });
  return (
    <div style={{ padding: 28 }}>
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />NEW ALLOY ENTRY</div>
      <h3 className="hh-display" style={{ fontSize: 20, margin: '0 0 14px' }}>Add a composition to the library</h3>
      <HHField label="Name (e.g. TiZrNbV · BCC)" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} placeholder="e.g. AlCrMnFeNi" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <HHField label="Phase" value={form.phase} onChange={v => setForm(f => ({...f, phase: v}))} />
        <HHField label="Uptake (wt%)" value={form.uptake} onChange={v => setForm(f => ({...f, uptake: v}))} />
        <HHField label="ΔH (kJ/mol)" value={form.enth} onChange={v => setForm(f => ({...f, enth: v}))} />
        <HHField label="D × 10⁻⁷ m²/s" value={form.dif} onChange={v => setForm(f => ({...f, dif: v}))} />
        <HHField label="Stability (0–1)" value={form.stab} onChange={v => setForm(f => ({...f, stab: v}))} />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
        <button className="hh-btn hh-btn-ghost" onClick={ctx.closeModal}>Cancel</button>
        <button className="hh-btn hh-btn-primary" onClick={() => {
          if (!form.name) { ctx.toast('Name is required', 'error'); return; }
          ctx.addAlloy({ name: form.name, phase: form.phase, uptake: +form.uptake, enth: +form.enth, dif: +form.dif, stab: +form.stab });
          ctx.closeModal();
        }}>Add to library</button>
      </div>
    </div>
  );
}

function HHModalImport({ ctx }) {
  const [stage, setStage] = React.useState('idle');
  const [fileName, setFileName] = React.useState(null);
  const onUpload = () => {
    setStage('uploading');
    setFileName('alloys-batch-2026-Q1.csv');
    setTimeout(() => setStage('parsing'), 700);
    setTimeout(() => setStage('done'), 1600);
    setTimeout(() => { ctx.toast('Imported 42 alloys · 38 new, 4 duplicates merged', 'success'); ctx.closeModal(); }, 2300);
  };
  return (
    <div style={{ padding: 28 }}>
      <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />IMPORT</div>
      <h3 className="hh-display" style={{ fontSize: 20, margin: '0 0 14px' }}>Bulk import alloy data</h3>
      <div onClick={stage === 'idle' ? onUpload : undefined} style={{
        border: '2px dashed var(--border-strong)', borderRadius: 14,
        padding: '40px 20px', textAlign: 'center', cursor: stage === 'idle' ? 'pointer' : 'default',
        background: 'var(--bg-0)',
      }}>
        {stage === 'idle' && (<>
          <div style={{ fontSize: 32, marginBottom: 10, color: 'var(--cyan)' }}>↑</div>
          <div style={{ fontSize: 14, color: 'var(--ink)' }}>Drop CSV / Parquet file here</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>or click to browse · max 50 MB</div>
        </>)}
        {stage !== 'idle' && (<>
          <div style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 10 }}>{fileName}</div>
          <div style={{ fontSize: 11, color: 'var(--cyan)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            {stage === 'uploading' && 'UPLOADING…'}
            {stage === 'parsing' && 'PARSING SCHEMA…'}
            {stage === 'done' && '● MERGED'}
          </div>
          <div className="hh-bar-track" style={{ marginTop: 12 }}>
            <div className="hh-bar-fill" style={{ width: stage === 'uploading' ? '40%' : stage === 'parsing' ? '75%' : '100%', transition: 'width .5s' }} />
          </div>
        </>)}
      </div>
    </div>
  );
}

/* ---------------- form field helper ---------------- */
function HHField({ label, value, onChange, placeholder, type }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 6 }}>{label.toUpperCase()}</div>
      <input
        type={type || 'text'}
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 14px', background: 'var(--bg-0)',
          border: '1px solid var(--border)', borderRadius: 10, color: 'var(--ink)',
          fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}
window.HHField = HHField;

/* ====================================================
   SCREENS — Overview · SignIn · Reports · Settings · Docs
   ==================================================== */

function HHOverview() {
  const ctx = window.useHH();
  const last = ctx.runs[0];
  const p = window.HHpredict(ctx.composition, ctx.opTemp);
  const best = ctx.runs.reduce((m, r) => (r.uptake > (m ? m.uptake : 0)) ? r : m, null);
  const firstName = (ctx.user.name || '').split(' ')[0] || 'there';

  // Friendly "Al30Fe35Ni35" -> "Aluminum 30 / Iron 35 / Nickel 35"
  const prettyAlloy = (s) => {
    const m = String(s).match(/Al(\d+)Fe(\d+)Ni(\d+)/);
    return m ? `Aluminum ${m[1]} · Iron ${m[2]} · Nickel ${m[3]}` : s;
  };

  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="home" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Overview" subtitle="Your workspace" actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.navigate('landing')}>← Landing</button>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.exportItem('Workspace digest PDF')}>Export digest</button>
            <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx.navigate('simulator')}>Test a recipe →</button>
          </>
        }/>
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>

          {/* friendly welcome banner */}
          <div className="hh-card hh-card-elev" style={{ padding: 28, marginBottom: 16, background: 'linear-gradient(135deg, var(--surface-2), var(--surface))', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at top right, rgba(0,229,255,0.10), transparent 70%)', pointerEvents: 'none' }} />
            <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" />TODAY</div>
            <h2 className="hh-display" style={{ fontSize: 28, margin: '0 0 10px', position: 'relative' }}>
              Welcome back, {firstName}.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0, lineHeight: 1.6, maxWidth: 720, position: 'relative' }}>
              Your team ran <b style={{color:'var(--cyan)'}}>{ctx.runs.length} experiments</b> this week.
              The <b>best metal recipe so far</b> is <b style={{color:'var(--gold)'}}>{best ? prettyAlloy(best.alloy) : 'Aluminum 30 · Iron 35 · Nickel 35'}</b>{' '}
              — it holds about <b style={{color:'var(--emerald)'}}>{best ? best.uptake.toFixed(3) : '0.114'} grams of hydrogen per 100 grams of metal</b>.
              Pick a task below to keep exploring.
            </p>
          </div>

          {/* plain-language KPIs */}
          <div className="hh-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi primary label="Best recipe found" value={best ? best.uptake.toFixed(3) : '0.114'} unit="g H₂ / 100 g metal" accent="cyan" />
            <window.HHKpi label="Experiments this week" value={ctx.runs.length + ''} unit="runs" accent="neutral" />
            <window.HHKpi label="Recipes in library" value={ctx.alloys.length + ''} unit="alloys" accent="neutral" />
            <window.HHKpi label="Active project" value="AlFeNi" unit="v3.2" accent="neutral" />
          </div>

          <div className="hh-grid-main" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 12 }}><span className="dot" />WHAT YOU CAN DO</div>
              <h3 className="hh-display" style={{ fontSize: 22, margin: '0 0 4px' }}>Pick a task</h3>
              <p style={{ fontSize: 12.5, color: 'var(--ink-3)', margin: '0 0 16px' }}>Four simple actions cover every workflow in HydroHEA.</p>
              <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { t: 'Test a metal recipe', d: 'See how much hydrogen any aluminium / iron / nickel mix would soak up.', r: 'simulator', c: 'var(--cyan)',     icon: '⬡' },
                  { t: 'Ask the AI for a better one', d: 'Get instant predictions and ranked suggestions from our trained model.', r: 'ai',        c: 'var(--gold)',     icon: '✦' },
                  { t: 'Browse the recipe library', d: `${ctx.alloys.length} ready-made alloys, sortable and filterable.`,        r: 'library',   c: 'var(--violet)',   icon: '◈' },
                  { t: 'Double-check the math',    d: 'Run a mesh sweep to confirm your last result converged within 5 %.',       r: 'validation',c: 'var(--emerald)',  icon: '◐' },
                ].map(card => (
                  <div key={card.r} onClick={() => ctx.navigate(card.r)} style={{
                    padding: 16, borderRadius: 12, border: '1px solid var(--border)',
                    background: 'var(--bg-0)', cursor: 'pointer', transition: 'border-color .15s, transform .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = card.c; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ color: card.c, fontSize: 20, width: 22, textAlign: 'center' }}>{card.icon}</span>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{card.t}</div>
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>{card.d}</div>
                    <div style={{ marginTop: 12, fontSize: 11, color: card.c, fontFamily: 'var(--font-mono)' }}>OPEN →</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 12 }}><span className="dot" style={{ background: 'var(--gold)' }} />RECENT EXPERIMENTS</div>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: '0 0 12px' }}>Latest recipes you and your team tested.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ctx.runs.slice(0, 6).map(r => (
                  <div key={r.id} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-0)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{prettyAlloy(r.alloy)}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)' }}>{r.uptake.toFixed(3)} wt%</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-4)' }}>{r.ts} · {r.dur || '12 s'}</div>
                      <span className="hh-chip hh-chip-emerald" style={{ padding: '2px 6px', fontSize: 9 }}>DONE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* plain-language explainer */}
          <div className="hh-card hh-card-elev" style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'radial-gradient(circle at top right, rgba(167,139,250,0.10), transparent 70%)', pointerEvents: 'none' }} />
            <div className="hh-eyebrow" style={{ marginBottom: 10 }}><span className="dot" style={{ background: 'var(--violet)' }} />HOW IT WORKS — IN PLAIN ENGLISH</div>
            <h3 className="hh-display" style={{ fontSize: 18, margin: '0 0 12px' }}>What HydroHEA actually does</h3>
            <div className="hh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { n: '1', t: 'You pick a recipe', d: 'Choose how much aluminium, iron and nickel to blend. Same idea as a cooking recipe.' },
                { n: '2', t: 'We do the math', d: 'Our AI predicts, in less than a second, how much hydrogen the recipe will hold and how stable it will be.' },
                { n: '3', t: 'You get a report', d: 'A clean PDF you can share with your supervisor, team or investor. No spreadsheets, no FEM software needed.' },
              ].map(step => (
                <div key={step.n} style={{ padding: 14, borderRadius: 10, background: 'var(--bg-0)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#001', marginBottom: 10 }}>{step.n}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{step.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{step.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHOverview = HHOverview;

function HHSignIn() {
  const ctx = window.useHH();
  const [mode, setMode] = React.useState('signin');
  const [form, setForm] = React.useState({ name: '', email: '', password: '', org: '' });
  const submit = () => {
    if (!form.email || !form.password) { ctx.toast('Email & password required', 'error'); return; }
    // Only pass `name` if the user explicitly typed one — otherwise the
    // provider keeps the default workspace owner (Christian Lukwichi).
    ctx.signIn({ name: form.name.trim() || undefined, org: form.org.trim() || undefined });
  };
  return (
    <div className="hh-art hh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', height: '100%' }}>
      <div style={{ position: 'relative', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', background: 'linear-gradient(135deg, #050811, #0F1526)' }}>
        <div className="hh-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />
        <div style={{ position: 'absolute', top: 200, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%)', filter: 'blur(40px)' }} />
        <window.HHLogo size={36} />
        <div style={{ position: 'relative' }}>
          <div className="hh-eyebrow" style={{ marginBottom: 18 }}><span className="dot" />MULTI-PHYSICS SAAS</div>
          <h2 className="hh-display" style={{ fontSize: 44, margin: 0, marginBottom: 14, lineHeight: 1.1, maxWidth: 480 }}>
            Hydrogen-storage alloys at <span style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>industrial scale.</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 460, margin: 0 }}>Coupled diffusion · heat · mechanics, plus a 12 400-alloy AI predictor. Built for metallurgists and mining R&amp;D leaders accelerating the hydrogen economy.</p>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 36, opacity: 0.6, fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--ink-3)' }}>
          ANGLO AMERICAN · RIO TINTO · GLENCORE · BHP
        </div>
      </div>
      <div style={{ padding: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg-0)', borderRadius: 999, border: '1px solid var(--border)', width: 'fit-content', marginBottom: 22 }}>
            {['signin', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '7px 16px', fontSize: 11.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                borderRadius: 999, cursor: 'pointer', border: 'none',
                background: m === mode ? 'var(--surface-2)' : 'transparent',
                color: m === mode ? 'var(--ink)' : 'var(--ink-3)',
              }}>{m === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}</button>
            ))}
          </div>
          <h3 className="hh-display" style={{ fontSize: 26, margin: '0 0 18px' }}>{mode === 'signin' ? 'Welcome back' : 'Start your 14-day pilot'}</h3>
          {mode === 'signup' && (
            <>
              <window.HHField label="Full name" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} placeholder="Dr. Amani Mokoena" />
              <window.HHField label="Organisation" value={form.org} onChange={v => setForm(f => ({...f, org: v}))} placeholder="Global Mineral Corp" />
            </>
          )}
          <window.HHField label="Work email" value={form.email} onChange={v => setForm(f => ({...f, email: v}))} placeholder="you@company.com" />
          <window.HHField label="Password" type="password" value={form.password} onChange={v => setForm(f => ({...f, password: v}))} placeholder="••••••••" />
          <button className="hh-btn hh-btn-primary" style={{ width: '100%', padding: 12, justifyContent: 'center', marginTop: 18 }} onClick={submit}>
            {mode === 'signin' ? 'Sign in →' : 'Create account →'}
          </button>
          <div style={{ marginTop: 14, fontSize: 11.5, color: 'var(--ink-3)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            Or continue with <a onClick={() => ctx.signIn()} style={{ color: 'var(--cyan)', cursor: 'pointer' }}>SSO · GOOGLE</a>
          </div>
          <div style={{ marginTop: 30, paddingTop: 18, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--ink-3)', textAlign: 'center' }}>
            <a onClick={() => ctx.navigate('landing')} style={{ color: 'var(--cyan)', cursor: 'pointer' }}>← Back to landing</a>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHSignIn = HHSignIn;

function HHReports() {
  const ctx = window.useHH();
  const reports = [
    { id: 'rpt-2026-05-01', title: 'AlFeNi v3.2 · Multi-physics validation summary', alloy: 'Al30Fe35Ni35', date: 'May 11', author: 'C. Lukwichi', pages: 28 },
    { id: 'rpt-2026-04-28', title: 'Pareto sweep · uptake vs. stability (Al-Fe-Ni)', alloy: '12 candidates', date: 'May 8', author: 'C. Lukwichi', pages: 14 },
    { id: 'rpt-2026-04-22', title: 'TiZrNbFeNi · cycling stability benchmark', alloy: 'Ti25Zr20Nb20Fe15Ni20', date: 'May 3', author: 'A. Mokoena', pages: 19 },
    { id: 'rpt-2026-04-15', title: 'Q1 alloy down-selection — 118 → 12', alloy: 'Multi-system', date: 'Apr 26', author: 'C. Lukwichi', pages: 42 },
    { id: 'rpt-2026-04-08', title: 'Mesh sensitivity audit · COMSOL-grade FEM', alloy: 'AlFeNi', date: 'Apr 18', author: 'Solver QA', pages: 11 },
  ];
  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="reports" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Engineering Reports" subtitle="audit-ready exports" actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.exportItem('Report bundle ZIP')}>Bulk export</button>
            <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx.exportItem('New report draft')}>+ Generate report</button>
          </>
        }/>
        <div className="hh-scroll hh-pad" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div className="hh-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <window.HHKpi primary label="Total reports" value={reports.length + ''} unit="" accent="violet" />
            <window.HHKpi label="This month" value="3" unit="" accent="neutral" />
            <window.HHKpi label="Pages exported" value="114" unit="pp" accent="neutral" />
            <window.HHKpi label="Avg generation" value="12" unit="s" accent="neutral" />
          </div>
          <div className="hh-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="hh-table">
              <thead><tr><th>REPORT</th><th>SCOPE</th><th>AUTHOR</th><th>DATE</th><th>PAGES</th><th></th></tr></thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#001' }}>▤</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{r.title}</div>
                          <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>{r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>{r.alloy}</td>
                    <td style={{ fontSize: 12 }}>{r.author}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>{r.date}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{r.pages}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="hh-btn hh-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => ctx.exportItem(`Report ${r.id} (PDF)`)}>PDF</button>
                      <button className="hh-btn hh-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => ctx.exportItem(`Report ${r.id} (DOCX)`)}>DOCX</button>
                    </td>
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
window.HHReports = HHReports;

function HHSettings() {
  const ctx = window.useHH();
  const [notify, setNotify] = React.useState({ email: true, slack: false, weekly: true });
  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="settings" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Workspace settings" subtitle={ctx.user.org} actions={
          <>
            <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={ctx.signOut}>Sign out</button>
            <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx.toast('Settings saved', 'success')}>Save changes</button>
          </>
        }/>
        <div className="hh-scroll" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" />ACCOUNT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, color: '#001' }}>{ctx.user.initials}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{ctx.user.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{ctx.user.org}</div>
                </div>
              </div>
              <window.HHField label="Display name" value={ctx.user.name} onChange={v => {}} />
              <window.HHField label="Organisation" value={ctx.user.org} onChange={v => {}} />
              <div style={{ marginTop: 6, fontSize: 11.5, color: 'var(--ink-3)' }}>Plan: <span style={{ color: 'var(--gold)' }}>★ Engineer · 14-day trial</span> · 7 days remaining</div>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-soft)', display: 'flex', gap: 8 }}>
                <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => ctx.navigate('landing')}>← Back to landing</button>
                <button className="hh-btn hh-btn-ghost" style={{ padding: '8px 14px', fontSize: 12, color: 'var(--coral)', borderColor: 'rgba(255,84,112,0.30)' }} onClick={ctx.signOut}>Sign out</button>
              </div>
            </div>

            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--violet)' }} />NOTIFICATIONS</div>
              {[
                { k: 'email', l: 'Email when a run completes', d: 'simulation done · pareto sweep done' },
                { k: 'slack', l: 'Slack alerts', d: 'connect Slack workspace' },
                { k: 'weekly', l: 'Weekly digest', d: 'Friday 17:00 UTC · usage + AI suggestions' },
              ].map(n => (
                <div key={n.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--border-soft)' }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--ink)' }}>{n.l}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{n.d}</div>
                  </div>
                  <button onClick={() => setNotify(p => ({ ...p, [n.k]: !p[n.k] }))} style={{
                    width: 40, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer',
                    background: notify[n.k] ? 'var(--cyan)' : 'var(--surface-3)',
                    position: 'relative', transition: 'background .2s',
                  }}>
                    <span style={{ position: 'absolute', top: 2, left: notify[n.k] ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
                  </button>
                </div>
              ))}
            </div>

            <div className="hh-card hh-card-elev" style={{ padding: 22 }}>
              <div className="hh-eyebrow" style={{ marginBottom: 14 }}><span className="dot" style={{ background: 'var(--coral)' }} />ABOUT THIS WORKSPACE</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 14 }}>
                HydroHEA is a research prototype built on the AlFeNi multi-physics
                framework from <b>Christian Lukwichi's</b> metallurgy thesis. Every
                number you see in the app is computed live from textbook physics
                (Fick diffusion, Arrhenius, linear elasticity) and a polynomial
                surrogate trained on those equations at startup.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border-soft)' }}>
                {[
                  ['Version', 'HydroHEA v3.2'],
                  ['Solver', 'In-browser analytic'],
                  ['Surrogate', 'Polynomial ridge regression'],
                  ['Data',   'Mock library · physics-derived predictions'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHSettings = HHSettings;

function HHDocs() {
  const ctx = window.useHH();
  const groups = [
    { t: 'Getting started', items: ['Quickstart · run your first simulation', 'Composition designer concepts', 'Understanding mesh sensitivity', 'AI predictor — read the SHAP plot'] },
    { t: 'Physics modules', items: ['Transport of diluted species', 'Heat transfer in solids', 'Solid mechanics · von Mises', 'Arrhenius temperature dependence'] },
    { t: 'For everyone', items: ['What is a high-entropy alloy?', 'Why hydrogen storage matters', 'Reading your PDF report', 'Glossary of metallurgy terms'] },
  ];
  return (
    <div className="hh-art" style={{ display: 'flex', height: '100%' }}>
      <window.HHSideNav active="docs" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-0)' }}>
        <window.HHTopBar title="Docs & Knowledge" subtitle="HydroHEA v3.2" actions={
          <button className="hh-btn hh-btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => ctx.openModal({ wide: true, content: <HHModalDemo ctx={ctx} /> })}>Talk to a scientist</button>
        }/>
        <div className="hh-scroll" style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div className="hh-card hh-card-elev" style={{ padding: 22, marginBottom: 16 }}>
            <input placeholder="🔍  Search docs (e.g. Arrhenius, mesh, XGBoost)…" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-0)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--ink)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />
          </div>
          <div className="hh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {groups.map(g => (
              <div key={g.t} className="hh-card" style={{ padding: 22 }}>
                <div className="hh-eyebrow" style={{ marginBottom: 12 }}><span className="dot" />{g.t.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {g.items.map(it => (
                    <a key={it} onClick={() => ctx.toast(`Opening: ${it}`, 'info')} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '11px 14px', borderRadius: 8, background: 'var(--bg-0)',
                      border: '1px solid var(--border)', color: 'var(--ink-2)',
                      fontSize: 13, cursor: 'pointer', textDecoration: 'none',
                    }}>
                      <span>{it}</span>
                      <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.HHDocs = HHDocs;

/* ---------- expose modal builders ---------- */
window.HHModalDemo = HHModalDemo;
window.HHModalSignIn = HHModalSignIn;
window.HHModalVideo = HHModalVideo;
window.HHModalOptimize = HHModalOptimize;
window.HHModalNewAlloy = HHModalNewAlloy;
window.HHModalImport = HHModalImport;
