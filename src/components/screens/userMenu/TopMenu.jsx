import React from "react";
import { Image, StyleSheet, View, Dimensions, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserIcon from "./UserIcon";

const TopMenu = ({ navigation }) => {
  return (
    <React.Fragment>
      <View style={styles.header}>
        <View style={styles.logoContent}>
          <TouchableOpacity onPress={() => navigation.navigate("Kluby")}>
            <Image
              source={require("../../../../assets/logo.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          {/* The notification button will be active at future version */}
          {/* <TouchableOpacity>
            <Ionicons
              name="ios-notifications"
              size={35}
              color="#40514e"
              style={styles.iconNotification}
            />
          </TouchableOpacity> */}
          <UserIcon navigation={navigation} />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1
    width: Platform.OS === "ios" ? Dimensions.get("window").width : null,
    flexDirection: "row",
    marginHorizontal: -16,
  },
  logoContent: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 50,
    paddingLeft: 190,
    resizeMode: "cover",
  },
  iconsContainer: {
    // flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#0000",
  },
  iconNotification: {
    marginRight: 20,
  },
});
export default TopMenu;
