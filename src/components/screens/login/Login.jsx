import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { UserContext } from "../../context/UserProvider";

const Login = ({ nav }) => {
  const [username, setUsername] = useState("tester2");
  const [password, setPassword] = useState("tester");
  const [version_os, setVersion_os] = useState(Platform.OS.toString());
  const [version_code, setVersion_code] = useState("");
  const { setDataContext } = useContext(UserContext);

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

    if (respond.data.error_code === 2001) {
      Alert.alert("Login", respond.data.error.message);
    } else if (respond.data.error_code === 0) {
      setDataContext(respond);
    }

    // const test = respond.config.data._parts;

    // console.log(test[0][1]);
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
          value={version_os}
          onChangeText={(text) => setVersion_os(text)}
        />

        <TextInput
          style={styles.version__input}
          // value="7"
          defaultValue="7"
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
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
});

Login.proptype = {
  nav: PropTypes.object.isRequired,
};

export default Login;
