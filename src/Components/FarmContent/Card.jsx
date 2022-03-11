import classes from "./FarmContent.module.css";
import btnBkg from "../../Assets/Images/farm/eggs/btnBkg.svg";

const Card = ({ data, open }) => {
  const openCard = () => {
    open(data);
  };
  return (
    <div
      onClick={
        data.type === "packs" || data.type === "eggs" ? () => {} : openCard
      }
      className={`${classes.cardWrapper} ${
        data.type === "eggs" && data.kind === "rare" && classes.cardWrapperRare
      } ${
        data.type === "aliens" &&
        (data.kind === "water"
          ? classes.cardWrapperAlienWater
          : data.kind === "fire"
          ? classes.cardWrapperAlienFire
          : classes.cardWrapperAlienGreen)
      } ${
        data.type === "packs" &&
        (data.kind === "bp"
          ? classes.cardWrapperBP
          : data.kind === "bp+"
          ? classes.cardWrapperBPPlus
          : data.kind === "bpo"
          ? classes.cardWrapperBPO
          : data.kind === "bpg"
          ? classes.cardWrapperBPG
          : data.kind === "bpi"
          ? classes.cardWrapperBPI
          : null)
      }`}
    >
      {data.type === "aliens" ? (
        <img
          src={require(`../../Assets/Images/farm/aliens/${data.kind}-pearl.png`)}
          className={classes.cardAlienPearl}
        />
      ) : null}
      <div
        className={`${classes.card} ${
          data.type === "eggs" &&
          (data.kind === "rare" ? classes.cardEggRare : classes.cardEggCommon)
        } ${
          data.type === "aliens" &&
          (data.kind === "water"
            ? classes.cardAlienWater
            : data.kind === "fire"
            ? classes.cardAlienFire
            : classes.cardAlienGreen)
        } ${data.type === "packs" && classes.cardBoosterPack}`}
      >
        <img
          src={require(`../../Assets/Images/farm/${data.type}/${data.image}.png`)}
          alt={data.image}
          className={classes.cardImage}
        />
        {data.type === "eggs" || data.type === "packs" ? (
          <div className={classes.cardButton}>
            <img src={btnBkg} alt="Open" className={classes.cardButtonBkg} />
            <p className={classes.cardButtonText}>OPEN</p>
          </div>
        ) : null}
      </div>
      {data.type === "aliens" ? (
        <div className={classes.cardButtonAlien}>
          <img src={btnBkg} alt="Open" className={classes.cardButtonAlienBkg} />
          <p className={classes.cardButtonAlienText}>OPEN</p>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
