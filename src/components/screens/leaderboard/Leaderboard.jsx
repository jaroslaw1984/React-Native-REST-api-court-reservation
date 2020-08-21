import React from "react";
import WebviewBottomStructure from "../../routes/WebviewBottomStructure";

const Leaderboard = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/rankingi";

  return <WebviewBottomStructure nav={nav} url={url} />;
};

export default Leaderboard;
