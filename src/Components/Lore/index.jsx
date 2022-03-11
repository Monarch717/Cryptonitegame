import React, { useState, useEffect } from "react";
import classes from "./Lore.module.css";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Tile from "../Tile";
import blue_box from "./+reduced_box_blue.png";
import green_box from "./+reduced_box_green.png";
import red_box from "./+reduced_box_red.png";
import waterAvatar from "./1-6-xsmall2.png";
import acidAvatar from "./acid_6-final2.png";
import fireAvatar from "./fire_62.png";

const fadeFromLeft = {
  initial: { x: "-100vh", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
const zoomAndFade = {
  initial: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const Lore = () => {
  /* let waterAvatar = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/home/1-6-xsmall.png"; */
  /* let fireAvatar = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/home/2-6-xsmall.png"; */
  /* let acidAvatar =  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/home/3-6-xsmall.png"; */

  // const [offsetY, setOffsetY] = useState(0);
  // const handleScroll = () => setOffsetY(window.pageYOffset);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  // useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);
  return (
    <div className={classes.container}>
      <div
        className={classes.avatarContainer}
        // style={{
        // transform: `translateY(${-offsetY * 0.3}px)`,
        // }}
      >
        <div className={classes.row}>
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
          <div className={classes.acidTile}>
            <h3 className={classes.tileHeader}>BAHIMAN:</h3>
            <p className={classes.tileText}>
              Justine Silvertongue, The Toxic Queen is the queen of nightmares.
              In her poisonous heart, she believes that if you want something,
              you should take it. When she decided that she wanted the throne of
              Bahiman, she didn't follow the path of her fellow females who
              subjugated themselves vying for the king's affections. No, instead
              of wooing the king and convincing him to take her as his bride,
              she killed him.
            </p>
          </div>
          <div className={classes.waterTile}>
            <h3 className={classes.tileHeader}>CAVENDISH:</h3>
            <p className={classes.tileText}>
              Lotte, The Pathless Apprentice has dedicated his life to
              understanding the meaning of life. Experiment after experiment, he
              toiled fruitlessly, his scientific pursuits leading to nothing but
              existential pain. Until one day, he happened upon a substance that
              would change the shape of the world: Cryptonite. The undefinable
              qualities of this powerful stone granted him unprecedented access
              to the knowledge hidden at the heart of the universe.
            </p>
          </div>
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
            style={{ maxWidth: "550px" }}
          />
          <div className={classes.fireTile}>
            <h3 className={classes.tileHeader}>BELLEOS:</h3>
            <p className={classes.tileText}>
              Atticus Kaeso, The Tortured Gunsmith. Born into a patrician
              family, Atticus seemed destined for a life of privilege. From a
              young age, he was groomed to be an obedient son and a patriot of
              his home planet, Belleos. Then came the war. Upon the leaked
              discovery of the unlimited potential of Cryptonite, the planet
              Cavendish fast became the most powerful planet in the universe.
              Alas, power is addictive, and the Cavenders' insatiable spirit of
              conquest came to take Kaeso's homeland. That's when Kaeso
              discovered his true skill: weapons engineering.
            </p>
          </div>
        </div>

        <div className={classes.rowTablet}>
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
            className={classes.alienMobile}
          />
          <div className={classes.acidTile}>
            <h3 className={classes.tileHeader}>BAHIMAN:</h3>
            <p className={classes.tileText}>
              Justine Silvertongue, The Toxic Queen. (Acid) Justine Silvertongue
              is the queen of nightmares. In her poisonous heart, she believes
              that if you want something, you should take it. When she decided
              that she wanted the throne of Bahiman, she didn't follow the path
              of her fellow females who subjugated themselves vying for the
              king's affections. No, instead of wooing the king and convincing
              him to take her as his bride, she killed him. Some rumours say
              that she lured him to her bed before kissing him with lips laced
              with poison. Others say she killed him in self-defence when he
              tried to force himself upon her. Either way, she took the throne
              of Bahiman and began to rule under a reign of terror. Justine
              Silvertongue's words are sweet and she soon charmed the court; but
              do not be fooled - those who cross her soon reach the bitter end.{" "}
            </p>
          </div>
          <motion.img
            drag={isMobile ? false : true}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            variants={zoomAndFade}
            initial="initial"
            animate="visible"
            transition={{ duration: 4, type: "spring", stiffness: 100 }}
            src={waterAvatar}
            alt="Water Avatar"
            className={classes.alienMobile}
          />
          <div className={classes.waterTile}>
            <h3 className={classes.tileHeader}>CAVENDISH:</h3>
            <p className={classes.tileText}>
              Lotte, The Pathless Apprentice. Lotte has dedicated his life to
              understanding the meaning of life. Experiment after experiment, he
              toiled fruitlessly, his scientific pursuits leading to nothing but
              existential pain. Until one day, he happened upon a substance that
              would change the shape of the world: Cryptonite. The undefinable
              qualities of this powerful stone granted him unprecedented access
              to the knowledge hidden at the heart of the universe. Without
              thinking, he shared this divine-granted insight with mentors, who
              used the knowledge to feed their hunger for accolade. The secret
              of Cryptonite's power leaked across alien kingdoms. Lotte was cast
              out, forever to remain the pathless apprentice wandering the
              wastes of the planet Cavendish.{" "}
            </p>
          </div>
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
            className={classes.fireAlienMobile}
            style={{ maxWidth: "450px" }}
          />
          <div className={classes.fireTile}>
            <h3 className={classes.tileHeader}>BELLEOS:</h3>
            <p className={classes.tileText}>
              Atticus Kaeso, The Tortured Gunsmith. Born into a patrician
              family, Atticus Kaeso seemed destined for a life of privilege.
              From a young age, he was groomed to be an obedient son and a
              patriot of his home planet, Belleos. Then came the war. Upon the
              leaked discovery of the unlimited potential of Cryptonite, the
              planet Cavendish fast became the most powerful planet in the
              universe. Alas, power is addictive, and the Cavenders' insatiable
              spirit of conquest came to take Kaeso's homeland. That's when
              Kaeso discovered his true skill: weapons engineering. While his
              brothers and sisters laboured for hours to make simple assault
              missiles for the Belleos army, Kaeso could achieve the same in
              mere seconds. At the end of the war, Belleos remained a free
              planet, but Kaeso's life was forever changed. Even in times of
              peace, Kaeso cannot stop. He continues to build even more
              terrifying, star-destroying weapons each day.
            </p>
          </div>
        </div>

        <div className={classes.rowMobile}>
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
            className={classes.alienMobile}
          />
          <div
            className={classes.tile}
            style={{ backgroundImage: `url(${green_box})` }}
          >
            <h3 className={classes.tileHeader}>BAHIMAN:</h3>
            <p className={classes.tileText}>
              Justine Silvertongue, The Toxic Queen. (Acid) Justine Silvertongue
              is the queen of nightmares. In her poisonous heart, she believes
              that if you want something, you should take it. When she decided
              that she wanted the throne of Bahiman, she didn't follow the path
              of her fellow females who subjugated themselves vying for the
              king's affections. No, instead of wooing the king and convincing
              him to take her as his bride, she killed him. Some rumours say
              that she lured him to her bed before kissing him with lips laced
              with poison. Others say she killed him in self-defence when he
              tried to force himself upon her. Either way, she took the throne
              of Bahiman and began to rule under a reign of terror. Justine
              Silvertongue's words are sweet and she soon charmed the court; but
              do not be fooled - those who cross her soon reach the bitter end.{" "}
            </p>
          </div>
          <motion.img
            drag={isMobile ? false : true}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            variants={zoomAndFade}
            initial="initial"
            animate="visible"
            transition={{ duration: 4, type: "spring", stiffness: 100 }}
            src={waterAvatar}
            alt="Water Avatar"
            className={classes.alienMobile}
          />
          <div
            className={classes.tile}
            style={{ backgroundImage: `url(${blue_box})` }}
          >
            <h3 className={classes.tileHeader}>CAVENDISH:</h3>
            <p className={classes.tileText}>
              Lotte, The Pathless Apprentice. Lotte has dedicated his life to
              understanding the meaning of life. Experiment after experiment, he
              toiled fruitlessly, his scientific pursuits leading to nothing but
              existential pain. Until one day, he happened upon a substance that
              would change the shape of the world: Cryptonite. The undefinable
              qualities of this powerful stone granted him unprecedented access
              to the knowledge hidden at the heart of the universe. Without
              thinking, he shared this divine-granted insight with mentors, who
              used the knowledge to feed their hunger for accolade. The secret
              of Cryptonite's power leaked across alien kingdoms. Lotte was cast
              out, forever to remain the pathless apprentice wandering the
              wastes of the planet Cavendish.{" "}
            </p>
          </div>
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
            className={classes.fireAlienMobile}
            style={{ maxWidth: "390px" }}
          />
          <div
            className={classes.tile}
            style={{ backgroundImage: `url(${red_box})` }}
          >
            <h3 className={classes.tileHeader}>BELLEOS:</h3>
            <p className={classes.tileText}>
              Atticus Kaeso, The Tortured Gunsmith. Born into a patrician
              family, Atticus Kaeso seemed destined for a life of privilege.
              From a young age, he was groomed to be an obedient son and a
              patriot of his home planet, Belleos. Then came the war. Upon the
              leaked discovery of the unlimited potential of Cryptonite, the
              planet Cavendish fast became the most powerful planet in the
              universe. Alas, power is addictive, and the Cavenders' insatiable
              spirit of conquest came to take Kaeso's homeland. That's when
              Kaeso discovered his true skill: weapons engineering. While his
              brothers and sisters laboured for hours to make simple assault
              missiles for the Belleos army, Kaeso could achieve the same in
              mere seconds. At the end of the war, Belleos remained a free
              planet, but Kaeso's life was forever changed. Even in times of
              peace, Kaeso cannot stop. He continues to build even more
              terrifying, star-destroying weapons each day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lore;
