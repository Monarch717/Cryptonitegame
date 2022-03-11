import classes from "./FarmContent.module.css";
import React, { useState, useRef } from "react";
import poocoin from "./poocoin_icon.png";
import pancake from "./pancake.png";

const Withdraw = ({feePercent, InternalTokenBalance, CryptoniteBalance, handleExchangeButton, handleTokenWithdrawal }) => {
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/btnBkg.svg"
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/token.png";
  let cryptonite = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/cryptonite.png";
  let change = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/change.png"
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"
  const [withdrawing, setWithdrawing] = useState(false)

  const filterContent = (btnName) => {
    if (btnName === isActive) {
      return;
    }
    setIsActive(btnName);
  }

  const internalTokenRef = useRef(null);
  const [isActive, setIsActive] = useState("deposite");

  const [tokenValue, setTokenValue] = useState('');


  const changeTokenValue = (flag) => {
    if (flag) {
      setTokenValue(parseFloat(InternalTokenBalance).toFixed(4))
      return
    }
    if(internalTokenRef.current.value !== '' && parseFloat(internalTokenRef.current.value).toFixed(4) === InternalTokenBalance){
      return
    }
    if (internalTokenRef.current.value !== '' &&
      parseFloat(internalTokenRef.current.value) > InternalTokenBalance) {
        
        setTokenValue(parseFloat(InternalTokenBalance).toFixed(4))
        return
      }
      setTokenValue(parseFloat(internalTokenRef.current.value))
  }

  const handleWidthdrawaling = () => {
    handleTokenWithdrawal(tokenValue)
    setWithdrawing(true)
  }

  return (

    <div>
      <div style={{marginBottom: '40px', paddingTop: '0px'}}>
        <h2 style={{color: '#fff'}}>Current withdrawal fee: {feePercent}%.</h2>
        <h3>Reduced by 2,5% every day until it reaches the minimum (5%)</h3>
        <h3>{withdrawing ? 'Please wait for your transaction to complete.' : ''}</h3>
        <h4>{withdrawing ? 'Do NOT refresh the page until metamask transaction confirmation' : ''}</h4>
        <h4>{withdrawing ? 'Processing transaction...' : ''}</h4>
      </div>
        <div className={classes.inputDivTabs}>
          <img src={token} alt="Token"/>
          <input ref={internalTokenRef} type="number" step="0.01" min="0" max={InternalTokenBalance} value={tokenValue} onChange={() => changeTokenValue()}/>
          <button className={classes.button} onClick={() => changeTokenValue('max')}>max</button>
        </div>
        <div className={classes.inputDivGeneric}>
          <img src={btnBkg} alt="Close"/>
            <a className={classes.modalButton} onClick={() => handleWidthdrawaling()}>WITHDRAW</a>
        </div>
    </div>

  );
};

export default Withdraw;