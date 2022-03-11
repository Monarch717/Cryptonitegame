import React from "react";
import classes from "./Featured.module.css";

const Featured = () => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.heading}>Featured in</p>
      <div className={classes.featuredIn}>
        <a
          href="https://www.coingecko.com/en/coins/cryptonite-token"
          target="_blank"
        >
          <img
            src={require("./featured_in/coingecko.png").default}
            alt="CoinGecko"
          />
        </a>
        <a
          href="https://coinmarketcap.com/currencies/cryptonite-token/"
          target="_blank"
        >
          <img
            src={require("./featured_in/coinmarketcap.png").default}
            alt="coinmarketcap"
          />
        </a>
        <a
          href="https://pancakeswap.finance/info/token/0x145812dd822cca602161e9e1ea96963be290b549"
          target="_blank"
        >
          <img
            src={require("./featured_in/pancakeswap.png").default}
            alt="Pancakeswap"
          />
        </a>
      </div>
    </div>
  );
};

export default Featured;
