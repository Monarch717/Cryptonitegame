import React from "react";
import classes from "./Home.module.css";
import Hero from "../../Components/Hero";
import Presale from "../../Components/Presale";
import Roadmap from "../../Components/Roadmap";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Lore from "../../Components/Lore";
import { motion } from "framer-motion";

function Home() {
let globe1 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe1s.png";
let globe2 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe2s.png";
let globe3 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe3s.png";
let globe4 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe4s.png";
let globe5 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe5s.png";
let globe6 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/globe6s.png";
let rocketShip = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/rocketships.png";
let stone1 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/bottom-stone0.png";
let stone2 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/bottom-stone1.png";
let stone3 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/bottom-stone2.png";
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Header />
        {/* <Presale /> */}
        <Hero />  
        <Lore />
        <Roadmap />
        <Footer />
        <motion.div
          className={`${classes.globe} ${classes.globe1}`}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
          }}
        >
          <img src={globe1} alt="Globe" />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.globe2}`}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 30,
          }}
        >
          <img src={globe2} alt="Globe" />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.globe3}`}
          animate={{ rotate: 360, x: [0, -50, 0], scale: [1, 0.6, 1] }}
          transition={{
            repeat: Infinity,
            duration: 40,
          }}
        >
          <img src={globe3} alt="Globe" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360, x: [0, 100, 0], scale: [1, 0.3, 1] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 1,
            duration: 20,
          }}
          className={`${classes.globe} ${classes.globe4}`}
        >
          <img src={globe4} alt="Globe" />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.globe5}`}
          animate={{
            rotate: 360,
            x: [0, 100, 0],
            scale: [1, 0.6, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
          }}
        >
          <img src={globe5} alt="Globe" />
        </motion.div>
        <motion.div
          animate={{ rotate: [20, 0, 20], x: [0, -150, 0], scale: [1, 0.5, 1] }}
          transition={{
            repeat: Infinity,
            duration: 30,
          }}
          className={`${classes.globe} ${classes.globe6}`}
        >
          <img src={globe6} alt="Globe" />
        </motion.div>
        <motion.div>
          <motion.img
            src={rocketShip}
            alt="RocketShip"
            drag
            className={`${classes.globe} ${classes.rocket}`}
            animate={{ scale: [0.7, 1, 0.7], y: [0, 100, 0] }}
            transition={{
              repeat: Infinity,
              duration: 25,
            }}
          />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.stone1}`}
          animate={{ y: [0, 30, 0], scale: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 15,
          }}
        >
          <img src={stone1} alt="Stone" loading="lazy" />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.stone2}`}
          animate={{ y: [0, 30, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <img src={stone2} alt="Stone" loading="lazy" />
        </motion.div>
        <motion.div
          className={`${classes.globe} ${classes.stone3}`}
          animate={{ y: [0, 30, 0] }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
        >
          <img src={stone3} alt="Stone" loading="lazy" />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
