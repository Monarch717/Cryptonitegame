import React, { useState, useRef, useEffect } from "react";
import classes from "./Style.module.css";

let bnb =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-bnb.png";

const Price = ({ priceCriteriaHandler, prices }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const startPriceRef = useRef(null);
  const endPriceRef = useRef(null);
  useEffect(() => {
    setStartPrice(prices.low);
    setEndPrice(prices.high);
  }, [prices]);
  const startPriceHandler = () => {
    // setStartPrice(Number(startPriceRef.current.value));
    priceCriteriaHandler(Number(startPriceRef.current.value), endPrice);
  };
  const endPriceHandler = () => {
    // setEndPrice(Number(endPriceRef.current.value));
    priceCriteriaHandler(startPrice, Number(endPriceRef.current.value));
  };
  return (
    <div className={classes.filterPriceDiv}>
      <div className={classes.filterPriceNLogo}>
        <p>PRICE</p>
        <div className={`${classes.bnbDiv} ${classes.fcc}`}>
          <img src={bnb} alt="BNB" />
          <p>BNB</p>
        </div>
      </div>
      <div className={classes.filterPriceSelector}>
        <div className={classes.filterPriceSelect}>
          <input
            type="number"
            value={startPrice}
            ref={startPriceRef}
            onChange={startPriceHandler}
            min={0}
          />
        </div>
        <p>-</p>
        <div className={classes.filterPriceSelect}>
          <input
            type="number"
            value={endPrice}
            ref={endPriceRef}
            onChange={endPriceHandler}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default Price;
