import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import Toast from "react-native-simple-toast";

const ClubCard = ({ nav, item }) => {
  const [count, setCount] = useState(0);

  // const onBackPress = () => {
  //   if (count < 1) {
  //     setCount(count + 1);
  //     Toast.showWithGravity(
  //       "Naciśnij ponownie, aby zamknąć",
  //       Toast.SHORT,
  //       Toast.BOTTOM
  //     );
  //   } else {
  //     BackHandler.exitApp();
  //     return true;
  //   }

  //   setTimeout(() => {
  //     setCount(0);
  //   }, 2000);
  // };
  // console.log(count);

  // useEffect(() => {
  //   // const backAction = () => {
  //   //   Alert.alert("Uwaga !", "Czy na pewno chcesz wyjść z aplikacji ?", [
  //   //     {
  //   //       text: "Nie",
  //   //       onPress: () => null,
  //   //     },
  //   //     { text: "Tak", onPress: () => BackHandler.exitApp() },
  //   //   ]);
  //   //   return true;
  //   // };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     onBackPress
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const useDoubleBackPressExit = () => {
    if (Platform.OS === "ios") return;
    const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
      setCount(count + 1);
      if (count < 1) {
        Toast.showWithGravity(
          "Naciśnij ponownie, aby zamknąć",
          Toast.SHORT,
          Toast.BOTTOM
        );
        backAction.remove();
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    });
    setTimeout(() => {
      setCount(0);
    }, 2000);
  };

  useDoubleBackPressExit();
  // console.log(count);

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
    marginLeft: 10,
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
    bottom: -5,
    right: 20,
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
    bottom: -5,
    right: 20,
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
