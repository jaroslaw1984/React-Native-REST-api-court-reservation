import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const ClubCard = ({ nav, item }) => {
  return (
    <View style={styles.club__card}>
      <TouchableOpacity
        onPress={() => nav.navigate("Informacje o klubie", { url: item.url })}
      >
        <View style={styles.club__item}>
          <View
            style={
              item.status === 1
                ? styles.club__container__img
                : styles.club__container__img__offline
            }
          >
            <Image
              source={
                item.logo_src === ""
                  ? require("../../../../assets/ic_launcher_foreground.png")
                  : { uri: item.logo_src }
              }
              style={styles.club__img}
            />
          </View>
          <View style={styles.club__info}>
            <Text style={styles.club__name}>{item.name}</Text>
            {/* if district name exist show it and give styles */}
            {item.district_name && (
              <Text
                style={styles.club__district}
              >{`(${item.district_name})`}</Text>
            )}
            <Text style={styles.club__address}>{item.address}</Text>
          </View>
          <View style={styles.club__status}>
            <View
              style={
                item.status === 1
                  ? styles.club__isOnline
                  : styles.club__isOffline
              }
            ></View>
            <Text style={styles.club__status__text}>
              {item.status === 1 ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClubCard;

const styles = StyleSheet.create({
  club__card: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  club__item: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  club__container__img: {
    flex: 1,
  },
  club__container__img__offline: {
    flex: 1,
    opacity: 0.3,
  },
  club__img: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1f4287",
  },
  club__info: {
    flex: 2,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
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
    justifyContent: "center",
    alignItems: "center",
  },
  club__status__text: {
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
  club__isOnline: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#dee1ec",
    backgroundColor: "#2cb978",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
