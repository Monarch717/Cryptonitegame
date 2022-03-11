import classes from "./FarmContent.module.css";
import React, { useState, useRef } from "react";
import poocoin from "./poocoin_icon.png";
import pancake from "./pancake.png";
import Deposite from "./Deposite"
import Withdraw from "./Withdraw"
import AWN from "awesome-notifications"

const ExchangeModal2 = ({feePercent, InternalTokenBalance, CryptoniteBalance, handleExchangeButton, makeUserTokensDeposit, makeUserTransaction, getCryptoniteTokenBalance, getBnbAndExternalTokenBalance }) => {
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"
 
  const filterContent = (btnName) => {
    if (btnName === isActive) {
      return;
    }
    setIsActive(btnName);
  }

  const [isActive, setIsActive] = useState("deposite");


  const handleTokenDeposit = (value) => {
    if (value === '' || value <= 0) {
      return
    }
    makeUserTokensDeposit(web3, window.ethereum, value).then(result => {
      console.log("Metamask result")
      console.log(result)
      fetch(`https://backend-api-v3.cryptonitegame.io/monederos/deposit_ctnt`, {
        method: 'POST',
        headers: {
          'auth-token': window.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx_hash: result.txHash.transactionHash,
          amount: value * 10000
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.status === "error") {
          new AWN().info(json.info, {labels: {alert: 'New notification'}})
          return
        }
        setTimeout(() => {
          getCryptoniteTokenBalance()
          getBnbAndExternalTokenBalance()
          new AWN().success('Transaction completed!')
          handleExchangeButton()
        },1000)
      })
    })
  }

  const handleTokenWithdrawal = (value) => {
    if (value === '' || value <= 0) {
      return
    }
    makeUserTransaction(window.ethereum).then(result => {
      fetch(`https://backend-api-v3.cryptonitegame.io/monederos/withdraw_ctnt`, {
        method: 'POST',
        headers: {
          'auth-token': window.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx_hash: result.txHash,
          amount: value
        })
      })
      .then(response => response.json())
      .then(json => {
        if (json.status === "error") {
          new AWN().info(json.info, {labels: {alert: 'New notification'}})
          return
        }

        setTimeout(() => {
          getCryptoniteTokenBalance()
          getBnbAndExternalTokenBalance()
          new AWN().success('Transaction completed!')
          handleExchangeButton()
        },1000)
      })
    })
  }


  return (

    <div className={classes.firstContainer2}>
      <div className={classes.secondContainer2}>

      <img src={cross} className={classes.firstImage}  onClick={() => handleExchangeButton()}/>

        <div className={classes.filterButtonsModal}>
          <div
            className={`${
              isActive === "deposite" ? classes.filterButtonWrapperModal : null
            }`}
            onClick={() => filterContent("deposite")}
          >
            <div className={classes.filterButtonModal}>
              <p className={classes.filterButtonText}>DEPOSIT</p>
            </div>
          </div>
          <div
            className={`${
              isActive === "withdraw" ? classes.filterButtonWrapperModal : null
            }`}
            onClick={() => filterContent("withdraw")}
          >
            <div className={classes.filterButtonModal}>
              <p className={classes.filterButtonText}>WITHDRAW</p>
            </div>
          </div>
        </div>

       
        <div style={{marginBottom: '40px', paddingTop: '0px'}}>{/* 
          <h2 style={{color: '#fff'}}>Current withdrawal fee: {currentFee}%.</h2> */}
          {/* <p>CTNT balance: {CryptoniteBalance}</p>
          <p>Internal token balance: {InternalTokenBalance}</p> */}
        </div>
        <div>
        {isActive === "deposite" && <Deposite InternalTokenBalance={InternalTokenBalance} CryptoniteBalance={CryptoniteBalance} handleExchangeButton={() => handleExchangeButton()} handleTokenDeposit={(value) => handleTokenDeposit(value)}/>}
        {isActive === "withdraw" && <Withdraw feePercent={feePercent} InternalTokenBalance={InternalTokenBalance} CryptoniteBalance={CryptoniteBalance} handleExchangeButton={() => handleExchangeButton()} handleTokenWithdrawal={(value) => handleTokenWithdrawal(value)}/>}
        </div>
        <div className={`${classes.filterIconsModal} ${classes.iconStyles}`} style={{
          position: 'absolute',
          bottom: '50px',
          right: '100px'
        }}>
            <a style={{border: '3px solid #fff', backgroundColor: 'rgb(82 155 198)', borderRadius: '25px', marginRight: '25px'}} href="https://poocoin.app/tokens/0x145812dd822cca602161e9e1ea96963be290b549" target="_blank"><img style={{height: '30px', verticalAlign: 'middle'}} src={poocoin}></img></a>
            <a style={{border: '3px solid #fff', backgroundColor: 'rgb(82 155 198)', borderRadius: '25px'}} href="https://pancakeswap.finance/swap?outputCurrency=0x145812dd822cca602161e9e1ea96963be290b549" target="_blank"><img style={{height: '30px', verticalAlign: 'middle'}} src={pancake}></img></a>
        </div>
      </div>    
    </div>

  );
};

export default ExchangeModal2;