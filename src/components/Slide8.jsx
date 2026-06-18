import { useState } from 'react'
import { codeStyle } from './codeStyle'

export function Slide8() {
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const options = [
    { id: 'compile', label: 'JavaScript doesn\'t catch missing methods at compile time' },
    { id: 'syntax', label: 'The test has a syntax error' },
    { id: 'lib', label: 'The testing library is not installed' },
  ]

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
      {!showAnswer ? (
        <>
          <p className="slide-subtitle">Why did this test crash your test runner?</p>
          <div className="options-grid compact">
            {options.map((opt) => (
              <button
                key={opt.id}
                className={`btn option-btn ${selected === opt.id ? 'selected' : ''}`}
                onClick={() => setSelected(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button className="btn primary-btn" onClick={() => setShowAnswer(true)} disabled={!selected}>
            Reveal Answer
          </button>
        </>
      ) : (
        <div className="alert" role="alert">
          <strong>Exactly.</strong> Because JavaScript doesn't catch missing methods at compile time,
          a hallucinated API like <code>toBeValidDate()</code> only fails at runtime — making execution
          and human code review strictly required to catch AI hallucinations.
        </div>
      )}
    </div>
  )
}
