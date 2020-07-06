import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Button,
  FlatList,
} from "react-native";
import { UserContext } from "../../context/UserProvider";

const Clubs = ({ nav }) => {
  const { user } = useContext(UserContext);
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const url = "https://korty.org/api/clubs/bookmark/show";

      const userSessionKey = new FormData();

      userSessionKey.append("session_key", user.data.results.session_key);

      await axios
        .post(url, userSessionKey)
        .then((respond) => setUserClubs(respond.data.results))
        .catch((err) => {
          console.error(err);
        });
    };
    fetchClubs();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Lista klubów</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={userClubs}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Button
        title="Zobacz wszystkie kluby"
        onPress={() => nav.navigate("Lista")}
      />
    </View>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
