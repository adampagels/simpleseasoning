import React from "react";

const Button = ({ onClick, text, wrapperID, buttonID }) => {
  return (
    <div id={wrapperID}>
      <button id={buttonID} onClick={(event) => onClick(event)}>
        {text}
      </button>
    </div>
  );
};

export default Button;
