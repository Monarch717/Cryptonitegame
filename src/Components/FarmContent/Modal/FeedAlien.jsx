import React, { useState } from "react";
import "../style.css";

const FeedAlien = ({ styling, small, medium, greater, changepNeed }) => {
  let smallPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/feed/small-potion.png";
  let mediumPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/feed/medium-potion.png";
  let greaterPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/feed/greater-potion.png";
  return (
    <div
      className="feed-alien-container fcc"
      style={{ background: `${styling.feedAlienContainer}` }}
    >
      <div
        className="feed-alien-label fcc"
        style={{ background: `${styling.feedAlienLabel}` }}
      >
        <p>FEED ALIEN</p>
      </div>
      <div
        className="feed-alien-wrapper"
        style={{ background: `${styling.feedAlienWrapper}` }}
      >
        <div className="feed-potions fsbc">
          <div
            onClick={() => changepNeed("small")}
            className="feed-potion-wrapper fcc"
            style={{ background: `${styling.feedPotionWrapper}` }}
          >
            <div
              className="feed-potion"
              style={{ background: `${styling.feedPotion}` }}
            >
              <img src={smallPotion} alt="Potion" />
            </div>
            <div
              className="feed-potion-number fcc"
              style={{ background: `${styling.feedPotionNumber}` }}
            >
              <p className="feed-number">{small < 10 ? `0${small}` : small}</p>
            </div>
          </div>
          <div
            onClick={() => changepNeed("medium")}
            className="feed-potion-wrapper fcc"
            style={{ background: `${styling.feedPotionWrapper}` }}
          >
            <div
              className="feed-potion"
              style={{ background: `${styling.feedPotion}` }}
            >
              <img src={mediumPotion} alt="Potion" />
            </div>
            <div
              className="feed-potion-number fcc"
              style={{ background: `${styling.feedPotionNumber}` }}
            >
              <p className="feed-number">
                {medium < 10 ? `0${medium}` : medium}
              </p>
            </div>
          </div>{" "}
          <div
            onClick={() => changepNeed("greater")}
            className="feed-potion-wrapper fcc"
            style={{ background: `${styling.feedPotionWrapper}` }}
          >
            <div
              className="feed-potion"
              style={{ background: `${styling.feedPotion}` }}
            >
              <img src={greaterPotion} alt="Potion" />
            </div>
            <div
              className="feed-potion-number fcc"
              style={{ background: `${styling.feedPotionNumber}` }}
            >
              <p className="feed-number">
                {greater < 10 ? `0${greater}` : greater}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedAlien;
