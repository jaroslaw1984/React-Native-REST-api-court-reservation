import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ClubEmptyData = ({ nav }) => {
  return (
    <View style={styles.container}>
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
              size={50}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.text__container}>
        <Text style={styles.text}>
          Dodaj kluby, z kótrych będziesz najczęściej korzystał
        </Text>
      </View>
    </View>
  );
};

export default ClubEmptyData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button__container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button__search: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#2f89fc",
    justifyContent: "center",
    alignItems: "center",
  },
  button__icon: {
    color: "#fff",
  },
  text__container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    marginHorizontal: 10,
  },
});
