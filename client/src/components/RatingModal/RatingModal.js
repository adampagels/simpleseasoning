import React, { useState } from "react";
import Modal from "react-modal";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const RatingModal = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [recipeRating, setRecipeRating] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {console.log(recipeRating)}
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
        <div>I am a modal</div>
      </Modal>
    </>
  );
};

export default RatingModal;
