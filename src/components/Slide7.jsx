import { useState } from 'react'
import { codeStyle } from './codeStyle'

export function Slide7() {
  const [accepted, setAccepted] = useState([])
  const [modified, setModified] = useState([])
  const testCases = [
    {
      id: 't1',
      code: `test('returns false for invalid leap year date', () => {
  render(<DateChecker />)
  const input = screen.getByPlaceholderText('YYYY-MM-DD')
  fireEvent.change(input, { target: { value: '2026-02-29' } })
  expect(screen.getByText('Invalid Date')).toBeInTheDocument()
})`,
      good: true,
    },
    {
      id: 't2',
      code: `test('returns false for null input', () => {
  render(<DateChecker />)
  const input = screen.getByPlaceholderText('YYYY-MM-DD')
  fireEvent.change(input, { target: { value: null } })
  expect(screen.getByText('Invalid Date')).toBeInTheDocument()
})`,
      good: false,
    },
    {
      id: 't3',
      code: `test('returns true for valid ISO date', () => {
  render(<DateChecker />)
  const input = screen.getByPlaceholderText('YYYY-MM-DD')
  fireEvent.change(input, { target: { value: '2026-06-15' } })
  expect(screen.getByText('Valid Date')).toBeInTheDocument()
})`,
      good: true,
    },
  ]

  const handleAction = (id, action) => {
    if (action === 'accept') {
      setAccepted((prev) => [...prev, id])
      setModified((prev) => prev.filter((x) => x !== id))
    } else {
      setModified((prev) => [...prev, id])
      setAccepted((prev) => prev.filter((x) => x !== id))
    }
  }

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 8 of 12</div>
      <h2>Live Simulation — Generating the Tests</h2>
      <p className="slide-subtitle">
        Copilot generates test cases for the DateChecker component. Click <strong>Accept</strong> on good cases and <strong>Modify</strong> on imperfect ones.
      </p>
      {testCases.map((tc) => {
        const status = accepted.includes(tc.id) ? 'accepted' : modified.includes(tc.id) ? 'modified' : null
        return (
          <div key={tc.id} className={`test-card ${status || ''}`}>
            <div style={codeStyle}>{tc.code}</div>
            <div className="test-actions">
              <button
                className={`action-btn accept ${status === 'accepted' ? 'active' : ''}`}
                onClick={() => handleAction(tc.id, 'accept')}
              >
                ✓ Accept
              </button>
              <button
                className={`action-btn modify ${status === 'modified' ? 'active' : ''}`}
                onClick={() => handleAction(tc.id, 'modify')}
              >
                ✎ Modify
              </button>
              {status && (
                <span className={`status-tag ${status}`}>
                  {status === 'accepted' ? '✓ Accepted' : '✎ Needs modification'}
                </span>
              )}
            </div>
            {status === 'modified' && (
              <div className="modify-reason">
                <strong>Why modify?</strong> {tc.good ? 'fireEvent with null value type-coerces to "null" string.' : 'fireEvent.change expects a string value, not null.'}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
