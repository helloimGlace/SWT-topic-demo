import { useState } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';
import Modal from '../components/Modal';

const CODE_LINES = [
  {
    num: 1,
    isBug: false,
    parts: [
      { text: "test", cls: 'fn' },
      { text: "('handles clean boundary reset values', () => {", cls: '' },
    ],
  },
  {
    num: 2,
    isBug: false,
    parts: [
      { text: '  render', cls: 'fn' },
      { text: '(', cls: '' },
      { text: '<DateChecker />', cls: 'str' },
      { text: ');', cls: '' },
    ],
  },
  {
    num: 3,
    isBug: false,
    parts: [
      { text: '  const clearBtn = screen.', cls: '' },
      { text: 'getByRole', cls: 'fn' },
      { text: "(", cls: '' },
      { text: "'button'", cls: 'str' },
      { text: ', { name: ', cls: '' },
      { text: '/clear/i', cls: 'str' },
      { text: ' });', cls: '' },
    ],
  },
  {
    num: 4,
    isBug: false,
    parts: [
      { text: '  fireEvent.', cls: '' },
      { text: 'click', cls: 'fn' },
      { text: '(clearBtn);', cls: '' },
    ],
  },
  {
    num: 5,
    isBug: true,
    parts: [
      { text: '  expect', cls: 'fn' },
      { text: '(screen).', cls: '' },
      { text: 'toHaveAllInputsClearedAndReset', cls: 'fn', isBadMethod: true },
      { text: '();', cls: '' },
      { text: ' // Click to find the bug', cls: 'cmt' },
    ],
  },
  {
    num: 6,
    isBug: false,
    parts: [
      { text: '});', cls: '' },
    ],
  },
];

export default function Slide6({ onComplete, isComplete, onNext, onBack, canGoBack, onSkip }) {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [bugFound, setBugFound] = useState(false);
  const [wrongClick, setWrongClick] = useState(null);
  const [shakeLines, setShakeLines] = useState(new Set());
  const [showExplanation, setShowExplanation] = useState(false);

  const handleLineClick = (line) => {
    if (bugFound || isComplete) return;

    if (line.isBug) {
      setBugFound(true);
      setTimeout(() => onComplete(), 300);
    } else {
      setWrongClick(line.num);
      const next = new Set([line.num]);
      setShakeLines(next);
      setTimeout(() => {
        setWrongClick(null);
        setShakeLines(new Set());
      }, 600);
    }
  };

  return (
    <div className="slide-container">
      <div className="slide-cols">
        {/* Left Column — Info */}
        <div className="slide-col-left">
          <SlideHeader
            badge="Module 5 · Slide 6"
            badgeColor="badge-pink"
            title="The Human-in-the-Loop Guardrail"
            subtitle="AI-generated code must be reviewed. One of these lines contains a method that does not exist."
          />

          <KnowledgeDrop title="Knowledge Drop" color="var(--clr-pink)">
            <p>
              Large Language Models work entirely on <strong>statistical token probabilities</strong>.
              This means Copilot can occasionally <strong>hallucinate</strong> testing library methods
              that sound logical but do not exist in the JavaScript package ecosystem. Your role
              shifts from writer to <strong>reviewer</strong> — inspecting AI output critically to
              catch false assumptions before they reach your test runner.
            </p>
          </KnowledgeDrop>
        </div>

        {/* Right Column — Interactive */}
        <div className="slide-col-right">
          <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '16px' }}>
            Copilot generated this block. It looks authentic, but it will crash your test runner. Click the line containing the hallucination.
          </p>

          <div className="review-pane" id="review-pane">
            <div className="review-titlebar">
              <span className="vscode-dot red" style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span className="vscode-dot yellow" style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block', margin: '0 4px' }} />
              <span className="vscode-dot green" style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span style={{ marginLeft: '12px' }}>DateChecker.test.jsx — AI Generated</span>
            </div>

            {CODE_LINES.map((line) => (
              <div
                key={line.num}
                id={`code-line-${line.num}`}
                className={`code-line ${line.isBug ? 'target-line' : ''} ${bugFound && line.isBug ? 'bug-found' : ''} ${shakeLines.has(line.num) ? 'wrong-click shake' : ''}`}
                onMouseEnter={() => setHoveredLine(line.num)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => handleLineClick(line)}
                title={line.isBug ? 'Inspect this line...' : ''}
              >
                <span className="line-num">{line.num}</span>
                <span className="line-text">
                  {line.parts.map((part, i) => (
                    <span
                      key={i}
                      className={part.cls}
                      style={part.isBadMethod && !bugFound ? {
                        textDecoration: hoveredLine === 5 ? 'underline wavy var(--clr-orange)' : 'none',
                        cursor: 'pointer',
                      } : {}}
                    >
                      {part.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}

            {bugFound && (
              <div className="bug-overlay" id="bug-overlay">
                <div className="bug-badge">Bug Identified</div>
                <div style={{ marginBottom: '10px' }}>
                  <span className="old-text">.toHaveAllInputsClearedAndReset()</span>
                </div>
                <div style={{ marginBottom: '8px', color: '#94a3b8', fontSize: '.8rem' }}>
                  This method does not exist in React Testing Library. The correct assertion is:
                </div>
                <div>
                  <span className="fix-text">.toHaveValue('')</span>
                </div>
                <div style={{ marginTop: '12px', fontSize: '.78rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '12px' }}>
                  Always cross-verify custom assertions against real RTL documentation before running your suite.
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowExplanation(true)}
                    id="why-hallucinate-btn"
                    style={{ padding: '6px 16px', fontSize: '.78rem', background: '#312e81', color: '#fff', borderColor: '#4338ca' }}
                  >
                    Why does Copilot hallucinate methods? 🤔
                  </button>
                </div>
              </div>
            )}
          </div>

          {wrongClick && !bugFound && (
            <div style={{ textAlign: 'center', color: 'var(--clr-red)', fontWeight: 700, fontSize: '.88rem', marginTop: '12px', animation: 'slideDown .2s ease both' }}>
              Not the hallucination — keep looking.
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
      />

      {showExplanation && (
        <Modal
          icon="🕵️"
          title="Understanding LLM Code Hallucinations"
          onClose={() => setShowExplanation(false)}
          body={
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '.9rem', lineHeight: 1.6 }}>
              <p>
                Large Language Models (LLMs) are statistical text predictors, not executing compilers. They predict code word-by-word based on probability patterns:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong>Plausible but Fake API Signatures:</strong> In the training data, phrases like <em>"clear inputs"</em> and <em>"reset fields"</em> are frequently connected with assertions. When asked to check if inputs are reset, the model combines these ideas to construct a highly authentic-sounding method like <code>.toHaveAllInputsClearedAndReset()</code>, even though it doesn't exist in the actual library.
                </li>
                <li>
                  <strong>Lack of an Execution Loop:</strong> Copilot runs completely static predictions. It doesn't run a node linter or a TypeScript compiler behind the scenes when writing code in your editor. It has no way of verifying whether a method is physically defined in your <code>node_modules</code>.
                </li>
                <li>
                  <strong>Human-in-the-Loop Guardrail:</strong> This is why software developers must never blindly accept AI outputs. Developers are code <em>reviewers</em> — inspecting generated test files, looking out for hallucinated custom matchers, and validating that the output matches actual documentation.
                </li>
              </ul>
            </div>
          }
        />
      )}
    </div>
  );
}
