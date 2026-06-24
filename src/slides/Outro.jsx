import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#4f46e5', '#f97316', '#06b6d4', '#84cc16',
  '#ec4899', '#f59e0b', '#22c55e', '#818cf8',
];

function Confetti() {
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: `${1.2 + Math.random() * 1.4}s`,
    delay: `${Math.random() * .8}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > .5 ? '50%' : '2px',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

const KEY_TAKEAWAYS = [
  { num: '01', text: 'JavaScript\'s Date API silently rolls over invalid dates — manual unit tests are mandatory.' },
  { num: '02', text: 'Copilot\'s context window prioritizes cursor proximity above all other signals.' },
  { num: '03', text: 'RTL, Vitest/Jest, and Copilot form a cohesive, non-overlapping testing chain.' },
  { num: '04', text: 'Descriptive JSDoc comments force the AI to trace your exact edge-case intent.' },
  { num: '05', text: 'Hallucinated methods look plausible — always verify against official documentation.' },
  { num: '06', text: 'Keep source files open, write intent comments, and never accept output without review.' },
];

export default function Outro({ onBack }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="outro-shell">
      {showConfetti && <Confetti />}

      <div className="intro-orb intro-orb-1" style={{ background: 'radial-gradient(circle, rgba(34,197,94,.3), transparent)' }} />
      <div className="intro-orb intro-orb-2" style={{ background: 'radial-gradient(circle, rgba(6,182,212,.25), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="completion-badge" style={{ animationDelay: '.1s' }}>
          Lesson Complete
        </div>

        <h1 className="outro-title">
          You are now an<br />AI Testing Engineer
        </h1>

        <div className="outro-summary">
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.8 }}>
            You have navigated the full spectrum — from JavaScript's silent date failures to
            prompt engineering, toolchain architecture, and hallucination detection.
            These six principles form the foundation of responsible, AI-augmented software testing.
          </p>
        </div>

        <div className="outro-grid">
          {KEY_TAKEAWAYS.map((item) => (
            <div className="outro-card" key={item.num}>
              <div className="outro-card-num">{item.num}</div>
              <p style={{ fontSize: '.82rem', lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeSlideIn .5s .5s ease both' }}>
          <button
            className="btn btn-secondary"
            onClick={onBack}
            id="outro-back-btn"
            style={{ background: 'rgba(255,255,255,.1)', color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}
          >
            Review Last Slide
          </button>
          <button
            className="btn-intro"
            id="outro-restart-btn"
            onClick={() => window.location.reload()}
            style={{ fontSize: '.9rem', padding: '12px 32px' }}
          >
            Restart Lesson
          </button>
        </div>

        <p style={{ marginTop: '32px', color: 'rgba(255,255,255,.3)', fontSize: '.78rem', fontWeight: 600 }}>
          AI-Assisted Testing · Interactive Lesson · Built with React + Vite
        </p>
      </div>
    </div>
  );
}
