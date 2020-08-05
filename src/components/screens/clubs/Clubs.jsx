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

  return { userClubs, loading, setUserClubs };
};

const Clubs = ({ nav }) => {
  const { userClubs, loading, setUserClubs } = useClubs(
    "https://korty.org/api/clubs/bookmark/show"
  );

  // console.log(userClubs);

  // this function remove selected card from DOM
  const handleRemoveClub = (id) => {
    const newList = userClubs.filter((item) => item.id !== id);

    setUserClubs(newList);
  };

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
