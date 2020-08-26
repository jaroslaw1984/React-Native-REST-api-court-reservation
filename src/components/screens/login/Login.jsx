import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";

const Login = ({ nav }) => {
  const [username, setUsername] = useState("tester2");
  const [password, setPassword] = useState("tester");
  const [version_os, setVersion_os] = useState(Platform.OS.toString());
  const [version_code, setVersion_code] = useState(
    Platform.OS.toString() === "ios" ? "1" : "7"
  );
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

    if (respond.data.error_code === 2001) {
      Alert.alert("Login", respond.data.error.message);
    } else if (respond.data.error_code === 0) {
      setDataContext(respond);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView enabled>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.login__container}>
            <Image
              source={require("../../../../assets/splash.png")}
              style={styles.img}
            />
            <TextInput
              style={styles.user__input}
              label="Nazwa użytkownika lub e-mail"
              value={username}
              underlineColor={globalStyles.buttonConf.color}
              onChangeText={(value) => setUsername(value)}
              defaultValue="tester2"
              mode={"outlined"}
            />

            <TextInput
              secureTextEntry={true}
              label="Hasło"
              value={password}
              style={styles.password__input}
              onChangeText={(value) => setPassword(value)}
              underlineColor={globalStyles.buttonConf.color}
              defaultValue="tester"
              mode={"outlined"}
            />

            {/* <TextInput
          minInputToolbarHeight={0}
          renderInputToolbar={() => null}
          style={styles.android__input}
          value={version_os}
          onChangeText={(text) => setVersion_os(text)}
        /> */}

            {/* <TextInput
          style={styles.version__input}
          // value="7"
          defaultValue="7"
          onChangeText={(value) => setVersion_code(value)}
        /> */}
            <Button
              mode="contained"
              color={globalStyles.buttonConf.color}
              onPress={() => handleFetchPostData()}
              style={styles.button}
            >
              Zaloguj się
            </Button>

            <Text
              style={styles.createAcc}
              onPress={() => nav.navigate("Register")}
            >
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  login__container: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  img: {
    width: 250,
    height: 250,
  },
  user__input: {
    width: 300,
    backgroundColor: "#ffff",
    margin: 10,
    borderColor: "red",
  },
  password__input: {
    width: 300,
    backgroundColor: "#ffff",
    margin: 10,
  },
  button: {
    marginTop: 15,
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

export default Login;
