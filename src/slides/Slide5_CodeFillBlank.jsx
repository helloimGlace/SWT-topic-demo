import { useState, useEffect, useRef } from 'react';
import SlideHeader from '../components/SlideHeader';
import NavigationControls from '../components/NavigationControls';

const TOKENS = [
  { id: 't1', text: '// Test that it displays Invalid Date when the user types 2026-02-29', correct: true },
  { id: 't2', text: '// fix this logic', correct: false },
  { id: 't3', text: "'2026-02-29'", correct: true },
  { id: 't4', text: "'2024-02-29'", correct: false },
  { id: 't5', text: "'Invalid Date'", correct: true },
  { id: 't6', text: "'Success'", correct: false },
];

// Correct: slot1=t1, slot2=t3, slot3=t5
const CORRECT = { slot1: 't1', slot2: 't3', slot3: 't5' };

const TYPEWRITER_TEXT = `    render(<DateChecker />);
    const input = screen.getByPlaceholderText('YYYY-MM-DD');
    fireEvent.change(input, { target: { value: '2026-02-29' } });
    expect(screen.getByText('Invalid Date')).toBeInTheDocument();`;

export default function Slide5({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const [slots, setSlots] = useState({ slot1: null, slot2: null, slot3: null });
  const [usedTokens, setUsedTokens] = useState(new Set());
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [wrongSlots, setWrongSlots] = useState(new Set());
  const [typeText, setTypeText] = useState('');
  const [typing, setTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const typeRef = useRef(null);

  const getTokenById = (id) => TOKENS.find(t => t.id === id);

  const startTypewriter = () => {
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypeText(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        setTyping(false);
        onComplete();
      }
    }, 22);
    typeRef.current = interval;
  };

  useEffect(() => {
    return () => { if (typeRef.current) clearInterval(typeRef.current); };
  }, []);

  const handleDragStart = (e, tokenId) => {
    setDraggingId(tokenId);
    e.dataTransfer.setData('tokenId', tokenId);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverSlot(null);
  };

  const handleSlotDragOver = (e, slotId) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  const handleSlotDrop = (e, slotId) => {
    e.preventDefault();
    const tokenId = e.dataTransfer.getData('tokenId');
    if (!tokenId) return;

    setSlots(prev => {
      const next = { ...prev };
      // Return old token to pool if slot was occupied
      const oldToken = next[slotId];
      if (oldToken) {
        setUsedTokens(p => { const s = new Set(p); s.delete(oldToken); return s; });
      }
      next[slotId] = tokenId;
      return next;
    });
    setUsedTokens(prev => new Set([...prev, tokenId]));
    setDragOverSlot(null);
    setWrongSlots(new Set());
    setSubmitted(false);
  };

  const handleSlotClick = (slotId) => {
    // Click to remove token from slot
    const tokenId = slots[slotId];
    if (!tokenId) return;
    setSlots(prev => ({ ...prev, [slotId]: null }));
    setUsedTokens(prev => { const s = new Set(prev); s.delete(tokenId); return s; });
    setWrongSlots(new Set());
    setSubmitted(false);
  };

  const allFilled = Object.values(slots).every(Boolean);

  const handleSubmit = () => {
    setSubmitted(true);
    const wrongs = new Set();
    Object.entries(CORRECT).forEach(([slot, tokenId]) => {
      if (slots[slot] !== tokenId) wrongs.add(slot);
    });

    if (wrongs.size === 0) {
      setTimeout(() => startTypewriter(), 400);
    } else {
      setWrongSlots(wrongs);
      setTimeout(() => {
        wrongs.forEach(slot => {
          const tokenId = slots[slot];
          if (tokenId) {
            setUsedTokens(p => { const s = new Set(p); s.delete(tokenId); return s; });
            setSlots(prev => ({ ...prev, [slot]: null }));
          }
        });
        setWrongSlots(new Set());
        setSubmitted(false);
      }, 900);
    }
  };

  const renderSlot = (slotId, placeholder) => {
    const tokenId = slots[slotId];
    const token = tokenId ? getTokenById(tokenId) : null;
    const isWrong = wrongSlots.has(slotId);
    const isOver = dragOverSlot === slotId;

    return (
      <span
        id={`slot-${slotId}`}
        className={`code-slot ${token ? 'filled' : ''} ${isOver ? 'drag-over' : ''} ${isWrong ? 'shake' : ''}`}
        style={{
          borderColor: isWrong ? 'var(--clr-red)' : undefined,
          background: isWrong ? 'rgba(239,68,68,.15)' : undefined,
          color: isWrong ? '#fca5a5' : undefined,
          maxWidth: slotId === 'slot1' ? '420px' : '160px',
          minWidth: slotId === 'slot1' ? '280px' : '120px',
          fontSize: '.72rem',
        }}
        onDragOver={(e) => handleSlotDragOver(e, slotId)}
        onDrop={(e) => handleSlotDrop(e, slotId)}
        onClick={() => handleSlotClick(slotId)}
        title={token ? 'Click to remove' : ''}
      >
        {token ? token.text : placeholder}
      </span>
    );
  };

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 4 · Slide 5"
        badgeColor="badge-lime"
        title="Constructing the Prompt"
        subtitle="Drag the correct phrase tokens into the code slots to build a targeted test prompt."
      />

      {/* VS Code Window */}
      <div className="vscode-window">
        <div className="vscode-titlebar">
          <span className="vscode-dot red" />
          <span className="vscode-dot yellow" />
          <span className="vscode-dot green" />
          <span style={{ marginLeft: '8px' }}>DateChecker.test.jsx</span>
        </div>
        <div className="vscode-body">
          <div><span style={{ color: '#c084fc' }}>describe</span><span style={{ color: '#e2e8f0' }}>{'(\'DateChecker UI Testing\', () => {'}</span></div>
          <div style={{ paddingLeft: '20px' }}>
            {renderSlot('slot1', '[ Drop comment here ]')}
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <span style={{ color: '#c084fc' }}>test</span>
            <span style={{ color: '#e2e8f0' }}>{"('checks invalid non-leap year entries', () => {"}</span>
          </div>
          {(typeText || isComplete) ? (
            <div style={{ paddingLeft: '40px', whiteSpace: 'pre-wrap', color: '#86efac', fontFamily: 'var(--font-mono)', fontSize: '.8rem', lineHeight: 2 }}>
              {isComplete ? TYPEWRITER_TEXT : typeText}
              {typing && <span className="typewriter-text" />}
            </div>
          ) : (
            <>
              <div style={{ paddingLeft: '40px' }}>
                <span style={{ color: '#67e8f9' }}>render</span>
                <span style={{ color: '#e2e8f0' }}>{'(<DateChecker />);'}</span>
              </div>
              <div style={{ paddingLeft: '40px' }}>
                <span style={{ color: '#c084fc' }}>const</span>
                <span style={{ color: '#e2e8f0' }}>{' input = screen.'}</span>
                <span style={{ color: '#67e8f9' }}>getByPlaceholderText</span>
                <span style={{ color: '#e2e8f0' }}>{"('YYYY-MM-DD');"}</span>
              </div>
              <div style={{ paddingLeft: '40px' }}>
                <span style={{ color: '#67e8f9' }}>fireEvent.change</span>
                <span style={{ color: '#e2e8f0' }}>{'(input, { target: { value: '}</span>
                {renderSlot('slot2', '[ Drop value ]')}
                <span style={{ color: '#e2e8f0' }}>{' } });'}</span>
              </div>
              <div style={{ paddingLeft: '40px' }}>
                <span style={{ color: '#67e8f9' }}>expect</span>
                <span style={{ color: '#e2e8f0' }}>{'(screen.'}</span>
                <span style={{ color: '#67e8f9' }}>getByText</span>
                <span style={{ color: '#e2e8f0' }}>{'('}</span>
                {renderSlot('slot3', '[ Drop text ]')}
                <span style={{ color: '#e2e8f0' }}>{')).toBeInTheDocument();'}</span>
              </div>
            </>
          )}
          <div style={{ paddingLeft: '20px' }}><span style={{ color: '#e2e8f0' }}>{'});'}</span></div>
          <div><span style={{ color: '#e2e8f0' }}>{'});'}</span></div>
        </div>
      </div>

      {/* Token Tray */}
      {!isComplete && (
        <div className="token-tray" id="token-tray">
          <div className="token-tray-label">Phrase Token Tray — drag a token into a slot</div>
          {TOKENS.map(token => (
            <div
              key={token.id}
              id={`token-${token.id}`}
              className={`phrase-token ${usedTokens.has(token.id) ? 'used' : ''}`}
              draggable={!usedTokens.has(token.id)}
              onDragStart={(e) => handleDragStart(e, token.id)}
              onDragEnd={handleDragEnd}
            >
              {token.text}
            </div>
          ))}
        </div>
      )}

      {!isComplete && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button
            id="submit-prompt-btn"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allFilled}
          >
            Validate Prompt
          </button>
        </div>
      )}

      {isComplete && (
        <div className="question-card" style={{ marginTop: '16px', background: 'linear-gradient(135deg, #f7fee7, #ecfccb)', borderColor: 'var(--clr-lime)', color: '#4d7c0f' }}>
          Prompt validated. Descriptive JSDoc intent anchors Copilot to your exact edge case.
        </div>
      )}

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canGoBack={canGoBack}
        canGoNext={isComplete}
      />
    </div>
  );
}
