import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const LearningGame = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/nauka";

  return <WebviewStructure nav={nav} url={url} />;
};

export default LearningGame;
