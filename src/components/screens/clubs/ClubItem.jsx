import React, { useState, useContext, useRef } from "react";
import { StyleSheet, View, Text, FlatList, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCard from "./ClubCard";
import ClubAlertModal from "./ClubAlertModal";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";

const ClubItem = ({ nav, data, onRemove, onAdd }) => {
  const [modalActive, setModalActive] = useState(false);
  const [clubId, setClubId] = useState(Number);
  const [clubName, setClubName] = useState(String);

  const { user, clubListScreenActive } = useContext(UserContext);

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

    if (setOption === "remove") {
      await axios
        .post(
          `https://korty.org/api/clubs/bookmark/${option ? setOption : null}`,
          cardDetails
        )
        .catch((err) => {
          console.error(err);
        });

      onRemove(cardId);
    }
  };

  return (
    <React.Fragment>
      {/* this condition need to be here for button at the bottom */}
      {data === "" ? (
        <Text>Nie posiadasz ulubionych klubów</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          renderItem={({ item }) => (
            <ClubCard
              nav={nav}
              item={item}
              key={item.id}
              onRemove={onRemove}
              onAdd={useFavoriteOptions}
              onModal={handleOpenModal}
              clubId={getClubId}
              clubName={getClubName}
              onAdd={onAdd}
            />
          )}
        />
      )}
      <View style={styles.button__container}>
        <View style={styles.button__add}>
          <Ionicons
            style={styles.button__icon}
            onPress={() => {
              nav.navigate("Lista klubów");
              clubListScreenActive();
            }}
            name="ios-search"
            size={28}
            color="#fff"
          />
        </View>
      </View>
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
export default ClubItem;

const styles = StyleSheet.create({
  button__container: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  button__add: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#2f89fc",
    justifyContent: "center",
    alignItems: "center",
  },
  button__icon: {
    color: "#fff",
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
