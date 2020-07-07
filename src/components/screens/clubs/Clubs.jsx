import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StyleSheet, ActivityIndicator } from "react-native";
import { UserContext } from "../../context/UserProvider";
import ClubItem from "./ClubItem";

const useClubs = (url) => {
  const { user } = useContext(UserContext);
  const [userClubs, setUserClubs] = useState(null);

  const fetchClubs = async () => {
    const userSessionKey = new FormData();

    userSessionKey.append("session_key", user.data.results.session_key);

    await axios
      .post(url, userSessionKey)
      .then((respond) => setUserClubs(respond.data.results))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchClubs();
  }, [url]);

  return userClubs;
};

const Clubs = ({ nav }) => {
  const data = useClubs("https://korty.org/api/clubs/bookmark/show");

  if (!data) {
    return <ActivityIndicator style={styles.loading_Indicator} size="large" />;
  } else {
    return <ClubItem nav={nav} data={data} />;
  }
};
export default Clubs;

const styles = StyleSheet.create({
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
});
