import { useState } from 'react'
import { codeStyle } from './codeStyle'

export function Slide1({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const options = [
    { id: 'leap', label: 'Leap years (e.g. 2026-02-29)' },
    { id: 'null', label: 'String inputs like "null"' },
    { id: 'format', label: 'Invalid date formats' },
    { id: 'perfect', label: 'It\'s perfect — no edge cases' },
  ]

  const handleSelect = (id) => {
    setSelected(id)
  }

  const handleSubmit = () => {
    setShowResult(true)
    if (onComplete && selected !== 'perfect') onComplete()
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 2 of 12</div>
      <h2>The Hook — Can You Spot the Bug?</h2>
      <p className="slide-subtitle">
        Look at this JavaScript function. Without explicit type safety, where does it completely break?
      </p>
      <div style={codeStyle}>
{`const isValidDate = (str) => {
  if (!str) return false
  const date = new Date(str)
  return !isNaN(date.getTime())
}`}
      </div>
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`option-btn ${selected === opt.id ? 'selected' : ''} ${showResult && selected === opt.id ? (opt.id !== 'perfect' ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleSelect(opt.id)}
            disabled={showResult}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {!showResult ? (
        <button className="primary-btn" onClick={handleSubmit} disabled={!selected}>
          Submit Answer
        </button>
      ) : (
        <div className="result-feedback">
          <strong>Correct!</strong> JavaScript's <code>new Date()</code> silently wraps invalid dates, accepting "null", 
          leap year mistakes, and format confusion. This flexibility hides bugs — and that's exactly why AI-assisted 
          testing is so valuable.
        </div>
      )}
    </div>
  )
}
