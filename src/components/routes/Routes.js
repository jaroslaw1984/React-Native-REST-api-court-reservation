import React, { useContext, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { UserContext } from "../context/UserProvider";
import UserMenu from "../screens/userMenu/UserMenu";
import StackNavigator from "../screens/stackNavigator/StackNavigator";

const Routes = () => {
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    // check if user is logged in or not
    AsyncStorage.getItem("user")
      .then((item) => {
        if (item) {
          login();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavigationContainer>
      {user ? <UserMenu /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
