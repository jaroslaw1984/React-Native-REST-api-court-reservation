import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCard from "./ClubCard";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import ClubEmptyData from "./ClubEmptyData";

const ClubItem = ({ nav, data }) => {
  const { user, handleUserClubs, handleLoading, loading } = useContext(
    UserContext
  );

  const fetchClubs = async () => {
    const userSessionKey = new FormData();

    userSessionKey.append("session_key", user.data.results.session_key);

    await axios
      .post("https://korty.org/api/clubs/bookmark/show", userSessionKey)
      .then((respond) => {
        handleUserClubs(respond.data.results);
        handleLoading();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      {data.length === 0 ? (
        <ClubEmptyData nav={nav} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          onRefresh={fetchClubs}
          refreshing={loading}
          renderItem={({ item }) => (
            <ClubCard nav={nav} item={item} key={item.id} />
          )}
        />
      )}
      <View style={styles.button__container}>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Lista klubów");
          }}
        >
          <View style={styles.button__search}>
            <Ionicons
              style={styles.button__icon}
              name="ios-search"
              size={28}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};
export default ClubItem;

const styles = StyleSheet.create({
  button__container: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  button__search: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#2f89fc",
    justifyContent: "center",
    alignItems: "center",
  },
  button__icon: {
    color: "#fff",
  },
});
