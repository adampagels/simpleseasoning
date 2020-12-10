import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({
  solidIcon,
  regularIcon,
  ratings,
  className,
  secondRegularIcon,
}) => {
  const averageRatings =
    ratings && ratings.reduce((x, y) => x + y.stars, 0) / ratings.length;

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
          <FontAwesomeIcon className={className} icon={solidIcon} />
        ) : (
          <FontAwesomeIcon className={className} icon={regularIcon} />
        )
      )}
    </>
  );
  return (
    <>
      {ratingStars}
      <FontAwesomeIcon className={className} icon={secondRegularIcon} />
    </>
  );
};

export default Icon;
