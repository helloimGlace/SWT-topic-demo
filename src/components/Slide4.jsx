import { useState } from 'react'

export function Slide4() {
  const [activeCard, setActiveCard] = useState(null)
  const cards = [
    {
      id: 'react',
      title: 'ReactJS (JavaScript)',
      role: 'Our application foundation using standard .jsx files. No TypeScript — pure JavaScript flexibility.',
    },
    {
      id: 'copilot',
      title: 'GitHub Copilot',
      role: 'The AI pair programmer embedded in VS Code. Suggests inline code as you type, including test assertions and mock data.',
    },
    {
      id: 'chat',
      title: 'GitHub Copilot Chat',
      role: 'The conversational partner used for explaining test failures and generating complex object mocks through natural language prompts.',
    },
    {
      id: 'test',
      title: 'Jest / Vitest + RTL',
      role: 'The execution engine that actually runs the tests. React Testing Library provides utilities to render components and simulate user events.',
    },
  ]

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 4 of 10</div>
      <h2>The Toolkit</h2>
      <p className="slide-subtitle">Click a card to see its role in the AI-testing ecosystem.</p>
      <div className="cards-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`tool-card ${activeCard === card.id ? 'active' : ''}`}
            onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
          >
            <h3>{card.title}</h3>
            {activeCard === card.id && <p className="card-detail">{card.role}</p>}
          </button>
        ))}
      </div>
    </div>
  )
}
