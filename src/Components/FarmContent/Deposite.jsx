import classes from "./FarmContent.module.css";
import React, { useState, useRef } from "react";
import poocoin from "./poocoin_icon.png";
import pancake from "./pancake.png";

const Deposite = ({InternalTokenBalance, CryptoniteBalance, handleExchangeButton, handleTokenDeposit }) => {
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/btnBkg.svg"
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/token.png";
  let cryptonite = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/cryptonite.png";
  let change = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/change.png"
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"
  
  const [depositing, setDepositing] = useState(false)

  const filterContent = (btnName) => {
    if (btnName === isActive) {
      return;
    }
    setIsActive(btnName);
  }

  const ctntRef = useRef(null);
  const [isActive, setIsActive] = useState("deposite");

  const [currentFee, setCurrentFeeValue] = useState(75);
  const [ctntValue, setCtntValue] = useState('');

  const changeCtntValue = (flag) => {
    if (flag) {
      setCtntValue(parseFloat(CryptoniteBalance).toFixed(4))
      return
    }
    if(ctntRef.current.value !== '' && parseFloat(ctntRef.current.value).toFixed(4) === CryptoniteBalance){
      return
    }
    if (ctntRef.current.value !== '' &&
      parseFloat(ctntRef.current.value) > CryptoniteBalance) {
        
        setCtntValue(parseFloat(CryptoniteBalance).toFixed(4))
        return
      }
    
    setCtntValue(ctntRef.current.value)
  }

  const handleDeposit = () => {
    setDepositing(true)
    handleTokenDeposit(ctntValue)
  }

  return (

       <div>
         <div style={{marginBottom: '40px', paddingTop: '0px'}}>
          <h2 style={{color: '#fff'}}>CTNT Balance: {CryptoniteBalance}.</h2>
          <h3>{depositing ? 'Please wait for your transaction to complete.' : ''}</h3>
          <h4>{depositing ? 'Do NOT refresh the page until metamask transaction confirmation' : ''}</h4>
          <h4>{depositing ? 'Processing transaction...' : ''}</h4>
        </div>
          <div className={classes.inputDivTabs}>
            <img src={cryptonite} alt="Token"/>
            <input ref={ctntRef} type="number" step="0.01" min="0" max={CryptoniteBalance} value={ctntValue} onChange={() => changeCtntValue()}/>
            <button className={classes.button} onClick={() => changeCtntValue('max')}>max</button>
          </div>
          <div className={classes.inputDivGeneric}>
            <img src={btnBkg} alt="Close"/>
              <a className={classes.modalButton} onClick={() => handleDeposit()}>DEPOSIT</a>
          </div >
        </div >

  );
};

export default Deposite;