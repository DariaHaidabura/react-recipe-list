import React, { useState, useEffect } from "react";
import "./DeleteRecipeModal.css";
export default function DeleteRecipeModal({ onConfirm, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const closeWithAnimation = (callback) => {
    setIsClosing(true);
    setTimeout(() => {
      callback()
      setIsClosing(false)
    }, 300)
  }

  const handleDelete = () => {
    closeWithAnimation(onConfirm)
  }

  const handleCancel = () => {
    closeWithAnimation(onClose)
  }
  return (
    <div className={`delete-modal-backdrop ${isClosing ? "closing" : ""}`}>
      <div className="delete-modal">
        <h2 className="modal-title">
          Do you really want to delete this recipe?
        </h2>
        <div className="modal-buttons">
          <button
            onClick={handleDelete}
            className="confirm-button"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
