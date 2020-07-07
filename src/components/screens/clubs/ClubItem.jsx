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

const ClubItem = ({ nav, data }) => {
  return (
    <View style={styles.club__container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("Informacje o klubie", { url: item.url })
            }
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
              <View
                style={
                  item.status === 1
                    ? styles.club__info
                    : styles.club__info__offline
                }
              >
                <Text style={styles.club__name}>{item.name}</Text>
                <Text>
                  {item.city_name} ({item.district_name})
                </Text>
                <Text>{item.address}</Text>
              </View>
              <View style={styles.club__status}>
                <View
                  style={
                    item.status === 1
                      ? styles.club__isOnline
                      : styles.club__isOffline
                  }
                ></View>
                <Text>{item.status === 1 ? "Online" : "Offline"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Zobacz wszystkie kluby"
        onPress={() => nav.navigate("Lista")}
      />
    </View>
  );
};
export default ClubItem;

const styles = StyleSheet.create({
  club__container: {
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  club__item: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
  },
  club__container__img: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#62929a",
    overflow: "hidden",
  },
  club__container__img__offline: {
    borderWidth: 2,
    borderRadius: 50,
    overflow: "hidden",
    opacity: 0.3,
  },
  club__img: {
    width: 80,
    height: 80,
  },
  club__info: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  club__info__offline: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
    opacity: 0.2,
  },
  loading_Indicator: {
    flex: 1,
    justifyContent: "center",
  },
  club__status: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  club__name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
