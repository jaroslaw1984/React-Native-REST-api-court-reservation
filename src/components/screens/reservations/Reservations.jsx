import React from "react";
import WebviewBottomStructure from "../../routes/WebviewBottomStructure";

const Reservations = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/moje-rezerwacje";

  return <WebviewBottomStructure nav={nav} url={url} />;
};

export default Reservations;
