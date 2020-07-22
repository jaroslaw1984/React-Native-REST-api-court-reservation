import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { UserContext } from "../../context/UserProvider";

const DrawerContent = (props) => {
  const { logout } = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      {/* Deleting DrawerItemList all list of links will desaper */}
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
