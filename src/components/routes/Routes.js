import React, { useContext, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../context/UserProvider";
import UserMenu from "../screens/userMenu/UserMenu";
import StackNavigator from "../screens/stackNavigator/StackNavigator";

const Routes = () => {
  const { user, login } = useContext(UserContext);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        login();
      }
    } catch (err) {
      console.log(new Error(err));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      {user ? <UserMenu user={user} /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
