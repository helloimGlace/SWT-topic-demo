import { useState } from 'react'

export function Slide2() {
  const [componentTime, setComponentTime] = useState(50)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 3 of 12</div>
      <h2>The Testing Bottleneck</h2>
      <p className="slide-subtitle">
        Adjust the sliders: How much time do you actually spend writing React components vs. writing tests & guessing edge cases?
      </p>
      <div className="sliders-container">
        <div className="slider-group">
          <label>Writing React Components</label>
          <div className="slider-row">
            <input
              type="range"
              min="0"
              max="100"
              value={componentTime}
              onChange={(e) => setComponentTime(Number(e.target.value))}
              disabled={submitted}
            />
            <span className="slider-value">{componentTime}%</span>
          </div>
        </div>
        <div className="slider-group">
          <label>Writing Tests / Mocking / Edge Cases</label>
          <div className="slider-row">
            <input
              type="range"
              min="0"
              max="100"
              value={100 - componentTime}
              onChange={(e) => setComponentTime(100 - Number(e.target.value))}
              disabled={submitted}
            />
            <span className="slider-value">{100 - componentTime}%</span>
          </div>
        </div>
      </div>
      {!submitted ? (
        <button className="primary-btn" onClick={() => setSubmitted(true)}>
          See How You Compare
        </button>
      ) : (
        <div className="insight-box">
          <strong>The Reality:</strong> In JavaScript, lack of strict types means you write more runtime validation tests.
          AI tools like Copilot can slash the boilerplate, letting you focus on <em>what matters</em>.
          <div className="averages">
            <div className="avg-item">
              <span className="avg-label">Your components</span>
              <span className="avg-value">{componentTime}%</span>
            </div>
            <div className="avg-item">
              <span className="avg-label">Average components</span>
              <span className="avg-value">35%</span>
            </div>
            <div className="avg-item">
              <span className="avg-label">Your tests</span>
              <span className="avg-value">{100 - componentTime}%</span>
            </div>
            <div className="avg-item">
              <span className="avg-label">Average tests</span>
              <span className="avg-value">65%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
