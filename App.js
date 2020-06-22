import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./src/components/header/Header";
import Login from "./src/components/login/Login";

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Login />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
