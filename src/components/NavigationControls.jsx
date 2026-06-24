export default function NavigationControls({ onBack, onNext, onSkip, canGoBack, canGoNext, nextLabel = 'Continue' }) {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onSkip && (
          <button
            className="btn btn-ghost"
            onClick={onSkip}
            id="nav-skip-btn"
            style={{
              fontSize: '.85rem',
              fontWeight: 800,
              textDecoration: 'underline',
              color: 'var(--clr-text-muted)',
              padding: '8px 16px'
            }}
          >
            Skip Challenge
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canGoNext}
          id="nav-next-btn"
        >
          {nextLabel} →
        </button>
      </div>
    </div>
  );
}
