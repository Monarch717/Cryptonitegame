import classes from "./FarmContent.module.css";
import React, { useState, useRef } from "react";

const BuyModal = ({ closeBuyModal, purchasedData}) => {
  let smallPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/small.png";
  let mediumPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/medium.png";
  let greaterPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/greater.png";
  let commonPick = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/common.png";
  let rarePick = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/rare.png";
  let uncommonPick = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/potions/uncommon.png";


  return (

    <div className={classes.firstContainer} style={{ maxWidth: '100px', widith: 'fit-content'}}>
      <div className={classes.secondContainer} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'fit-content',
        height: 'fit-content',
        padding: '25px'
      }}>
        <h1 style={{
          color: '#fff',
          marginBottom: '10px'
        }}>Results</h1>
        {
          purchasedData.small > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={smallPotion} alt="small-potion"/></span>{purchasedData.small}</p>
        }
        {
          purchasedData.medium > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={mediumPotion} alt="medium-potion"/></span>{purchasedData.medium}</p>
        }
        {
          purchasedData.greater > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={greaterPotion} alt="greater-potion"/></span>{purchasedData.greater}</p>
        }
        {
          purchasedData.common > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={commonPick} alt="common-pick"/></span>{purchasedData.common}</p>
        }
        {
          purchasedData.uncommon > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={uncommonPick} alt="uncommon-pick"/></span>{purchasedData.uncommon}</p>
        }
        {
          purchasedData.rare > 0 && <p className={classes.resultChestsText}><span><img className={classes.chestsResultImages} src={rarePick} alt="rare-pick"/></span>{purchasedData.rare}</p>
        }
        <button className={classes.resultChestsCloseButton} onClick={() => closeBuyModal()}>Close</button>
      </div>    
    </div>

  );
};

export default BuyModal;