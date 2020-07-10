import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import ClubListItem from "./ClubListItem";

const useAllClubs = (url) => {
  const { user } = useContext(UserContext);
  const [searchClubs, setSearchClubs] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllClubs = async () => {
    const getAllClubs = new FormData();

    getAllClubs.append("session_key", user.data.results.session_key);
    getAllClubs.append("location_level", user.data.results.location.level);
    getAllClubs.append("location_id", user.data.results.location.id);

    await axios
      .post(url, getAllClubs)
      .then((respond) => {
        setSearchClubs(respond.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAllClubs();
  }, [url]);

  return { searchClubs, loading };
};

const ClubList = ({ nav }) => {
  const { searchClubs, loading } = useAllClubs(
    "https://korty.org/api/clubs/show"
  );
  if (searchClubs === "") {
    <View style={styles.club__container}>
      <Text>Niepowodzenie z pobraniem listy klubów.</Text>
    </View>;
  } else {
    return (
      <React.Fragment>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ClubListItem nav={nav} data={searchClubs} />
        )}
      </React.Fragment>
    );
  }
};

export default ClubList;
