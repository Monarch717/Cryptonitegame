import classes from "./FarmContent.module.css";
import React from "react";
import booster from "./footerImages/boost.png";
import dinamtite from "./footerImages/dinamite.png";
const ContentFooter = ({ data }) => {
  let smallPotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/small.png";
  let mediumPotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/medium.png";
  let greaterPotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/greater.png";
  let commonPotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/common.png";
  let rarePotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/rare.png";
  let uncommonPotion =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/uncommon.png";

  return (
    <div className={classes.contentFooter}>
      <div className={classes.potionsWrapper}>
        <div className={classes.potions}>
          <div className={classes.potion}>
            <img src={smallPotion} alt="" />
            <p className={classes.potionNumber}>{data.small_potions}</p>
          </div>
          <div className={classes.potion}>
            <img src={mediumPotion} alt="" />
            <p className={classes.potionNumber}>{data.medium_potions}</p>
          </div>
          <div className={classes.potion}>
            <img src={greaterPotion} alt="" />
            <p className={classes.potionNumber}>{data.greater_potions}</p>
          </div>
          <div className={classes.potion}>
            <img src={commonPotion} alt="" />
            <p className={classes.potionNumber}>{data.common_picks}</p>
          </div>
          <div className={classes.potion}>
            <img src={uncommonPotion} alt="" />
            <p className={classes.potionNumber}>{data.uncommon_picks}</p>
          </div>
          <div className={classes.potion}>
            <img src={rarePotion} alt="" />
            <p className={classes.potionNumber}>{data.rare_picks}</p>
          </div>
          <div className={classes.potion}>
            <img src={booster} alt="" />
            <p className={classes.potionNumber}>{data.boosters}</p>
          </div>
          <div className={classes.potion}>
            <img src={dinamtite} alt="" />
            <p className={classes.potionNumber}>{data.dynamites}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFooter;
