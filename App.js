import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import Routes from "./src/components/routes/Routes";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Routes />
    </SafeAreaView>
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
