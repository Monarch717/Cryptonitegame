import React, { useEffect, useState, useRef } from "react";
import AWN from "awesome-notifications"
import classes from "./CardNew.module.css";
import CardTimer from "./CardTimer";

const CardNew = ({ open, data, keyType, setFarmingTimerOnAlien, updateEggsAfterOpen, updatePacksAfterOpen }) => {
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/eggs/btnBkg.svg";
  const TOKEN = window.sessionStorage.getItem("token")
  const eggIdRef = useRef(null)
  const packIdRef = useRef(null)
  const alienIdRef = useRef(null)
  const [isfarming, setisfarming] = useState(false);
  const [buttonState, setButtonState] = useState('OPEN')
  const startTheTimer = () => {
    setisfarming(true);
    startTimer()
  };

  const updateButtonState = (state) => {
    data.farming_timer = null
    setButtonState(state)
  }

  const openCard = () => {
    open(data, startTheTimer, buttonState, updateButtonState);
  };
  
  const stopFarming = () => {
    setisfarming(false);
    setButtonState(`CLAIM`)
  };
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  let interval = 0;

  const startTimer = () => {
    const countDownDate = new Date().getTime() + 8 * 60 * 60 * 1000;
    interval = setInterval(() => {
      const now = new Date(data.current_timestamp).getTime();
      const distance = new Date(data.farming_timer).getTime() - now;
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
        
      if (data.farming_timer !== null && distance <= 0 && isfarming) {
        // Stop Timer
        clearInterval(interval.current);
        stopFarming();
      } else if (data.farming_timer !== null && distance > 0){
        // Update Timer
        setButtonState('FARMING')
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      } else if (timerSeconds <= 0 && timerMinutes <= 0 && timerHours <= 0 && data.farming_timer !== null) {
        setButtonState('CLAIM')
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  const cardImg = () => {
   
    switch(keyType) {
      case "packs":
        return `https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/packs/presale-${data.rarity}-packs.png`
      case "eggs":
        return `https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/cryptonite-${data.rarity}-eggs.png`
      default:
        return `https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/aliens/${data.type}-${data.rarity}-aliens.png`
    }
  }
  useEffect(() => {
    if (data.farming_timer !== null) {
      setFarmingTimerOnAlien(data, startTheTimer)
      startTheTimer()
    }
  },[])



  const openEggResult = (result) => {
    open(result, startTheTimer, 'OPEN', updateButtonState)
  }

  const requestOpenEgg = (token, eggId) => {
    fetch(`https://backend-api-v3.cryptonitegame.io/inventory/open_egg/${eggId}`, {
      headers: {
        'auth-token': token
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.status === "error") {
        eggIdRef.current.querySelector("div > div > div > div > p").innerText = 'OPEN'
        new AWN().alert(json.info, {labels: {alert: 'Something went wrong'}})
        return
      }
      eggIdRef.current.style.display = 'none'
      updateEggsAfterOpen(data.id)
      openEggResult(json.result)
    })
  }

  const requestOpenPack = (token, packId) => {
    fetch(`https://backend-api-v3.cryptonitegame.io/inventory/open_pack/${packId}`, {
      headers: {
        'auth-token': token
      }
    })
    .then(response => response.json())
    .then(json => {

      if (json.status === "error") {
        packIdRef.current.querySelector("div > div > div > div > p").innerText = 'OPEN'
        new AWN().alert(json.info, {labels: {alert: 'Something went wrong'}})
        return
      }
      
      const msg = `
      Pack content:
      {line_holder}
      ${json.result.eggs.common_eggs > 0 ? `Common eggs: ${json.result.eggs.common_eggs}` : ''}
      ${json.result.eggs.rare_eggs > 0 ? `Rare eggs: ${json.result.eggs.common_eggs}` : ''}
      ${json.result.potions.small_potions > 0 ? `Small potions: ${json.result.potions.small_potions}` : ''}
      ${json.result.potions.medium_potions > 0 ? `Medium potions: ${json.result.potions.small_potions}` : ''}
      ${json.result.potions.greater_potions > 0 ? `Greater potions: ${json.result.potions.small_potions}` : ''}
      ${json.result.picks.common_pick > 0 ? `Common pick: ${json.result.picks.common_pick}` : ''}
      ${json.result.picks.uncommon_pick > 0 ? `Uncommon pick: ${json.result.picks.uncommon_pick}` : ''}
      ${json.result.picks.rare_pick > 0 ? `Rare pick: ${json.result.picks.rare_pick}` : ''}
      {line_holder}
      ${json.result.chests_results.common > 0 || json.result.chests_results.uncommon > 0 || json.result.chests_results.rare > 0 ? 'Chests results:' : ''}
      {line_holder}
      ${json.result.chests_results.common > 0 ? `Common pick: ${json.result.chests_results.common}` : ''}
      ${json.result.chests_results.uncommon > 0 ? `Uncommon pick: ${json.result.chests_results.uncommon}` : ''}
      ${json.result.chests_results.rare > 0 ? `Rare pick: ${json.result.chests_results.rare}` : ''}
      `.replace(/^\s*\n/gm, "").replaceAll("{line_holder}", "")
      packIdRef.current.style.display = 'none'
      updatePacksAfterOpen(data.id)
      new AWN().success(msg, {labels: {alert: 'Pack content'}})
      
    })
  }

  const openEgg = () => {
    if (TOKEN) {
      // eggIdRef.current.id
      eggIdRef.current.querySelector("div > div > div > div > p").innerText = 'HATCHING...'
      requestOpenEgg(TOKEN, data.id)
    } else {
      new AWN().info('Please connect to Metamask.', {labels: {alert: 'Connect Metamask'}})
    }
  }

  const openPack = () => {
    if (TOKEN) {
      packIdRef.current.querySelector("div > div > div > div > p").innerText = 'OPENING...'
      requestOpenPack(TOKEN, data.id)
    } else {
      new AWN().info('Please connect to Metamask.', {labels: {alert: 'Connect Metamask'}})
    }
  }

  return (
    <div
      className={classes.cardWrapper}
      onClick={
        keyType === "packs" ? openPack : keyType === "eggs" ? openEgg : openCard
      }
      ref={keyType === "packs" ? packIdRef : keyType === "eggs" ? eggIdRef : alienIdRef}
    >
      <div className={classes.card}>
        <img
          src={`${cardImg()}`}
          alt={`${keyType}-${data.rarity}`}
          className={classes.cardImage}
        />
        <div className={classes.cardButton}>
          <img src={btnBkg} alt="Open" className={classes.cardButtonBkg} />
          <p className={classes.cardButtonText}>
            {
              keyType === 'packs' || keyType === 'eggs' ?
              `OPEN` :
              keyType === 'aliens' && data.farming_timer === null ?
              `OPEN` :
              timerHours > 0 || timerMinutes > 0 || timerSeconds > 0 ?
              `${timerHours}:${timerMinutes}:${timerSeconds}`:
              buttonState === 'OPEN' ? 'OPEN' :`CLAIM`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardNew;
