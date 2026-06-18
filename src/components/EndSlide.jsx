export function EndSlide() {
  return (
    <div className="slide-content end-slide">
      <div className="slide-label">Slide 12 of 12</div>
      <div className="end-hero">
        <span className="end-icon">*</span>
      </div>
      <h2 className="end-title">You Made It!</h2>
      <p className="end-sub">
        You've completed the interactive presentation on AI-Assisted Testing with GitHub Copilot.
      </p>
      <div className="end-recap">
        <div className="end-card">
          <span className="end-card-icon">&gt;</span>
          <strong>Speed</strong>
          <p>AI handles boilerplate so you focus on core logic</p>
        </div>
        <div className="end-card">
          <span className="end-card-icon">#</span>
          <strong>Coverage</strong>
          <p>Edge cases surfaced automatically by Copilot</p>
        </div>
        <div className="end-card">
          <span className="end-card-icon">@</span>
          <strong>Quality</strong>
          <p>Better prompts produce better test suites</p>
        </div>
      </div>
      <div className="end-cta">
        <p>Try it yourself — open a React project, write a descriptive test comment, and let Copilot handle the rest.</p>
      </div>
    </div>
  )
}
