import React from "react";
import WebviewBottomStructure from "../../routes/WebviewBottomStructure";

const LearningGame = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/nauka";

  return <WebviewBottomStructure nav={nav} url={url} />;
};

export default LearningGame;
