import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Button, Avatar, Card, IconButton } from "react-native-paper";
import { UserContext } from "../../context/UserProvider";
import { globalStyles } from "../../../../styles/global";
import axios from "axios";

const ClubLocationModal = ({ onClose, title }) => {
  const [selectedIcon, setSelectedIcon] = useState("map-marker-radius");

  const cardSubtitle = "wybierz z listy...";

  const iconName = () => {
    if (title === "Województwo") {
      setSelectedIcon("map-marker-radius");
    } else if (title === "Miasto") {
      setSelectedIcon("city");
    } else if (title === "Dzielnica") {
      setSelectedIcon("home-city");
    }
  };

  useEffect(() => {
    iconName();
  }, []);

  return (
    <View style={styles.modal__containter}>
      <Card.Title
        title={title}
        subtitle={cardSubtitle}
        left={(props) => <Avatar.Icon {...props} icon={selectedIcon} />}
        right={(props) => (
          <IconButton {...props} icon="close" onPress={() => onClose()} />
        )}
      />
    </View>
  );
};

export default ClubLocationModal;

const styles = StyleSheet.create({
  modal__containter: {
    width: Dimensions.get("window").width - 30,
    height: 480,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modal__warning__icon: {
    alignSelf: "center",
    padding: 10,
    marginLeft: 10,
  },
  modal__text: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  innterText: {
    fontWeight: "bold",
  },
  modal__navBtn: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
