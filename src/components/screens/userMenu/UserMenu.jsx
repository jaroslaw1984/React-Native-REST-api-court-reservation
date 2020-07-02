import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "../../context/UserProvider";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import TopMenu from "./TopMenu";

const ReservationScreen = () => {
  const { logout } = useContext(UserContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rezerwacja</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

const ClubsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Kluby</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const UserMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Rezerwacja") {
            iconName = "calendar-o";
          } else if (route.name === "Kluby") {
            iconName = "address-card-o";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#325D88",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Rezerwacja" component={TopMenu} />
      <Tab.Screen name="Kluby" component={ClubsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  reservation_btn: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default UserMenu;
