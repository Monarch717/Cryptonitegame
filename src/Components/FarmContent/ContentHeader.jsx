import React, { useEffect, useState } from "react";
import classes from "./FarmContent.module.css";
import MetamaskAPI from "../../shared/MetamaskAPI";
import { ethers } from 'ethers'
import Web3 from 'web3'
import ExchangeModal2 from "./ExchangeModal2";

const data = {
  gems: 0,
  cryptonite: 0,
  binance: 30,
};

let Metamask = new MetamaskAPI(Web3, ethers)

const ContentHeader = () => {
  const [bnbBalance, setBnbBalance] = useState(0)
  const [CryptoniteBalance, setCryptoniteBalance] = useState(0)
  const [InternalTokenBalance, setInternalTokenBalance] = useState(0)
  const [feePercent, setFeePercent] = useState(75)
  const [exchangeModalData, setExchangeModalData] = useState(false);
  const [ctntPrice, setCtntPrice] = useState(0)
 const handleExchangeButton = () => {
    switch(exchangeModalData) {
      case false:
        setExchangeModalData(true)
        break
      default:
        setExchangeModalData(false)
    }
  }


  const getCtntPriceFromPancakeSwap = () => {
    fetch(`https://api.pancakeswap.info/api/v2/tokens/0x145812dd822Cca602161e9E1ea96963be290b549`)
    .then(response => response.json())
    .then(json => {
      setCtntPrice(parseFloat(json.data.price).toFixed(4));
    })
  }

  const getCryptoniteTokenBalance = () => {
    fetch(`https://backend-api-v3.cryptonitegame.io/monederos/cryptonite_token`, {
        headers: {
          'auth-token': window.sessionStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(json => {
        if (json.status === "error") {
          new AWN().alert(json.info, {labels: {alert: 'Something went wrong'}})
          return
        }
        setInternalTokenBalance(parseFloat(json.internal_tokens).toFixed(2));
        setFeePercent(json.fee_percent)
    })
  }

  const getBnbAndExternalTokenBalance = () => {
    Metamask.getUserBalance(window.ethereum)
    .then(userBnbBalance => setBnbBalance(parseFloat(userBnbBalance).toFixed(2)))
    Metamask.getCryptoniteBalance(window.ethereum.selectedAddress)
    .then(cryptoniteBalance => setCryptoniteBalance(parseFloat(cryptoniteBalance).toFixed(2)))
  }


  useEffect(() => {
    if (ctntPrice === 0) {
      getCtntPriceFromPancakeSwap()
    }
    if (window.sessionStorage.getItem('token')) {

      getCryptoniteTokenBalance()
    }

    setTimeout(()=> {
      if (window.ethereum && window.ethereum.selectedAddress) {
        getBnbAndExternalTokenBalance()
      }
    },500)

  },[])

  let exchangeBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/exchangeBkg.svg";
  let token = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Cryptonite_internal_token.png'
  let cryptonite = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cryptonite_token_icon.png'
  let binance = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/binance_icon.png'
  let tokenCryptonite = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/exange.png'
  // const [data, setdata] = useState({});
  // useEffect(() => {
  //   setdata(headerData);
  //   // console.log(data);
  // }, []);
  return (
    <div className={classes.headerWrapper}>
      {exchangeModalData &&
      <ExchangeModal2
        feePercent={feePercent}
        InternalTokenBalance={InternalTokenBalance}
        CryptoniteBalance={CryptoniteBalance}
        handleExchangeButton={() => handleExchangeButton()}
        makeUserTokensDeposit={(web3, ethereum, etherValue) => Metamask.makeUserTokensDeposit(web3, ethereum, etherValue)}
        makeUserTransaction={(ethereum) => Metamask.makeUserTransaction(ethereum)}
        getCryptoniteTokenBalance={() => getCryptoniteTokenBalance()}
        getBnbAndExternalTokenBalance={() => getBnbAndExternalTokenBalance()}
      />}
      <div className={classes.header}>
      <p style={{
              position: 'absolute',
              top: '10px',
              color: '#fff',
              fontFamily: 'Prototype'
            }}>CTNT Price: <span id="ctntPrice">{ctntPrice}</span>$</p>
        <div className={classes.headerContent}>
          <div className={classes.contentFiguresWrapper}>
            <div className={classes.contentFigures}>
              <div className={classes.figure}>
                <img src={token} alt="Token" className={classes.figureImage} style={{width: '18px', height: '19px'}}/>
                <p style={{fontSize: '16px'}} className={classes.figureText}><span id="int-token-balance">{InternalTokenBalance}</span></p>
              </div>
              <div className={classes.figure}>
                <img
                  src={cryptonite}
                  alt="Token"
                  className={classes.figureImage}
                  style={{width: '19px', height: '19px'}}
                />
                <p style={{fontSize: '16px'}} className={classes.figureText}>{CryptoniteBalance}</p>
              </div>
              <div className={classes.figure}>
                <img
                  src={binance}
                  alt="Token"
                  className={classes.figureImage}
                  style={{width: '19px', height: '19px'}}
                />
                <p style={{fontSize: '16px'}} className={classes.figureText}>{bnbBalance}</p>
              </div>
            </div>
          </div>
          <div className={classes.contentExchange}>
            <img
              src={tokenCryptonite}
              alt="Token"
              className={classes.figureImage}
            />
            <div className={classes.exchangeBtn}>
              <img src={exchangeBkg} alt="" />
              <p onClick={() => handleExchangeButton()}>Exchange</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
