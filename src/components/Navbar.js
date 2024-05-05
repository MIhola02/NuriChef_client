import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserListContext } from "./contexts/UserListContext";

function Navbar({ openModal }) {
  const { userList, setSelectedUser } = useContext(UserListContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NuriChef
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Discover Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myrecipes">
                My Recipes
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li>
              <button className="nav-link" onClick={openModal}>
                Create recipe ⊞
              </button>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDarkDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select User
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <select onChange={(e) => setSelectedUser(e.target.value)}>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
