import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeartIcon = ({ regularIcon, className, onClick }) => {
  return (
    <>
      <FontAwesomeIcon
        className={className}
        icon={regularIcon && regularIcon}
        onClick={() => onClick()}
      />
    </>
  );
};

export default HeartIcon;
