import React, { useContext } from "react";
import WebviewStructure from "../../routes/WebviewStructure";
import { UserContext } from "../../context/UserProvider";

const Gameplay = ({ nav }) => {
  const { user } = useContext(UserContext);

  const location = user.data.results.location.link;
  const url = `https://korty.org/logowanie/mobile?page=/rozgrywki${location}`;
  const name = "Rozgrywki";

  return <WebviewStructure nav={nav} url={url} name={name} />;
};

export default Gameplay;
