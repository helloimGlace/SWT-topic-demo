import { useState } from 'react';
import SlideHeader from '../components/SlideHeader';
import KnowledgeDrop from '../components/KnowledgeDrop';
import NavigationControls from '../components/NavigationControls';

const CORRECT_ORDER = ['cursor', 'tabs', 'meta', 'tree'];

const ALL_ITEMS = {
  cursor: {
    id: 'cursor',
    label: 'Cursor Proximity',
    desc: 'Code directly above and below your active cursor line.',
  },
  tabs: {
    id: 'tabs',
    label: 'Neighboring Tabs',
    desc: 'The contents of your open DateChecker.jsx file.',
  },
  meta: {
    id: 'meta',
    label: 'Project Metadata',
    desc: 'Local package.json configurations and testing frameworks.',
  },
  tree: {
    id: 'tree',
    label: 'Repository File Tree',
    desc: 'Closed source files inside unrelated folders.',
  },
};

const PRIORITY_LABELS = [
  'Highest Priority',
  'High Priority',
  'Medium Priority',
  'Lowest Priority',
];

export default function Slide2({ onComplete, isComplete, onNext, onBack, canGoBack }) {
  const [pool, setPool] = useState(['tabs', 'tree', 'cursor', 'meta']);
  const [dropZone, setDropZone] = useState([null, null, null, null]);
  const [wrongIds, setWrongIds] = useState(new Set());
  const [checked, setChecked] = useState(false);
  const [submitShake, setSubmitShake] = useState(false);

  // Drag and drop states
  const [draggingId, setDraggingId] = useState(null);
  const [dragSource, setDragSource] = useState(null); // 'pool' or 'slot-X'
  const [dragOverTarget, setDragOverTarget] = useState(null); // 'pool' or 'slot-X'

  const handleDragStart = (e, itemId, source) => {
    setDraggingId(itemId);
    setDragSource(source);
    e.dataTransfer.setData('itemId', itemId);
    e.dataTransfer.setData('source', source);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragSource(null);
    setDragOverTarget(null);
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    setDragOverTarget(targetId);
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId') || draggingId;
    const source = e.dataTransfer.getData('source') || dragSource;

    if (!itemId) return;

    // Reset feedback
    setChecked(false);
    setWrongIds(new Set());

    // Case 1: Drop into a slot
    if (targetId.startsWith('slot-')) {
      const slotIndex = parseInt(targetId.split('-')[1]);
      const nextZone = [...dropZone];
      const nextPool = [...pool];

      if (source === 'pool') {
        // Remove from pool
        const idx = nextPool.indexOf(itemId);
        if (idx > -1) nextPool.splice(idx, 1);

        // If target slot is occupied, put existing back to pool
        const existing = nextZone[slotIndex];
        if (existing) {
          nextPool.push(existing);
        }
        nextZone[slotIndex] = itemId;
      } else if (source.startsWith('slot-')) {
        const srcSlotIndex = parseInt(source.split('-')[1]);
        const existing = nextZone[slotIndex];

        // Swap the slots
        nextZone[slotIndex] = itemId;
        nextZone[srcSlotIndex] = existing;
      }

      setDropZone(nextZone);
      setPool(nextPool);
    }

    // Case 2: Drop into pool
    if (targetId === 'pool') {
      const nextZone = [...dropZone];
      const nextPool = [...pool];

      if (source.startsWith('slot-')) {
        const srcSlotIndex = parseInt(source.split('-')[1]);
        nextZone[srcSlotIndex] = null;
        if (!nextPool.includes(itemId)) {
          nextPool.push(itemId);
        }
      }

      setDropZone(nextZone);
      setPool(nextPool);
    }

    // Reset drag states
    setDraggingId(null);
    setDragSource(null);
    setDragOverTarget(null);
  };

  const handleCheck = () => {
    if (dropZone.some(id => id === null)) {
      setSubmitShake(true);
      setTimeout(() => setSubmitShake(false), 500);
      return;
    }

    setChecked(true);
    const wrong = new Set();
    dropZone.forEach((id, i) => {
      if (id !== CORRECT_ORDER[i]) wrong.add(id);
    });

    if (wrong.size === 0) {
      onComplete();
    } else {
      setWrongIds(wrong);
      setTimeout(() => {
        // Reset wrong items to pool
        const wrongItems = dropZone.filter(id => wrong.has(id));
        setPool(prev => [...prev, ...wrongItems]);
        setDropZone(prev => prev.map(id => (wrong.has(id) ? null : id)));
        setWrongIds(new Set());
        setChecked(false);
      }, 900);
    }
  };

  const poolItems = pool.map(id => ALL_ITEMS[id]);

  return (
    <div className="slide-container">
      <SlideHeader
        badge="Module 2 · Slide 2"
        badgeColor="badge-orange"
        title="The LLM Context Window"
        subtitle="Copilot builds its suggestions from a strict priority hierarchy of context sources."
      />

      <KnowledgeDrop title="Knowledge Drop" color="var(--clr-orange)">
        <p>
          GitHub Copilot operates via <strong>In-Context Learning</strong>. When you open
          a test file, Copilot reads your IDE's current state to assemble a prompt behind
          the scenes. It constructs this context using a strict hierarchy: your immediate{' '}
          <strong>cursor proximity</strong>, then your <strong>open editor tabs</strong>,
          followed by <strong>project configuration manifests</strong> like package.json,
          and finally the broader repository file tree.
        </p>
      </KnowledgeDrop>

      <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: '20px', textAlign: 'center' }}>
        Drag and sort the context blocks into the correct priority sequence Copilot uses.
      </p>

      <div className="drag-layout">
        {/* Drop Zone */}
        <div className="drop-zone">
          <div className="drop-zone-title">
            Priority Order (drop here)
          </div>
          {dropZone.map((itemId, i) => {
            const isOver = dragOverTarget === `slot-${i}`;
            return (
              <div className="drop-row" key={i}>
                <div className="priority-indicator">
                  {PRIORITY_LABELS[i]}
                </div>
                <div
                  className={`drop-label ${itemId ? 'has-item' : ''} ${isOver ? 'is-over' : ''}`}
                  id={`drop-slot-${i}`}
                  onDragOver={(e) => handleDragOver(e, `slot-${i}`)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, `slot-${i}`)}
                >
                  {itemId ? (
                    <div
                      className={`drag-item ${draggingId === itemId ? 'dragging' : ''} ${wrongIds.has(itemId) ? 'wrong' : ''} ${checked && !wrongIds.has(itemId) ? 'correct' : ''}`}
                      draggable={!isComplete}
                      onDragStart={(e) => handleDragStart(e, itemId, `slot-${i}`)}
                      onDragEnd={handleDragEnd}
                      style={{ width: '100%', marginBottom: 0, cursor: isComplete ? 'default' : 'grab' }}
                    >
                      <div className="drag-item-label">{ALL_ITEMS[itemId].label}</div>
                      <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'inherit', opacity: .8 }}>
                        {ALL_ITEMS[itemId].desc}
                      </div>
                    </div>
                  ) : (
                    <span>Drop here</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pool */}
        <div
          className={`drag-pool ${dragOverTarget === 'pool' ? 'is-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'pool')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'pool')}
        >
          <div className="drop-zone-title">Context Blocks</div>
          <div style={{ minHeight: '260px' }}>
            {poolItems.length === 0 && (
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '.82rem', fontWeight: 600, textAlign: 'center', padding: '20px' }}>
                All blocks placed — check your order!
              </p>
            )}
            {poolItems.map((item) => (
              <div
                key={item.id}
                id={`pool-item-${item.id}`}
                className={`drag-item ${draggingId === item.id ? 'dragging' : ''}`}
                draggable={!isComplete}
                onDragStart={(e) => handleDragStart(e, item.id, 'pool')}
                onDragEnd={handleDragEnd}
                style={{ cursor: isComplete ? 'default' : 'grab' }}
              >
                <div className="drag-item-label">{item.label}</div>
                <div style={{ fontSize: '.75rem', fontWeight: 600, opacity: .8 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isComplete && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button
            id="check-order-btn"
            className={`btn btn-orange ${submitShake ? 'shake' : ''}`}
            onClick={handleCheck}
            disabled={dropZone.some(id => id === null)}
          >
            Check Order
          </button>
        </div>
      )}

      {isComplete && (
        <div className="question-card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, #dcfce7, #d1fae5)', borderColor: 'var(--clr-green)', color: '#15803d' }}>
          Correct! Cursor proximity is always Copilot's highest-fidelity signal.
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
