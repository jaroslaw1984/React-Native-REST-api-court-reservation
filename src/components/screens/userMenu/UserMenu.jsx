import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import TopMenu from "./TopMenu";
import Clubs from "../clubs/Clubs";
import Reservations from "../Reservations";
import ClubList from "../clubs/ClubList";
import { createStackNavigator } from "@react-navigation/stack";

const AllClubs = () => {
  return <ClubList />;
};

const ClubsScreen = ({ navigation }) => {
  return <Clubs nav={navigation} />;
};

const ReservationScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Reservations />
    </View>
  );
};

const ClubStack = createStackNavigator();

const ClubStackScreen = () => {
  return (
    <ClubStack.Navigator>
      <ClubStack.Screen name="Kluby" component={ClubsScreen} />
      <ClubStack.Screen name="Lista" component={AllClubs} />
    </ClubStack.Navigator>
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
      <Tab.Screen name="Kluby" component={ClubStackScreen} />
      <Tab.Screen name="Rezerwacja" component={ReservationScreen} />
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
