import React, { useState, useEffect } from "react";
import classes from "./Style.module.css";

let rarityC =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-rarity-c.svg";
let rarityUc =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-rarity-uc.svg";

const Rarity = ({ rarityCriteriaHandler, rarities }) => {
  const [checkedRarity, setCheckedRarity] = useState({});
  useEffect(() => {
    setCheckedRarity(rarities);
  }, [rarities]);

  return (
    <div className={classes.rarityDiv}>
      <p>RARITY</p>
      <div className={classes.raritySelector}>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              !rarities.common,
              rarities.uncommon,
              rarities.rare,
              rarities.mythical,
              rarities.legendary,
              rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.common === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Common</p>
        </div>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              rarities.common,
              !rarities.uncommon,
              rarities.rare,
              rarities.mythical,
              rarities.legendary,
              rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.uncommon === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Uncommon</p>
        </div>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              rarities.common,
              rarities.uncommon,
              !rarities.rare,
              rarities.mythical,
              rarities.legendary,
              rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.rare === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Rare</p>
        </div>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              rarities.common,
              rarities.uncommon,
              rarities.rare,
              !rarities.mythical,
              rarities.legendary,
              rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.mythical === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Mythical</p>
        </div>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              rarities.common,
              rarities.uncommon,
              rarities.rare,
              rarities.mythical,
              !rarities.legendary,
              rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.legendary === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Legendary</p>
        </div>
        <div
          className={classes.raritySelect}
          onClick={() =>
            rarityCriteriaHandler(
              rarities.common,
              rarities.uncommon,
              rarities.rare,
              rarities.mythical,
              rarities.legendary,
              !rarities.epic
            )
          }
        >
          <img
            src={checkedRarity.epic === true ? rarityC : rarityUc}
            alt="Select Rarity"
          />
          <p>Epic</p>
        </div>
      </div>
    </div>
  );
};

export default Rarity;
