import React, { useState, useEffect } from "react";
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
    maxWidth: "90%",
    height: "auto",
    borderRadius: 24,
    zIndex: 400,
    border: "3px solid #FF9700",
  },
  modalWrapper: {
    background: "linear-gradient(180deg, #54A2C9 0%, #334C93 100%)",
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },

  cancelDiv: {
    fontFamily: "prototype",
    fontSize: "25px",
    lineHeight: "26px",
    textTransform: "uppercase",
    color: "#fff",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  infoTable: {
    maxWidth: 600,
    padding: "24px",
  },
  table: {
    width: "100%",
    fontFamily: "Prototype",
    fontSize: 18,
    lineHeight: "19px",
    borderCollapse: "collapse",
    background: "#2769a5",
    border: "1px solid #4898d3",
    boxSizing: "border-box",
  },
  thead: {
    "& th": {
      border: "1px solid #4898d3",
      padding: "19px 36px",
    },
  },
  tbody: {
    "& td": {
      border: "1px solid #4898d3",
      padding: "14px 24px",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& > p": {
      padding: "36px 16px",
    },
    // paddingLeft: "28px",
  },
  sidePrizes: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      padding: "4px",
    },
    display: "none",
  },
});

const InfoModal = ({ close }) => {
  const classes = useStyles();


  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${classes.wrapper} ${classes.fcc}`}>
          <div className={classes.modalBackdrop} onClick={close} />
          <div className={`${classes.modalContainer} ${classes.fcc}`}>
            <div className={`${classes.modalWrapper} ${classes.fccc}`}>
              <div className={classes.cancelDiv}>
                <div className={classes.content}>
                  <p>
                    Roulette Spin Price is <span>0.25$</span>
                  </p>
                </div>
                <div className={classes.infoTable}>
                  <table className={classes.table}>
                    <thead className={classes.thead}>
                      <th>PRIZE</th>
                      <th>REWARD %</th>
                    </thead>
                    <tbody className={classes.tbody}>
                      <tr>
                        <td>Small Potion</td>
                        <td>25%</td>
                      </tr>
                      <tr>
                        <td>Free Spin</td>
                        <td>20%</td>
                      </tr>
                      <tr>
                        <td>Medium Potion</td>
                        <td>18%</td>
                      </tr>
                      <tr>
                        <td>Greater Potion</td>
                        <td>14%</td>
                      </tr>
                      <tr>
                        <td>Free Spin x2</td>
                        <td>10%</td>
                      </tr>
                      <tr>
                        <td>Dynamite</td>
                        <td>8%</td>
                      </tr>
                      <tr>
                        <td>Mining Boost</td>
                        <td>4.9%</td>
                      </tr>
                      <tr>
                        <td>Common Egg</td>
                        <td>0.07%</td>
                      </tr>
                      <tr>
                        <td>Rare Egg</td>
                        <td>0.03%</td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default InfoModal;
