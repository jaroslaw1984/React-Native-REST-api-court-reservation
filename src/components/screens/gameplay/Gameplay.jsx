import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const Gameplay = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rozgrywki";

  const name = "Nauka gry";

  return <WebviewStructure nav={nav} url={url} name={name} />;
};

export default Gameplay;
