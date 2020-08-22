import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const Gameplay = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rozgrywki";

  return <WebviewStructure nav={nav} url={url} />;
};

export default Gameplay;
