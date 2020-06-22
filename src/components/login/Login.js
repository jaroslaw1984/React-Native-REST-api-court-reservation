import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [version_os, setVersion_os] = useState("");

  const handleFetchPostData = async () => {
    const url = "https://korty.org/api/login";

    const user = new FormData();

    user.append("username", username);
    user.append("password", password);
    user.append("version_os", version_os);
    // user.append("username", "tester2");
    // user.append("password", "tester");
    // user.append("version_os", "android");

    const respond = await axios.post(url, user);
    console.log(respond.data.results);
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

        <Text style={styles.android__text}>Android:</Text>
        <TextInput
          style={styles.android__input}
          onChangeText={(value) => setVersion_os(value)}
        />

        <Text style={styles.version__text}>Version:</Text>
        <TextInput style={styles.version__input} value="6" />
        <Button onPress={() => handleFetchPostData()} title="Login" />
      </View>
    </TouchableWithoutFeedback>
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
});

export default Login;
