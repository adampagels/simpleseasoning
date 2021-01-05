import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeartIcon = ({ regularIcon, className }) => {
  return (
    <>
      <FontAwesomeIcon
        className={className}
        icon={regularIcon && regularIcon}
      />
    </>
  );
};

export default HeartIcon;
