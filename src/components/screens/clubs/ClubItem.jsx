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
        <View style={styles.text__content}>
          <Text style={styles.text__noData}>
            Dodaj kluby, z kótrych będziesz najczęściej korzystał
          </Text>
        </View>
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
      <View
        style={
          data.length === 0
            ? styles.button__container__noData
            : styles.button__container
        }
      >
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Lista klubów");
          }}
        >
          <View
            style={
              data.length === 0
                ? styles.button__add__noData
                : styles.button__add
            }
          >
            <Ionicons
              style={styles.button__icon}
              name="ios-search"
              size={data.length === 0 ? 50 : 28}
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
  button__container__noData: {
    position: "absolute",
    top: 100,
    right: 170,
  },
  button__add__noData: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#2f89fc",
    justifyContent: "center",
    alignItems: "center",
  },
  button__add: {
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
  text__content: {
    flex: 1,
    justifyContent: "center",
  },
  text__noData: {
    textAlign: "center",
    fontSize: 25,
    marginHorizontal: 10,
  },
});
