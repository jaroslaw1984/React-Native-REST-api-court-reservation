import React, { useState, useContext, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
// import TopMenu from "../screens/userMenu/TopMenu";
import UserIcon from "../screens/userMenu/UserIcon";
import HeaderBackIcon from "../screens/userMenu/HeaderBackIcon";
import { ActivityIndicator, View, BackHandler } from "react-native";
import { UserContext } from "../context/UserProvider";

const Stack = createStackNavigator();

const Content = ({ url, navigation, clubEndPointName }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // navigation for WebView
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const webviewRef = useRef(null);
  const userSessionKey = user.data.results.session_key;

  const hideSpinner = () => {
    setLoading(false);
  };
  const showSpinner = () => {
    setLoading(true);
  };

  useEffect(() => {
    const backAction = () => {
      const location = user.data.results.location.link;

      const endPoint = [
        clubEndPointName,
        "https://korty.org/nauka",
        `https://korty.org/rozgrywki${location}`,
        "https://korty.org/",
        "https://korty.org/profil",
        "https://korty.org/ustawienia",
        "https://korty.org/panel",
        "https://korty.org/moje-rezerwacje/nadchodzace",
      ];

      if (webviewRef.current) {
        webviewRef.current.goBack();
        if (endPoint.includes(currentUrl)) {
          navigation.navigate("Kluby");
          backHandler.remove();
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [currentUrl]);

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
          <ActivityIndicator size="large" color="#2f89fc" />
        </View>
      )}
    </View>
  );
};

const WebviewStructure = ({ nav, url, name, clubEndPointName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          marginLeft: -33,
        },
      }}
    >
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
        {(props) => (
          <Content
            {...props}
            url={url}
            navigation={nav}
            clubEndPointName={clubEndPointName}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WebviewStructure;
