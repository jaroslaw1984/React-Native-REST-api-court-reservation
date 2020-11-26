import React, { useContext } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../../context/UserProvider";
import { Avatar } from "react-native-paper";

const UserIcon = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const userIcon = user.data.results.logo_src;

  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={{ marginRight: 15 }}
    >
      {userIcon ? (
        <Avatar.Image source={{ uri: userIcon }} size={45} />
      ) : (
        <FontAwesome
          name="user-circle"
          size={35}
          color="#40514e"
          style={Platform.OS === "ios" ? { marginRight: 10 } : null}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserIcon;
