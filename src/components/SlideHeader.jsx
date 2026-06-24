export default function SlideHeader({ badge, badgeColor = 'badge-indigo', title, subtitle }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      {badge && (
        <div style={{ display: 'flex', marginBottom: '8px' }}>
          <span className={`module-badge ${badgeColor}`}>{badge}</span>
        </div>
      )}
      <h1 className="slide-title">{title}</h1>
      {subtitle && <p className="slide-subtitle">{subtitle}</p>}
    </div>
  );
}
