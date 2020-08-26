import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const Leaderboard = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rankingi";

  const name = "Rankingi";

  return <WebviewStructure nav={nav} url={url} name={name} />;
};

export default Leaderboard;
