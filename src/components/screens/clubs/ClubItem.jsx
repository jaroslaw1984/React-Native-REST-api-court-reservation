import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCard from "./ClubCard";

const ClubItem = ({ nav, data }) => {
  return (
    <React.Fragment>
      {data === "" ? (
        <Text>Nie posiadasz ulubionych klubów</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
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
          <View style={styles.button__add}>
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
});
