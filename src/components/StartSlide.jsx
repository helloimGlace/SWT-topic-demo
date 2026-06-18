export function StartSlide() {
  return (
    <div className="slide-content start-slide">
      <div className="slide-label">Slide 1 of 12</div>
      <div className="start-hero">
        <span className="start-icon">🤖</span>
      </div>
      <h2 className="start-title">AI-Assisted Testing<br />with GitHub Copilot</h2>
      <p className="start-sub">
        An interactive journey into writing better JavaScript tests<br />
        with the power of AI pair programming
      </p>
      <div className="start-details">
        <div className="start-detail-item">
          <span className="start-detail-icon">⚛️</span>
          <span>ReactJS + Vite</span>
        </div>
        <div className="start-detail-item">
          <span className="start-detail-icon">🧪</span>
          <span>Vitest + React Testing Library</span>
        </div>
        <div className="start-detail-item">
          <span className="start-detail-icon">🤝</span>
          <span>GitHub Copilot</span>
        </div>
      </div>
      <p className="start-prompt">Press <strong>Next →</strong> to begin</p>
    </div>
  )
}
