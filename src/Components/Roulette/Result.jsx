import React, { useEffect, useState } from "react";
import "../../Containers/Roulette/Roulette.css";
import { motion } from "framer-motion";

const WhatName = [
  null,
  "Greater Potion",
  "Free Spin x2",
  "Common Egg",
  "Rare Egg",
  "Small Potion",
  "Free Spin",
  "Medium Potion",
  "Dynamite",
  "Mining Boost",
];

const Result = ({ what, newSpin, showButton }) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    setName(WhatName[what]);
  }, [what]);
  return what !== null ? (
    <div className="resultContainer">
      <div className="whatWon fcc">
        <p>You WON A {name}!</p>
      </div>
      <motion.img
        className="resultPrize"
        animate={{
          scale: [1, 0, 1, 0.95, 1],
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          duration: 1,
        }}
        // src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/prizes/${what}-l.png`}
        src={require(`./prizes/${what}-l.png`).default}
        alt={name}
      />
      {
      showButton ? 
        <div className="spinAgain fcc" onClick={newSpin}>
          <img
            src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/btn.png`}
            alt="Spin Again"
          />
          <p>SPIN AGAIN</p>
        </div>
        : null
      }
    </div>
  ) : null;
};

export default Result;
