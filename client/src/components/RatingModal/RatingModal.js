import React, { useState } from "react";
import Modal from "react-modal";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { fetchSingleRecipe } from "../../redux/slices/recipe/fetchSingleRecipe";
import { useDispatch, useSelector } from "react-redux";

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
        <button onClick={closeModal}>close</button>
        <button onClick={() => postRating()}>Submit</button>
        <div>I am a modal</div>
      </Modal>
    </>
  );
};

export default RatingModal;
