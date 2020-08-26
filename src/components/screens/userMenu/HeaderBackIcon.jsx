import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const HeaderBackIcon = ({ navigation }) => {
  return (
    <View
      style={{
        marginLeft: 10,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Kluby")}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBackIcon;
