import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView } from "react-native";
import Routes from "./src/components/routes/Routes";
import { UserProvider } from "./src/components/context/UserProvider";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2f89fc",
  },
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </UserProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
