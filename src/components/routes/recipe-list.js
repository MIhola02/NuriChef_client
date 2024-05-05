// RecipeList.js
import React, { useContext } from "react";
import RecipeTile from "../recipe-tile";
import { RecipeListContext } from "../contexts/RecipeListContext";

function RecipeList() {
  const { state, recipeList } = useContext(RecipeListContext);

  if (state === "loading") return <div>Loading...</div>;
  if (state === "error") return <div>Error: Unable to fetch recipes</div>;

  return (
    <div className="container mt-4">
      <h2>Discover Recipes</h2>
      <div className="row">
        {recipeList.general.length > 0 ? (
          recipeList.general.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-3">
              <RecipeTile
                id={recipe.id}
                title={recipe.name}
                imageUrl={`http://localhost:8000/api/photos/${recipe.photoFilename}`}
                description={recipe.desc}
              />
            </div>
          ))
        ) : (
          <h2>No recipes yet 😓</h2>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
