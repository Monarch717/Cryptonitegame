import React, { useState, useEffect } from "react";
import classes from "./Hero.module.css";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import contractContainer from "./contract_container.png";
import contractButton from "./contractButton.png";
import * as copy from "copy-to-clipboard";
import Featured from "../Home/Featured";
const fadeFromLeft = {
  initial: { x: "-100vh", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
const zoomAndFade = {
  initial: { scale: 0.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};



const Hero = () => {
  useEffect(() => {
    var configuration = {
      from: 'BNB',
      to: '0x145812dd822Cca602161e9E1ea96963be290b549',
      fromChain: 'BSC',
      toChain: 'BSC',
      amount: 1,
      iframe: 'horizontal',
      hideSelectionFrom: false,
      hideSelectionTo: true,
      theme: 'dark',
      background: '#384d9e',
      injectTokens: {
          'bsc': [
              '0x145812dd822Cca602161e9E1ea96963be290b549'
          ]
      },
      slippagePercent: {
          instantTrades: 2,
          crossChain: 5
      },
      fee: 0.075,
      feeTarget: 0xfbC484c826CE836544761292ef5cea94a7664B90
  }
  
  // prevent accidental changes to the object, for example, when re-creating a widget for another theme
  Object.freeze(configuration);
  
  // create widget
  rubicWidget.init(configuration);
  },[])


  let cryptoniteLogo =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/logo-large.svg";
  /* let waterAvatar = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/home/alien1.png";
let fireAvatar = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/uncommon_fire.svg";
let acidAvatar = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/uncommon_acid.svg"; */

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <motion.img
          src={cryptoniteLogo}
          alt="Cryptonite Logo"
          variants={fadeFromLeft}
          initial="initial"
          animate="visible"
          transition={{
            delay: 0.4,
            duration: 2,
            type: "spring",
            stiffness: 100,
          }}
        />
      </div>
      <div className={classes.scaleincenter} style={{ marginTop: "60px" }}>
        <div className={classes.contractContainer}>
          <a>
            Contract: 0x145812dd822Cca602161e9E1ea96963be290b549
            <span className={classes.tooltip}>
              <img
                src={contractButton}
                alt=""
                onClick={() =>
                  copy("0x145812dd822Cca602161e9E1ea96963be290b549")
                }
              />
              <span className={classes.tooltiptext}>Copied</span>
            </span>
          </a>
          <img src={contractContainer} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <div id="rubic-widget-root"></div>
        </div>
      </div>
      <Featured />

      {/* <div
        className={classes.avatarContainer}
        style={{
          transform: `translateY(${-offsetY * 0.3}px)`,
        }}
      >
        <motion.img
          drag={isMobile ? false : true}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          variants={zoomAndFade}
          initial="initial"
          animate="visible"
          transition={{
            delay: 0.8,
            duration: 4,
            type: "spring",
            stiffness: 100,
          }}
          src={acidAvatar}
          alt="Acid Avatar"
        />
        <motion.img
          drag={isMobile ? false : true}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          variants={zoomAndFade}
          initial="initial"
          animate="visible"
          transition={{ duration: 4, type: "spring", stiffness: 100 }}
          src={waterAvatar}
          alt="Water Avatar"
        />
        <motion.img
          drag={isMobile ? false : true}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          variants={zoomAndFade}
          initial="initial"
          animate="visible"
          transition={{
            delay: 1.2,
            duration: 4,
            type: "spring",
            stiffness: 100,
          }}
          src={fireAvatar}
          alt="Fire Avatar"
        />
      </div> */}
    </div>
  );
};

export default Hero;
