import { useState } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';
import Modal from '../components/Modal';

const INPUTS = [
  {
    id: 'valid',
    label: 'button("2026-02-25")',
    value: '"2026-02-25"',
    result: 'True (Valid Date)',
    type: 'result-true',
    warn: false,
  },
  {
    id: 'leap',
    label: 'button("2026-02-29")',
    value: '"2026-02-29"',
    result: 'True (Valid Date)',
    type: 'result-warn',
    warn: true,
  },
  {
    id: 'invalid',
    label: 'button("hello")',
    value: '"hello"',
    result: 'False (Invalid Date)',
    type: 'result-false',
    warn: false,
  },
];

export default function Slide1({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const [log, setLog] = useState([]);
  const [firedIds, setFiredIds] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const allFired = INPUTS.every(i => firedIds.has(i.id));

  const handleInput = (item) => {
    if (firedIds.has(item.id)) return;

    const newFired = new Set([...firedIds, item.id]);
    setFiredIds(newFired);

    setLog(prev => [...prev, {
      id: item.id,
      input: item.value,
      result: item.result,
      type: item.type,
    }]);

    if (item.warn) {
      setShowWarning(true);
      setShakeKey(k => k + 1);
    }

    // After all three fired, show modal
    if (newFired.size === INPUTS.length) {
      setTimeout(() => setShowModal(true), 600);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    onComplete();
  };

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 1 · Slide 1"
        badgeColor="badge-indigo"
        title="The Illusion of Simple Input Validation"
        subtitle="JavaScript's built-in date handling is more forgiving — and more dangerous — than it appears."
      />

      <KnowledgeDrop title="Knowledge Drop">
        <p>
          When handling date strings in JavaScript, <strong>new Date()</strong> and{' '}
          <strong>Date.parse()</strong> are notoriously forgiving. Passing an invalid date
          like <strong>"2026-02-29"</strong> (2026 is not a leap year) does not throw an
          error — JavaScript silently rolls it over to "2026-03-01". Without static typing,
          these silent failures slip through basic validation undetected, making targeted
          unit tests mandatory.
        </p>
      </KnowledgeDrop>

      <div className="w-full" style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '16px', textAlign: 'center' }}>
          Click each button to send a value into the simulator and observe the output.
        </p>
      </div>

      <div className="sim-layout">
        {/* Left — Code + Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="sim-pane">
            <div className="sim-pane-header">
              <div className="dot" style={{ background: '#ef4444' }} />
              <div className="dot" style={{ background: '#f59e0b' }} />
              <div className="dot" style={{ background: '#22c55e' }} />
              <span style={{ marginLeft: '4px' }}>dateUtils.js</span>
            </div>
            <div className="code-block" style={{ borderRadius: 0, fontSize: '.8rem' }}>
              <div><span className="kw">const</span> <span className="fn">checkDate</span> <span className="op">=</span> <span className="op">(</span><span style={{color:'#fdba74'}}>inputString</span><span className="op">)</span> <span className="op">=&gt;</span> {'{'}</div>
              <div>&nbsp;&nbsp;<span className="kw">const</span> date <span className="op">=</span> <span className="kw">new</span> <span className="fn">Date</span><span className="op">(</span>inputString<span className="op">)</span>;</div>
              <div>&nbsp;&nbsp;<span className="kw">return</span> <span className="op">!</span><span className="fn">isNaN</span><span className="op">(</span>date.<span className="fn">getTime</span><span className="op">());</span></div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* Console */}
          <div className="sim-pane">
            <div className="sim-pane-header">
              <div className="dot" style={{ background: '#818cf8' }} />
              Console Output
            </div>
            <div className="sim-console">
              {log.length === 0 && (
                <span style={{ color: '#475569', fontStyle: 'italic' }}>
                  {'// Waiting for input...'}
                </span>
              )}
              {log.map((entry, i) => (
                <div key={i} className={`console-line ${entry.type}`}>
                  <span className="prompt">{'>'}</span>
                  <span style={{ color: '#a5b4fc' }}>checkDate({entry.input})</span>
                  <span style={{ color: '#475569' }}>=&gt;</span>
                  <span className="val">{entry.result}</span>
                </div>
              ))}
            </div>
            {showWarning && (
              <div className="warning-banner" key={shakeKey}>
                Warning: "2026-02-29" does not exist — JavaScript silently
                rolled over to March 1st, yet still returned true!
              </div>
            )}
          </div>
        </div>

        {/* Right — Input buttons */}
        <div className="sim-pane">
          <div className="sim-pane-header">
            <div className="dot" style={{ background: '#f97316' }} />
            Test Inputs
          </div>
          <div style={{ padding: '16px' }}>
            <p style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '12px' }}>
              Click a value to pass it into checkDate():
            </p>
            <div className="input-btn-group">
              {INPUTS.map(item => (
                <button
                  key={item.id}
                  id={`input-btn-${item.id}`}
                  className={`input-btn ${firedIds.has(item.id) ? 'fired' : ''}`}
                  onClick={() => handleInput(item)}
                >
                  {item.label}
                  {firedIds.has(item.id) && (
                    <span style={{ fontSize: '.7rem', marginLeft: '8px', opacity: .7 }}>
                      {item.type === 'result-warn' ? '(fired)' : '(fired)'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {allFired && (
              <div className="question-card" id="core-question">
                Why did "2026-02-29" return <strong>true</strong>?
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          id="leap-year-modal"
          title="JavaScript's Silent Rollover"
          body={
            <span>
              JavaScript silently converted February 29th into <strong>March 1st</strong>.
              This rollover behavior means the date passes basic validation completely
              undetected — the function returns <strong>true</strong> for a date that does
              not exist. This is exactly why targeted unit tests that check specific edge
              cases, like non-leap-year February 29th entries, are mandatory.
            </span>
          }
          onClose={handleModalClose}
        />
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
