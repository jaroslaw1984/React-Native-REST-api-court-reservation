import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const LearningGame = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/nauka";

  const name = "Nauka gry";

  return <WebviewStructure nav={nav} url={url} name={name} />;
};

export default LearningGame;
