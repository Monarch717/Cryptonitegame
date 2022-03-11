import React from "react";
import classes from "./Style.module.css";

let acid =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Group_3.png";
let fire =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Group_2.png";
let water =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Group_1.png";

const Alien = ({ alienCriteriaHandler, aliens }) => {
  return (
    <div className={classes.alienDiv}>
      <p>ALIEN ELEMENT</p>
      <div className={classes.alienSelector}>
        <div
          className={classes.alienSelect}
          onClick={() =>
            alienCriteriaHandler(!aliens.water, aliens.acid, aliens.fire)
          }
        >
          <div
            className={`${classes.alienSelectBkgWrapper} ${classes.fcc}`}
            style={
              aliens.water
                ? {
                    background:
                      "linear-gradient(0deg, #ec7700 18.85%, #ffd600 65.22%)",
                    border: "1.14968px solid #bf4300",
                  }
                : {}
            }
          >
            <img src={water} arc="Select Acid" />
            <div className={`${classes.alienSelectBkg} ${classes.fcc}`} />
          </div>
          <p>Water</p>
        </div>
        <div
          className={classes.alienSelect}
          onClick={() =>
            alienCriteriaHandler(aliens.water, !aliens.acid, aliens.fire)
          }
        >
          <div
            className={`${classes.alienSelectBkgWrapper} ${classes.fcc}`}
            style={
              aliens.acid
                ? {
                    background:
                      "linear-gradient(0deg, #ec7700 18.85%, #ffd600 65.22%)",
                    border: "1.14968px solid #bf4300",
                  }
                : {}
            }
          >
            <img src={acid} arc="Select Acid" />
            <div className={`${classes.alienSelectBkg} ${classes.fcc}`} />
          </div>
          <p>Acid</p>
        </div>
        <div
          className={classes.alienSelect}
          onClick={() =>
            alienCriteriaHandler(aliens.water, aliens.acid, !aliens.fire)
          }
        >
          <div
            className={`${classes.alienSelectBkgWrapper} ${classes.fcc}`}
            style={
              aliens.fire
                ? {
                    background:
                      "linear-gradient(0deg, #ec7700 18.85%, #ffd600 65.22%)",
                    border: "1.14968px solid #bf4300",
                  }
                : {}
            }
          >
            <img src={fire} arc="Select Acid" />
            <div className={`${classes.alienSelectBkg} ${classes.fcc}`} />
          </div>
          <p>Fire</p>
        </div>
      </div>
    </div>
  );
};

export default Alien;
