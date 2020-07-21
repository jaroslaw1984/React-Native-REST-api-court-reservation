import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCardModal from "./ClubCardModal";

const ClubCard = ({ nav, item }) => {
  const [modalPosition, setmodalPosition] = useState(new Animated.Value(-200));
  const [modalActive, setmodalActive] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const handleShowModal = () => {
    Animated.timing(modalPosition, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setmodalActive(true);
    Animated.timing(fadeIn, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleHideModal = () => {
    Animated.timing(modalPosition, {
      toValue: -200,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setmodalActive(false);
    }, 500);
  };

  return (
    <View style={styles.club__card}>
      <View style={styles.club__item}>
        <Animated.View
          style={
            modalActive && [styles.club__options__isActive, { opacity: fadeIn }]
          }
        ></Animated.View>
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
          <View style={styles.card__settings}>
            <TouchableOpacity
              onPress={
                () => handleShowModal()
                //
              }
            >
              <Ionicons name="ios-options" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
          <View
            style={
              item.status === 1
                ? styles.img__bg__circle
                : styles.img__bg__circle__offline
            }
          ></View>
        </View>
        <View style={styles.club__info}>
          <Text style={styles.club__name}>{item.name}</Text>
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
              item.status === 1 ? styles.club__isOnline : styles.club__isOffline
            }
          ></View>
          <Text style={styles.club__status__text}>
            {item.status === 1 ? "Online" : "Offline"}
          </Text>
        </View>
        <Animated.View
          style={
            modalActive
              ? {
                  position: "absolute",
                  transform: [{ translateY: modalPosition }],
                  zIndex: 2,
                }
              : { display: "none" }
          }
        >
          <ClubCardModal
            close={() => handleHideModal()}
            details={() =>
              nav.navigate("Informacje o klubie", { url: item.url })
            }
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default ClubCard;

const styles = StyleSheet.create({
  club__card: {
    flex: 1,
    paddingHorizontal: 8,
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
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 50,
  },
  club__container__img__offline: {
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
  img__bg__circle__offline: {
    position: "absolute",
    top: -170,
    left: -75,
    width: 250,
    height: 250,
    borderRadius: 100,
    backgroundColor: "#393e46",
    zIndex: -1,
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
  // club__info__offline: {
  //   flex: 1,
  //   alignSelf: "stretch",
  //   textAlign: "center",
  //   flexDirection: "column",
  //   padding: 8,
  //   paddingVertical: 20,
  //   marginVertical: 20,
  //   opacity: 0.2,
  // },
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
  club__options__isActive: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "black",
  },
});