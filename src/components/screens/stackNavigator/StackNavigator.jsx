import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import Login from "../login/Login";

const Stack = createStackNavigator();

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

const stackNavigator = () => {
  return (
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
  );
};

export default stackNavigator;
