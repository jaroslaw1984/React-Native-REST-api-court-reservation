import React from "react";
import { View, Button, StyleSheet, Text, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ClubAlertModal = ({ onClose, onDelete, clubId, clubName }) => {
  return (
    <View style={styles.modal__containter}>
      <View style={styles.modal__warning__icon}>
        <AntDesign name="warning" size={40} color="#f85959" />
      </View>
      <View style={styles.modal__body}>
        <Text style={styles.modal__text}>
          Czy na pewno chcesz usunąć{" "}
          <Text style={styles.innterText}>{`${clubName}`}</Text> z ulubionych ?
        </Text>
      </View>
      <View style={styles.modal__navBtn}>
        <Button title="Anuluj" onPress={() => onClose()} />
        <Button
          title="Usuń"
          onPress={() => {
            onDelete("remove", clubId);
            onClose();
          }}
        />
      </View>
    </View>
  );
};

export default ClubAlertModal;

const styles = StyleSheet.create({
  modal__containter: {
    width: Dimensions.get("window").width - 30,
    height: 180,
    justifyContent: "center",
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
    width: "50%",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
});
