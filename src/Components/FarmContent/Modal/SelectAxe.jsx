import React, { useState } from "react";
import "../style.css";

const SelectAxe = ({ styling, close, data, requestStartMinting, dataFooter, updatePickSelected }) => {
  let mineAxe = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/mine/start-mine.png";
  let commonAxe = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/mine/axe-common.png";
  let rareAxe = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/mine/axe-rare.png";
  let uncommonAxe = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/farm/Modal/mine/axe-uncommon.png";
  const [toSelect, settoSelect] = useState(false);
  const [selectedAxe, setselectedAxe] = useState(0);
  const toggleToSelect = () => {
    settoSelect((prev) => !prev);
  };
  const addSelection = (number) => {
    switch (number) {
      case 1:
        if (dataFooter.common_picks === 0) {
          return
        }
      break

      case 3:
        if (dataFooter.uncommon_picks === 0) {
          return
        }
      break

      case 2:
        if (dataFooter.rare_picks === 0) {
          return
        }
      break

      default:
      return
    }
    updatePickSelected(number)
    setselectedAxe(number);
    settoSelect(false);
  };
  return !toSelect ? (
    <div
      className="mine_container fcc"
      style={{ background: `${styling.mineContainer}` }}
    >
      <div
        className="mine_label fcc"
        style={{
          background: `${
            selectedAxe !== 0 ? styling.mineLabel : styling.mineContainer
          }`,
        }}
        onClick={() => (selectedAxe !== 0 ? requestStartMinting() : {})}
      >
        <p>MINE</p>
      </div>
      <img
        src={
          selectedAxe === 0
            ? mineAxe
            : selectedAxe === 1
            ? commonAxe
            : selectedAxe === 2
            ? rareAxe
            : uncommonAxe
        }
        alt="Mine Axe"
        className="mine-image"
        onClick={toggleToSelect}
      />
    </div>
  ) : (
    <div
      className="selectAxes_container fcc"
      style={{ background: `${styling.selectAxesCont}` }}
    >
      <div
        className="selectAxes_label fcc"
        style={{ background: `${styling.selectAxesLabel}` }}
      >
        <p>SELECT PICKAXE</p>
      </div>
      <div
        className="selectAxes_wrapper fcc"
        style={{ background: `${styling.selectAxesWrapper}` }}
      >
        <div className="selectAxes_Axes fsbc">
          <div
            className="selectAxe_container fcc"
            style={{ background: `${styling.selectAxeContainer}` }}
            onClick={() => addSelection(1)}
          >
            <div
              className="selectAxe_wrapper fcc"
              style={{ background: `${styling.selectAxeWrapper}` }}
            >
              <img
                src={commonAxe}
                alt="CommonAxe"
                className="selectAxes_Axe_img"
              />
            </div>
            <div
              className="selectAxe_number fcc"
              style={{ background: `${styling.selectAxeNumber}` }}
            >
              <p>
                {dataFooter.common_picks < 10
                  ? `0${dataFooter.common_picks}`
                  : dataFooter.common_picks}
              </p>
            </div>
          </div>
          <div
            className="selectAxe_container fcc"
            style={{ background: `${styling.selectAxeContainer}` }}
            onClick={() => addSelection(3)}
          >
            <div
              className="selectAxe_wrapper fcc"
              style={{ background: `${styling.selectAxeWrapper}` }}
            >
              <img
                src={uncommonAxe}
                alt="unCommonAxe"
                className="selectAxes_Axe_img"
              />
            </div>
            <div
              className="selectAxe_number fcc"
              style={{ background: `${styling.selectAxeNumber}` }}
            >
              <p>
                {dataFooter.uncommon_picks < 10
                  ? `0${dataFooter.uncommon_picks}`
                  : dataFooter.uncommon_picks}
              </p>
            </div>
          </div>
          <div
            className="selectAxe_container fcc"
            style={{ background: `${styling.selectAxeContainer}` }}
            onClick={() => addSelection(2)}
          >
            <div
              className="selectAxe_wrapper fcc"
              style={{ background: `${styling.selectAxeWrapper}` }}
            >
              <img src={rareAxe} alt="rareAxe" className="selectAxes_Axe_img" />
            </div>
            <div
              className="selectAxe_number fcc"
              style={{ background: `${styling.selectAxeNumber}` }}
            >
              <p>
                {dataFooter.rare_picks < 10
                  ? `0${dataFooter.rare_picks}`
                  : dataFooter.rare_picks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAxe;
