import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import TopMenu from "../userMenu/TopMenu";
import { View, ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

const content = () => {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };
  const showSpinner = () => {
    setLoading(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://korty.org/moje-rezerwacje" }}
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

const Reservations = ({ nav }) => {
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

export default Reservations;
