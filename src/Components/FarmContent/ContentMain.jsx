import React, { useEffect, useState } from "react";
import classes from "./FarmContent.module.css";
import CardNew from "./CardNew";
import Modal from "./Modal";
import AWN from "awesome-notifications";
import CryptoniteSection from "./CryptoniteSection";

const ContentMain = ({ updGems, dataFooter, updateDataFooter }) => {
  const [cardsData, setCardsData] = useState([]);
  const [isActive, setIsActive] = useState("aliens");
  const [loading, setloading] = useState(false);
  const [farmingAliens, setFarmingAliens] = useState([]);
  const TOKEN = window.sessionStorage.getItem("token");
  const filterContent = (btnName) => {
    if (btnName === isActive) {
      return;
    }
    setCardsData([]);
    setIsActive(btnName);
    setloading(true);
  };
  const getInventoryData = (token, type) => {
    fetch(`https://backend-api-v3.cryptonitegame.io/inventory/get_${type}`, {
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCardsData(json[type]);
        setloading(false);
      });
  };
  useEffect(() => {
    if (TOKEN) {
      getInventoryData(TOKEN, "aliens");
    }
    setloading(false);
  }, []);

  useEffect(() => {
    if (TOKEN) {
      isActive === "eggs"
        ? getInventoryData(TOKEN, "eggs")
        : isActive === "aliens"
        ? getInventoryData(TOKEN, "aliens")
        : getInventoryData(TOKEN, "packs");
    }
    setloading(false);
  }, [isActive]);

  const [modal, setmodal] = useState({
    show: false,
    info: {},
  });

  const showModal = (data, mntFn, state, updateButtonState) => {
    switch (state) {
      case "OPEN":
        setmodal({
          status: true,
          info: data,
          mintingFn: mntFn,
        });
        break;
      case "CLAIM":
        if (data.farming_timer !== null) {
          collectMinting(data, updateButtonState);
        } else {
          setmodal({
            status: true,
            info: data,
            mintingFn: mntFn,
          });
        }
        break;
      default:
    }
  };
  const closeModal = () => {
    setmodal({
      status: false,
      info: {},
      mintingFn: () => {},
    });
  };
  const setFarmingTimerOnAlien = (data) => {
    const updatedArray = [...cardsData];
    const now = new Date(data.current_timestamp).getTime();
    const distance = new Date(data.farming_timer).getTime() - now;
    setCardsData(
      updatedArray.map((obj) =>
        obj.id === data.id
          ? {
              ...obj,
              farming_timer: distance,
            }
          : obj
      )
    );
  };
  const startMinting = (data, alienId) => {
    fetch(
      `https://backend-api-v3.cryptonitegame.io/farm/start_farm/${alienId}`,
      {
        method: "POST",
        headers: {
          "auth-token": window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        /* 
          {
            potions: ['small','medium','greater'],
            pick: 'rare',
            booster: true/false,
            dynamite: true/false
          }
        */
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "error") {
          new AWN().info(json.info, {
            labels: { alert: "Something went wrong" },
          });
          return;
        }
        updateAlienFarmingStats(alienId, json);

        updateDataFooter();
        closeModal();
      });
  };

  const collectMinting = (data, updateButtonState) => {
    fetch(
      `https://backend-api-v3.cryptonitegame.io/farm/claim_farm/${data.id}`,
      {
        method: "GET",
        headers: {
          "auth-token": window.sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === "error") {
          new AWN().info(status.info, {
            labels: { alert: "Something went wrong" },
          });
          return;
        }
        new AWN().success(
          `Tokens earned: ${json.rewards}\n ${
            json.broken_pick ? "Your pick has broke in your expedition!" : ""
          }`
        );
        updateButtonState("OPEN");
        updateDataFooter();
      });

    console.log(data);
    console.log(data.id);
  };

  const updateAlienName = (data, name) => {
    let aliens = cardsData;
    let newAliens = [];

    for (var alien of aliens) {
      if (alien.id === data.id) {
        alien.name = name;
      }
      newAliens.push(alien);
    }
    setCardsData(newAliens);
  };

  const updateAlienFarmingStats = (alienId, json) => {
    const updatedArray = [...cardsData];
    setCardsData(
      updatedArray.map((obj) =>
        obj.id === alienId
          ? {
              ...obj,
              farming_timer: json.farming_timer,
              current_timestamp: json.current_timestamp,
            }
          : obj
      )
    );
  };

  const updateEggsAfterOpen = (eggId) => {
    let eggs = cardsData;
    let newEggs = [];

    for (var egg of eggs) {
      if (egg.id === eggId) {
        continue;
      }
      newEggs.push(egg);
    }
    setCardsData(newEggs);
  };

  const updatePacksAfterOpen = (packId) => {
    let packs = cardsData;
    let newPacks = [];

    for (var pack of packs) {
      if (pack.id === packId) {
        continue;
      }
      newPacks.push(pack);
    }
    setCardsData(newPacks);
  };

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.filterButtons}>
        <div
          className={`${
            isActive === "eggs" ? classes.filterButtonWrapper : null
          }`}
          onClick={() => filterContent("eggs")}
        >
          <div className={classes.filterButton}>
            <p className={classes.filterButtonText}>EGGS</p>
          </div>
        </div>
        <div
          className={`${
            isActive === "aliens" ? classes.filterButtonWrapper : null
          }`}
          onClick={() => filterContent("aliens")}
        >
          <div className={classes.filterButton}>
            <p className={classes.filterButtonText}>ALIENS</p>
          </div>
        </div>
        <div
          className={`${
            isActive === "packs" ? classes.filterButtonWrapper : null
          }`}
          onClick={() => filterContent("packs")}
        >
          <div className={classes.filterButton}>
            <p className={classes.filterButtonText}>PACKS</p>
          </div>
        </div>
      </div>
      <div className={classes.cryptoniteSection}>
        <CryptoniteSection />
      </div>
      <div className={classes.cards}>
        {cardsData.length !== 0 ? (
          cardsData.map((info) => (
            <CardNew
              key={info.id}
              data={info}
              open={showModal}
              keyType={isActive}
              setFarmingTimerOnAlien={(data, startTheTimer) =>
                setFarmingTimerOnAlien(data, startTheTimer)
              }
              updateEggsAfterOpen={(eggId) => updateEggsAfterOpen(eggId)}
              updatePacksAfterOpen={(packId) => updatePacksAfterOpen(packId)}
            />
          ))
        ) : (
          <p className={classes.nothingToShow}>
            {!TOKEN
              ? "Please connect to MetaMask first to see your inventory"
              : loading
              ? `Loading...`
              : `You don't have any ${
                  isActive === "eggs"
                    ? "EGGS"
                    : isActive === "aliens"
                    ? "ALIENS"
                    : "PACKS"
                }
            in your Inventory`}
          </p>
        )}
      </div>
      {modal.status ? (
        <Modal
          data={modal.info}
          close={closeModal}
          startMinting={startMinting}
          updateAlienName={(data, name) => updateAlienName(data, name)}
          dataFooter={dataFooter}
        />
      ) : null}
    </div>
  );
};

export default ContentMain;
