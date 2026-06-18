import { useState } from 'react'

export function Slide10() {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const options = [
    { id: 'a', label: 'A blank workspace with no open files' },
    { id: 'b', label: 'The component file open in an adjacent tab + a descriptive test comment', correct: true },
    { id: 'c', label: 'A long conversation history in Copilot Chat' },
    { id: 'd', label: 'Installing the Jest extension' },
  ]

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 11 of 12</div>
      <h2>Final Quiz — Check Your Understanding</h2>
      <p className="slide-subtitle">
        What gives GitHub Copilot the best context to write an accurate unit test for your React JavaScript component?
      </p>
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`option-btn ${selected === opt.id ? 'selected' : ''} ${submitted ? (opt.correct ? 'correct' : selected === opt.id ? 'wrong' : '') : ''}`}
            onClick={() => !submitted && setSelected(opt.id)}
            disabled={submitted}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {!submitted ? (
        <button className="primary-btn" onClick={handleSubmit} disabled={!selected}>
          Submit Answer
        </button>
      ) : (
        <div className="result-feedback">
          <strong>Correct!</strong> Copilot's suggestions are heavily influenced by the code in your active editor tabs
          and the surrounding comments. A descriptive test comment paired with the open component file gives it the
          best signal.
        </div>
      )}
    </div>
  )
}
