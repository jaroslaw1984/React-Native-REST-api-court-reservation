import React, { useContext, useState, useRef } from "react";
import { FlatList, Animated, StyleSheet, Alert } from "react-native";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import ClubCardList from "./ClubCardList";
import ClubAlertModal from "./ClubAlertModal";

const ClubListItem = ({ nav, data }) => {
  const [modalActive, setModalActive] = useState(false);
  const [clubId, setClubId] = useState(Number);
  const [clubName, setClubName] = useState(String);

  const { user, handleAddClub, userClubs, handleRemoveClub } = useContext(
    UserContext
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setModalActive(true);
  };

  const handleCloseModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
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
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ClubListItem;

const styles = StyleSheet.create({
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
