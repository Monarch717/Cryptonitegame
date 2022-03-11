import React, { useState, useEffect, useContext } from "react";
import classes from "./Presale.module.css";

import CountdownCtx from "../Contexts/CountdownCtx";

import Tile from "../Tile";
import Clock from "../Utils/Clock";
import { ethers } from 'ethers';
import Web3 from 'web3';
import CryptoniteAPI from '../../shared/CryptoniteAPI';
import MetamaskAPI from '../../shared/MetamaskAPI';

let tile1 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-1.svg";
let tile2 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-2.svg";
let tile3 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-3.svg";
let tile4 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-4.svg";
let tile5 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-5.svg";
let tileImg1 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-img-1.svg";
let tileImg2 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-img-2.svg";
let tileImg3 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-img-3.svg";
let tileImg4 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-img-4.svg";
let tileImg5 = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tile-img-5.svg";

let commonEgg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/common-egg.png";
let rareEgg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/rare-egg.png";
let smallPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/small-potion.png";
let mediumPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/medium-potion.png";
let greaterPotion = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/greater-potion.png";
let rarePick = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/rare-pick.png";
let commonPick = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/common-pick.png";
let toolChest = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tool-chest.png";
let buyPacksImage = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/buyPacks.png";


let Cryptonite = new CryptoniteAPI()
let Metamask = new MetamaskAPI(Web3, ethers)

const obj = [
  {
    img: [
      commonEgg,
      smallPotion,
      commonPick
    ],
    value: [
      "1 Common Egg",
      "15 Small Potion",
      "1 Common Pick"
    ],
  },
  {
    img: [
      rareEgg,
      mediumPotion,
      toolChest
    ],
    value: [
      "1 Rare Egg",
      "20 Medium Potion",
      "1 Tool chest"
    ],
  },
  {
    img: [
      commonEgg,
      rareEgg,
      smallPotion,
      mediumPotion,
      greaterPotion,
      toolChest
    ],
    value: [
      "2 Common Egg",
      "2 Rare Egg",
      "40 Small Potion",
      "30 Medium Potion",
      "20 Greater Potion",
      "4 Tool chest"
    ],
  },
  {
    img: [
      rareEgg,
      smallPotion,
      mediumPotion,
      greaterPotion,
      toolChest,
    ],
    value: [
      "6 Rare Egg",
      "80 Small Potions",
      "60 Medium Potions",
      "40 Greater Potions",
      "6 Tool Chest",
    ],
  },
  {
    img: [
      rareEgg,
      smallPotion,
      mediumPotion,
      greaterPotion,
      toolChest,
    ],
    value: [
      "20 Rare egg",
      "300 Small Potions",
      "250 Medium Potions",
      "200 Greater Potions",
      "20 Tool Chest",
    ],
  },
];
function Presale() {
  const [presaleSupply, setPresaleSupply] = useState({
    "presale": {
        "pack1": {
            "bnb_value": 0,
            "supply": 0,
            "value": 0
        },
        "pack2": {
            "bnb_value": 0,
            "supply": 0,
            "value": 0
        },
        "pack3": {
            "bnb_value": 0,
            "supply": 0,
            "value": 0
        },
        "pack4": {
            "bnb_value": 0,
            "supply": 0,
            "value": 0
        },
        "pack5": {
            "bnb_value": 0,
            "supply": 0,
            "value": 0
        }
    }
  })
  
  useEffect(() => {
    Cryptonite.get_presale_supply()
    .then(presale => {
      if (presale.presale.pack1 && presale.presale.pack2 && presale.presale.pack3 && presale.presale.pack4 && presale.presale.pack5) {
        setPresaleSupply(presale)
      }
    })
  },[])

  const [packageCounter, setPackageCounter] = useState({
    values: [1, 1, 1, 1, 1],
  });

  function incrementCount(index) {
    const temp = { ...packageCounter };
    const values = temp?.values;
    values[index] = values[index] + 1;
    setPackageCounter({ values: values });
  }

  function decrementCount(index) {
    const temp = { ...packageCounter };
    const values = temp?.values;
    if (values[index] > 1) {
      values[index] = values[index] - 1;
      setPackageCounter({ values: values });
    }
  }
  const isCountdownEnded = useContext(CountdownCtx).isCountdownEnded;
  const endCountdown = useContext(CountdownCtx).setCountdownEnd;
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;
  const turnOnPreSale = () => {
    endCountdown();
  };
  const startTimer = () => {
    const countDownDate = new Date("Jan 16,2022 17:00:00 UTC").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer
        clearInterval(interval.current);
        turnOnPreSale();
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.heading}>PReSALe</h1>
        <div className={classes.subtitle}>
          <h3>Users who purchase a total of 4 rare eggs or more will be automatically entered into a prize draw. <br></br><u className={classes.boldClass}>50 users</u> will be randomly selected from the prize draw and will be able to access the farm mode<br></br> <span className={classes.arrowSize}>→</span><u className={classes.boldClass}>2 days before the public launch</u><span className={classes.arrowSize}>←</span></h3>
        </div>
      </div>  
      <div className={classes.tileContainer}>
        <Tile
          tileBackground={tile1}
          tileImage={tileImg1}
          index={0}
          dataList={obj[0]}
          price={presaleSupply.presale.pack1.value}
          bnb_price={presaleSupply.presale.pack1.bnb_value}
          packageCounter={packageCounter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          limit={presaleSupply.presale.pack1.supply > 0 ? presaleSupply.presale.pack1.supply : 'Sold out'}
          makeUserTransaction={(ethereum,  transaction_id, etherValue) => Metamask.makeUserTransaction(ethereum, transaction_id, etherValue)}
          checkUserTransactionWeb3={(ethereum, txHash, transaction_id) => Metamask.checkUserTransactionWeb3(ethereum, txHash, transaction_id)}
          check_transaction={(token, txHash, transaction_id) => Cryptonite.check_transaction(token, txHash, transaction_id)}
          register_transaction_hash={(token, txHash, transaction_id) => Cryptonite.register_transaction_hash(token, txHash, transaction_id)}
          register_presale_transaction={(token, item, quantity) => Cryptonite.register_presale_transaction(token, item, quantity)}
        />
        <Tile
          tileBackground={tile2}
          tileImage={tileImg2}
          index={1}
          dataList={obj[1]}
          price={presaleSupply.presale.pack2.value}
          bnb_price={presaleSupply.presale.pack2.bnb_value}
          packageCounter={packageCounter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          limit={presaleSupply.presale.pack2.supply > 0 ? presaleSupply.presale.pack2.supply : 'Sold out'}
          makeUserTransaction={(ethereum,  transaction_id, etherValue) => Metamask.makeUserTransaction(ethereum, transaction_id, etherValue)}
          checkUserTransactionWeb3={(ethereum, txHash, transaction_id) => Metamask.checkUserTransactionWeb3(ethereum, txHash, transaction_id)}
          check_transaction={(token, txHash, transaction_id) => Cryptonite.check_transaction(token, txHash, transaction_id)}
          register_transaction_hash={(token, txHash, transaction_id) => Cryptonite.register_transaction_hash(token, txHash, transaction_id)}
          register_presale_transaction={(token, item, quantity) => Cryptonite.register_presale_transaction(token, item, quantity)}
        />
        <Tile
          tileBackground={tile3}
          tileImage={tileImg3}
          index={2}
          dataList={obj[2]}
          price={presaleSupply.presale.pack3.value}
          bnb_price={presaleSupply.presale.pack3.bnb_value}
          packageCounter={packageCounter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          limit={presaleSupply.presale.pack3.supply > 0 ? presaleSupply.presale.pack3.supply : 'Sold out'}
          makeUserTransaction={(ethereum,  transaction_id, etherValue) => Metamask.makeUserTransaction(ethereum, transaction_id, etherValue)}
          checkUserTransactionWeb3={(ethereum, txHash, transaction_id) => Metamask.checkUserTransactionWeb3(ethereum, txHash, transaction_id)}
          check_transaction={(token, txHash, transaction_id) => Cryptonite.check_transaction(token, txHash, transaction_id)}
          register_transaction_hash={(token, txHash, transaction_id) => Cryptonite.register_transaction_hash(token, txHash, transaction_id)}
          register_presale_transaction={(token, item, quantity) => Cryptonite.register_presale_transaction(token, item, quantity)}
        />
        <Tile
          tileBackground={tile4}
          tileImage={tileImg4}
          index={3}
          dataList={obj[3]}
          price={presaleSupply.presale.pack4.value}
          bnb_price={presaleSupply.presale.pack4.bnb_value}
          packageCounter={packageCounter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          limit={presaleSupply.presale.pack4.supply > 0 ? presaleSupply.presale.pack4.supply : 'Sold out'}
          makeUserTransaction={(ethereum,  transaction_id, etherValue) => Metamask.makeUserTransaction(ethereum, transaction_id, etherValue)}
          checkUserTransactionWeb3={(ethereum, txHash, transaction_id) => Metamask.checkUserTransactionWeb3(ethereum, txHash, transaction_id)}
          check_transaction={(token, txHash, transaction_id) => Cryptonite.check_transaction(token, txHash, transaction_id)}
          register_transaction_hash={(token, txHash, transaction_id) => Cryptonite.register_transaction_hash(token, txHash, transaction_id)}
          register_presale_transaction={(token, item, quantity) => Cryptonite.register_presale_transaction(token, item, quantity)}
        />
        <Tile
          tileBackground={tile5}
          tileImage={tileImg5}
          index={4}
          dataList={obj[4]}
          price={presaleSupply.presale.pack5.value}
          bnb_price={presaleSupply.presale.pack5.bnb_value}
          packageCounter={packageCounter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          limit={presaleSupply.presale.pack5.supply > 0 ? presaleSupply.presale.pack5.supply : 'Sold out'}
          makeUserTransaction={(ethereum,  transaction_id, etherValue) => Metamask.makeUserTransaction(ethereum, transaction_id, etherValue)}
          checkUserTransactionWeb3={(ethereum, txHash, transaction_id) => Metamask.checkUserTransactionWeb3(ethereum, txHash, transaction_id)}
          check_transaction={(token, txHash, transaction_id) => Cryptonite.check_transaction(token, txHash, transaction_id)}
          register_transaction_hash={(token, txHash, transaction_id) => Cryptonite.register_transaction_hash(token, txHash, transaction_id)}
          register_presale_transaction={(token, item, quantity) => Cryptonite.register_presale_transaction(token, item, quantity)}
        />
      </div>
    </div>
  );
}

export default Presale;
