import React from "react";
import FarmContent from "../../Components/FarmContent";
import Header from "../../Components/Header";
import classes from "./Farm.module.css";
function Farm() {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Header />
        <FarmContent />
      </div>
    </div>
  );
}

export default Farm;
