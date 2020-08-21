import React, { useState, useContext, useRef } from "react";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import TopMenu from "../screens/userMenu/TopMenu";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { UserContext } from "../context/UserProvider";

const Stack = createStackNavigator();

const Content = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // navigation for WebView
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const webviewRef = useRef(null);

  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

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
          uri: `${url}&sid=${userSessionKey}`,
        }}
        onLoadStart={() => showSpinner()}
        onLoad={() => hideSpinner()}
        ref={webviewRef}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }}
      />
      <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={backButtonHandler}>
          <Text style={styles.button}>Wróć</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={frontButtonHandler}>
          <Text style={styles.button}>Dalej</Text>
        </TouchableOpacity>
      </View>
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

const WebviewBottomStructure = ({ nav, url }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="content"
        options={{
          headerTitle: (props) => <TopMenu {...props} navigation={nav} />,
        }}
      >
        {(props) => <Content {...props} url={url} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WebviewBottomStructure;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#b43757",
  },
  button: {
    color: "white",
    fontSize: 20,
  },
});
