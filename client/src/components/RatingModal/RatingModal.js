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
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");

const RatingModal = ({ recipeID }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [recipeRating, setRecipeRating] = useState(null);
  const { loading, hasErrors } = useSelector(
    (state) => state.fetchSingleRecipe
  );
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={openModal} style={{ zIndex: 999 }}>
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rating Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <div style={{ display: "flex", flexFlow: "row-reverse" }}>
          <Rating
            emptySymbol={<FontAwesomeIcon icon={farStar} />}
            fullSymbol={<FontAwesomeIcon icon={faStar} />}
            initialRating={recipeRating}
            onClick={(value) => setRecipeRating(value)}
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
