import React, { useContext, useState } from "react";
import ClubCard from "./ClubCard";
import { FlatList } from "react-native";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";

const ClubListItem = ({ nav, data }) => {
  const [clubId, setClubId] = useState(Number);
  const { user, clubList, handleAddClub } = useContext(UserContext);

  const useFavoriteOptions = async (setOption, cardId) => {
    const id = Number.isInteger(cardId);
    const option = typeof setOption === "string";
    const cardDetails = new FormData();

    cardDetails.append("session_key", user.data.results.session_key);
    cardDetails.append("club_id", id ? cardId : null);

    if (setOption === "add") {
      await axios
        .post(
          `https://korty.org/api/clubs/bookmark/${option ? setOption : null}`,
          cardDetails
        )
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // get club id
  const getClubId = (id) => {
    setClubId(id);
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data}
      renderItem={({ item, index }) => (
        <ClubCard
          nav={nav}
          item={item}
          index={index}
          key={item.id}
          clubId={getClubId}
          clubListActive={clubList}
          onAdd={useFavoriteOptions}
          addClub={handleAddClub}
        />
      )}
    />
  );
};

export default ClubListItem;
