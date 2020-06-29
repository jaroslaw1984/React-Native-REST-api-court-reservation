import React, { useContext, useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(null);

  const setDataContext = (data) => {
    setLogin(data);
  };

  return (
    <UserContext.Provider value={{ login, setDataContext }}>
      {children}
    </UserContext.Provider>
  );
};
