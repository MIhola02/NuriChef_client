import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RecipeList from "./components/routes/recipe-list";
import Layout from "./components/layout";
import RecipeDetail from "./components/routes/recipe-detail";
import PageNotFound from "./components/routes/PageNotFound";
import RecipeListProvider from "./components/providers/RecipeListProvider";
import RecipeCreateModal from "./components/routes/RecipeCreateModal";
import UserListProvider from "./components/providers/UserListProvider";
import MyRecipeList from "./components/routes/user-recipe-list.js";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <UserListProvider>
          <RecipeListProvider>
            <Routes>
              <Route
                path="/"
                element={<Layout openModal={() => setModalShow(true)} />}
              >
                <Route index element={<RecipeList />} />
                <Route path="/myrecipes" element={<MyRecipeList />} />
                <Route path="/recipe/detail" element={<RecipeDetail />} />
                <Route path="*" element={<PageNotFound></PageNotFound>} />
              </Route>
            </Routes>
            <RecipeCreateModal
              show={modalShow}
              handleClose={() => setModalShow(false)}
            />
          </RecipeListProvider>
        </UserListProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
