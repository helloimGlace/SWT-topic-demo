import { useState } from 'react'
import { codeStyle } from './codeStyle'

export function Slide6({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const options = [
    {
      id: 'vague',
      label: 'Option A: // write tests',
      result: 'Too vague. Copilot generates generic, often useless test stubs.',
    },
    {
      id: 'descriptive',
      label: 'Option B: // Test: should return false if input is an invalid leap year like 2026-02-29',
      result: 'Descriptive & Explicit. Copilot generates accurate, targeted test cases.',
    },
  ]

  const handleSubmit = () => {
    setShowResult(true)
    if (onComplete && selected === 'descriptive') onComplete()
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 7 of 12</div>
      <h2>Interactive Coding — Prompting Copilot</h2>
      <p className="slide-subtitle">
        How should we ask Copilot to generate our JavaScript tests?<br />
        Complete the prompt comment to get the best result.
      </p>
      <div style={codeStyle}>
{`import { render, screen, fireEvent } from '@testing-library/react'
import DateChecker from './DateChecker'

${
  selected === 'vague' && showResult
    ? '// write tests\ntest("renders", () => {\n  render(<DateChecker />)\n  expect(screen.getByText("Date Validator")).toBeInTheDocument()\n})'
    : selected === 'descriptive' && showResult
    ? '// Test: should return false if input is an invalid leap year like 2026-02-29\ntest("returns false for 2026-02-29", () => {\n  render(<DateChecker />)\n  const input = screen.getByPlaceholderText("YYYY-MM-DD")\n  fireEvent.change(input, { target: { value: "2026-02-29" } })\n  expect(screen.getByText("Invalid Date")).toBeInTheDocument()\n})'
    : '// Your prompt here...'}
`}
      </div>
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
      {!showResult ? (
        <button className="btn primary-btn" onClick={handleSubmit} disabled={!selected}>
          See the Result
        </button>
      ) : (
        <div className="alert" role="alert">
          <strong>{selected === 'descriptive' ? 'Great choice!' : 'Not quite!'}</strong>{' '}
          {options.find((o) => o.id === selected).result}
        </div>
      )}
    </div>
  )
}
