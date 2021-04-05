import React, { useEffect, useState } from "react";

const HeaderBackground = ({ page }) => {
  const [backgroundHeight, setBackgroundHeight] = useState(null);

  useEffect(() => {
    if (page === "recipe") {
      return setBackgroundHeight("big");
    } else {
      return setBackgroundHeight("small")
    }
  }, [])
  return (
    <div
      className={
        backgroundHeight === "big"
          ? "headerbackground-big"
          : "headerbackground-small"
      }
    ></div>
  );
};

export default HeaderBackground;
