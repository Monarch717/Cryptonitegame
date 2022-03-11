import React from "react";
import classes from "./Footer.module.css";

function Footer() {

let telegram = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/telegram.png";
let discord = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/discord.png";
let twitter = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/twitter.png";
let instagram = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/instagram.png";
let tiktok = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/tiktok.png";
let cryptoniteLogo = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/logo-large.svg";
  return (
    <div className={classes.footer}>
      <div className={classes.logoContainer}>
        <img src={cryptoniteLogo} alt="Cryptonite" />
      </div>
      <div className={classes.iconContainer}>
        <a className={classes.mediaIcon} href="https://t.me/TheCryptoniteGameOfficial" target="_blank" style={{cursor: 'pointer'}}>
          <img src={telegram} alt="Telegram" />
        </a>
        <a className={classes.mediaIcon} href="https://discord.gg/SJbbWgPcf9" target="_blank" style={{cursor: 'pointer'}}>
          <img src={discord} alt="Discord" />
        </a>
        <a className={classes.mediaIcon} href="https://twitter.com/CryptoniteGame" target="_blank" style={{cursor: 'pointer'}}>
          <img src={twitter} alt="Twitter" />
        </a>
        <a className={classes.mediaIcon} href="https://www.instagram.com/cryptonite_game/" target="_blank" style={{cursor: 'pointer'}}>
          <img src={instagram} alt="Instagram" />
        </a>
        <a className={classes.mediaIcon} href="https://www.tiktok.com/@cryptonitegame" target="_blank" style={{cursor: 'pointer'}}>
          <img src={tiktok} alt="TikTok" />
        </a>
      </div>
      <div className={classes.footerDivider}></div>
      <div className={classes.footerText}>©2021 CRYPTONITE GAME</div>
    </div>
  );
}

export default Footer;
