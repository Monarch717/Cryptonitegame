import React from "react";
import Header from "../../Components/Header";
import classes from "./Stake.module.css";
import CryptoniteSection from "./../../Components/FarmContent/CryptoniteSection";

import Footer from "../../Components/Footer";
function Stake() {
  let coin = 'https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/Cryptonite_internal_token.png'
  let stakeBtn = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/stake/stakeBtn.png";
  let unstakeBtn = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/stake/unstakeBtn.png";
  const blnc = 0;
  const toDays = 4;
  const toLvl = 2;
  const currentLvl = 1;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Header />
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px'
          }}>
         {/*  <ContentHeader/> */}
         <div className={classes.cryptoniteSection}>
            { <CryptoniteSection/>}
        </div>
        </div>
        <div className={classes.content}>
          <div className={classes.contentWrapper}>
            <div className={`${classes.balanceDivWrapper} ${classes.fcc}`}>
              <div className={classes.balanceDiv}>
                <p>Staked: {blnc}</p>
                <img src={coin} />
              </div>
            </div>
            <div className={classes.daysTolvlDiv}>
              <p>
                {toDays} Days to Level {toLvl}
              </p>
              <div className={classes.progressAndLevel}>
                <div className={`${classes.progressContainer} ${classes.fcc}`}>
                  <div className={`${classes.progressWrapper}`}>
                    <div className={classes.progress}></div>
                  </div>
                </div>
                <div className={`${classes.lvlContainer} ${classes.fcc}`}>
                  <div className={`${classes.lvlWrapper} ${classes.fcc}`}>
                    <p className={classes.lvl}>LVL {currentLvl}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.qtyToStake}>
              <p>QUANTITY TO STAKE</p>
              <input type="number" />
              <div className={`${classes.stakeButtons} ${classes.fcc}`}>
                <div className={classes.fcc}>
                  <img src={stakeBtn} alt="Stake" />
                  <p>STAKE</p>
                </div>
                <div className={classes.fcc}>
                  <img src={unstakeBtn} alt="unStake" />
                  <p>UNSTAKE</p>
                </div>
              </div>
            </div>
            <div className={classes.infoAndTable}>
              <div className={classes.info}>
                <p>
                  Cryptonite's staking system will reward users who stake their
                  Cryptonites the longest. The base interest percentage will be
                  <span>10% per month</span>💲.
                </p>
                <p>
                  <span>There will be no lock time🔓</span> so you can get your
                  tokens whenever you want. There will only be a{" "}
                  <span>5% penalty</span> if you withdraw before{" "}
                  <span>level 1</span>. This 5% will go to the{" "}
                  <span>burning pool</span> 🔥.
                </p>
                <p>
                  In addition, we propose an innovative level system that will
                  reward you based on the time you stay staking.
                  <span>The percentages do not accumulate/pile up</span>.
                </p>
                <p>
                  Everytime you make a withdrawal or add liquidity, you will{" "}
                  <span>return to day 0</span>.
                </p>
              </div>
              <div className={classes.infoTable}>
                <table className={classes.table}>
                  <thead>
                    <th>LEVEL</th>
                    <th>DAYS</th>
                    <th>PERCENTAGE</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>20</td>
                      <td>+2.5%</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>30</td>
                      <td>+5%</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>50</td>
                      <td>+10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Stake;
