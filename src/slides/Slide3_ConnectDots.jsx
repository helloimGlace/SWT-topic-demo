  import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';

const LEFT_ITEMS = [
  { id: 'rtl',    label: 'React Testing Library', short: 'RTL' },
  { id: 'vitest', label: 'Vitest / Jest',          short: 'Test Runner' },
  { id: 'ext',    label: 'Copilot Extension',      short: 'Inline AI' },
  { id: 'chat',   label: 'Copilot Chat',           short: 'Chat AI' },
];

const RIGHT_ITEMS = [
  { id: 'boiler',   label: 'Generates inline boilerplates and structurally fills mock data objects while typing.' },
  { id: 'explain',  label: 'Explains runtime stack traces and suggests refactoring strategies for failing tests.' },
  { id: 'dom',      label: 'Simulates user interactions (clicks, text input) and queries DOM nodes.' },
  { id: 'assert',   label: 'Executes assertions, evaluates expect statements, and returns PASS/FAIL reports.' },
];

const CORRECT_MAP = {
  rtl:    'dom',
  vitest: 'assert',
  ext:    'boiler',
  chat:   'explain',
};

export default function Slide3({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [connections, setConnections] = useState({});   // leftId -> rightId
  const [wrongFlash, setWrongFlash] = useState(new Set());
  const [checked, setChecked] = useState(false);

  const leftRefs  = useRef({});
  const rightRefs = useRef({});
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const recalcLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const nextLines = [];

    Object.entries(connections).forEach(([leftId, rightId]) => {
      const lEl = leftRefs.current[leftId];
      const rEl = rightRefs.current[rightId];
      if (!lEl || !rEl) return;
      const lRect = lEl.getBoundingClientRect();
      const rRect = rEl.getBoundingClientRect();

      const x1 = lRect.right  - containerRect.left;
      const y1 = lRect.top    - containerRect.top  + lRect.height / 2;
      const x2 = rRect.left   - containerRect.left;
      const y2 = rRect.top    - containerRect.top  + rRect.height / 2;

      const isCorrect = checked ? CORRECT_MAP[leftId] === rightId : null;
      nextLines.push({ leftId, rightId, x1, y1, x2, y2, isCorrect });
    });

    setLines(nextLines);
  }, [connections, checked]);

  useLayoutEffect(() => {
    recalcLines();
  }, [recalcLines]);

  useEffect(() => {
    window.addEventListener('resize', recalcLines);
    return () => window.removeEventListener('resize', recalcLines);
  }, [recalcLines]);

  const handleLeftClick = (id) => {
    if (isComplete) return;
    setSelectedLeft(prev => prev === id ? null : id);
  };

  const handleRightClick = (rightId) => {
    if (isComplete) return;
    if (!selectedLeft) return;

    setConnections(prev => {
      const next = { ...prev };
      // Remove any existing connection to this right item
      Object.keys(next).forEach(k => { if (next[k] === rightId) delete next[k]; });
      next[selectedLeft] = rightId;
      return next;
    });
    setSelectedLeft(null);
    setChecked(false);
  };

  const allConnected = LEFT_ITEMS.every(l => connections[l.id]);

  const handleCheck = () => {
    setChecked(true);
    const wrongs = new Set();
    LEFT_ITEMS.forEach(l => {
      if (connections[l.id] !== CORRECT_MAP[l.id]) wrongs.add(l.id);
    });

    if (wrongs.size === 0) {
      onComplete();
    } else {
      setWrongFlash(wrongs);
      setTimeout(() => {
        // Remove wrong connections
        setConnections(prev => {
          const next = { ...prev };
          wrongs.forEach(id => delete next[id]);
          return next;
        });
        setWrongFlash(new Set());
        setChecked(false);
      }, 900);
    }
  };

  const getLeftClass = (id) => {
    if (checked && connections[id]) {
      return CORRECT_MAP[id] === connections[id] ? 'connected-correct' : 'connected-wrong';
    }
    if (wrongFlash.has(id)) return 'connected-wrong';
    if (selectedLeft === id) return 'selected';
    if (connections[id]) return 'connected-correct';
    return '';
  };

  const getRightClass = (id) => {
    const leftId = Object.keys(connections).find(k => connections[k] === id);
    if (!leftId) return '';
    if (checked) {
      return CORRECT_MAP[leftId] === id ? 'connected-correct' : 'connected-wrong';
    }
    if (wrongFlash.has(leftId)) return 'connected-wrong';
    return 'connected-correct';
  };

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 3 · Slide 3"
        badgeColor="badge-teal"
        title="The AI-Assisted Testing Stack"
        subtitle="Each tool in the chain has a distinct role. Click a tool, then click its matching responsibility."
      />

      <KnowledgeDrop title="Knowledge Drop" color="var(--clr-teal)">
        <p>
          Automating UI checks requires a cohesive toolchain: <strong>React (JSX)</strong> for
          components, <strong>Vitest/Jest</strong> as the execution runner, and{' '}
          <strong>React Testing Library (RTL)</strong> to interact with the DOM exactly as a
          real user would. GitHub Copilot acts as the bridge — injecting infrastructure setup
          instantly so you can focus on edge-case intent rather than boilerplate.
        </p>
      </KnowledgeDrop>

      <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '24px', textAlign: 'center' }}>
        Draw connections to link each testing layer to its specific engineering role.
      </p>

      <div
        ref={containerRef}
        className="connect-layout"
        style={{ position: 'relative' }}
        id="connect-container"
      >
        {/* SVG Lines */}
        <svg
          className="connect-svg-layer"
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
        >
          {lines.map(({ leftId, rightId, x1, y1, x2, y2, isCorrect }) => {
            const mx = (x1 + x2) / 2;
            const color = isCorrect === null ? 'var(--clr-indigo-lt)'
              : isCorrect ? 'var(--clr-green)' : 'var(--clr-red)';
            return (
              <path
                key={`${leftId}-${rightId}`}
                d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeDasharray={isCorrect === false ? '5,3' : 'none'}
                opacity={.9}
              />
            );
          })}
        </svg>

        {/* Left Column */}
        <div className="connect-col">
          {LEFT_ITEMS.map(item => (
            <div
              key={item.id}
              id={`left-${item.id}`}
              ref={el => leftRefs.current[item.id] = el}
              className={`connect-card ${getLeftClass(item.id)}`}
              onClick={() => handleLeftClick(item.id)}
              style={{ cursor: isComplete ? 'default' : 'pointer' }}
            >
              <div className="tool-name">{item.short}</div>
              {item.label}
            </div>
          ))}
        </div>

        {/* Center spacer */}
        <div />

        {/* Right Column */}
        <div className="connect-col">
          {RIGHT_ITEMS.map(item => (
            <div
              key={item.id}
              id={`right-${item.id}`}
              ref={el => rightRefs.current[item.id] = el}
              className={`connect-card ${getRightClass(item.id)}`}
              onClick={() => handleRightClick(item.id)}
              style={{
                cursor: selectedLeft && !isComplete ? 'pointer' : 'default',
                fontSize: '.82rem',
                lineHeight: 1.5,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {!isComplete && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <button
            id="check-connections-btn"
            className="btn btn-teal"
            onClick={handleCheck}
            disabled={!allConnected}
          >
            Verify Connections
          </button>
        </div>
      )}

      {isComplete && (
        <div className="question-card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, #ecfeff, #cffafe)', borderColor: 'var(--clr-teal)', color: '#0e7490' }}>
          All connections correct! Each layer in the chain serves a distinct, non-overlapping role.
        </div>
      )}

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canGoBack={canGoBack}
        canGoNext={isComplete}
      />
    </div>
  );
}
