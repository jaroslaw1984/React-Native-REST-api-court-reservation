import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const Leaderboard = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rankingi";

  return <WebviewStructure nav={nav} url={url} />;
};

export default Leaderboard;
