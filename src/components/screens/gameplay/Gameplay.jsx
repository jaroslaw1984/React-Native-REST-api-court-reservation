import React from "react";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import TopMenu from "../userMenu/TopMenu";

const Stack = createStackNavigator();

const content = () => {
  return <WebView source={{ uri: "https://korty.org/rozgrywki" }} />;
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
