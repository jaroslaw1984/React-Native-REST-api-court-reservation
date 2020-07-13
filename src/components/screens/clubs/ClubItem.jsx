import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCard from "./ClubCard";

const ClubItem = ({ nav, data }) => {
  return (
    <React.Fragment>
      {/* this condition need to be here for button at the bottom */}
      {data === "" ? (
        <Text>Nie posiadasz ulubionych klubów</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <ClubCard nav={nav} item={item} key={item.id} />
          )}
        />
      )}
      <View style={styles.button__container}>
        <View style={styles.button__add}>
          <Ionicons
            style={styles.button__icon}
            onPress={() => nav.navigate("Lista")}
            name="ios-search"
            size={28}
            color="#fff"
          />
        </View>
      </View>
    </React.Fragment>
  );
};
export default ClubItem;

const styles = StyleSheet.create({
  button__container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 20,
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
