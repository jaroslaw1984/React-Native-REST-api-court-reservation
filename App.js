import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import Routes from "./src/components/routes/Routes";
import { UserProvider } from "./src/components/context/UserProvider";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Routes />
      </UserProvider>
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
