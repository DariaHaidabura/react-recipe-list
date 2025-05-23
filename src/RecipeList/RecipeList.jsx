import React, { useState, useEffect } from "react";
import "./RecipeList.css";

const InitialList = () => {
  const saved = localStorage.getItem("recipeList");
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          title: "Breakfast Burrito",
          ingredients: "Eggs, Tortilla, Cheese, Salsa",
          image: "/img/breakfast-buritto.jpg",
          cookTime: "10 min",
          servings: 1,
          totalWeight: "300g",
          detailedIngredients: [
            "2 Eggs",
            "1 Tortilla",
            "50g Cheese",
            "2 tbsp Salsa",
          ],
          steps: [
            "Scramble the eggs.",
            "Warm the tortilla.",
            "Add eggs, cheese, salsa.",
            "Wrap and serve.",
          ],
        },
        {
          id: 2,
          title: "Avocado Salad",
          ingredients: "Avocado, Tomato, Onion, Olive Oil",
          image: "/img/avocado-salad.jpg",
          cookTime: "5 min",
          servings: 2,
          totalWeight: "400g",
          detailedIngredients: [
            "1 Avocado",
            "1 Tomato",
            "1/4 Onion",
            "1 tbsp Olive Oil",
          ],
          steps: [
            "Dice the avocado and tomato.",
            "Chop the onion.",
            "Combine all in a bowl.",
            "Drizzle with olive oil and mix.",
          ],
        },
        {
          id: 3,
          title: "Pasta Carbonara",
          ingredients: "Pasta, Eggs, Bacon, Parmesan",
          image: "/img/pasta-carbonara.jpg",
          cookTime: "20 min",
          servings: 2,
          totalWeight: "600g",
          detailedIngredients: [
            "100g Pasta",
            "2 Eggs",
            "50g Bacon",
            "30g Parmesan",
          ],
          steps: [
            "Cook the pasta.",
            "Fry the bacon.",
            "Beat the eggs and mix with cheese.",
            "Combine all together while warm.",
          ],
        },
        {
          id: 4,
          title: "Chocolate Muffins",
          ingredients: "Flour, Cocoa, Eggs, Sugar",
          image: "/img/chocolate-maffins.jpg",
          cookTime: "25 min",
          servings: 4,
          totalWeight: "400g",
          detailedIngredients: [
            "1 cup Flour",
            "1/2 cup Cocoa",
            "2 Eggs",
            "1/2 cup Sugar",
          ],
          steps: [
            "Mix dry ingredients.",
            "Add eggs and mix well.",
            "Pour into muffin tins.",
            "Bake at 180°C for 20 minutes.",
          ],
        },
      ];
};

export default function RecipeList() {
  const colors = ["#e1f79d", "#ffd6d6", "#c1f0f6", "#ffe0b2"];
  const [recipes, setRecipes] = useState(InitialList);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("recipeList", JSON.stringify(recipes));
    localStorage.removeItem("recipeList");
  }, [recipes, isRecipeOpen, selectedRecipe]);

  const handleIsRecipeOpen = (id) => {
    const thisRecipe = recipes.find((recipe) => recipe.id === id);
    if (thisRecipe) {
      setSelectedRecipe(thisRecipe);
      setIsRecipeOpen(true);
    }
  };

  const restartRecipes = () => {
    if (isRecipeOpen) {
      setIsRecipeOpen(false);
    }
  };

  const filteredRecipes =
    searchQuery.trim() === ""
      ? recipes
      : recipes.filter((recipe) => {
          const combined =
            `${recipe.title} ${recipe.ingredients}`.toLowerCase();
          return combined.includes(searchQuery.toLowerCase());
        });

  return (
    <div className="recipe-container">
      <div className={`recipe-list ${isRecipeOpen ? "hidden" : "visible"}`}>
        <h3>Recipe List</h3>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        ></input>
        {filteredRecipes.map((recipe, index) => {
          const bgColor = colors[index % colors.length];
          return (
            <div
              key={recipe.id}
              className="recipe-card"
              style={{ backgroundColor: bgColor }}
            >
              <h2 className="recipe-title" style={{ backgroundColor: bgColor }}>
                {recipe.title}
              </h2>
              <p className="recipe-label" style={{ backgroundColor: bgColor }}>
                Ingredients:
              </p>
              <p
                className="recipe-ingredients"
                style={{ backgroundColor: bgColor }}
              >
                {recipe.ingredients}
              </p>
              <button
                onClick={() => handleIsRecipeOpen(recipe.id)}
                className="view-button"
              >
                View Recipe
              </button>
            </div>
          );
        })}
      </div>

      <div className={`recipe-detail ${isRecipeOpen ? "visible" : "hidden"}`}>
        {selectedRecipe && (
          <>
            <img
              className="recipe-image"
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
            />

            <h2 className="recipe-title">{selectedRecipe.title}</h2>

            <div className="recipe-meta">
              <span>⏱ {selectedRecipe.cookTime}</span>
              <span>🍽 {selectedRecipe.servings} servings</span>
              <span>⚖ {selectedRecipe.totalWeight}</span>
            </div>

            <div className="recipe-section">
              <p className="section-label">Ingredients:</p>
              {selectedRecipe.detailedIngredients?.length > 0 ? (
                <ul className="section-list">
                  {selectedRecipe.detailedIngredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients found</p>
              )}
            </div>

            <div className="recipe-section">
              <p className="section-label">Steps:</p>
              {selectedRecipe.steps?.length > 0 ? (
                <ol className="section-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>No steps found</p>
              )}

              <button onClick={restartRecipes} className="back-button">
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
