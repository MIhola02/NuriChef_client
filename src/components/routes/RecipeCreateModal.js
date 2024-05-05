import React, { useState } from "react";
import { useContext } from "react";
import { RecipeListContext } from "../contexts/RecipeListContext";
import { UserListContext } from "../contexts/UserListContext";

function RecipeCreateModal({ show, handleClose }) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const { handlerMap } = useContext(RecipeListContext);
  const { selectedUser } = useContext(UserListContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", event.target.photo.files[0]); // Append the file
    formData.append(
      "recipe",
      JSON.stringify({
        date: new Date().toISOString(),
        name: recipeName,
        desc: description,
        ingredients: ingredients.split(",").map((item) => item.trim()),
        ownerID: selectedUser,
      })
    );

    try {
      await handlerMap.handleCreate(formData);
      handleClose();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Recipe</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Recipe Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Ingredients (separated by ",")
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  name="photo"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecipeCreateModal;
