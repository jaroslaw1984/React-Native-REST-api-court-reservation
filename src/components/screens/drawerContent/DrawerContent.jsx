import React, { useContext, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Caption,
} from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { UserContext } from "../../context/UserProvider";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const DrawerContent = (props) => {
  const [language, setLanguage] = useState("PL");
  const [changeLanguage, setChangeLanguage] = useState(false);
  const { user, logout, userClubs } = useContext(UserContext);

  const name = user.data.results.name;
  const userName = user.data.results.username;
  const userIcon = user.data.results.logo_src;

  const handleLanguage = () => {
    setLanguage("EN");
  };

  const handleChangeLanguage = () => {
    setChangeLanguage(!changeLanguage);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Deleting DrawerItemList all list of links will desaper */}
        {/* <DrawerItemList {...props} /> */}
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {userIcon ? (
                <Avatar.Image
                  source={{ uri: userIcon }}
                  size={53}
                  style={styles.iconUserTrue}
                />
              ) : (
                <FontAwesome
                  name="user-circle"
                  size={35}
                  color="#40514e"
                  style={styles.iconUserFalse}
                />
              )}
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>Witaj {name}</Title>
                <Caption style={styles.caption}>@{userName}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {userClubs.length}
                </Paragraph>
                <Caption style={styles.caption}>Ulubionych klubów</Caption>
              </View>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="user-alt" size={20} color="black" />
            )}
            label="Profil gracza"
            onPress={() => {
              props.navigation.navigate("Profil gracza");
            }}
          />
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="user-cog" size={20} color="black" />
            )}
            label="Ustawienia konta"
            onPress={() => {
              props.navigation.navigate("Ustawienia konta");
            }}
          />
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="user-edit" size={20} color="black" />
            )}
            label="Panel zarządzania"
            onPress={() => props.navigation.navigate("Panel zarządzania")}
          />
        </Drawer.Section>
        <Drawer.Section title="Zmiana języka">
          <TouchableRipple
            onPress={() => {
              handleChangeLanguage();
              handleLanguage();
            }}
          >
            <View style={styles.preference}>
              <Text>{language}</Text>
              <View pointerEvents="none">
                <Switch value={changeLanguage} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <SimpleLineIcons name="logout" size={20} color="black" />}
          label="Wyloguj"
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconUserFalse: {
    flex: 1,
    alignSelf: "flex-end",
  },
});
