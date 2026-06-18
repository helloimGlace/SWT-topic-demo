import { useState } from 'react'
import { codeStyle } from './codeStyle'

export function Slide8({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const options = [
    { id: 'compile', label: 'JavaScript doesn\'t catch missing methods at compile time', correct: true },
    { id: 'syntax', label: 'The test has a syntax error' },
    { id: 'lib', label: 'The testing library is not installed' },
  ]

  const handleSelect = (id) => {
    setSelected(id)
  }

  const handleSubmit = () => {
    setShowResult(true)
    if (onComplete && selected === 'compile') onComplete()
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 9 of 12</div>
      <h2>When AI Fails — The Human-in-the-Loop</h2>
      <p className="slide-subtitle">
        Copilot generated this test. Can you spot the hallucination?
      </p>
      <div style={codeStyle}>
{`test('validates date correctly', () => {
  render(<DateChecker />)
  const input = screen.getByPlaceholderText('YYYY-MM-DD')
  fireEvent.change(input, { target: { value: '2026-02-29' } })
  expect(input).toBeValidDate()          // ← This method does NOT exist!
})`}
      </div>
      <p className="slide-subtitle">Why did this test crash your test runner?</p>
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`btn option-btn ${selected === opt.id ? 'selected' : ''} ${showResult && selected === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleSelect(opt.id)}
            disabled={showResult}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {!showResult ? (
        <button className="btn primary-btn" onClick={handleSubmit} disabled={!selected}>
          Submit Answer
        </button>
      ) : selected === 'compile' ? (
        <div className="alert" role="alert">
          <strong>Correct!</strong> Because JavaScript doesn't catch missing methods at compile time,
          a hallucinated API like <code>toBeValidDate()</code> only fails at runtime — making execution
          and human code review strictly required to catch AI hallucinations.
        </div>
      ) : (
        <div className="alert wrong-feedback" role="alert">
          <strong>Not quite.</strong> The test runs without syntax errors and the testing library is installed.
          The real issue is that JavaScript's <code>toBeValidDate()</code> doesn't exist anywhere — but JavaScript
          won't tell you until runtime. This is exactly the kind of AI hallucination that slips through without
          human review.
        </div>
      )}
    </div>
  )
}
