import { useState } from 'react'

const isValidDate = (str) => {
  if (!str) return false
  const date = new Date(str)
  return !isNaN(date.getTime())
}

export default function DateChecker() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)
    setResult(isValidDate(value))
  }

  return (
    <div className="date-checker">
      <div className="dc-header">
        <span className="dc-icon">&gt;</span>
        <span>Date Validator</span>
      </div>
      <div className="dc-body">
        <input
          type="text"
          className="form-control"
          placeholder="YYYY-MM-DD"
          value={input}
          onChange={handleChange}
        />
        <div className="dc-result">
          {result !== null && (
            <span className={`badge dc-badge ${result ? 'valid' : 'invalid'}`}>
              {result ? 'Valid Date' : 'Invalid Date'}
            </span>
          )}
          {result === null && <span className="dc-hint">Start typing above...</span>}
        </div>
      </div>
    </div>
  )
}
