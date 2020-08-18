import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../screens/drawerContent/DrawerContent";

const Drawer = createDrawerNavigator();

const RootDrawer = ({ bottomStack }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerPosition="right"
    >
      <Drawer.Screen name="Home" component={bottomStack} />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
