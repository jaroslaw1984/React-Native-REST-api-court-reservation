import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, TextInput } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";

const Login = ({ nav }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      setPassword("");
    } else if (respond.data.error_code === 0) {
      setDataContext(respond);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (err) {
      throw new Error(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setUsername(value);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    getData();
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const resizeImg = useRef(new Animated.Value(250)).current;

  const _keyboardDidShow = () => {
    Animated.timing(resizeImg, {
      toValue: 190,
      duration: 500,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(resizeImg, {
      toValue: 250,
      duration: 500,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.login__container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.login__content}>
          <View style={styles.img__container}>
            <Animated.Image
              style={{ width: resizeImg, height: resizeImg }}
              source={require("../../../../assets/splash.png")}
            />
          </View>
          <View style={styles.input__container}>
            <TextInput
              style={styles.user__input}
              label="Nazwa użytkownika lub e-mail"
              value={username}
              underlineColor={globalStyles.buttonConf.color}
              onChangeText={(value) => setUsername(value)}
              mode={"outlined"}
            />

            <TextInput
              secureTextEntry={true}
              label="Hasło"
              value={password}
              style={styles.password__input}
              onChangeText={(value) => setPassword(value)}
              underlineColor={globalStyles.buttonConf.color}
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
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              color={globalStyles.buttonConf.color}
              onPress={() => {
                handleFetchPostData();
                storeData(username);
              }}
            >
              Zaloguj się
            </Button>
          </View>
          <View style={styles.txtContainer}>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login__container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
    height: Dimensions.get("window").height,
  },
  login__content: {
    backgroundColor: "#fff",
  },
  img__container: {
    alignItems: "center",
  },
  input__container: { paddingHorizontal: 30 },
  user__input: {
    backgroundColor: "#ffff",
    marginBottom: 10,
  },
  password__input: {
    backgroundColor: "#ffff",
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 12,
    paddingHorizontal: 50,
  },
  txtContainer: {
    alignItems: "center",
  },
  createAcc: {
    paddingTop: 20,
    color: "green",
    fontSize: 15,
  },
  forgotPass: {
    paddingTop: 20,
    color: "green",
    fontSize: 15,
  },
});

Login.proptype = {
  nav: PropTypes.object.isRequired,
};

export default Login;
