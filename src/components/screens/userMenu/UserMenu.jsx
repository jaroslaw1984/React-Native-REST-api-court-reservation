import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import TopMenu from "./TopMenu";
import Clubs from "../clubs/Clubs";
import Reservations from "../Reservations";
import ClubList from "../clubs/ClubList";
import { createStackNavigator } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import RootDrawer from "../../routes/RootDrawer";

// This show details about club and load the webpage of club info
const AboutClub = ({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} />;
};

// This show all list clubs
const AllClubs = ({ navigation }) => {
  return <ClubList nav={navigation} />;
};

// This show clubs that are added to favorite bookmark
const ClubsScreen = ({ navigation }) => {
  return <Clubs nav={navigation} />;
};

// Other tab screen
const ReservationScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Reservations />
    </View>
  );
};

const HomeStack = createStackNavigator();

// This show everything that is in club tab
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      options={{ headerStyle: { backgroundColor: "black" } }}
    >
      <HomeStack.Screen
        name="Kluby"
        component={ClubsScreen}
        options={{
          headerTitle: (props) => (
            <TopMenu {...props} navigation={navigation} />
          ),
        }}
      />
      <HomeStack.Screen name="Lista klubów" component={AllClubs} />
      <HomeStack.Screen name="Informacje o klubie" component={AboutClub} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

// config bottom tab navigator
const BottomTabStack = () => {
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
      <Tab.Screen name="Kluby" component={HomeStackScreen} />
      <Tab.Screen name="Rezerwacja" component={ReservationScreen} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

// Drawer left menu
const UserMenu = () => {
  return <RootDrawer bottomStack={BottomTabStack} />;
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
