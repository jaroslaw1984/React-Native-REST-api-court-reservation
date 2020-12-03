import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ActivityIndicator, View, BackHandler } from "react-native";
import { Snackbar } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";
import ClubItem from "./ClubItem";

const useClubs = (url) => {
  const { user, handleUserClubs, handleLoading } = useContext(UserContext);

  const fetchClubs = async () => {
    const userSessionKey = new FormData();

    userSessionKey.append("session_key", user.data.results.session_key);

    await axios
      .post(url, userSessionKey)
      .then((respond) => {
        setTimeout(() => {
          handleUserClubs(respond.data.results);
          handleLoading();
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchClubs();
  }, [url]);
};

const Clubs = ({ nav }) => {
  useClubs("https://korty.org/api/clubs/bookmark/show");

  const { userClubs, loading, handleRemoveClub } = useContext(UserContext);
  // this is broken back action to exit an application with information
  // ---------------------------------------------------------------------------------
  // const [count, setCount] = useState(0);
  // const [visible, setVisible] = useState(false);

  // const onDismissSnackBar = () => setVisible(false);

  // useEffect(() => {
  //   if (Platform.OS === "ios") return;
  //   const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
  //     setCount(count + 1);
  //     if (count < 1) {
  //       setVisible(true);
  //       backAction.remove();
  //       return true;
  //     } else {
  //       BackHandler.exitApp();
  //       backAction.remove();
  //       return true;
  //     }
  //   });
  //   setTimeout(() => {
  //     setCount(0);
  //   }, 2000);
  // });
  // ---------------------------------------------------------------------------------

  return (
    <React.Fragment>
      {/* this is broken back action to exit an application. Code structure */}
      {/* {loading ? (
        <View style={styles.loading_Indicator}>
          <ActivityIndicator size="large" color="#2f89fc" />
        </View>
      ) : (
        <View style={styles.container}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            style={styles.snackbar}
          >
            Naciśnij ponownie, aby zamknąć
          </Snackbar>
          <ClubItem nav={nav} data={userClubs} onRemove={handleRemoveClub} />
        </View>
      )} */}
      {loading ? (
        <View style={styles.loading_Indicator}>
          <ActivityIndicator size="large" color="#2f89fc" />
        </View>
      ) : (
        <ClubItem nav={nav} data={userClubs} onRemove={handleRemoveClub} />
      )}
    </React.Fragment>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.mainBackgroundColor.backgroundColor,
  },
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
  snackbar: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
