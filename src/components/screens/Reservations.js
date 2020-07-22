import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const content = () => {
  return (
    <View style={styles.container}>
      <Text>Reservation screen</Text>
    </View>
  );
};

const Reservations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="content" component={content} />
    </Stack.Navigator>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
