import React, { useEffect, useState, useRef } from "react";
import classes from "../../Components/FarmContent/FarmContent.module.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Result from "../../Components/Roulette/Result";
import "./Roulette.css";
import $ from "jquery";
import { motion } from "framer-motion";
import InfoModal from "../../Components/Roulette/InfoModal";
import AWN from "awesome-notifications";
import Sound from 'react-sound';
const LogicArrayBasedOnProbabilityComplexityAccordingToRewards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 1, 2, 3, 4, 5,
  //start
  5, 4, 5, 7, 9, 5, 9, 1, 6, 5, 7, 9, 5, 6, 5, 5, 2, 8, 6, 9, 9, 2, 7, 2, 5, 6,
  1, 6, 8, 5, 6, 9, 6, 7, 7, 7, 1, 5, 6, 9, 8, 6, 5, 8, 2, 1, 8, 5, 1, 7, 3, 8,
  1, 1, 6, 5, 2, 7, 8, 2, 5, 8, 5, 5, 5, 8, 7, 5, 7, 6, 8, 3, 6, 5, 8, 1, 7, 7,
  8, 6, 5, 6, 8, 6, 2, 5, 1, 5, 2, 6, 2, 2, 6, 5, 1, 8, 1, 1, 6, 7, 6, 5,
  //end
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

function Roulette() {
  let rouletteMusic = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/rouletteMusic.mp3'
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/btnBkg.svg"
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/token.png";
  let cryptonite = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/cryptonite.png";
  let change = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/change.png"
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"

  const internalTokenRef = useRef(null)
  const [InternalTokenBalance, setInternalTokenBalance] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true);

  const updateCryptoniteToken = () => {
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
    })
  }



  useEffect(() => {
    
    if (window.sessionStorage.getItem('token')) {
      updateCryptoniteToken()
     
    }
    
  },[])
  var thePrizes = [];
  useEffect(() => {
    let count = 1;
    LogicArrayBasedOnProbabilityComplexityAccordingToRewards.map((prize) => {
      thePrizes.push(
        <li>
          <img
            src={
              require(`../../Components/Roulette/prizes/${prize}.png`).default
            }
            alt={prize}
          />
        </li>
      );
    });

    count += 1;

    setAllPrizes(thePrizes);
  }, []);
  // useEffect(() => {
  //   let count = 1;
  //   LogicArrayBasedOnProbabilityComplexityAccordingToRewards.map((data) => {
  //     thePrizes.push(
  //       <li key={count}>
  //         <img
  //           src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/prizes/${data}.png`}
  //           alt={data}
  //         />
  //       </li>
  //     );
  //     count += 1;
  //   });

  //   setAllPrizes(thePrizes);
  // }, []);
  const [allPrizes, setAllPrizes] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [showResult, setShowResult] = useState({
    status: false,
    showButton: false,
  });
  function selfRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const DoTheSpin = (results) => {
    return new Promise((resolve, reject) => {
      let new_results = results;
      let price = new_results.shift();
      setSpinning(true);
      document.querySelector(".prizesDiv").style.right = "1990px";
      const x = price.number;
      $(`.prizesDiv`).animate(
        {
          right: x * 199,
        },
        randomTime(9, 12) * 1000,
        () => {
          setSpinning(false);
          setWinningPrize(
            document.querySelector(`.prizes li:nth-child(${x + 4}) > img`).alt
          );
          if (new_results.length > 0) {
            setShowResult({ status: true, showButton: false });
          } else {
            setShowResult({ status: true, showButton: true });
          }

          setTimeout(() => {
            if (results.length === 0) {
              resolve("chao pescau");
              return;
            }
            setShowResult({ status: false, showButton: false });
            DoTheSpin(new_results);
          }, 2000);
        }
      );
    });
  };
  const [showInfoModal, setShowInfoModal] = useState(false);
  const ToggleShowInfoHandler = () => {
    setShowInfoModal((prev) => !prev);
  };
  const reSpin = () => {
    setSpinning(false);
    setShowResult(false);
  };

  const request_roulette_spin = () => {
    if (!window.sessionStorage.getItem("token")) {
      new AWN().alert("Please log into your account to spin the roulette!", {
        labels: { alert: "Not logged in" },
      });
      return;
    }
    fetch("https://backend-api-v3.cryptonitegame.io/roulette/spin_me", {
      headers: {
        "auth-token": window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 'error') {
          new AWN().alert(json.info, {labels: {alert: "Something went wrong"}})
          return
        }
        updateCryptoniteToken()
        console.log(json.result.length);
        DoTheSpin(json.result);
      });
  };

  return (
    <>
      {showInfoModal ? <InfoModal close={ToggleShowInfoHandler} /> : null}
      <div className="container">
        <div className="wrapper">
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-25px",
            }}
          >
            {/*  <ContentHeader/> */}
            <div className="cryptoniteSection">
              <div className={`${classes.balanceDivWrapper} ${classes.fcc}`}>
                <div className={classes.balanceDiv}>
                  <p><span id="int-token-balance">{InternalTokenBalance}</span></p>
                  <img src={token} />
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content_info fcc" onClick={ToggleShowInfoHandler}>
              <p>?</p>
            </div>
            <button
            className="content_info fcc"
              style={{
                left: '75px',
                fontSize: '28px',
                backgound: 'transparent',
                backgroundColor: 'transparent',
                border: 'none'
              }}
              onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? '🔇' : '🔊'} </button>
            {!showResult.status ? (
              <>
                {/* <p>Lorem ipsum dolor sit amet</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
                interdum aliquet enim massa ac cras. Tellus mattis et lectus sed
                tincidunt integer vestibulum, auctor sit. Adipiscing lectus
                pellentesque.
              </p> */}
                <div className="spinWrapper">
                  <div className="prizeMagnifier">
                    <img
                      src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/pointer.png`}
                    />
                    <img
                      src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/pointer.png`}
                    />
                  </div>
                  <div className="prizesDiv">
                    <ul className="prizes">{allPrizes}</ul>
                  </div>
                </div>
                <div className="launchAndSpin">
                  <motion.img
                    animate={{
                      y: [0, spinning ? -1000 : 30, !spinning ? 0 : -1000],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 13,
                    }}
                    src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/rocket.png`}
                  />
                  <div
                    className="spinBtn"
                    onClick={!spinning ? request_roulette_spin : null}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/roulette/btn.png`}
                    />
                    {!spinning ? <p>SPIN</p> : <p>Spinning</p>}
                    <div>
                      <Sound
                        url={rouletteMusic}
                        playStatus={
                        spinning && isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
                        }
                        playFromPosition={0}
                        volume={10}
                        //onLoading={handleSongLoading}
                        //onPlaying={handleSongPlaying}
                        //onFinishedPlaying={handleSongFinishedPlaying}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Result
                what={winningPrize}
                newSpin={reSpin}
                showButton={showResult.showButton}
              />
            )}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Roulette;
