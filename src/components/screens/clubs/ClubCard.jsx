import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

const ClubCard = ({ nav, item }) => {
  return (
    <View style={styles.club}>
      <View style={styles.club__card}>
        <Pressable
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
              <View
                style={
                  item.status === 1
                    ? styles.club__isOnline
                    : styles.club__isOffline
                }
              ></View>
            </View>
            <View style={styles.club__info}>
              <Text
                style={
                  item.status === 1
                    ? styles.club__name__isOnline
                    : styles.club__name__offline
                }
              >
                {item.name}
              </Text>
              <Text style={styles.club__city_name}>
                {item.city_name}
                {item.district_name && ` - ${item.district_name}`}
              </Text>
              {/* This will be for delete if Michał will accept it */}
              {/* if district name exist show it and give styles */}
              {/* {item.district_name && (
                <Text
                  style={styles.club__district}
                >{`- ${item.district_name}`}</Text>
              )} */}
              <Text style={styles.club__address}>{item.address}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ClubCard;

const styles = StyleSheet.create({
  club: {
    flex: 1,
    flexDirection: "row",
  },
  club__card: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#cccc",
  },
  club__item: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  club__container__img: {
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
  },
  club__container__img__offline: {
    flex: 1,
    flexDirection: "row",
    opacity: 0.3,
  },
  club__img: {
    position: "relative",
    width: 100,
    height: 100,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#1f4287",
  },
  club__info: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  club__name__isOnline: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
  },
  club__name__offline: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    opacity: 0.5,
  },
  club__city_name: {
    fontSize: 15,
    paddingTop: 5,
    textAlign: "center",
    opacity: 0.5,
  },
  // This will be for delete if Michał will accept it
  // club__district: {
  //   fontSize: 13,
  //   paddingTop: 5,
  //   opacity: 0.5,
  // },
  club__address: {
    fontSize: 13,
    opacity: 0.5,
  },
  club__favorite: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
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
  club__isOnline: {
    alignSelf: "flex-end",
    width: 22,
    height: 22,
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
    alignSelf: "flex-end",
    width: 22,
    height: 22,
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
