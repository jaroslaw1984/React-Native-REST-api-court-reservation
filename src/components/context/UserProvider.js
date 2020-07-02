import React, { useContext, useState, createContext } from "react";
import { AsyncStorage } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setDataContext = (data) => {
    setUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setDataContext,
        login: () => {
          const logetUser = user.config.data._parts[0][1];
          setUser(logetUser);
          AsyncStorage.setItem("user", logetUser);
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
