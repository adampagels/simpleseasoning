import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarIcon = ({ icon, ratings, solidClassName, regularClassName }) => {
  const averageRatings =
    ratings &&
    ratings.length > 0 &&
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
      {starIconArray.map(
        (star) =>
          icon && (
            <FontAwesomeIcon
              className={star === "solid" ? solidClassName : regularClassName}
              icon={icon}
            />
          )
      )}
    </>
  );
  return <>{ratingStars}</>;
};

export default StarIcon;
