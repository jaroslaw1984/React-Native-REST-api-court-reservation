import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ActivityIndicator, View } from "react-native";
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

  return (
    <React.Fragment>
      {loading ? (
        <View style={styles.loading_Indicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ClubItem nav={nav} data={userClubs} onRemove={handleRemoveClub} />
      )}
    </React.Fragment>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
});
