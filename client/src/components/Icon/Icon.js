import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ solidIcon }) => {
  const stars = (
    <>
      <FontAwesomeIcon icon={solidIcon} /> <FontAwesomeIcon icon={solidIcon} />{" "}
      <FontAwesomeIcon icon={solidIcon} /> <FontAwesomeIcon icon={solidIcon} />{" "}
      <FontAwesomeIcon icon={solidIcon} />
    </>
  );
  return <>{stars}</>;
};

export default Icon;
