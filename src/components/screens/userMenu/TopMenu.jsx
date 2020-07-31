import React, { useContext } from "react";
import { Image, StyleSheet, View, Dimensions, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../context/UserProvider";

const TopMenu = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const userIcon = user.data.results.logo_src;

  return (
    <React.Fragment>
      <View style={styles.header}>
        <View style={styles.logoContent}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Ionicons
              name="ios-notifications"
              size={35}
              color="#40514e"
              style={styles.iconNotification}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            {userIcon ? (
              <Image source={{ uri: userIcon }} style={styles.iconUserTrue} />
            ) : (
              <FontAwesome
                name="user-circle"
                size={35}
                color="#40514e"
                style={styles.iconUserFalse}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: Platform.OS === "ios" ? Dimensions.get("window").width : null,
    flexDirection: "row",
  },
  logoContent: {
    flex: 1,
  },
  logo: {
    flex: 1,
    width: 120,
    height: 70,
    paddingLeft: 170,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconUserFalse: {
    flex: 1,
    alignSelf: "flex-end",
  },
  iconUserTrue: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#40514e",
    marginRight: 10,
  },
  iconNotification: {
    flex: 1,
    marginRight: 20,
  },
});
export default TopMenu;
