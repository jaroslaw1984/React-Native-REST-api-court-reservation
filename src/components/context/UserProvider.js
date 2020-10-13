import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userClubs, setUserClubs] = useState([]);
  const [searchClubs, setSearchClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState(null);
  const [citys, setCitys] = useState(null);

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
  const fetchLocation = async (value) => {
    const getLocation = new FormData();

    getLocation.append("location_level", value);
    getLocation.append("offset", 0);
    getLocation.append("limit", 0);

    await axios
      .post("https://korty.org/api/locations/download", getLocation)
      .then((respond) => {
        if (value === 1) {
          setProvinces(respond.data.results.locations);
        } else if (value === 2) {
          setCitys(respond.data.results.locations);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSetProvince = () => {
    fetchLocation(1);
  };

  const handleSetCitys = () => {
    fetchLocation(2);
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
        handleSetProvince,
        handleSetCitys,
        provinces,
        citys,
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
