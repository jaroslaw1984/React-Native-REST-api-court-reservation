import React, { useState, useContext, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
// import TopMenu from "../screens/userMenu/TopMenu";
import UserIcon from "../screens/userMenu/UserIcon";
import HeaderBackIcon from "../screens/userMenu/HeaderBackIcon";
import { ActivityIndicator, View, BackHandler } from "react-native";
import { UserContext } from "../context/UserProvider";

const Stack = createStackNavigator();

const Content = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // navigation for WebView
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const webviewRef = useRef(null);

  const backButtonHandler = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      console.log(webviewRef.current.goBack());
      return true;
    }
    return false;
  };

  const userSessionKey = user.data.results.session_key;

  const hideSpinner = () => {
    setLoading(false);
  };
  const showSpinner = () => {
    setLoading(true);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () =>
      backButtonHandler()
    );
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () =>
        backButtonHandler()
      );
    };
  }, []);

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
          setCurrentUrl(navState.url);
        }}
        allowsBackForwardNavigationGestures
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

const WebviewStructure = ({ nav, url, name }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={name}
        // Just in case if customer will change his mind
        // options={{
        //   headerTitle: (props) => <TopMenu {...props} navigation={nav} />,
        // }}
        options={{
          headerRight: (props) => <UserIcon {...props} navigation={nav} />,
          headerLeft: (props) => <HeaderBackIcon navigation={nav} {...props} />,
        }}
      >
        {(props) => <Content {...props} url={url} nav />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WebviewStructure;
