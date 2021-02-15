import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { fetchSingleRecipe } from "../../redux/slices/recipe/fetchSingleRecipe";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: "500px",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");

const RatingModal = ({ recipeID, modalIsOpen, closeModal, recipeTitle }) => {
  const [recipeRating, setRecipeRating] = useState(null);
  const [ratingDescription, setRatingDescription] = useState(null);
  const dispatch = useDispatch();

  const postRating = async () => {
    const accessToken = localStorage.getItem("auth-token");
    try {
      const response = await axios.post(
        `http://localhost:5000/rating/${recipeID}`,
        { stars: recipeRating },
        {
          headers: {
            "auth-token": `${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      dispatch(fetchSingleRecipe(recipeID));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recipeRating === 5) {
      setRatingDescription("It was amazing!");
    } else if (recipeRating === 4) {
      setRatingDescription("It was very good.");
    } else if (recipeRating === 3) {
      setRatingDescription("It was just okay.");
    } else if (recipeRating === 2) {
      setRatingDescription("It was medicore.");
    } else if (recipeRating === 1) {
      setRatingDescription("It was inedible.");
    } else {
      setRatingDescription(null);
    }
  }, [recipeRating]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rating Modal"
      >
        <h2
          style={{
            fontSize: "calc(min(12vw, 65px))",
            margin: "30px 0px",
            textAlign: "center",
          }}
        >
          {recipeTitle}
        </h2>
        <div
          style={{
            display: "flex",
            flexFlow: "row-reverse",
            justifyContent: "center",
          }}
        >
          <Rating
            emptySymbol={<FontAwesomeIcon icon={farStar} />}
            fullSymbol={<FontAwesomeIcon icon={faStar} />}
            initialRating={recipeRating}
            onClick={(value) => setRecipeRating(value)}
            style={{ color: "#d54217", fontSize: "calc(min(8vw, 50px))" }}
          />
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={closeModal}
          className="ratingmodal-close-icon"
        />
        <p class="ratingmodal-rating-description">{ratingDescription}</p>
        <Button
          onClick={() => recipeRating && postRating()}
          text={"Submit"}
          buttonID={"ratingmodal-button"}
          wrapperID={"ratingmodal-button-wrapper"}
          disabled={!recipeRating ? true : false}
        />
      </Modal>
    </>
  );
};

export default RatingModal;
