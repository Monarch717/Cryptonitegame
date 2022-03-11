import React, { useState } from "react";
import classes from "./Tile.module.css";
import { motion } from "framer-motion";
import AWN from "awesome-notifications";



function Tile({
  tileBackground,
  tileImage,
  index,
  dataList,
  price,
  bnb_price,
  packageCounter,
  incrementCount,
  decrementCount,
  limit,
  makeUserTransaction,
  checkUserTransactionWeb3,
  check_transaction,
  register_transaction_hash,
  register_presale_transaction
}) {

  let buyBtn = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/buy-btn.png";
  let polygon1 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/polygon1.png";
  let coin = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/coin.png";

  const [isProcessing, setIsProcessing] = useState(false)
  let isTransactionError = false

   const removeBackdrop = () => {
    if (!isProcessing) {
      document.querySelector("#backdrop").remove()
      document.querySelector("#presale-modal").remove()
    }
    else {
      new AWN().Info('We are processing your transaction...', {labels: {alert: 'Please wait'}})
    }
  }
  
  const addBackdrop = () => {
    let div = document.createElement("div")
      div.id = 'backdrop'
      div.classList.add(classes.backdrop)

    document.querySelector("#root").appendChild(div)


      document.querySelector("#backdrop").addEventListener("click", () => {
        removeBackdrop()
      })

  } 

  function colorMatcher(index) {
    switch (index) {
      case 0:
        return "#36A8B8";
      case 1:
        return "#6A9231";
      case 2:
        return "#DB3D53";
      case 3:
        return "#AC34A4";
      case 4:
        return "#E69D25";
      default:
    }
  }

  const registerTransactionV2 = () => {
    return new Promise((resolve, reject) => {
      // Check pack supply
      if (index.limit === 0 && !isTransactionError) {
        isTransactionError = true
        new AWN().info('This pack has sold out!', {labels: {alert: 'Sold out'}})
        reject()
      }
      // Deactivate buy buttons and prevent users to refresh page
      let buyButtons = document.querySelectorAll("div[datatarget='presale-buy-btn']")
      for (buyBtn of buyButtons) {
        buyBtn.style.pointerEvents = 'none'
      }
      window.onbeforeunload = function() {
        return "Dude, are you sure you want to leave? Think of the kittens!";
      }

      // Add backdrop and prep modal
      addBackdrop()
      let div = document.createElement("div")
      div.classList.add(classes.openModalBkg)
      div.id = 'presale-modal'
      div.innerHTML = `
        <h1 style="color: #ffffff;">Processing transaction please wait, do NOT reload the page</h1>
      `
      document.querySelector("body").appendChild(div)

      const TOKEN = window.sessionStorage.getItem('token')
      let modal = document.querySelector("#presale-modal")

      // Check for user token available on session storage if not, unblock buy buttons and stop refresh page control
      if (!TOKEN  && !isTransactionError) {
        isTransactionError = true
        new AWN().alert('Please try again... Double check you are connected to metamask.', {labels: {alert: 'Something went wrong'}})
        modal.innerHTML = '<h1 style="color: #ffffff;">Please connect to Metamask to make a transaction</h1>'
        window.onbeforeunload = ''
        for (buyBtn of buyButtons) {
          buyBtn.style.pointerEvents = 'unset'
        }
        reject("error")
      }

      register_presale_transaction(TOKEN, index + 1, packageCounter.values[index])
      .then(response => {
        if (!response || response.error  && !isTransactionError){
          isTransactionError = true
          new AWN().alert(`${!response ? 'Please check your metamask connection, no transaction has been made' : response.error ? response.error : 'Please check your metamask connection, no transaction has been made'}`, {labels: {alert: 'Something went wrong'}})
          modal.innerHTML = `<h1 style="color: #ffffff;">${!response ? 'Please check your metamask connection, no transaction has been made' : response.error ? response.error : 'Please check your metamask connection, no transaction has been made'}</h1>`
          window.onbeforeunload = ''
          for (buyBtn of buyButtons) {
            buyBtn.style.pointerEvents = 'unset'
          }
          reject("error")
        }

        if (response.invalid  && !isTransactionError) {
          isTransactionError = true
          new AWN().alert(`${response.invalid ? response.invalid : 'Please check your metamask connection, no transaction has been made'}`, {labels: {alert: 'Invalid request'}})
          modal.innerHTML = `<h1 style="color: #ffffff;">${response.invalid ? response.invalid : 'Please check your metamask connection, no transaction has been made'}</h1>`
          window.onbeforeunload = ''
          for (buyBtn of buyButtons) {
            buyBtn.style.pointerEvents = 'unset'
          }
          reject("error")
        }

        if (response.limit  && !isTransactionError) {
          isTransactionError = true
          new AWN().info('This pack has sold out!', {labels: {alert: 'Sold out'}})
          window.onbeforeunload = ''
          for (buyBtn of buyButtons) {
            buyBtn.style.pointerEvents = 'unset'
          }
          reject("error")
        }

        if ((!response.transaction_id || !response.final_price) && !isTransactionError){
          isTransactionError = true
          new AWN().info('We are processing too many transactions! please wait 2 minutes and try again. Thank you', {labels: {alert: 'Network busy'}})
          window.onbeforeunload = ''
          for (buyBtn of buyButtons) {
            buyBtn.style.pointerEvents = 'unset'
          }
          reject("error")
        }

        makeUserTransaction(window.ethereum, response.transaction_id, response.final_price.toString())
        .then(transaction => {
          if ((!transaction || !transaction.txHash || !transaction.transaction_id)  && !isTransactionError) {
            isTransactionError = true
            new AWN().alert('The transaction has been canceled, please choose your pack and try again, thank you', {labels: {alert: 'Transaction canceled'}})
            modal.innerHTML = `<h1 style="color: #ffffff;">The transaction has been canceled, please choose your pack and try again, thank you</h1>`
            window.onbeforeunload = ''
            for (buyBtn of buyButtons) {
              buyBtn.style.pointerEvents = 'unset'
            }
            reject("error")
          }

          register_transaction_hash(TOKEN, transaction.txHash, transaction.transaction_id)
          .then(registeredTransactionHash => {
            if ((!registeredTransactionHash || registeredTransactionHash.error) && !isTransactionError){
              isTransactionError = true
              new AWN().alert(`${!registeredTransactionHash ? 'Something went wrong, please contact the support team and provide your transaction hash.' : registeredTransactionHash.error ? registeredTransactionHash.error : 'Something went wrong, please contact the support team and provide your transaction hash.'}`, {labels: {alert: 'Something went wrong'}})
              modal.innerHTML = `<h1 style="color: #ffffff;">${!registeredTransactionHash ? 'Something went wrong, please contact the support team and provide your transaction hash.' : registeredTransactionHash.error ? registeredTransactionHash.error : 'Something went wrong, please contact the support team and provide your transaction hash.'}</h1>`
              window.onbeforeunload = ''
              for (buyBtn of buyButtons) {
                buyBtn.style.pointerEvents = 'unset'
              }
              reject("error")
            }
    
            if (registeredTransactionHash.invalid && !isTransactionError) {
              isTransactionError = true
              new AWN().alert(`${registeredTransactionHash.invalid ? registeredTransactionHash.invalid : 'Something went wrong, please contact the support team and provide your transaction hash.'}`, {labels: {alert: 'Something went wrong'}})
              modal.innerHTML = `<h1 style="color: #ffffff;">${registeredTransactionHash.invalid ? registeredTransactionHash.invalid : 'Something went wrong, please contact the support team and provide your transaction hash.'}</h1>`
              window.onbeforeunload = ''
              for (buyBtn of buyButtons) {
                buyBtn.style.pointerEvents = 'unset'
              }
              reject("error")
            }

            if ((registeredTransactionHash.status !== 'success' || !registeredTransactionHash.tx_hash || !registeredTransactionHash.transaction_id) && !isTransactionError) {
              isTransactionError = true
              new AWN().alert('Something went wrong, please contact the support team and provide your transaction hash.', {labels: {alert: 'Something went wrong'}})
              modal.innerHTML = `<h1 style="color: #ffffff;">Something went wrong, please contact the support team and provide your transaction hash.</h1>`
              window.onbeforeunload = ''
              for (buyBtn of buyButtons) {
                buyBtn.style.pointerEvents = 'unset'
              }
              reject("error")
            }

            checkUserTransactionWeb3(window.ethereum, registeredTransactionHash.tx_hash, registeredTransactionHash.transaction_id)
            .then(MetamaskTransactionCheck => {
              if (!MetamaskTransactionCheck.completed && !isTransactionError) {
                isTransactionError = true
                new AWN().alert('Something went wrong, please go to my account page and check your transaction.', {labels: {alert: 'Something went wrong'}})
                modal.innerHTML = `<h1 style="color: #ffffff;">Something went wrong, please go to my account page and check your transaction.</h1>`
                window.onbeforeunload = ''
                for (buyBtn of buyButtons) {
                  buyBtn.style.pointerEvents = 'unset'
                }
                reject("error")
              }

              check_transaction(TOKEN, MetamaskTransactionCheck.tx_hash, MetamaskTransactionCheck.transaction_id)
              .then(transactionResult => {
                if (transactionResult.status === 'success') {
                  new AWN().success('The transaction has been completed, check your inventory!', {labels: {alert: 'Transaction completed'}})
                  modal.innerHTML = '<h1 style="color: #ffffff;">Transaction completed, please check your inventory.</h1>'
                  window.onbeforeunload = ''
                  for (buyBtn of buyButtons) {
                    buyBtn.style.pointerEvents = 'unset'
                  }
                  isTransactionError = false
                  resolve()
                } else {
                  if (!isTransactionError) {
                    new AWN().alert('The transaction has been saved, please check my account page to check your transaction status.', {labels: {alert: 'Something went wrong'}})
                    modal.innerHTML = '<h1 style="color: #ffffff;">The transaction has been saved, please check my account page to check your transaction status.</h1>'
                    window.onbeforeunload = ''
                    for (buyBtn of buyButtons) {
                      buyBtn.style.pointerEvents = 'unset'
                    }
                    isTransactionError = false
                    reject("error")
                  }
                }
              })
            })

          })
        })
      })
    })
  }


 /* const registerTransaction = async () => {

  let buyButtons = document.querySelectorAll("div[datatarget='presale-buy-btn']")

  for (buyBtn of buyButtons) {
    buyBtn.style.pointerEvents = 'none'
  }

  if (index + 1 === 5) {
    new AWN().info('This pack has sold out!', {labels: {alert: 'Sold out'}})
  } else {

    window.onbeforeunload = function() {
      return "Dude, are you sure you want to leave? Think of the kittens!";
    }
    
    addBackdrop()
    let div = document.createElement("div")
      div.classList.add(classes.openModalBkg)
      div.id = 'presale-modal'
      div.innerHTML = `
        <h1 style="color: #ffffff;">Processing transaction please wait, do NOT reload the page</h1>
      `
    document.querySelector("body").appendChild(div)
    const TOKEN = window.sessionStorage.getItem('token')
    let modal = document.querySelector("#presale-modal")

    if (!TOKEN) {
      new AWN().alert('Please try again... Double check you are connected to metamask.', {labels: {alert: 'Something went wrong'}})
      modal.innerHTML = '<h1 style="color: #ffffff;">Please connect to Metamask to make a transaction</h1>'

    } else {
      const TransactionRequest = await register_presale_transaction(TOKEN, index + 1, packageCounter.values[index])

        if (!TransactionRequest.transaction_id || !TransactionRequest.final_price){
          new AWN().alert('Please try again... Double check you are connected to metamask.', {labels: {alert: 'Something went wrong'}})
          modal.innerHTML = '<h1 style="color: #ffffff;">Please connect to Metamask to make a transaction</h1>'
        } else {
          const MetamaskTransaction = await makeUserTransaction(window.ethereum, TransactionRequest.final_price.toString())

          if (!MetamaskTransaction.txHash) {
            new AWN().alert('The transaction has been canceled.', {labels: {alert: 'Something went wrong'}})
            modal.innerHTML = '<h1 style="color: #ffffff;">The transaction has been canceled.</h1>'
          } else {
            const MetamaskCheck = await checkUserTransactionWeb3(window.ethereum, MetamaskTransaction.txHash)

            if (!MetamaskCheck.completed && !MetamaskCheck.receipt) {
              new AWN().alert('The transaction has been canceled.', {labels: {alert: 'Something went wrong'}})
              modal.innerHTML = '<h1 style="color: #ffffff;">The transaction has been canceled or transaction failed.</h1>'
            } else {

              const backEndCheck = await check_transaction(TOKEN, MetamaskTransaction.txHash, TransactionRequest.transaction_id)

              if (backEndCheck.status === 'success') {
                new AWN().success('The transaction has been completed, check your inventory!', {labels: {alert: 'Transaction completed'}})
                modal.innerHTML = '<h1 style="color: #ffffff;">Transaction completed, please check your inventory.</h1>'
              } else {
                new AWN().alert('The transaction process has been saved, please contact the team to report the issue.', {labels: {alert: 'Something went wrong'}})
                modal.innerHTML = '<h1 style="color: #ffffff;">The transaction FAILED. The process has been saved, please contact the team to report the issue.</h1>'
              }
            }

          }

        }
      }  

      
    }
    window.onbeforeunload = ''
    for (buyBtn of buyButtons) {
      buyBtn.style.pointerEvents = 'unset'
    }
  } */

  return (
    <motion.div
      className={classes.tile}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
      }}
    >
      <div className={classes.tileBackground}>
        <img src={tileBackground} alt="" />
      </div>
      <div className={classes.maxSupply}>
        <h3>Max: {limit}</h3>
      </div>
      <div className={classes.tileContent}>
        <div className={classes.innerTileContent}>
          <div>
            {dataList?.value?.map((li, index) => {
              return (
                <div className={classes.tileList} key={index}>
                  <img src={dataList?.img[index]} alt="" loading="lazy" />
                  {li}
                </div>
              );
            })}
            <br />
            <div className={classes.price}>
              <img src={coin} alt="Coin" loading="lazy" />
              <p style={{whiteSpace: 'pre'}}>{`${price * packageCounter?.values[index]}$\n`}
              <small>{`${bnb_price > 0 ? (bnb_price * packageCounter?.values[index]).toFixed(4) : 0} BNB`}</small></p>
            </div>
          </div>
          <div>
            <img src={tileImage} alt="" loading="lazy" />
          </div>
        </div>
        <div className={classes.bottomTileContent}>
          <div className={classes.input}>
            <input
              type="number"
              style={{ background: colorMatcher(index) }}
              readOnly
              value={packageCounter?.values[index]}
            />
            <div className={classes.inputBtnContainer}>
              <div
                className={classes.inputBtn1}
                onClick={() => incrementCount(index)}
              >
                <img src={polygon1} alt="" />
              </div>
              <div
                className={classes.inputBtn2}
                onClick={() => decrementCount(index)}
              >
                <img src={polygon1} alt="" />
              </div>
            </div>
          </div>
          <div className={classes.buyBtn}>
            <img src={buyBtn} alt="" loading="lazy" />
            <div datatarget="presale-buy-btn" onClick={() => registerTransactionV2()}>BUY</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Tile;
