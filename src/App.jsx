import { useState } from 'react';
import './index.css';

import Intro from './slides/Intro';
import Slide1 from './slides/Slide1_CodeSimulator';
import Slide2 from './slides/Slide2_DragOrder';
import Slide3 from './slides/Slide3_ConnectDots';
import Slide4 from './slides/Slide4_PromptConcept';
import Slide5 from './slides/Slide5_CodeFillBlank';
import Slide6 from './slides/Slide6_CodeReview';
import Slide7 from './slides/Slide7_ToggleGrid';
import Outro from './slides/Outro';

const SLIDES = [
  { id: 'intro',  label: 'Intro',    component: Intro,  module: null },
  { id: 'slide1', label: 'Module 1', component: Slide1, module: 'Module 1' },
  { id: 'slide2', label: 'Module 2', component: Slide2, module: 'Module 2' },
  { id: 'slide3', label: 'Module 3', component: Slide3, module: 'Module 3' },
  { id: 'slide4', label: 'Module 4', component: Slide4, module: 'Module 4' },
  { id: 'slide5', label: 'Module 4', component: Slide5, module: 'Module 4' },
  { id: 'slide6', label: 'Module 5', component: Slide6, module: 'Module 5' },
  { id: 'slide7', label: 'Module 6', component: Slide7, module: 'Module 6' },
  { id: 'outro',  label: 'Outro',    component: Outro,  module: null },
];

const LESSON_SLIDES = SLIDES.filter(s => s.module !== null);
const TOTAL = LESSON_SLIDES.length;

function ProgressBar({ currentIndex }) {
  const slideIndex = Math.max(0, currentIndex - 1); // offset for intro
  const pct = currentIndex === 0 ? 0
    : currentIndex >= SLIDES.length - 1 ? 100
    : Math.round((slideIndex / TOTAL) * 100);

  return (
    <div className="progress-wrap">
      <span className="progress-logo">AI Testing</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">
        {currentIndex === 0 ? 'Intro'
          : currentIndex >= SLIDES.length - 1 ? 'Complete'
          : `${slideIndex} / ${TOTAL}`}
      </span>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [animKey, setAnimKey] = useState(0);

  const isIntro = current === 0;
  const isOutro = current === SLIDES.length - 1;

  const goTo = (idx) => {
    setAnimKey(k => k + 1);
    setCurrent(idx);
  };

  const goNext = () => { if (current < SLIDES.length - 1) goTo(current + 1); };
  const goBack = () => { if (current > 0) goTo(current - 1); };

  const markComplete = () => {
    setCompleted(prev => new Set([...prev, current]));
  };

  const canAdvance = isIntro || isOutro || completed.has(current);

  const SlideComponent = SLIDES[current].component;

  return (
    <div className="app-shell">
      {!isIntro && !isOutro && <ProgressBar currentIndex={current} />}
      <SlideComponent
        key={animKey}
        onComplete={markComplete}
        isComplete={completed.has(current)}
        onNext={goNext}
        onBack={goBack}
        canGoBack={current > 0 && !isIntro}
        canGoNext={canAdvance}
        isFirst={current === 1}
        isLast={current === SLIDES.length - 2}
      />
    </div>
  );
}
