import { useState } from 'react'

export function Slide9() {
  const [flipped, setFlipped] = useState([])
  const cards = [
    {
      id: 'speed',
      title: 'Speed',
      detail: 'AI handles the boilerplate setup (mocks, imports, scaffolding). You focus on core logic and test intent.',
    },
    {
      id: 'coverage',
      title: 'Coverage',
      detail: 'Copilot easily suggests edge cases (like null, undefined, or wrong types) that you might forget to test in JavaScript.',
    },
    {
      id: 'quality',
      title: 'Quality',
      detail: 'Better prompts and descriptive JSDoc comments = Better test suites. The quality of your input directly shapes Copilot\'s output.',
    },
  ]

  const toggleFlip = (id) => {
    setFlipped((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 10 of 12</div>
      <h2>Summary & Key Takeaways</h2>
      <p className="slide-subtitle">Click each card to flip and reveal the takeaway.</p>
      <div className="flip-cards">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`flip-card ${flipped.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => toggleFlip(card.id)}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <span>{card.title}</span>
              </div>
              <div className="flip-back">
                <p>{card.detail}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
