import React from "react";
import { StyleSheet, View, Text, StatusBar, Platform } from "react-native";

const Clubs = () => {
  return (
    <View style={styles.container}>
      <Text>Clubb screen</Text>
    </View>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
