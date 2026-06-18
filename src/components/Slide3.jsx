import { useState } from 'react'

export function Slide3() {
  const [activeStep, setActiveStep] = useState(null)
  const steps = [
    {
      id: 1,
      title: 'Context Gathering',
      detail: 'Copilot reads your open .jsx tabs, your cursor position, and your package.json to understand your project setup and testing framework.',
    },
    {
      id: 2,
      title: 'Prompting / Intent',
      detail: 'You write a JSDoc comment or start typing a test block (e.g., describe("..."), test("...")). Your words become the prompt.',
    },
    {
      id: 3,
      title: 'LLM Inference',
      detail: 'Copilot predicts the most logical assertions, mock data, and edge cases based on patterns it learned from millions of public repositories.',
    },
    {
      id: 4,
      title: 'Human Verification & Execution',
      detail: 'You review, accept or modify the suggestion, then run your test runner. The loop repeats until the tests pass.',
    },
  ]

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 4 of 12</div>
      <h2>How the Flow Works</h2>
      <p className="slide-subtitle">Click each step to see what happens under the hood.</p>
      <div className="process-map">
        <div className="process-steps">
          {steps.map((step, idx) => (
            <div key={step.id} className="process-step-wrapper">
              <button
                className={`process-step-btn ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <span className="step-number">{step.id}</span>
                <span className="step-title">{step.title}</span>
                <span className="step-arrow">{activeStep === step.id ? '▲' : '▼'}</span>
              </button>
              {idx < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
        {activeStep && (
          <div className="step-detail">
            <strong>Step {activeStep}:</strong> {steps.find((s) => s.id === activeStep).detail}
          </div>
        )}
      </div>
    </div>
  )
}
