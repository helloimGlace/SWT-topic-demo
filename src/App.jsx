import { useState } from 'react'
import { Slide1 } from './components/Slide1'
import { Slide2 } from './components/Slide2'
import { Slide3 } from './components/Slide3'
import { Slide4 } from './components/Slide4'
import { Slide5 } from './components/Slide5'
import { Slide6 } from './components/Slide6'
import { Slide7 } from './components/Slide7'
import { Slide8 } from './components/Slide8'
import { Slide9 } from './components/Slide9'
import { Slide10 } from './components/Slide10'
import './App.css'

const TOTAL_SLIDES = 10

export default function App() {
  const [slide, setSlide] = useState(1)
  const [completed, setCompleted] = useState(new Set())

  const next = () => {
    if (slide < TOTAL_SLIDES) setSlide((s) => s + 1)
  }
  const prev = () => {
    if (slide > 1) setSlide((s) => s - 1)
  }
  const markComplete = () => {
    setCompleted((prev) => new Set(prev).add(slide))
  }

  const goTo = (n) => {
    if (n >= 1 && n <= TOTAL_SLIDES) setSlide(n)
  }

  const progress = ((slide - 1) / (TOTAL_SLIDES - 1)) * 100

  const renderSlide = () => {
    switch (slide) {
      case 1: return <Slide1 onComplete={markComplete} />
      case 2: return <Slide2 />
      case 3: return <Slide3 />
      case 4: return <Slide4 />
      case 5: return <Slide5 />
      case 6: return <Slide6 onComplete={markComplete} />
      case 7: return <Slide7 />
      case 8: return <Slide8 />
      case 9: return <Slide9 />
      case 10: return <Slide10 />
      default: return null
    }
  }

  return (
    <div className="presentation">
      <header className="pres-header">
        <div className="pres-title">
          <span className="pres-logo">AI-Assisted Testing with GitHub Copilot</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="pres-slide">
        {renderSlide()}
      </main>

      <footer className="pres-footer">
        <button className="nav-btn" onClick={prev} disabled={slide === 1}>
          ← Previous
        </button>
        <div className="slide-dots">
          {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
            <button
              key={i}
              className={`dot ${i + 1 === slide ? 'active' : ''} ${completed.has(i + 1) ? 'completed' : ''}`}
              onClick={() => goTo(i + 1)}
            />
          ))}
        </div>
        <button className="nav-btn primary" onClick={next} disabled={slide === TOTAL_SLIDES}>
          Next →
        </button>
      </footer>
    </div>
  )
}
