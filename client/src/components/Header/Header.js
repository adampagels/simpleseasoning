import React from "react";
import { motion } from "framer-motion";

const Header = ({ headerText }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    type: "spring",
    ease: "anticipate",
    duration: 0.6,
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 id="page-header">{headerText}</h1>{" "}
    </motion.div>
  );
};

export default Header;
