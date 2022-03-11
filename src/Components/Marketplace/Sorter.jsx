import React from "react";
import classes from "./Style.module.css";
let dropArrow =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-drop-arrow.png";

const Sorter = ({ setShowSorter, showSorter, sortBy, sortingHandler }) => {
  return (
    <div className={classes.sorterContainer}>
      <div
        className={classes.sorterDiv}
        onClick={() => setShowSorter((prev) => !prev)}
      >
        <p>{sortBy}</p>
        <img src={dropArrow} alt="Drop Arrow" />
      </div>
      <div
        className={classes.sortSelector}
        style={{
          opacity: showSorter ? "1" : "0",
          transform: showSorter ? "translateY(0px)" : "translateY(-40px)",
          visibility: showSorter ? "visible" : "hidden",
        }}
      >
        <ul>
          <ul>
            <li onClick={() => sortingHandler("Lowest ID")}>Lowest ID</li>
            <li onClick={() => sortingHandler("Highest ID")}>Highest ID</li>
            <li onClick={() => sortingHandler("Lowest Price")}>Lowest Price</li>
            <li onClick={() => sortingHandler("Highest Price")}>
              Highest Price
            </li>
            <li onClick={() => sortingHandler("Latest")}>Latest</li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sorter;
