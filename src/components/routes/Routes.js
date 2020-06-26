import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";

const Login = ({ nav }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [version_os, setVersion_os] = useState("");
  const [version_code, setVersion_code] = useState("");

  const handleFetchPostData = async () => {
    const url = "https://korty.org/api/login";

    const user = new FormData();

    user.append("username", username);
    user.append("password", password);
    user.append("version_os", version_os);
    user.append("version_code", version_code);
    // user.append("username", "tester2");
    // user.append("password", "tester");

    const respond = await axios.post(url, user);
    console.log(respond);
  };

  const platformVersionCode = () => {
    let code;

    if (Platform.OS === "android") {
      switch (Platform.Version) {
        case 23:
          code = 6;
          break;
        case 24:
          code = 7;
          break;
        case 25:
          code = 7;
          break;
        case 26:
          code = 8;
          break;
        case 27:
          code = 8;
          break;
        case 28:
          code = 9;
          break;
        case 29:
          code = 10;
          break;
        case 30:
          code = 11;
          break;
        default:
          Platform.Version;
      }
    } else if (Platform.OS === "ios") {
      code = parseInt(Platform.Version);
    }

    return code.toString();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.login__container}>
        <Text style={styles.login__text}>Login:</Text>
        <TextInput
          style={styles.login__input}
          onChangeText={(value) => setUsername(value)}
        />

        <Text style={styles.password__text}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.password__input}
          onChangeText={(value) => setPassword(value)}
        />

        <TextInput
          minInputToolbarHeight={0}
          renderInputToolbar={() => null}
          style={styles.android__input}
          value={Platform.OS.toString()}
          onChangeText={(value) => setVersion_os(value)}
        />

        <TextInput
          style={styles.version__input}
          value={platformVersionCode()}
          onChangeText={(value) => setVersion_code(value)}
        />
        <Button onPress={() => handleFetchPostData()} title="Login" />

        <Text style={styles.createAcc} onPress={() => nav.navigate("Register")}>
          Stwórz konto
        </Text>
        <Text
          style={styles.forgotPass}
          onPress={() => nav.navigate("Recovery")}
        >
          Zapomniałeś hasła ?
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
          component={Login}
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

const styles = StyleSheet.create({
  login__container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  login__input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 8,
    margin: 10,
  },
  password__input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 8,
    margin: 10,
  },
  android__input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 8,
    margin: 10,
  },
  version__input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 8,
    margin: 10,
  },
  createAcc: {
    paddingTop: 20,
    color: "green",
  },
  forgotPass: {
    paddingTop: 20,
    color: "green",
  },
});

Login.proptype = {
  nav: PropTypes.object.isRequired,
};

export default Routes;
