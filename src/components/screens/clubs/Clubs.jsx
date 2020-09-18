import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ActivityIndicator, View, BackHandler } from "react-native";
import { Snackbar } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
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
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (Platform.OS === "ios") return;
    const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
      setCount(count + 1);
      if (count < 1) {
        setVisible(true);
        backAction.remove();
        return true;
      } else {
        BackHandler.exitApp();
        backAction.remove();
        return true;
      }
    });
    setTimeout(() => {
      setCount(0);
    }, 2000);
  });

  return (
    <React.Fragment>
      {loading ? (
        <View style={styles.loading_Indicator}>
          <ActivityIndicator size="large" />
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
      )}
    </React.Fragment>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
  snackbar: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
