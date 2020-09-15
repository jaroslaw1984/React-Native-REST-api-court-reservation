import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userClubs, setUserClubs] = useState([]);
  const [searchClubs, setSearchClubs] = useState([]);
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

  const handleSearchClubs = (data) => {
    setSearchClubs(data);
  };

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", value);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUser = async (value) => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setDataContext,
        userClubs,
        searchClubs,
        handleSearchClubs,
        handleAddClub,
        handleUserClubs,
        handleRemoveClub,
        loading,
        handleLoading,
        login: () => {
          const logetUser = user;
          setUser(logetUser);
          storeUser(logetUser);
        },
        logout: () => {
          setUser(null);
          removeUser("user");
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
