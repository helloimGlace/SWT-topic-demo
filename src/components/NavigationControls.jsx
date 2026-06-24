export default function NavigationControls({ onBack, onNext, canGoBack, canGoNext, nextLabel = 'Continue' }) {
  return (
    <div className="nav-controls">
      <button
        className="btn btn-secondary"
        onClick={onBack}
        disabled={!canGoBack}
        id="nav-back-btn"
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!canGoNext}
        id="nav-next-btn"
      >
        {nextLabel} →
      </button>
    </div>
  );
}
