import React, { useEffect } from "react";
import AWN from "awesome-notifications"
import classes from "./FarmContent.module.css";
import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import ContentMain from "./ContentMain";
import { useState } from "react";

const contentFooterData = {
  small_potions: 0,
  medium_potions: 0,
  greater_potions: 0,
  rare_picks: 0,
  common_picks: 0,
  uncommon_picks: 0,
  dynamites: 0,
  boosters: 0
};



const FarmContent = () => {
  const TOKEN = window.sessionStorage.getItem("token")
  //const [contentHeader, setcontentHeader] = useState({});
  const [contentFooter, setcontentFooter] = useState(contentFooterData);
  useEffect(() => {
    //setcontentHeader(contentHeaderData);
    if (TOKEN) {
      requestConsumibles()
    } 
  }, []);

  const requestConsumibles = () => {
    fetch(`https://backend-api-v3.cryptonitegame.io/inventory/get_consumibles`, {
        headers: {
          'auth-token': TOKEN
        }
      })
      .then(response => response.json())
      .then(json => {
        if (json.status === "error") {
          new AWN().alert(json.info, {labels: {alert: 'Something went wrong'}})
          return
        }
        setcontentFooter(json.consumibles);
      })
  }


  const updateGem = (number) => {
    const updatedObj = { ...contentHeader };
    setcontentHeader({ ...updatedObj, gems: number });
  };
  const updateCryptonite = (number) => {
    setcontentHeader({ ...contentHeader, cryptonite: number });
  };
  const updateBinance = (number) => {
    setcontentHeader({ ...contentHeader, binance: number });
  };



  return (
    <div className={classes.wrapper}>
      <div className={classes.contentBkg}>
        <div className={classes.content}>
          {/* <ContentHeader/> */}
          <ContentMain
            updGems={updateGem}
            dataFooter={contentFooter}
            updateDataFooter={requestConsumibles}
          />
          <ContentFooter data={contentFooter} />
        </div>
      </div>
    </div>
  );
};

export default FarmContent;
