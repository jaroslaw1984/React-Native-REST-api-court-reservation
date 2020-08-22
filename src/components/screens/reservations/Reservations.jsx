import React from "react";
import Webviewtructure from "../../routes/WebviewStructure";

const Reservations = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/moje-rezerwacje";

  return <WebviewStructure nav={nav} url={url} />;
};

export default Reservations;
