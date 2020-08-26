import React from "react";
import WebviewStructure from "../../routes/WebviewStructure";

const Reservations = ({ nav }) => {
  const url = "https://korty.org/logowanie/mobile?page=/moje-rezerwacje";

  const name = "Rezerwacje";

  return <WebviewStructure nav={nav} url={url} name={name} />;
};

export default Reservations;
