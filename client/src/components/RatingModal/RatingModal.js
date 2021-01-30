import React, { useState } from "react";
import Modal from "react-modal";
import StarIcon from "../Icon/StarIcon";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rating Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <div style={{ display: "flex", flexFlow: "row-reverse" }}>
          <StarIcon regularClassName={"ratingmodal-star"} icon={faStar} />
        </div>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </>
  );
};

export default RatingModal;
