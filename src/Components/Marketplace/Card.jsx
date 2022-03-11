import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";

const Card = ({ type, rarity, price, idNum }) => {
  let token =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Cryptonite_internal_token.png";
  //   const type = 1;
  //   const rarity = 6;
  //   const idNum = "ID NUMBER";
  //   const price = 1350;
  const [rarityName, setRarityName] = useState(null);
  useEffect(() => {
    rarity === 1
      ? setRarityName("COMMON")
      : rarity === 2
      ? setRarityName("UNCOMMON")
      : rarity === 3
      ? setRarityName("RARE")
      : rarity === 4
      ? setRarityName("MYTHICAL")
      : rarity === 5
      ? setRarityName("LEGENDARY")
      : setRarityName("EPIC");
  }, []);
  return (
    <div className={`${classes.wrapper} ${classes.fcc}`}>
      <img
        src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/aliens/${type}-${rarity}.png`}
      />
      <div className={classes.content}>
        <div className={`${classes.idNumber} ${classes.fcc}`}>
          <p>{idNum}</p>
        </div>
        <p className={classes.rarityName}>{rarityName}</p>
        <div className={classes.priceDiv}>
          <img src={token} style={{ width: "34px", height: "23px" }} />
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
