import React, { useState, useRef } from "react";
import { createUseStyles } from "react-jss";
import ReactDOM from "react-dom";

const useStyles = createUseStyles({
  wrapper: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 300,
  },
  fcc: { display: "flex", justifyContent: "center", alignItems: "center" },
  fccc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(15px)",
  },
  modalContainer: {
    background: "linear-gradient(0deg, #FFCC00 0.01%, #FF9700 100%)",
    width: 456,
    height: 249,
    borderRadius: 24,
    zIndex: 400,
  },
  modalWrapper: {
    background: "linear-gradient(180deg, #54A2C9 0%, #334C93 100%)",
    width: 452,
    height: 245,
    borderRadius: 24,
  },

  sellButtonDiv: {
    paddingTop: 32,
    cursor: "pointer",
    "& p": {
      fontFamily: "prototype",
      position: "absolute",
      fontSize: "18.95px",
      lineHeight: "28px",
      color: "#E45404",
    },
    "& img ": {
      userSelect: "none",
      pointerEvents: "none",
    },
  },
  inputDiv: {
    position: "relative",

    "& img": {
      position: "absolute",
      left: 20,
      top: 5,
      userSelect: "none",
      pointerEvents: "none",
    },
    "& input": {
      border: "none",
      width: 174,
      height: 53,
      background: "#2769A5",
      boxShadow: "inset 0px 6px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "9px",
      color: "#fff",
      paddingLeft: 70,
      fontFamily: "prototype",
      fontSize: "25.8px",
      lineHeight: "26px",
      textTransform: "uppercase",
      color: "#fff",
    },
  },
  cancelDiv: {
    fontFamily: "prototype",
    fontSize: "25px",
    lineHeight: "26px",
    textTransform: "uppercase",
    color: "#fff",
    width: 320,
    textAlign: "center",
  },
  yesButton: {
    fontFamily: "prototype",
    fontSize: "18.95px",
    lineHeight: "28px",
    color: "#E45404",
    cursor: "pointer",

    "& img ": {
      userSelect: "none",
      pointerEvents: "none",
    },
  },
  noButton: {
    fontFamily: "prototype",
    fontSize: "18.95px",
    lineHeight: "28px",
    color: "#315486",
    cursor: "pointer",
    "& img ": {
      userSelect: "none",
      pointerEvents: "none",
    },
  },
  decideButtons: {
    paddingTop: 40,
    maxWidth: 274,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
  },
});

const SellModal = ({ close, sell, listed, cancel }) => {
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/over-modals/token.png";
  let sellButton = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/over-modals/sell-button.png";
  let yesButton = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/over-modals/yes.png";
  let noButton = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/over-modals/no.png";
  const classes = useStyles();
  const sellingRef = useRef(null);
  const sellAlien = () => {
    sell(sellingRef.current.value);
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${classes.wrapper} ${classes.fcc}`}>
          <div className={classes.modalBackdrop} onClick={() => close()} />
          <div className={`${classes.modalContainer} ${classes.fcc}`}>
            <div className={`${classes.modalWrapper} ${classes.fccc}`}>
              {listed ? (
                <div className={classes.cancelDiv}>
                  <p>Are you sure you want to cancel this sale ?</p>
                  <div className={`${classes.decideButtons} ${classes.fcc}`}>
                    <div
                      className={`${classes.yesButton} ${classes.fcc}`}
                      onClick={cancel}
                    >
                      <img src={yesButton} alt="Accept" />
                      <p style={{ position: "absolute" }}>YES</p>
                    </div>
                    <div
                      className={`${classes.noButton} ${classes.fcc}`}
                      onClick={close}
                    >
                      <img src={noButton} alt="Cancel" />
                      <p style={{ position: "absolute" }}>NO</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={classes.inputDiv}>
                    <img src={token} alt="Sell" />
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={10.0}
                      min={0}
                      ref={sellingRef}
                    />
                  </div>
                  <div
                    className={`${classes.sellButtonDiv} ${classes.fcc}`}
                    onClick={sellAlien}
                  >
                    <img src={sellButton} />
                    <p>SELL ALIEN</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.getElementById("over-modal-root")
      )}
    </>
  );
};

export default SellModal;
