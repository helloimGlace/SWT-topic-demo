import { useState } from 'react'

export function Slide2() {
  const [componentTime, setComponentTime] = useState(50)
  const [testTime, setTestTime] = useState(50)

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 2 of 10</div>
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
              value={testTime}
              onChange={(e) => setTestTime(Number(e.target.value))}
            />
            <span className="slider-value">{testTime}%</span>
          </div>
        </div>
      </div>
      <div className="insight-box">
        <strong>The Reality:</strong> In JavaScript, lack of strict types means you write more runtime validation tests.
        AI tools like Copilot can slash the boilerplate, letting you focus on <em>what matters</em>.
      </div>
    </div>
  )
}
