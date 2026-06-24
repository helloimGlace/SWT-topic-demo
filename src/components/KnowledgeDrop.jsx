export default function KnowledgeDrop({ title = 'Knowledge Drop', children, color = 'var(--clr-indigo)' }) {
  return (
    <div className="knowledge-card" style={{ borderLeftColor: color }}>
      <h4 style={{ color }}>{title}</h4>
      {children}
    </div>
  );
}
