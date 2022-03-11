import React, { useState, useEffect, useRef } from "react";
import classes from "./Card.module.css";
import AWN from "awesome-notifications";
import BuyModal from "../FarmContent/BuyModal";
const Card = ({ name, imagePath, cardPrice, tokenPrice }) => {
  let cardbkg =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/cardBkg.png";
  let cardbkg2 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/cardBkg2.png";
  let arUp =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/arrow-up.png";
  let arDown =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/arrow-down.png";
  let buyBtn =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/btn.png";
  let buyBtn2 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/btn2.png";

  let coin =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Cryptonite_internal_token.png";
  const [price, setPrice] = useState(0);
  const [ctntPrice, setCtntPrice] = useState(0);
  const [buyModalData, setBuyModalData] = useState(false);
  const [purchasedData, setPurchasedData] = useState(undefined);
  useEffect(() => {
    setPrice(cardPrice);
  });
  const [qty, setQty] = useState(1);
  const incValue = () => {
    setQty((prev) => prev + 1);
  };
  const decValue = () => {
    if (qty < 2) {
      return;
    }
    setQty((prev) => prev - 1);
  };
  const qtyRef = useRef(null);
  const qtyHandler = () => {
    if (Math.floor(Number(qtyRef.current.value)) === 0) {
      setQty(1);
      return;
    }
    let numReg = new RegExp("/^d+$/");
    if (!numReg.test(qtyRef.current.value)) {
      setQty(Math.floor(Number(qtyRef.current.value)));
    } else {
      console.log("false", qtyRef.current.value);
    }
  };
  useEffect(() => {
    setCtntPrice(price !== 0 ? price / tokenPrice : 0);
  }, [tokenPrice]);

  const handleBuyButton = () => {
    if (!window.sessionStorage.getItem("token")) {
      new AWN().alert("Please connect your Metamask wallet", {
        labels: { alert: "Not connected" },
      });
      return;
    }
    fetch(
      `https://backend-api-v3.cryptonitegame.io/shop/${
        imagePath === "egg-common" || imagePath === "egg-rare"
          ? "purchase_eggs"
          : "purchase_consumibles"
      }`,
      {
        method: "POST",
        headers: {
          "auth-token": window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: imagePath,
          qty: qty,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === "error") {
          new AWN().alert(json.info, {
            labels: { alert: "Something went wrong" },
          });
          return;
        }
        new AWN().success("New items available in your inventory");
        let current_balance = parseFloat(
          document.querySelector("#int-token-balance").innerText
        ).toFixed(4);
        document.querySelector("#int-token-balance").innerText = (
          current_balance - json.paid
        ).toFixed(4);

        if (!["egg-common", "egg-rare"].includes(imagePath)) {
          setPurchasedData(json.result);
          setBuyModalData(true);
        }
      });

    /* new AWN().info('This feature will be available when the farm mode has been released.', {labels: {alert: 'COMMING SOON'}}) */
  };

  const closeBuyModal = () => {
    setBuyModalData(false);
  };
  return (
    <div className={classes.wrapper}>
      {buyModalData && (
        <BuyModal
          closeBuyModal={() => closeBuyModal()}
          purchasedData={purchasedData}
        />
      )}
      <img
        src={imagePath === "egg-rare" ? cardbkg2 : cardbkg}
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
      <div className={classes.cardContent}>
        <div className={classes.cardInfoContainer}>
          <div className={classes.cardInfoWrapper}>
            <div className={classes.cardInfo}>
              <p>{name}</p>
            </div>
          </div>
        </div>
        <img
          src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/shop/${imagePath}.png`}
          className={classes.cardImage}
        />
        <div className={classes.priceDiv}>
          <img src={coin} />
          <p>{(ctntPrice * qty).toFixed(0)}</p>
        </div>
        <div className={classes.qtyAndBtn}>
          <div className={classes.inputDiv}>
            <input
              type="number"
              value={qty}
              // readOnly
              min={1}
              onChange={qtyHandler}
              step={1}
              ref={qtyRef}
              style={{
                background: imagePath === "egg-rare" ? "#E69D25" : "#36a8b8",
              }}
            />
            <div className={classes.btns}>
              <img src={arUp} className={classes.arrowUp} onClick={incValue} />
              <img
                src={arDown}
                className={classes.arrowDown}
                onClick={decValue}
              />
            </div>
          </div>
          <div className={classes.buyDiv}>
            <img
              src={imagePath === "egg-rare" ? buyBtn2 : buyBtn}
              alt="Buy Btn"
            />
            <p style={{ cursor: "pointer" }} onClick={handleBuyButton}>
              Buy
            </p>
          </div>
          <p>CTNT</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
