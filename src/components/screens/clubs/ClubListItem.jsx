import React from "react";
import ClubCard from "./ClubCard";
import { FlatList } from "react-native";

const ClubListItem = ({ nav, data }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={data}
      numColumns={2}
      renderItem={({ item }) => (
        <ClubCard nav={nav} item={item} key={item.id} />
      )}
    />
  );
};

export default ClubListItem;
