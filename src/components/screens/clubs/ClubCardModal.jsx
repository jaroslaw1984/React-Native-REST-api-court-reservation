import React from "react";
import { View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ClubCardModal = ({ details, close }) => {
  return (
    <View style={styles.modal__containter}>
      <View style={styles.modal__closeBtn}>
        <TouchableOpacity>
          <AntDesign
            name="close"
            size={24}
            color="#393e46"
            onPress={() => close()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.modal__navBtn}>
        <Button title="Dodaj" />
        <Button title="Usuń" />
        <Button title="Szczegóły" onPress={() => details()} />
      </View>
    </View>
  );
};

export default ClubCardModal;

const styles = StyleSheet.create({
  modal__containter: {
    flex: 1,
    width: 170,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modal__closeBtn: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  modal__navBtn: {
    width: "80%",
    height: "80%",
    justifyContent: "space-around",
    padding: 10,
  },
});
