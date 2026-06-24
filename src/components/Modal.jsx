export default function Modal({ icon, title, body, onClose, id }) {
  return (
    <div className="modal-backdrop" onClick={onClose} id={id || 'modal-backdrop'}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {icon && <div className="modal-icon">{icon}</div>}
        <div className="modal-title">{title}</div>
        <div className="modal-body">{body}</div>
        <button className="btn btn-primary" onClick={onClose} id="modal-close-btn">
          Got it
        </button>
      </div>
    </div>
  );
}
