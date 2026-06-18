import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'

export function Slide3() {
  const [activeKey, setActiveKey] = useState(null)
  const steps = [
    {
      id: '1',
      title: 'Context Gathering',
      detail: 'Copilot reads your open .jsx tabs, your cursor position, and your package.json to understand your project setup and testing framework.',
    },
    {
      id: '2',
      title: 'Prompting / Intent',
      detail: 'You write a JSDoc comment or start typing a test block (e.g., describe("..."), test("...")). Your words become the prompt.',
    },
    {
      id: '3',
      title: 'LLM Inference',
      detail: 'Copilot predicts the most logical assertions, mock data, and edge cases based on patterns it learned from millions of public repositories.',
    },
    {
      id: '4',
      title: 'Human Verification & Execution',
      detail: 'You review, accept or modify the suggestion, then run your test runner. The loop repeats until the tests pass.',
    },
  ]

  return (
    <div className="slide-content">
      <div className="slide-label">Slide 4 of 12</div>
      <h2>How the Flow Works</h2>
      <p className="slide-subtitle">Click each step to see what happens under the hood.</p>
      <Accordion
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
        className="custom-accordion"
        flush
      >
        {steps.map((step) => (
          <Accordion.Item eventKey={step.id} key={step.id}>
            <Accordion.Header>
              <span className="step-number">{step.id}</span>
              <span className="step-title">{step.title}</span>
            </Accordion.Header>
            <Accordion.Body className="step-body">
              <strong>Step {step.id}:</strong> {step.detail}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
