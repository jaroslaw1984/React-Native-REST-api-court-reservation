import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { UserContext } from "../../context/UserProvider";
import ClubItem from "./ClubItem";

const useClubs = (url) => {
  const { user } = useContext(UserContext);
  const [userClubs, setUserClubs] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    const userSessionKey = new FormData();

    userSessionKey.append("session_key", user.data.results.session_key);

    await axios
      .post(url, userSessionKey)
      .then((respond) => {
        setTimeout(() => {
          setUserClubs(respond.data.results);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchClubs();
  }, [url]);

  return { userClubs, loading };
};

const Clubs = ({ nav }) => {
  const { userClubs, loading } = useClubs(
    "https://korty.org/api/clubs/bookmark/show"
  );

  return (
    <View style={styles.club__container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ClubItem nav={nav} data={userClubs} />
      )}
    </View>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  club__container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
