import React from "react";
import classes from "./Clock.module.css";

const ClockTic = ({ time, type }) => {
  let ticBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/countdownBkg.png";
  const newTime = time < 10 ? `0${time}` : time;
  return (
    <div className={classes.ticWrapper}>
      <img className={classes.ticImage} src={ticBkg} />
      <p className={classes.ticTime}>{newTime}</p>
      <p className={classes.ticType}>{type}</p>
    </div>
  );
};

export default ClockTic;
