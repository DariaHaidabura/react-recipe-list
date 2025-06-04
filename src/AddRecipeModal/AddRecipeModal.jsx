import React, { useState, useEffect } from "react";
import "./AddRecipeModal.css";

export default function AddRecipeModal({
  isOpen,
  recipe,
  allRecipes,
  addRecipe,
  onSave,
  onClose,
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

  const newId = allRecipes.length + 1;

  return (
    <div className={`modal-backdrop ${isClosing ? "closing" : ""}`}>
      <div className="modal">
        <label className="recipe-label">Recipe Title:</label>
        <input
          className="recipe-input"
          type="text"
          value={recipe.title}
          onChange={(e) =>
            addRecipe({ ...recipe, id: newId, title: e.target.value })
          }
        />
        <label className="recipe-label">Image URL:</label>
        <input
          className="recipe-input"
          type="text"
          value={recipe.image}
          onChange={(e) => addRecipe({ ...recipe, image: e.target.value })}
        />

        <div className="recipe-meta">
          <label className="meta-recipe-label">Cooking Time: </label>
          <input
            className="meta-recipe-input"
            type="text"
            value={recipe.cookTime}
            onChange={(e) => addRecipe({ ...recipe, cookTime: e.target.value })}
          />
          <label className="meta-recipe-label">Servings: </label>
          <input
            className="meta-recipe-input"
            type="text"
            value={recipe.servings}
            onChange={(e) => {
              const value = e.target.value;
              if (value.match(/^\d{0,2}$/)) {
                addRecipe({ ...recipe, servings: value });
              }
            }}
            maxLength="2"
          />
          <label className="meta-recipe-label">Portion Size:</label>
          <input
            className="meta-recipe-input"
            type="text"
            value={recipe.totalWeight}
            onChange={(e) =>
              addRecipe({ ...recipe, totalWeight: e.target.value })
            }
          />
        </div>

        <div className="section">
          <label className="section-label">Ingredients:</label>
          <input
            className="section-input"
            type="text"
            value={recipe.ingredients}
            onChange={(e) =>
              addRecipe({
                ...recipe,
                ingredients: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addRecipe({
                  ...recipe,
                  ingredients: e.target.value.trim() + ", ",
                });
              }
            }}
          />
          <label className="section-label">Detailed Ingredients:</label>
          <textarea
            className="section-input"
            rows={5}
            value={recipe.detailedIngredients.join("\n")}
            onChange={(e) => {
              const newIngredients = e.target.value
                .split("\n")
                .map((item) => item.trim());
              addRecipe({
                ...recipe,
                detailedIngredients: newIngredients,
              });
            }}
          />
        </div>

        <div className="section">
          <label className="section-label">Preparation Steps:</label>
          <textarea
            className="section-input"
            rows={5}
            value={recipe.steps.join("\n")}
            onChange={(e) => {
              const newSteps = e.target.value
                .split("\n")
                .map((item) => item.trim());
              addRecipe({
                ...recipe,
                steps: newSteps,
              });
            }}
          />
        </div>
        <div className="button-group">
          <button onClick={onSave} className="add-recipe-button">
            Add Recipe
          </button>
          <button onClick={handleClose} className="close-recipe-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
