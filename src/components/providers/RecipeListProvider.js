import { useContext, useEffect, useState } from "react";
import { RecipeListContext } from "../contexts/RecipeListContext";
import { UserListContext } from "../contexts/UserListContext";
import { useCallback } from "react";

function RecipeListProvider({ children }) {
  const { selectedUser } = useContext(UserListContext);
  const [recipeLoadObject, setRecipeLoadObject] = useState({
    state: "ready",
    error: null,
    data: { general: [], user: [] },
  });

  const handleLoad = useCallback(async () => {
    setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const generalRecipesResponse = await fetch(
        `http://localhost:8000/api/recipe/list`
      );
      const generalRecipes = await generalRecipesResponse.json();

      let userRecipes = [];
      if (selectedUser) {
        const userRecipesResponse = await fetch(
          `http://localhost:8000/api/recipe/list?ownerID=${selectedUser}`
        );
        userRecipes = await userRecipesResponse.json();
      }

      if (generalRecipesResponse.ok) {
        setRecipeLoadObject({
          state: "ready",
          data: { general: generalRecipes, user: userRecipes },
        });
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      setRecipeLoadObject((current) => ({
        ...current,
        state: "error",
        error: error.toString(),
      }));
    }
  }, [selectedUser]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  async function handleCreate(formData) {
    setRecipeLoadObject((current) => ({ ...current, state: "pending" }));

    const response = await fetch("http://localhost:8000/api/recipe/create", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    console.log("Success:", responseJson);

    if (response.status < 400) {
      setRecipeLoadObject((current) => {
        const newData = {
          ...current.data,
          general: [...current.data.general, responseJson],
          user: [...current.data.user, responseJson],
        };
        return { state: "ready", data: newData };
      });
      return responseJson;
    } else {
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error || "Unknown error occurred",
      }));
      throw new Error(
        "Failed to create recipe: " + JSON.stringify(responseJson.error)
      );
    }
  }

  async function handleUpdate(dtoIn) {
    setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/api/recipe/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setRecipeLoadObject((current) => {
        const recipeIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[recipeIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: recipeLoadObject.state,
    recipeList: recipeLoadObject.data || { general: [], user: [] },
    handlerMap: { handleLoad, handleCreate, handleUpdate },
  };

  return (
    <RecipeListContext.Provider value={value}>
      {children}
    </RecipeListContext.Provider>
  );
}

export default RecipeListProvider;
