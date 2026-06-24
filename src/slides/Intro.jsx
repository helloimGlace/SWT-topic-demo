export default function Intro({ onNext }) {
  const modules = [
    'The JavaScript Date Trap',
    'The LLM Context Window',
    'AI Testing Toolchain',
    'Prompt Engineering',
    'Hallucination Detection',
    'Best Practices Review',
  ];

  return (
    <div className="intro-shell">
      {/* Background orbs */}
      <div className="intro-orb intro-orb-1" />
      <div className="intro-orb intro-orb-2" />
      <div className="intro-orb intro-orb-3" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p className="intro-eyebrow">Interactive Lesson</p>

        <h1 className="intro-title">
          AI-Assisted Testing<br />
          <span>in Software Development</span>
        </h1>

        <p className="intro-description">
          Discover how GitHub Copilot transforms the way engineers write, review,
          and validate tests — from catching silent JavaScript failures to
          detecting AI hallucinations before they crash your test runner.
        </p>

        <div className="intro-modules">
          {modules.map((m, i) => (
            <span className="intro-module-pill" key={i}>
              {m}
            </span>
          ))}
        </div>

        <div className="intro-cta">
          <button
            className="btn-intro"
            onClick={onNext}
            id="intro-start-btn"
          >
            Start Learning →
          </button>
        </div>

        <p style={{ marginTop: '28px', color: 'rgba(255,255,255,.4)', fontSize: '.8rem', fontWeight: 600 }}>
          6 modules · 7 interactive challenges
        </p>
      </div>
    </div>
  );
}
