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

export default function Slide1({ onComplete, isComplete, onNext, onBack, canGoBack, onSkip }) {
  const [log, setLog] = useState([]);
  const [firedIds, setFiredIds] = useState(new Set());
  const [showWarning, setShowWarning] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

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

    if (newFired.size === INPUTS.length) {
      setTimeout(() => { onComplete(); }, 600);
    }
  };

  return (
    <div className="slide-container">
      <div className="slide-cols">
        {/* Left Column — Info */}
        <div className="slide-col-left">
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
        </div>

        {/* Right Column — Interactive */}
        <div className="slide-col-right">
          <p style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '12px' }}>
            Click each button to send a value into the simulator and observe the output.
          </p>

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
                          (fired)
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {allFired && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>                  
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowExplanation(true)}
                        id="why-date-btn"
                        style={{ padding: '8px 20px', fontSize: '.85rem' }}
                      >
                        Why did "2026-02-29" return true? 🤔
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        onSkip={!isComplete ? onSkip : null}
        canGoBack={canGoBack}
        canGoNext={isComplete}
      />

      {showExplanation && (
        <Modal
          icon="📅"
          title="JavaScript's Silent Date Rollover"
          onClose={() => setShowExplanation(false)}
          body={
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '.9rem', lineHeight: 1.6 }}>
              <p>
                JavaScript's built-in <code>new Date()</code> constructor is designed to be highly forgiving. When you pass a date string like <code>"2026-02-29"</code>, JavaScript parses it, recognizes that February 2026 has only 28 days, and silently <strong>rolls over</strong> the extra day to the next month.
              </p>
              <p>
                As a result, <code>new Date("2026-02-29")</code> evaluates to <strong>March 1st, 2026</strong>. Since March 1st is a valid date, the expression <code>!isNaN(date.getTime())</code> returns <strong>true</strong>.
              </p>
              <p>
                This behavior means that basic validation will pass successfully even if the user entered a date that does not exist in reality. To catch these issues, developers must write <strong>targeted unit tests</strong> that specifically inspect boundary rollover cases or use a helper library that validates calendar validity.
              </p>
            </div>
          }
        />
      )}
    </div>
  );
}
