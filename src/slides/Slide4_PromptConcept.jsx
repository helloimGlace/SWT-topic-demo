import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';

export default function Slide4({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 4 · Slide 4"
        badgeColor="badge-lime"
        title="Prompt Engineering via JSDoc Comments"
        subtitle="The quality of Copilot's output is directly proportional to the quality of your intent signal."
      />

      <KnowledgeDrop title="Knowledge Drop" color="var(--clr-lime)" >
        <p>
          Because JavaScript is dynamically typed, Copilot does not inherently know whether
          a parameter is supposed to be a string, a clean object, or a raw timestamp. To get
          precise test blocks from the AI, you must use <strong>Intent-Driven Prompting</strong>.
        </p>
        <br />
        <p>
          A generic comment like <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.85em' }}>// write tests</code> gives
          the model too much creative freedom, producing weak, generic tests. Writing
          descriptive <strong>JSDoc comments</strong> establishes rigid boundaries for the AI
          to trace — anchoring its output to your specific business logic, parameter types,
          and edge-case scenarios.
        </p>
      </KnowledgeDrop>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--clr-text)', marginBottom: '16px' }}>
          Weak vs. Strong Prompt — Side by Side
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '.72rem', fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--clr-red)', marginBottom: '8px' }}>
              Weak Prompt
            </div>
            <div className="code-block" style={{ fontSize: '.78rem' }}>
              <span className="cmt">{'// write tests'}</span>
            </div>
            <p style={{ fontSize: '.8rem', color: 'var(--clr-text-muted)', marginTop: '8px', fontWeight: 600 }}>
              Copilot generates generic happy-path tests that miss the February 29th edge case entirely.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '.72rem', fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase', color: '#4d7c0f', marginBottom: '8px' }}>
              Strong Prompt
            </div>
            <div className="code-block" style={{ fontSize: '.78rem' }}>
              <span className="cmt">{'// Test that it displays'}</span>
              <br />
              <span className="cmt">{'// Invalid Date when the'}</span>
              <br />
              <span className="cmt">{'// user types 2026-02-29'}</span>
            </div>
            <p style={{ fontSize: '.8rem', color: 'var(--clr-text-muted)', marginTop: '8px', fontWeight: 600 }}>
              Copilot traces the exact boundary condition and generates a targeted assertion for the rollover bug.
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #f7fee7, #ecfccb)', border: '2px solid #bef264', borderRadius: 'var(--radius-lg)', padding: '18px 22px', width: '100%', marginBottom: '20px' }}>
        <p style={{ fontSize: '.9rem', fontWeight: 700, color: '#4d7c0f' }}>
          On the next slide, you will construct the exact prompt that forces Copilot to target this bug. Use what you just learned to choose the right fragments.
        </p>
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={() => { handleContinue(); onNext(); }}
        canGoBack={canGoBack}
        canGoNext={true}
        nextLabel="Build the Prompt"
      />
    </div>
  );
}
