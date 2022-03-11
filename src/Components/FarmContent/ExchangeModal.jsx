import classes from "./FarmContent.module.css";
import React, { useState, useRef } from "react";

const ExchangeModal = ({InternalTokenBalance, CryptoniteBalance, handleExchangeButton, makeUserTokensDeposit, makeUserTransaction }) => {
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/btnBkg.svg"
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/token.png";
  let cryptonite = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/cryptonite.png";
  let change = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/change.png"
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"

  const internalTokenRef = useRef(null)
  const ctntRef = useRef(null)

  const [currentFee, setCurrentFeeValue] = useState(75);
  const [tokenValue, setTokenValue] = useState('');
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


  const handleTokenDeposit = () => {
    if (ctntValue === '' || ctntValue <= 0) {
      return
    }
    makeUserTokensDeposit(web3, window.ethereum, ctntValue).then(result => {
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
          amount: ctntValue * 10000
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.status === "error") {
          return
        }
        setcontentFooter(json.consumibles);
      })
    })
  }

  const handleTokenWithdrawal = () => {
    if (tokenValue === '' || tokenValue <= 0) {
      return
    }
    makeUserTransaction(window.ethereum).then(result => {
      console.log("Metamask result")
      console.log(result)
      fetch(`https://backend-api-v3.cryptonitegame.io/monederos/withdraw_ctnt`, {
        method: 'POST',
        headers: {
          'auth-token': window.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx_hash: result.txHash,
          amount: tokenValue
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.status === "error") {
          return
        }
        setcontentFooter(json.consumibles);
      })
    })
  }

  return (

    <div className={classes.firstContainer}>
      <div className={classes.secondContainer}>
        <img src={cross} className={classes.firstImage}  onClick={() => handleExchangeButton()}/>
        <div style={{marginBottom: '40px', paddingTop: '0px'}}>
          <h2 style={{color: '#fff'}}>Current withdrawal fee: {currentFee}%.</h2>
          {/* <p>CTNT balance: {CryptoniteBalance}</p>
          <p>Internal token balance: {InternalTokenBalance}</p> */}
        </div>
        <div className={classes.modalGrid}>
          <div className={classes.inputDiv}>
            <img src={cryptonite} alt="Token"/>
            <input ref={ctntRef} type="number" step="0.01" min="0" max={CryptoniteBalance} value={ctntValue} onChange={() => changeCtntValue()}/>
            <button onClick={() => changeCtntValue('max')}>max</button>
          </div>
          <div>
            <img src={change} alt="Close" className={classes.cardButtonBkg}/>
          </div>
          <div className={classes.inputDiv}>
            <img src={token} alt="Token"/>
            <input ref={internalTokenRef} type="number" step="0.01" min="0" max={InternalTokenBalance} value={tokenValue} onChange={() => changeTokenValue()}/>
            <button onClick={() => changeTokenValue('max')}>max</button>
          </div>
          <div className={classes.inputDivDeposit}>
            <img src={btnBkg} alt="Close"/>
              <a className={classes.modalButton} onClick={() => handleTokenDeposit()}>DEPOSIT</a>
          </div >
          <div className={classes.inputDivWithdraw}>
            <img src={btnBkg} alt="Close"/>
              <a className={classes.modalButton} onClick={() => handleTokenWithdrawal()}>WITHDRAW</a>
          </div>
        </div>
      </div>    
    </div>

  );
};

export default ExchangeModal;