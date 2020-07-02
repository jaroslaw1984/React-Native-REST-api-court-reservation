import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserProvider";

const Stack = createStackNavigator();

const Feed = () => {
  return (
    <View style={styles.text}>
      <Text>Content</Text>
    </View>
  );
};

const TopMenu = () => {
  const { logout } = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <View style={styles.container}>
                <Image
                  source={require("../../../../assets/logo.png")}
                  style={styles.logo}
                />
              </View>
            );
          },
          headerTitle: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  logo: {
    width: 70,
    height: 70,
    paddingLeft: 170,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TopMenu;
