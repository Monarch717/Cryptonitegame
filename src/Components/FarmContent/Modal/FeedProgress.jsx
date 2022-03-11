import React from "react";
import "../style.css";
import { motion } from "framer-motion";

let feederPotion =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/feeder-potion.png";

const fadeFromTop = {
  initial: { y: "-1vh", opacity: 0, scale: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};
const FeedProgress = ({ pNeed, currentfeed, styling }) => {
  return (
    <div className="feeder-wrapper" style={{ left: `34px` }}>
      <div
        className="potion-wrapper"
        style={{ background: `${styling.potionWrapperBKG}` }}
      >
        <div className="potion" style={{ background: `${styling.potionBKG}` }}>
          <img src={feederPotion} alt="Feeding" className="feederPotionImage" />
        </div>
      </div>
      <div
        className="feeder fcc"
        style={{
          height: `${
            pNeed === 1
              ? "45px"
              : pNeed === 2
              ? "67px"
              : pNeed === 3
              ? "100px"
              : pNeed === 4
              ? "101px"
              : pNeed === 5
              ? "126px"
              : "151px"
          }`,
          background: `${styling.feederBKG}`,
        }}
      >
        {pNeed === 1 && (
          <motion.div
            variants={fadeFromTop}
            initial="initial"
            animate="visible"
            transition={{ duration: 2 }}
            className="feeder-cell"
            style={{
              background: `${styling.feederCellBKG}`,
              height: `${40 * currentfeed}px`,
            }}
          />
        )}
        {pNeed === 2 && (
          <div
            className="feeder-cells feedcc"
            style={{
              height: "62px",
              width: "18px",
            }}
          >
            {currentfeed > 0 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-l"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "30px",
                }}
              />
            )}
            {currentfeed > 1 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-r"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "30px",
                  // marginLeft: 1,
                }}
              />
            )}
          </div>
        )}
        {pNeed === 3 && (
          <div
            className="feeder-cells "
            style={{
              //   background: `${styling.feederCellBKG}`,
              height: "95px",
              width: "18px",
            }}
          >
            {currentfeed > 0 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-l"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "30px",
                }}
              />
            )}
            {currentfeed > 1 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "30px",
                  margin: "2px 0px",
                }}
              />
            )}
            {currentfeed > 2 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-r"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "30px",
                }}
              />
            )}
          </div>
        )}
        {pNeed === 4 && (
          <div
            className="feeder-cells"
            style={{
              //   background: `${styling.feederCellBKG}`,
              height: "96px",
              width: "18px",
            }}
          >
            {currentfeed > 0 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-l"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
            {currentfeed > 1 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  margin: "2px 0px",
                }}
              />
            )}
            {currentfeed > 2 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 3 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-r"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
          </div>
        )}
        {pNeed === 5 && (
          <div
            className="feeder-cells"
            style={{
              //   background: `${styling.feederCellBKG}`,
              height: "114px",
              width: "18px",
            }}
          >
            {currentfeed > 0 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="feeder-cell-l"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
            {currentfeed > 1 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  margin: "2px 0px",
                }}
              />
            )}
            {currentfeed > 2 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 3 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 4 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="feeder-cell-r"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
          </div>
        )}
        {pNeed === 6 && (
          <div
            className="feeder-cells"
            style={{
              //   background: `${styling.feederCellBKG}`,
              height: "142px",
              width: "18px",
            }}
          >
            {currentfeed > 0 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-l"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
            {currentfeed > 1 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  margin: "2px 0px",
                }}
              />
            )}
            {currentfeed > 2 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 3 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 4 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-c"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                  marginBottom: "2px",
                }}
              />
            )}
            {currentfeed > 5 && (
              <motion.div
                variants={fadeFromTop}
                initial="initial"
                animate="visible"
                transition={{ duration: 0.4 }}
                className="feeder-cell-r"
                style={{
                  background: `${styling.feederCellBKG}`,
                  height: "22px",
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedProgress;
