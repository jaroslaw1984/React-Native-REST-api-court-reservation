import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { WebView } from "react-native-webview";
import Login from "../screens/login/Login";

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Login nav={navigation} />
    </View>
  );
};

const Register = () => {
  return <WebView source={{ uri: "https://korty.org/rejestracja" }} />;
};

const Recovery = () => {
  return <WebView source={{ uri: "https://korty.org/przypomnij-haslo" }} />;
};

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: "Stwórz konto" }}
        />
        <Stack.Screen
          name="Recovery"
          component={Recovery}
          options={{ headerTitle: "Przypomnij hasło" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
