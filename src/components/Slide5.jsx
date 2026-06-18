import { useState } from 'react'
import DateChecker from './DateChecker'

export function Slide5() {
  const [checked, setChecked] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const edgeCases = [
    { id: 'leap', label: '2026-02-29 (Non-leap year — Feb has 28 days)', correct: true },
    { id: 'format', label: '31/12/2025 (Format confusion: DD/MM vs MM/DD)', correct: true },
    { id: 'nullish', label: 'undefined or null values passed into the input', correct: true },
    { id: 'always', label: 'Always valid date (it\'s just a string!)', correct: false },
  ]

  const toggle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const allCorrectSelected = edgeCases
    .filter(ec => ec.correct)
    .every(ec => checked.includes(ec.id))

  const anyWrongSelected = checked.some(id => !edgeCases.find(ec => ec.id === id).correct)

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 6 of 12</div>
      <h2>Deep Dive — The Example Project</h2>
      <p className="slide-subtitle">
        We have a React component (<code>DateChecker.jsx</code>) with an input that validates date-time strings.
        <br />Check the edge cases you think the code should handle:
      </p>
      <DateChecker />
      <div className="checkbox-group">
        {edgeCases.map((ec) => (
          <label key={ec.id} className={`checkbox-label ${checked.includes(ec.id) ? 'checked' : ''}`}>
            <input
              type="checkbox"
              checked={checked.includes(ec.id)}
              onChange={() => toggle(ec.id)}
              disabled={submitted}
            />
            <span>{ec.label}</span>
          </label>
        ))}
      </div>
      {!submitted ? (
        <button className="btn primary-btn" onClick={() => setSubmitted(true)}>
          Submit Answers
        </button>
      ) : (
        <div className={`alert ${anyWrongSelected ? 'wrong-feedback' : !allCorrectSelected ? 'partial-feedback' : 'correct-feedback'}`} role="alert">
          {anyWrongSelected ? (
            <>
              <strong>Oops!</strong> You selected an invalid option. Strings are not automatically valid dates.
            </>
          ) : !allCorrectSelected ? (
            <>
              <strong>Almost there!</strong> You missed some real edge cases. JavaScript is tricky!
            </>
          ) : (
            <>
              <strong>Spot on!</strong> All three are real edge cases! <code>new Date("2026-02-29")</code> silently wraps to March 1st.
              <code>new Date("31/12/2025")</code> returns <code>Invalid Date</code> (ISO format expected).
              And <code>new Date(null)</code> actually returns a valid epoch date!
            </>
          )}
        </div>
      )}
    </div>
  )
}
