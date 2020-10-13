import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

const ClubLocationModal = ({
  onClose,
  title,
  data,
  clearData,
  handleSelectedId,
}) => {
  const [selectedIcon, setSelectedIcon] = useState("map-marker-radius");

  const cardSubtitle = "wybierz z listy...";

  const iconName = () => {
    if (title === "Województwo") {
      setSelectedIcon("map-marker-radius");
    } else if (title === "Miasto") {
      setSelectedIcon("city");
    } else if (title === "Dzielnica") {
      setSelectedIcon("home-city");
    }
  };

  useEffect(() => {
    iconName();
  }, []);

  const Item = ({ name, onPress }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{name.toUpperCase()}</Text>
    // </View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <Item
        name={item.name}
        onPress={() => {
          handleSelectedId(item.id.toString());
          onClose();
        }}
      />
    );
  };
  return (
    <View style={styles.modal__containter}>
      <Card.Title
        title={title}
        subtitle={cardSubtitle}
        left={(props) => <Avatar.Icon {...props} icon={selectedIcon} />}
        right={(props) => (
          <IconButton
            {...props}
            icon="close"
            onPress={() => {
              clearData();
              onClose();
            }}
          />
        )}
      />
      <View style={styles.list__container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default ClubLocationModal;

const styles = StyleSheet.create({
  modal__containter: {
    width: Dimensions.get("window").width - 30,
    height: 480,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  list__container: {
    flex: 1,
    width: 350,
    // backgroundColor: "green",
  },
  item: {
    alignItems: "center",
    // backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
