import { useState, useEffect } from 'react'
import { StartSlide } from './components/StartSlide'
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
import { EndSlide } from './components/EndSlide'
import './App.css'

const TOTAL_SLIDES = 12

export default function App() {
  const [slide, setSlide] = useState(1)
  const [completed, setCompleted] = useState(new Set())
  const [light, setLight] = useState(true)

  useEffect(() => {
    document.body.style.background = light ? '#eceff4' : '#2e3440'
  }, [light])

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
      case 1: return <StartSlide />
      case 2: return <Slide1 onComplete={markComplete} />
      case 3: return <Slide2 />
      case 4: return <Slide3 />
      case 5: return <Slide4 />
      case 6: return <Slide5 />
      case 7: return <Slide6 onComplete={markComplete} />
      case 8: return <Slide7 />
      case 9: return <Slide8 />
      case 10: return <Slide9 />
      case 11: return <Slide10 />
      case 12: return <EndSlide />
      default: return null
    }
  }

  return (
    <div className={`presentation${light ? ' light' : ''}`}>
      <header className="pres-header">
        <div className="pres-header-row">
          <span className="pres-logo">AI-Assisted Testing with GitHub Copilot</span>
          <button className="theme-btn" onClick={() => setLight((v) => !v)} title="Toggle theme">
            {light ? 'Dark' : 'Light'}
          </button>
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
