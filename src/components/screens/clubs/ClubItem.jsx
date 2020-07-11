import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ClubCard from "./ClubCard";

const ClubItem = ({ nav, data }) => {
  return (
    <React.Fragment>
      {/* this condition need to be here for button at the bottom */}
      {data === "" ? (
        <Text>Nie posiadasz ulubionych klubów</Text>
      ) : (
        <ClubCard nav={nav} data={data} />
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
  club__card: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  club__item: {
    // all card will have the same height if flex: 1 is on
    flex: 1,
    width: 190,
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: "#dee1ec",
    // borderColor: "#2470a0",
    // borderWidth: 2,
    borderRadius: 5,
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  club__container__img: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 50,
  },
  card__settings: {
    position: "absolute",
    top: -50,
    right: -65,
  },
  img__bg__circle: {
    position: "absolute",
    top: -170,
    left: -75,
    width: 250,
    height: 250,
    borderRadius: 100,
    backgroundColor: "#6740FF",
    zIndex: -1,
  },
  club__container__img__offline: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 50,
    opacity: 0.3,
  },
  club__img: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  club__info: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    flexDirection: "column",
    padding: 4,
    paddingVertical: 20,
  },
  club__name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 25,
  },
  club__district: {
    fontSize: 15,
    paddingTop: 5,
    textAlign: "center",
    opacity: 0.5,
  },
  club__address: {
    fontSize: 15,
    textAlign: "center",
    opacity: 0.5,
  },
  club__info__offline: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    flexDirection: "column",
    padding: 8,
    paddingVertical: 20,
    marginVertical: 20,
    opacity: 0.2,
  },
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
  club__status: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#516c8d",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  club__status__text: {
    fontWeight: "bold",
  },
  club__isOnline: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#dee1ec",
    backgroundColor: "#2cb978",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  club__isOffline: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#dee1ec",
    backgroundColor: "#d72323",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
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
