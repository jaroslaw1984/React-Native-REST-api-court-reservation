import React, { useContext, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import TopMenu from "../userMenu/TopMenu";
import { UserContext } from "../../context/UserProvider";

const Stack = createStackNavigator();

const content = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const location = user.data.results.location.link;
  const userSessionKey = user.data.results.session_key;

  const hideSpinner = () => {
    setLoading(false);
  };
  const showSpinner = () => {
    setLoading(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://korty.org/logowanie/mobile?page=/rozgrywki${location}&sid=${userSessionKey}`,
        }}
        onLoadStart={() => showSpinner()}
        onLoad={() => hideSpinner()}
      />
      {loading && (
        <View
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
          size="large"
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const Gameplay = ({ nav }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="content"
        component={content}
        options={{
          headerTitle: (props) => <TopMenu {...props} navigation={nav} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Gameplay;
