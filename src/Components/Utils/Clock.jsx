import React from "react";
import classes from "./Clock.module.css";
import ClockTic from "./ClockTic";
const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <div className={classes.wrapper}>
      <ClockTic time={timerDays} type="Days" />
      <ClockTic time={timerHours} type="Hours" />
      <ClockTic time={timerMinutes} type="Min" />
      <ClockTic time={timerSeconds} type="Sec" />
    </div>
  );
};

export default Clock;
