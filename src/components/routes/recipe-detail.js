import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null); // Initialized to null for an object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipe/get/?id=${recipeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [recipeId]); // Correct dependency on recipeId for re-fetching when it changes

  if (isLoading)
    return (
      <div className="text-center">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );

  if (!recipe) return <div>No recipe data available.</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/photos/${recipe.photoFilename}`}
            alt={recipe.name}
            className="img-fluid rounded w-100"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{recipe.name}</h1>
          <p className="lead">{recipe.desc}</p>
          <h2>Ingredients</h2>
          <ul className="list-group">
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">
                  {ingredient}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
