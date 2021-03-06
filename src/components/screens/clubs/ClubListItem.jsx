import React, { useContext, useState, useRef } from "react";
import { FlatList, Animated, StyleSheet, Alert, Text } from "react-native";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import ClubCardList from "./ClubCardList";
import ClubAlertModal from "./ClubAlertModal";
import {
  Searchbar,
  Button,
  Modal,
  Portal,
  Provider,
  Paragraph,
  Dialog,
} from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../../../styles/global";

const ClubListItem = ({ nav, data }) => {
  // remove club modal
  const [modalActive, setModalActive] = useState(false);
  // get club id
  const [clubId, setClubId] = useState(Number);
  // get club name
  const [clubName, setClubName] = useState(String);
  // search bar
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const {
    user,
    handleAddClub,
    userClubs,
    handleRemoveClub,
    logout,
    handleSetProvince,
    handleSetCitys,
  } = useContext(UserContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // hook that open modal
    setModalActive(true);
  };

  const handleCloseModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      // hook that close modal
      setModalActive(false);
    }, 500);
  };

  // get club id
  const getClubId = (id) => {
    setClubId(id);
  };

  // get club name
  const getClubName = (name) => {
    setClubName(name);
  };

  // get user location from api
  const getUserLocation = user.data.results.location.name;

  // this function allow to add or delete club from API depends what attribute were pass in setOption
  const useFavoriteOptions = async (setOption, cardId) => {
    const id = Number.isInteger(cardId);
    const option = typeof setOption === "string";
    const cardDetails = new FormData();

    cardDetails.append("session_key", user.data.results.session_key);
    cardDetails.append("club_id", id ? cardId : null);

    if (setOption === "add") {
      await axios
        .post(
          `https://korty.org/api/clubs/bookmark/${option ? setOption : null}`,
          cardDetails
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            return response;
          } else {
            Alert.alert("Wystąpił błąd!", response.data.error.message),
              [
                {
                  text: "OK",
                },
              ];
            logout();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (setOption === "remove") {
      await axios
        .post(
          `https://korty.org/api/clubs/bookmark/${option ? setOption : null}`,
          cardDetails
        )
        .then((response) => {
          if (response.data.error_code === 0) {
            handleRemoveClub(cardId);
          } else {
            Alert.alert("Wystąpił błąd!", response.data.error.message),
              [
                {
                  text: "OK",
                },
              ];
            logout();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* set location and search bar component*/}
      <View style={styles.navButtonConteiner}>
        {/* Select clubs location button. Future update */}
        {/* <View style={styles.setLocationConteiner}>
          <Button
            icon="map-marker"
            mode="contained"
            onPress={() => {
              nav.navigate("Zmiana lokalizacji");
              handleSetProvince();
              handleSetCitys();
            }}
            style={styles.setLocationButton}
          >
            {getUserLocation === "" ? "LOKALIZACJA" : getUserLocation}
          </Button>
        </View> */}
        {/* Searchbar for future update */}
        {/* <View style={styles.searchBarConteiner}>
          <Searchbar
            placeholder="Szukaj"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View> */}
      </View>

      {/* show all clubs at selected location */}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={({ item, index }) => (
          <ClubCardList
            nav={nav}
            item={item}
            index={index}
            key={item.id}
            clubId={getClubId}
            addToApi={useFavoriteOptions}
            onModal={handleOpenModal}
            clubId={getClubId}
            clubName={getClubName}
            addClub={handleAddClub}
            favoriteClub={userClubs}
            onRemove={handleRemoveClub}
          />
        )}
      />

      {modalActive && (
        <Animated.View
          style={[
            styles.alertModal,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ClubAlertModal
            onDelete={useFavoriteOptions}
            onClose={handleCloseModal}
            clubId={clubId}
            clubName={clubName}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default ClubListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.mainBackgroundColor.backgroundColor,
  },
  navButtonConteiner: {
    // settings with searchBar
    // flexDirection: "row",
    // marginVertical: 10,
    // marginHorizontal: 10,
    // alignItems: "center",
    //
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  setLocationConteiner: {
    // settings with searchBar
    // flex: 1,
  },
  setLocationButton: {
    // settings with searchBar
    // flex: 1,
    // justifyContent: "center",
  },
  searchBarConteiner: {
    flex: 1,
    marginLeft: 10,
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
