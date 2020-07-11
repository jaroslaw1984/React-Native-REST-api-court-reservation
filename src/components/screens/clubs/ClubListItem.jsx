import React from "react";
import ClubCard from "./ClubCard";

const ClubListItem = ({ nav, data }) => {
  return <ClubCard nav={nav} data={data} />;
};

export default ClubListItem;
