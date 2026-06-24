import { useState } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';
import Modal from '../components/Modal';

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

export default function Slide7({ onComplete, isComplete, onNext, onBack, canGoBack, onSkip }) {
  const [states, setStates] = useState({
    'open-tabs': false,
    'blind-accept': true,
    'descriptive-comments': false,
  });
  const [checked, setChecked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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
      <div className="slide-cols">
        {/* Left Column — Info */}
        <div className="slide-col-left">
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
        </div>

        {/* Right Column — Interactive */}
        <div className="slide-col-right">
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
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <div className="question-card" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderColor: 'var(--clr-green)', color: '#15803d', margin: 0 }}>
                Setup optimized. You are now equipped to use AI-assisted testing with confidence and control.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowExplanation(true)}
                  id="why-optimal-btn"
                  style={{ padding: '8px 20px', fontSize: '.85rem' }}
                >
                  Why is this the optimal setup? 🤔
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        onSkip={!isComplete ? onSkip : null}
        canGoBack={canGoBack}
        canGoNext={isComplete}
        nextLabel="Complete Lesson"
      />

      {showExplanation && (
        <Modal
          icon="⚙️"
          title="Optimal AI-Assisted Testing Setup"
          onClose={() => setShowExplanation(false)}
          body={
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '.9rem', lineHeight: 1.6 }}>
              <p>
                An optimized workspace design is critical for getting high-fidelity, crash-free output from GitHub Copilot:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong>Keeping relevant tabs open</strong> ensures that the editor workspace feeds related files directly into Copilot's prompt context. The model reads your component definitions, schemas, and helper functions to accurately predict variable names and functions.
                </li>
                <li>
                  <strong>Writing descriptive comments before coding</strong> forces you to outline your test design explicitly. This "intent-driven commenting" primes the LLM with your boundaries, preventing generic, happy-path test suggestions.
                </li>
                <li>
                  <strong>Reviewing generated code before accepting</strong> is the final essential guardrail. Toggling on "Review First" stops you from blind execution of code hallucinations, protecting your test suite from invalid method names.
                </li>
              </ul>
            </div>
          }
        />
      )}
    </div>
  );
}
