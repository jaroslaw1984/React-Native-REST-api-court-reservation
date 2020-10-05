import React, { useContext, useState, useRef } from "react";
import { View, StyleSheet, Text, Dimensions, Animated } from "react-native";
import { Button, List, RadioButton } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";
import axios from "axios";
import ClubLocationModal from "./ClubLocationModal";

const ChangeClubsLocation = () => {
  // location modal
  const [modalLocation, setModalLocation] = useState(false);
  // input selected and put in to state
  const [selectedItem, setSelectedItem] = useState("");

  // input titles
  const province = "Województwo";
  const city = "Miasto";
  const district = "Dzielnica";

  // const fetchAllClubs = async () => {
  //   const getAllClubs = new FormData();

  //   getAllClubs.append("session_key", user.data.results.session_key);
  //   getAllClubs.append("location_level", user.data.results.location.level);
  //   getAllClubs.append("location_id", user.data.results.location.id);

  //   await axios
  //     .post("https://korty.org/api/clubs/show", getAllClubs)
  //     .then((respond) => {
  //       handleSearchClubs(respond.data.results);
  //       handleLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleOpenLocationModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setModalLocation(true);
  };

  const handleCloseLocationModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setModalLocation(false);
    }, 500);
  };

  return (
    // Change location container
    <View style={styles.containter}>
      <View style={styles.list_content}>
        {/* Province content*/}
        <View style={styles.list_item}>
          <List.Item
            title={province}
            left={(props) => <List.Icon {...props} icon="map-marker-radius" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(province);
                }}
              >
                Kujawsko-Pomorskie
              </Button>
            </View>
            <View>
              <Button
                icon="map-search-outline"
                mode="contained"
                disabled
                labelStyle={{}}
                style={styles.list_input_button_rightSide}
              ></Button>
            </View>
          </View>
        </View>
        {/* -------------------------------------------------- */}

        {/* City content*/}
        <View style={styles.list_item}>
          <List.Item
            title={city}
            left={(props) => <List.Icon {...props} icon="city" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(city);
                }}
              >
                Włocławek
              </Button>
            </View>
            <View>
              <Button
                icon="map-search-outline"
                mode="contained"
                disabled
                style={styles.list_input_button_rightSide}
              ></Button>
            </View>
          </View>
        </View>
        {/* -------------------------------------------------- */}

        {/* District content */}
        <View style={styles.list_item}>
          <List.Item
            title={district}
            left={(props) => <List.Icon {...props} icon="home-city" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(district);
                }}
              >
                Wszystkie
              </Button>
            </View>
            <View>
              <Button
                icon="map-search-outline"
                mode="contained"
                disabled
                style={styles.list_input_button_rightSide}
              ></Button>
            </View>
          </View>
        </View>
        {/* -------------------------------- */}

        {/* Save button content */}
        <View style={styles.list__saveBtn}>
          <Button
            mode="contained"
            color={globalStyles.buttonConf.color}
            onPress={() => console.log("Zmiany zapisane")}
            uppercase={false}
          >
            Zapisz zmiany
          </Button>
        </View>
      </View>
      {/* ----------------------------- */}

      {/* Modal content */}
      {modalLocation && (
        <Animated.View
          style={[
            styles.alertModal,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ClubLocationModal
            onClose={handleCloseLocationModal}
            title={selectedItem}
          />
        </Animated.View>
      )}
      {/* -------------- */}
    </View>
  );
};

export default ChangeClubsLocation;

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    padding: 20,
  },
  list_content: {
    flex: 1,
    alignItems: "center",
  },
  list_item: {
    width: Dimensions.get("screen").width - 40,
  },
  list_input_content: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  list_input_button: {
    flex: 1,
  },
  list_input_button_rightSide: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  list__saveBtn: {
    flex: 1,
    justifyContent: "flex-end",
  },
  alertModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(87, 81, 81, 0.3)",
  },
});
