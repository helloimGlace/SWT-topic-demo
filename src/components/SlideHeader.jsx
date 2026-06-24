export default function SlideHeader({ badge, badgeColor = 'badge-indigo', title, subtitle }) {
  return (
    <div className="text-center" style={{ marginBottom: '24px' }}>
      {badge && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <span className={`module-badge ${badgeColor}`}>{badge}</span>
        </div>
      )}
      <h1 className="slide-title">{title}</h1>
      {subtitle && <p className="slide-subtitle">{subtitle}</p>}
    </div>
  );
}
