import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ClubCardList = ({
  nav,
  item,
  onModal,
  clubId,
  clubName,
  addToApi,
  addClub,
  favoriteClub,
}) => {
  useEffect(() => {
    const backButtonHandler = () => {
      nav.navigate("Kluby");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonHandler
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.club}>
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
              <View
                style={
                  item.status === 1
                    ? styles.club__isOnline
                    : styles.club__isOffline
                }
              ></View>
            </View>
            <View style={styles.club__info}>
              <Text style={styles.club__name}>{item.name}</Text>
              <Text style={styles.club__city_name}>{item.city_name}</Text>
              {/* if district name exist show it and give styles */}
              {item.district_name && (
                <Text
                  style={styles.club__district}
                >{`(${item.district_name})`}</Text>
              )}
              <Text style={styles.club__address}>{item.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (item.bookmark || favoriteClub.includes(item)) {
            onModal();
            clubId(item.id);
            clubName(item.name);
          } else {
            addToApi("add", item.id);
            addClub(item);
          }
        }}
      >
        <View style={styles.club__favorite}>
          {/* condition if club included in favorite screen */}
          {item.bookmark || favoriteClub.includes(item) ? (
            <AntDesign name="heart" size={30} color="#40514e" />
          ) : (
            <AntDesign name="hearto" size={30} color="#40514e" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClubCardList;

const styles = StyleSheet.create({
  club: {
    flex: 1,
    flexDirection: "row",
  },
  club__card: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
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
  },
  club__container__img__offline: {
    flex: 1,
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
    marginLeft: 40,
  },
  club__name: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
  },
  club__city_name: {
    fontSize: 15,
    paddingTop: 5,
    textAlign: "center",
    opacity: 0.5,
  },
  club__district: {
    fontSize: 13,
    paddingTop: 5,
    opacity: 0.5,
  },
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
    position: "absolute",
    bottom: -10,
    right: -10,
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
    position: "absolute",
    bottom: -10,
    right: -10,
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
