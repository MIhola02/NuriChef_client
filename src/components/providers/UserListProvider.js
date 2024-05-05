import { useEffect, useState } from "react";
import { UserListContext } from "../contexts/UserListContext";

function UserListProvider({ children }) {
  const [userLoadObject, setUserLoadObject] = useState({
    state: "ready",
    error: null,
    data: [],
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setUserLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(`http://localhost:8000/api/user/list`);
      const data = await response.json();
      if (response.ok) {
        setUserLoadObject({ state: "ready", data });
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      setUserLoadObject((current) => ({
        ...current,
        state: "error",
        error: error.toString(),
      }));
    }
  }

  const value = {
    userList: userLoadObject.data,
    setSelectedUser,
    selectedUser,
  };

  console.log(selectedUser);

  return (
    <UserListContext.Provider value={value}>
      {children}
    </UserListContext.Provider>
  );
}

export default UserListProvider;
