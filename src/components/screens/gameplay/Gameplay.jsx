import React from "react";
import WebviewBottomStructure from "../../routes/WebviewBottomStructure";

const Gameplay = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rozgrywki";

  return <WebviewBottomStructure nav={nav} url={url} />;
};

export default Gameplay;
