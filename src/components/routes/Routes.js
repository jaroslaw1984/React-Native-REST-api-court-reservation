import React, { useContext, useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, ActivityIndicator, AsyncStorage } from "react-native";
import { UserContext } from "../context/UserProvider";
import UserMenu from "../screens/userMenu/UserMenu";
import StackNavigator from "../screens/stackNavigator/StackNavigator";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    // check if user is logged in or not
    AsyncStorage.getItem("user")
      .then((item) => {
        if (item) {
          login();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading_Indicator} size="large" />;
  }
  return (
    <NavigationContainer>
      {user ? <UserMenu /> : <StackNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Routes;
