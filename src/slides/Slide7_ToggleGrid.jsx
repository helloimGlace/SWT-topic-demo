import { useState } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';

const TOGGLES = [
  {
    id: 'open-tabs',
    correctState: true,
    label: 'Keep relevant source files open in adjacent workspace tabs',
    description: 'Provides rich prompt context — Copilot reads your open files to infer types, function signatures, and test structure.',
    onLabel:  'Enabled',
    offLabel: 'Disabled',
  },
  {
    id: 'blind-accept',
    correctState: false,
    label: 'Accept all generated multi-line outputs without reading them',
    description: 'Prevents executing hallucinations — always review AI output before committing it to your test suite.',
    onLabel:  'Accepting Blindly',
    offLabel: 'Reviewing First',
  },
  {
    id: 'descriptive-comments',
    correctState: true,
    label: 'Write descriptive comments explaining your boundary logic before typing test code',
    description: 'Anchors Copilot to your specific edge cases rather than generic happy-path scenarios.',
    onLabel:  'Enabled',
    offLabel: 'Disabled',
  },
];

export default function Slide7({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const [states, setStates] = useState({
    'open-tabs': false,
    'blind-accept': true,
    'descriptive-comments': false,
  });
  const [checked, setChecked] = useState(false);

  const toggle = (id) => {
    if (isComplete) return;
    setStates(prev => ({ ...prev, [id]: !prev[id] }));
    setChecked(false);
  };

  const allCorrect = TOGGLES.every(t => states[t.id] === t.correctState);

  const handleVerify = () => {
    setChecked(true);
    if (allCorrect) {
      setTimeout(() => onComplete(), 400);
    }
  };

  const getToggleStatus = (t) => {
    if (!checked) return 'neutral';
    return states[t.id] === t.correctState ? 'correct' : 'incorrect';
  };

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 6 · Slide 7"
        badgeColor="badge-green"
        title="Best Practices Review"
        subtitle="Configure the ultimate AI-assisted testing setup by flipping each toggle to its optimal state."
      />

      <KnowledgeDrop title="Knowledge Drop" color="var(--clr-green)">
        <p>
          To maximize your velocity with Copilot when testing React projects:
        </p>
        <ol style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: 2 }}>
          <li>Always supply descriptive context by keeping relevant code files open in adjacent splits.</li>
          <li>Drive code generation using explicit intent statements in comments.</li>
          <li>Run test watches constantly to verify AI suggestions instantly.</li>
        </ol>
      </KnowledgeDrop>

      <div className="toggle-grid" id="toggle-grid">
        {TOGGLES.map((t) => {
          const status = getToggleStatus(t);
          return (
            <div
              key={t.id}
              className={`toggle-row ${status === 'correct' ? 'correct' : ''} ${status === 'incorrect' ? 'incorrect' : ''}`}
              id={`toggle-row-${t.id}`}
            >
              <div className="toggle-row-text">
                <h4>{t.label}</h4>
                {checked && (
                  <p style={{ animation: 'slideDown .25s ease both' }}>
                    {t.description}
                  </p>
                )}
              </div>

              <span className={`toggle-result-badge ${status === 'correct' ? 'badge-correct' : status === 'incorrect' ? 'badge-incorrect' : 'badge-neutral'}`}>
                {states[t.id] ? t.onLabel : t.offLabel}
              </span>

              <label className="toggle-switch" id={`toggle-${t.id}`}>
                <input
                  type="checkbox"
                  checked={states[t.id]}
                  onChange={() => toggle(t.id)}
                  id={`toggle-input-${t.id}`}
                />
                <span className="toggle-track" />
              </label>
            </div>
          );
        })}
      </div>

      {!isComplete && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <button
            id="verify-toggles-btn"
            className="btn btn-primary"
            onClick={handleVerify}
          >
            Verify Configuration
          </button>
        </div>
      )}

      {checked && !allCorrect && (
        <div style={{ textAlign: 'center', color: 'var(--clr-red)', fontWeight: 700, fontSize: '.88rem', marginTop: '16px', animation: 'slideDown .2s ease both' }}>
          Some toggles are misconfigured — review the descriptions and adjust.
        </div>
      )}

      {isComplete && (
        <div className="question-card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderColor: 'var(--clr-green)', color: '#15803d' }}>
          Setup optimized. You are now equipped to use AI-assisted testing with confidence and control.
        </div>
      )}

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canGoBack={canGoBack}
        canGoNext={isComplete}
        nextLabel="Complete Lesson"
      />
    </div>
  );
}
