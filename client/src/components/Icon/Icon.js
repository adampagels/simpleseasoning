import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ solidIcon, regularIcon, ratings }) => {
  const averageRatings =
    ratings.reduce((x, y) => x + y.stars, 0) / ratings.length;

  const starIconArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < averageRatings) {
      starIconArray.push("solid");
    } else {
      starIconArray.push("regular");
    }
  }

  const ratingStars = (
    <>
      {starIconArray.map((star) =>
        star === "solid" ? (
          <FontAwesomeIcon icon={solidIcon} />
        ) : (
          <FontAwesomeIcon icon={regularIcon} />
        )
      )}
    </>
  );
  return <>{ratingStars}</>;
};

export default Icon;
