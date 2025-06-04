import React, { useState, useEffect } from "react";
import "./EditRecipeModal.css";

export default function EditRecipeModal({
  isOpen,
  recipe,
  onClose,
  onFieldChange,
  onSave,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`modal-backdrop ${isClosing ? "closing" : ""}`}>
      <div className="modal">
        <img className="recipe-image" src={recipe?.image} alt={recipe?.title} />

        <label className="recipe-label">Title:</label>
        <input
          className="recipe-input"
          type="text"
          value={recipe?.title}
          onChange={(e) => onFieldChange("title", e.target.value)}
        />

        <div className="recipe-meta">
          <span>⏱ {recipe?.cookTime}</span>
          <span>🍽 {recipe?.servings} servings </span>
          <span>⚖ {recipe?.totalWeight} </span>
        </div>

        <div className="section">
          <label className="section-label">Ingredients:</label>
          <input
            className="section-input"
            type="text"
            value={recipe?.ingredients}
            onChange={(e) => onFieldChange("ingredients", e.target.value)}
          />
        </div>

        <div className="section">
          <label className="section-label">Steps:</label>
          <textarea
            className="section-textarea"
            rows={6}
            value={recipe.steps.join("\n")}
            onChange={(e) => onFieldChange("steps", e.target.value)}
          ></textarea>
        </div>
        <div className="button-group">
          <button className="update-button" onClick={onSave}>
            Update Recipe
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
