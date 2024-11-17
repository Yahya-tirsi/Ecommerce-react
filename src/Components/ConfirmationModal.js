import React from "react";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Remove all</h2>
        <p>This action will remove these items from your shopping cart.</p>
        <div className="modal-actions">
          <button className="modal-remove-btn" onClick={onConfirm}>
            Remove
          </button>
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
