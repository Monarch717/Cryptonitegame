import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player/lazy";
import "./style.css";
import FeedAlien from "./Modal/FeedAlien";
import SelectAxe from "./Modal/SelectAxe";
import { WATERStyles, FIREStyles, GREENStyles } from "./Modal/styling.js";
import SellModal from "./Modal/SellModal";
import ChangeNameModal from "./Modal/ChangeNameModal";
import FeedProgress from "./Modal/FeedProgress";
import Joyride from "react-joyride";
import AWN from "awesome-notifications";
import DinamiteBoost from "./Modal/DinamiteBoost";

const EXPERIENCE_MOCKS = {
  common: {
    experience_lvl_2: 300,
    experience_lvl_3: 400,
    potions_needed: 1,
  },
  uncommon: {
    experience_lvl_2: 600,
    experience_lvl_3: 800,
    potions_needed: 2,
  },
  rare: {
    experience_lvl_2: 900,
    experience_lvl_3: 1200,
    potions_needed: 3,
  },
  epic: {
    experience_lvl_2: 1200,
    experience_lvl_3: 1600,
    potions_needed: 4,
  },
  legendary: {
    experience_lvl_2: 1500,
    experience_lvl_3: 2000,
    potions_needed: 5,
  },
  mythical: {
    experience_lvl_2: 1800,
    experience_lvl_3: 2400,
    potions_needed: 6,
  },
};

const Modal = ({ data, close, startMinting, updateAlienName, dataFooter }) => {
  let dollarSign =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/dollar.png";
  let dollarRedSign =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/dollarRed.png";
  const [styling, setstyling] = useState({});
  const [rarityType, setrarityType] = useState("");
  const [pNeed, setpNeed] = useState(0);
  const [expL2, setExpL2] = useState(0);
  const [expL3, setExpL3] = useState(0);
  const [currentfeed, setcurrentfeed] = useState(0);
  const [small, setsmall] = useState(dataFooter.small_potions);
  const [medium, setmedium] = useState(dataFooter.medium_potions);
  const [greater, setgreater] = useState(dataFooter.greater_potions);
  const [boosters_, setBoosters] = useState(dataFooter.boosters);
  const [dynamites_, setDynamites] = useState(dataFooter.dynamites);
  const [showOverModal, setShowOverModal] = useState(false);
  const [showOverModalName, setShowOverModalName] = useState(false);
  const [alienId, setAlienId] = useState(null);
  const [experienceReq, setExperienceReq] = useState(0);
  const [alienName, setAlienName] = useState("LOTTE");
  const TOKEN = window.sessionStorage.getItem("token");
  const [prepBodyRequest, setBodyRequest] = useState({
    potions: [],
    pick: undefined,
    booster: false,
    dynamite: false
  });

  const requestStartMinting = () => {
    startMinting(prepBodyRequest, data.id);
  };

  const updatePickSelected = (pick) => {
    let currentBodyRequestState = prepBodyRequest;
    switch (pick) {
      case 1:
        currentBodyRequestState.pick = "common";
        break;

      case 3:
        currentBodyRequestState.pick = "uncommon";
        break;

      case 2:
        currentBodyRequestState.pick = "rare";
        break;

      default:
        return;
    }

    setBodyRequest(currentBodyRequestState);
  };

  const updateDynamite = () => {
    let currentBodyRequestState = prepBodyRequest

    switch (currentBodyRequestState.dynamite) {
      case true:
        currentBodyRequestState.dynamite = false
        break
      default:
        currentBodyRequestState.dynamite = true
    }

    setBodyRequest(currentBodyRequestState);
  }

  const updateBooster = () => {
    let currentBodyRequestState = prepBodyRequest

    switch (currentBodyRequestState.booster) {
      case true:
        currentBodyRequestState.booster = false
        break
      default:
        currentBodyRequestState.booster = true
    }

    setBodyRequest(currentBodyRequestState);
  }

  const increpNeed = (type) => {
    let currentBodyRequestState = prepBodyRequest;
    if (type === "small") {
      if (small < 1 || currentfeed === pNeed) {
        return;
      }
      currentBodyRequestState.potions.push("small");
      setBodyRequest(currentBodyRequestState);
      setsmall((small) => small - 1);
      setcurrentfeed(currentfeed + 1);
      // if: checking weather the level is about to complete or not , if not then it will increase the expereince of current level
      if (lvlFeed < experienceReq - 5) {
        setLvlFeed((prev) => prev + 5);
        return;
      }
      if (lvlFeed === experienceReq - 5) {
        // todo: Write function here to update level in DB and reset experience
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(0);
        return;
      }
      if (lvlFeed > experienceReq - 5) {
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(5 - (experienceReq - lvlFeed));
        return;
      }
    }
    if (type === "medium") {
      if (medium < 1 || currentfeed === pNeed) {
        return;
      }
      currentBodyRequestState.potions.push("medium");
      setBodyRequest(currentBodyRequestState);
      setmedium((medium) => medium - 1);
      setcurrentfeed(currentfeed + 1);
      // if: checking weather the level is about to complete or not , if not then it will increase the expereince of current level
      if (lvlFeed < experienceReq - 10) {
        setLvlFeed((prev) => prev + 10);
        return;
      }
      if (lvlFeed === experienceReq - 10) {
        // todo: Write function here to update level in DB and reset experience to 0
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(0);
        return;
      }
      if (lvlFeed > experienceReq - 10) {
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(10 - (experienceReq - lvlFeed));
        return;
      }
    }
    if (type === "greater") {
      if (greater < 1 || currentfeed === pNeed) {
        return;
      }
      currentBodyRequestState.potions.push("greater");
      setBodyRequest(currentBodyRequestState);
      setgreater((greater) => greater - 1);
      setcurrentfeed(currentfeed + 1);
      // if => checking weather the level is about to complete or not , if not then it will increase the expereince of current level
      if (lvlFeed < experienceReq - 15) {
        setLvlFeed((prev) => prev + 15);
        return;
      }
      if (lvlFeed === experienceReq - 15) {
        // todo: Write function here to update level in DB and reset experience
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(0);
        return;
      }
      if (lvlFeed > experienceReq - 15) {
        currLevel === 1 ? setCurrLevel(2) : setCurrLevel(3);
        setLvlFeed(15 - (experienceReq - lvlFeed));
        return;
      }
    }
  };
  useEffect(() => {
    setAlienId(data.id);
    data.type === 1
      ? setstyling(WATERStyles)
      : data.type === 2
      ? setstyling(FIREStyles)
      : setstyling(GREENStyles);
  }, []);
  useEffect(() => {
    data.rarity === 1
      ? setrarityType("COMMON")
      : data.rarity === 2
      ? setrarityType("UNCOMMON")
      : data.rarity === 3
      ? setrarityType("RARE")
      : data.rarity === 4
      ? setrarityType("EPIC")
      : data.rarity === 5
      ? setrarityType("LEGENDARY")
      : setrarityType("MYTHICAL");
  }, []);
  useEffect(() => {
    data.rarity === 1
      ? setpNeed(EXPERIENCE_MOCKS.common.potions_needed)
      : data.rarity === 2
      ? setpNeed(EXPERIENCE_MOCKS.uncommon.potions_needed)
      : data.rarity === 3
      ? setpNeed(EXPERIENCE_MOCKS.rare.potions_needed)
      : data.rarity === 4
      ? setpNeed(EXPERIENCE_MOCKS.epic.potions_needed)
      : data.rarity === 5
      ? setpNeed(EXPERIENCE_MOCKS.legendary.potions_needed)
      : setpNeed(EXPERIENCE_MOCKS.mythical.potions_needed);
  }, []);
  const [currLevel, setCurrLevel] = useState(1);
  useEffect(() => {
    setCurrLevel(data.level);
  }, [data.level]);
  useEffect(() => {
    data.rarity === 1 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.common.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.common.experience_lvl_3));
    data.rarity === 2 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.uncommon.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.uncommon.experience_lvl_3));
    data.rarity === 3 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.rare.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.rare.experience_lvl_3));
    data.rarity === 4 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.epic.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.epic.experience_lvl_3));
    data.rarity === 5 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.legendary.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.legendary.experience_lvl_3));
    data.rarity === 6 &&
      (data.level === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.mythical.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.mythical.experience_lvl_3));
  }, []);
  useEffect(() => {
    data.rarity === 1 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.common.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.common.experience_lvl_3));
    data.rarity === 2 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.uncommon.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.uncommon.experience_lvl_3));
    data.rarity === 3 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.rare.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.rare.experience_lvl_3));
    data.rarity === 4 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.epic.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.epic.experience_lvl_3));
    data.rarity === 5 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.legendary.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.legendary.experience_lvl_3));
    data.rarity === 6 &&
      (currLevel === 1
        ? setExperienceReq(EXPERIENCE_MOCKS.mythical.experience_lvl_2)
        : setExperienceReq(EXPERIENCE_MOCKS.mythical.experience_lvl_3));
  }, [currLevel]);

  const [sellPrice, setSellPrice] = useState(null);
  const [listing, setListed] = useState(false);
  const [tourState, setTourState] = useState({
    run: true,
    steps: [
      {
        target: ".feed-alien-container",
        content: "Firstly you have to Feed the Alien using these potions",
      },
      {
        target: ".feeder-wrapper",
        content: "Feeding Progress will be shown here!",
      },
      {
        target: ".mine-image",
        content: "After feeding, Select pickaxe you want to mine with ",
      },
      {
        target: ".mine_container",
        content:
          "After feeding and selecting pickaxe, you will be able to mine ",
      },
      {
        target: ".dollar",
        content: "Tap, if you want to Sell your Alien ",
      },
    ],
  });
  const sellHandler = (sellingPrice) => {
    // here is the selling Price coming
    // console.log(sellingPrice);
    setSellPrice(sellingPrice);
    //then after confirm that it is soldable or not =>
    setListed(true);
    closeOverModel();
  };
  const showSelling = () => {
    setShowOverModal(true);
  };
  const cancelSaleHandler = () => {
    setListed(false);
    setSellPrice(null);
    closeOverModel();
  };
  const closeOverModel = () => {
    setShowOverModal(false);
  };

  const [lvlFeed, setLvlFeed] = useState(0);

  useEffect(() => {
    setLvlFeed(data.experience);
  }, []);

  useEffect(() => {
    data.name !== null ? setAlienName(data.name) : "LOTTE";
  }, []);

  const OpenChangeNameModal = () => {
    setShowOverModalName(true);
  };
  const CloseChangeNameModal = () => {
    setShowOverModalName(false);
  };

  const ChangeAlienName = (name) => {
    fetch("https://backend-api-v3.cryptonitegame.io/inventory/change_name", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": TOKEN,
      },
      body: JSON.stringify({ alien: data.id, name: name }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "error") {
          new AWN().alert(result.info, {
            labels: { alert: "Name change error" },
          });
          return;
        }

        setAlienName(result.name);
        updateAlienName(data, result.name);
        setShowOverModalName(false);

        new AWN().success(`Your alien has been named: ${result.name}`, {
          labels: { alert: "Name changed!" },
        });
      });
  };

  return (
    <>
      {showOverModal ? (
        <SellModal
          close={closeOverModel}
          sell={sellHandler}
          listed={listing}
          cancel={cancelSaleHandler}
        />
      ) : null}
      {showOverModalName ? (
        <ChangeNameModal
          close={CloseChangeNameModal}
          change={ChangeAlienName}
        />
      ) : null}
      {ReactDOM.createPortal(
        <>
          <Joyride
            run={tourState.run}
            steps={tourState.steps}
            continuous
            showSkipButton
            disableOverlay
            styles={{
              options: {
                arrowColor: "#334C93",
                primaryColor:
                  data.rarity === 1
                    ? "#A4A5D3"
                    : data.rarity === 2
                    ? "#57BE79"
                    : data.rarity === 3
                    ? "#3F92E3"
                    : data.rarity === 4
                    ? "#7038AD"
                    : data.rarity === 5
                    ? "#FD8C29"
                    : "#CF4A95",
                backgroundColor: "#334C93",
                textColor: "white",
                fontSize: "32px",
              },
              tooltip: {
                fontSize: 22,
              },
              tooltipContent: {
                padding: "16px 8px",
              },
            }}
          />
          <div className="modal-wrapper">
            <div className="modal-backdrop" onClick={() => close()} />
            <div className="modal-content">
              <img
                className={`modal_frame ${
                  data.rarity === 1
                    ? "modal_frame_commons"
                    : data.rarity === 2
                    ? "modal_frame_commons"
                    : data.rarity === 3
                    ? "modal_frame_rare"
                    : data.rarity === 4
                    ? "modal_frame_mythical"
                    : data.rarity === 5
                    ? "modal_frame_legendary"
                    : "modal_frame_epic"
                }`}
                src={
                  require(`./Modal/frames/frame(${data.rarity}).png`).default
                }
              />
              <div
                className="player-wrapper"
                // style={{
                //   background:
                //     data.rarity === 1
                //       ? "#A4A5D3"
                //       : data.rarity === 2
                //       ? "#57BE79"
                //       : data.rarity === 3
                //       ? "#3F92E3"
                //       : data.rarity === 4
                //       ? "#7038AD"
                //       : data.rarity === 5
                //       ? "#FD8C29"
                //       : "#CF4A95",
                // }}
              >
                <div className="video-content">
                  <FeedProgress
                    pNeed={pNeed}
                    styling={styling}
                    currentfeed={currentfeed}
                  />
                  {/* <div className="stone-wrapper">
                    <img
                      src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/aliens/${data.rarity}-pearl.png`}
                      alt="Stone"
                      className="stone"
                    />
                  </div> */}
                  <div className="dollar-wrapper">
                    <img
                      onClick={showSelling}
                      src={listing ? dollarRedSign : dollarSign}
                      alt="Dollar"
                      className="dollar"
                    />
                  </div>
                  <div className="kind-container">
                    <div
                      className="kind-wrapper"
                      style={{
                        background: `${styling.kindWrapper}`,
                      }}
                    >
                      <div
                        className="kind-div"
                        style={{ background: `${styling.kindDiv}` }}
                      >
                        <p className="kind-text">{rarityType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="description-wrapper">
                    <p className="description">The Pathless Apprentice</p>
                  </div>
                  <div className="name-wrapper">
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="name"
                    >
                      {alienName}
                      {alienName === "LOTTE" && (
                        <button
                          style={{
                            width: "fit-content",
                            alignSelf: "center",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "#feb202",
                            fontFamily: "Prototype",
                            color: "#3c2806",
                            cursor: "pointer",
                          }}
                          onClick={OpenChangeNameModal}
                        >
                          Change name
                        </button>
                      )}
                    </p>
                  </div>
                  <div className="level-wrapper">
                    <div
                      className="level-progress-container fcc"
                      style={{ background: `${styling.lvlprogContainer}` }}
                    >
                      <p className="lvl-progress-counter">
                        {lvlFeed} / {experienceReq}
                      </p>
                      <div
                        className="level-progress-wrapper fcc"
                        style={{ background: `${styling.lvlprogWrapper}` }}
                      >
                        <div
                          className="level-progress fcc"
                          style={{
                            background: `${styling.lvlprog}`,
                            width: `${(155 / experienceReq) * lvlFeed}px`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="lvl-wrapper fcc"
                      style={{ background: `${styling.lvlWrapper}` }}
                    >
                      <div
                        className="lvl fcc"
                        style={{ background: `${styling.lvl}` }}
                      >
                        <p className="lvl-text">LVL {currLevel}</p>
                      </div>
                    </div>
                  </div>
                  <DinamiteBoost
                    styling={styling}
                    boost={boosters_}
                    dinamite={dynamites_}
                    changepNeed={increpNeed}
                    updateDynamite={() => updateDynamite()}
                    updateBooster={() => updateBooster()}
                  />
                  <div
                    className="video-footer"
                    style={{ background: `${styling.videoFooter}` }}
                  >
                    <div className="id-number fcc">
                      <p>ID {alienId}</p>
                    </div>
                    <FeedAlien
                      styling={styling}
                      small={small}
                      medium={medium}
                      greater={greater}
                      changepNeed={increpNeed}
                    />
                    <SelectAxe
                      styling={styling}
                      close={close}
                      data={data}
                      requestStartMinting={requestStartMinting}
                      dataFooter={dataFooter}
                      updatePickSelected={(pick) => updatePickSelected(pick)}
                    />
                  </div>
                </div>

                <ReactPlayer
                  className="react-player"
                  url={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/aliens/${data.type}-${data.rarity}-aliens.mp4`}
                  playing={true}
                  loop={true}
                  // onEnded={() => {
                  //   setloaded(true);
                  // }}
                  width="100%"
                  height="98.5%"
                />
              </div>
            </div>
          </div>
        </>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
