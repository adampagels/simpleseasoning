import React from "react";

const Button = ({ onClick, text, wrapperID, buttonID, disabled }) => {
  return (
    <div id={wrapperID}>
      <button
        id={buttonID}
        onClick={(event) => onClick(event)}
        disabled={disabled ? true : false}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
