import React, { useState, createContext } from "react";
import { AsyncStorage } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userClubs, setUserClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const setDataContext = (data) => {
    setUser(data);
  };

  const handleUserClubs = (data) => {
    setUserClubs(data);
  };

  // add club to favorite
  const handleAddClub = (club) => {
    setUserClubs((userClubs) => [...userClubs, club]);
  };

  const handleLoading = () => {
    setLoading(false);
  };

  // this function remove selected card from DOM
  const handleRemoveClub = (id) => {
    const newList = userClubs.filter((item) => item.id !== id);

    setUserClubs(newList);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setDataContext,
        userClubs,
        handleAddClub,
        handleUserClubs,
        handleRemoveClub,
        loading,
        handleLoading,
        login: () => {
          const logetUser = user;
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
