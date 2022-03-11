import React, { useState } from "react";
import "../style.css";
import booster from "../footerImages/boost.png";
import dinamiteImg from "../footerImages/dinamite.png";

const DinamiteBoost = ({ styling, boost, dinamite, changepNeed, updateDynamite, updateBooster }) => {
  const [countBoosters, setCountBoosters] = useState(boost)
  const [countDynamites, setCountDynamites] = useState(dinamite)

  const [boosterSelected, setBoosterSelected] = useState(false)
  const [dynamiteSelected, setDynamiteSelected] = useState(false)

  const handleBoosterSelection = () => {
    if (countBoosters <= 0 && boosterSelected === false) {
      return
    }
    switch (boosterSelected) {
      case true:
        setCountBoosters(countBoosters + 1)
        setBoosterSelected(false)
        break
      default:
        setCountBoosters(countBoosters - 1)
        setBoosterSelected(true)
    }
    updateBooster()
  }

  const handleDynamiteSelection = () => {
    if (countDynamites <= 0 && dynamiteSelected === false) {
      return
    }
    switch (dynamiteSelected) {
      case true:
        setCountDynamites(countDynamites + 1)
        setDynamiteSelected(false)
        break
      default:
        setCountDynamites(countDynamites - 1)
        setDynamiteSelected(true)
    }
    updateDynamite()
  }

  return (
    <div
      className="dinamite-boost-container fcc"
      //   style={{ background: `${styling.feedAlienContainer}` }}
    >
      <div
        className="dinamite-boost-wrapper"
        // style={{ background: `${styling.feedAlienWrapper}` }}
      >
        <div className="dinamite-boost-potions fsbc">
          <div
            onClick={() => changepNeed("boost")}
            className="feed-potion-wrapper fcc"
            style={{ background: `${styling.feedPotionWrapper}` }}
            onClick={() => handleBoosterSelection()}
          >
            <div
              className="feed-potion fcc"
              style={{ background: `${styling.feedPotion}` }}
            >
              <img src={booster} alt="Potion" style={{ width: "90%" }} />
            </div>
            <div
              className="feed-potion-number fcc"
              style={{ background: `${styling.feedPotionNumber}` }}
              
            >
              <p className="feed-number">{countBoosters < 10 ? `0${countBoosters}` : countBoosters}</p>
            </div>
          </div>


          <div
            onClick={() => changepNeed("dinamite")}
            className="feed-potion-wrapper fcc"
            style={{ background: `${styling.feedPotionWrapper}` }}
            onClick={() => handleDynamiteSelection()}
          >
            <div
              className="feed-potion fcc"
              style={{ background: `${styling.feedPotion}` }}
            >
              <img src={dinamiteImg} alt="Potion" style={{ width: "80%" }} />
            </div>
            <div
              className="feed-potion-number fcc"
              style={{ background: `${styling.feedPotionNumber}` }}
              
            >
              <p className="feed-number">
                {countDynamites < 10 ? `0${countDynamites}` : countDynamites}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinamiteBoost;
