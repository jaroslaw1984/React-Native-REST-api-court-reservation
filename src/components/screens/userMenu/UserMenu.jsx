import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TopMenu from "./TopMenu";
import Clubs from "../clubs/Clubs";
import Reservations from "../reservations/Reservations";
import ClubList from "../clubs/ClubList";
import RootDrawer from "../../routes/RootDrawer";
import Gameplay from "../gameplay/Gameplay";
import Leaderboard from "../leaderboard/Leaderboard";
import LearningGame from "../learningGame/LearningGame";
import WebviewStructure from "../../routes/WebviewStructure";
import { UserContext } from "../../context/UserProvider";

const setCookie = ({ user }) => {
  const cookie = user.data.results.session_key;
  return cookie;
  // document.cookie = `session_key_api=${newCookie}; expires=Tue, 25-Aug-2020 10:39:25 GMT; Max-Age=2678400; path=/`;
};

// This show details about club and load the webpage of club info
const AboutClub = ({ route }) => {
  const { user } = useContext(UserContext);
  const userSessionKey = user.data.results.session_key;

  const { url } = route.params;
  console.log(url);
  return <WebView source={{ uri: `${url}?sid=${userSessionKey}` }} />;
};

// This show all list clubs
const AllClubs = ({ navigation }) => {
  return <ClubList nav={navigation} />;
};

// This show clubs that are added to favorite bookmark
const ClubsScreen = ({ navigation }) => {
  return <Clubs nav={navigation} />;
};

// Reservation tab screen
const ReservationScreen = ({ navigation }) => {
  return <Reservations nav={navigation} />;
};

const GameplayScreen = ({ navigation }) => {
  return <Gameplay nav={navigation} />;
};

const LeaderboardScreen = ({ navigation }) => {
  return <Leaderboard nav={navigation} />;
};

const LearningGameScreen = ({ navigation }) => {
  return <LearningGame nav={navigation} />;
};

// -------------- Drawer Menu options -------------

// function for WebView
// const useWebView = (page) => {
//   const { user } = useContext(UserContext);
//   const [loading, setLoading] = useState(true);
//   const userSessionKey = user.data.results.session_key;

//   const hideSpinner = () => {
//     setLoading(false);
//   };
//   const showSpinner = () => {
//     setLoading(true);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{
//           uri: `https://korty.org/logowanie/mobile?page=/${page}&sid=${userSessionKey}`,
//         }}
//         onLoadStart={() => showSpinner()}
//         onLoad={() => hideSpinner()}
//       />
//       {loading && (
//         <View
//           style={{
//             flex: 1,
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//             position: "absolute",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           size="large"
//         >
//           <ActivityIndicator size="large" />
//         </View>
//       )}
//     </View>
//   );
// };

// const userProfile = () => useWebView("profil");

// const userSettings = () => useWebView("ustawienia");

// const managementPanel = () => useWebView("panel");

// second version for WebView

const userProfile = ({ navigation }) => {
  const url = "https://korty.org/logowanie/mobile?page=/profil";
  return <WebviewStructure nav={navigation} url={url} />;
};

const userSettings = ({ navigation }) => {
  const url = "https://korty.org/logowanie/mobile?page=/ustawienia";
  return <WebviewStructure nav={navigation} url={url} />;
};

const managementPanel = ({ navigation }) => {
  const url = "https://korty.org/logowanie/mobile?page=/panel";
  return <WebviewStructure nav={navigation} url={url} />;
};

// -----------------------------------------------

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
      <HomeStack.Screen name="Profil gracza" component={userProfile} />
      <HomeStack.Screen name="Ustawienia konta" component={userSettings} />
      <HomeStack.Screen name="Panel zarządzania" component={managementPanel} />
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

          if (route.name === "Kluby") {
            iconName = "home";
          } else if (route.name === "Rezerwacje") {
            iconName = "calendar-alt";
          } else if (route.name === "Rozgrywki") {
            iconName = "dice";
          } else if (route.name === "Rankingi") {
            iconName = "trophy";
          } else if (route.name === "Nauka gry") {
            iconName = "stopwatch";
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2f89fc",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Kluby" component={HomeStackScreen} />
      <Tab.Screen name="Rezerwacje" component={ReservationScreen} />
      <Tab.Screen name="Rozgrywki" component={GameplayScreen} />
      <Tab.Screen name="Rankingi" component={LeaderboardScreen} />
      <Tab.Screen name="Nauka gry" component={LearningGameScreen} />
    </Tab.Navigator>
  );
};

// Drawer left menu
const UserMenu = ({ user }) => {
  // console.log(user.data.results.session_key);
  return <RootDrawer bottomStack={BottomTabStack} />;
};

export default UserMenu;
