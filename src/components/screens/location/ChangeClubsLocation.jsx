import React, { useContext, useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, Animated } from "react-native";
import { Button, List, RadioButton } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";
import axios from "axios";
import ClubLocationModal from "./ClubLocationModal";

const ChangeClubsLocation = () => {
  // location modal
  const [locationChange, setLocationChange] = useState(false);
  // input selected and put in to state
  const [selectedItem, setSelectedItem] = useState("");
  // get location
  const [locationData, setLocationData] = useState(null);

  // selected id from textInput
  const [selectedId, setSelectedId] = useState("");
  // set province in to textInput
  const [province, setProvince] = useState("");
  // set city in to textInput
  const [city, setCity] = useState("");
  // set district in to textInput
  const [district, setDistrict] = useState("");

  // input titles
  const provinceTitle = "Województwo";
  const cityTitle = "Miasto";
  const districtTitle = "Dzielnica";

  // provider
  const { user } = useContext(UserContext);
  // console.log(user);
  // console.log(selectedId);
  // console.log(locationData);

  // get user city location from API
  const getCityNameLocation = user.data.results.location.name;

  // get city id from API
  const getCityId = user.data.results.location.city_id.toString();

  // get province id from API
  const getProvinceId = user.data.results.location.province_id.toString();

  // fetch location from api. If value will be as 1-province, 2-city, 3-district
  const fetchLocation = async (value) => {
    const getLocation = new FormData();

    getLocation.append("location_level", value);
    getLocation.append("offset", 0);
    getLocation.append("limit", 0);

    await axios
      .post("https://korty.org/api/locations/download", getLocation)
      .then((respond) => {
        setLocationData(respond.data.results.locations);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // clear data location
  const handleClearDataLocation = () => {
    setLocationData(null);
  };

  // set id by selecting elemnt in textInput
  const handleSelectedId = (id) => {
    setSelectedId(id);
  };

  const handleSetProvince = async () => {
    // get all province
    let provinceData;
    // get parentId form selected province
    let parentId;

    // fetchLocation(1);
    const getLocation = new FormData();

    getLocation.append("location_level", 1);
    getLocation.append("offset", 0);
    getLocation.append("limit", 0);

    provinceData = await axios.post(
      "https://korty.org/api/locations/download",
      getLocation
    );

    // this variable filtering data and selected element by id and return name from API object
    const provinceItem = provinceData.data.results.locations.find((item) => {
      if (selectedId === "") {
        return item.id === getProvinceId;
      } else {
        setCity("Wszystkie");
        return item.id === selectedId;
      }
    });

    setProvince(provinceItem.name);

    parentId = provinceItem.parent_id;
    console.log(parentId);

    selectedId && handleSetCity(parentId);
  };

  const handleSetCity = async (id) => {
    // get all province
    let cityData;

    // fetchLocation(1);
    const getLocation = new FormData();

    getLocation.append("location_level", 2);
    getLocation.append("offset", 0);
    getLocation.append("limit", 0);

    cityData = await axios.post(
      "https://korty.org/api/locations/download",
      getLocation
    );

    // this variable filtering data and selected element by id and return name from API object
    const cityItem = cityData.data.results.locations.filter(
      (item) => item.parent_id === id
    );

    setLocationData(cityItem);
  };

  // Modal animation fade in and fade out
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleOpenLocationModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setLocationChange(true);
  };

  const handleCloseLocationModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setLocationChange(false);
    }, 500);
  };

  useEffect(() => {
    handleSetProvince();
  });

  return (
    // Change location container
    <View style={styles.containter}>
      <View style={styles.list_content}>
        {/* Province content*/}
        <View style={styles.list_item}>
          <List.Item
            title={provinceTitle}
            left={(props) => <List.Icon {...props} icon="map-marker-radius" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(provinceTitle);
                  fetchLocation(1);
                }}
              >
                {province}
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
            title={cityTitle}
            left={(props) => <List.Icon {...props} icon="city" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(cityTitle);
                  fetchLocation(2);
                }}
              >
                {selectedId === "" ? getCityNameLocation : city}
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
            title={districtTitle}
            left={(props) => <List.Icon {...props} icon="home-city" />}
          />
          <View style={styles.list_input_content}>
            <View style={styles.list_input_button}>
              <Button
                mode="text"
                onPress={() => {
                  handleOpenLocationModal();
                  setSelectedItem(districtTitle);
                  fetchLocation(3);
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
          {!locationChange && (
            <Button
              mode="contained"
              color={globalStyles.buttonConf.color}
              onPress={() => console.log("Zmiany zapisane")}
              uppercase={false}
            >
              Zapisz zmiany
            </Button>
          )}
        </View>
      </View>
      {/* ----------------------------- */}

      {/* Modal content */}
      {locationChange && (
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
            data={locationData}
            clearData={handleClearDataLocation}
            handleSelectedId={handleSelectedId}
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
