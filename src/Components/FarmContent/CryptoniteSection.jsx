import classes from "./FarmContent.module.css";
import React, { useState, useRef, useEffect } from "react";

const CryptoniteSection = () => {
  let btnBkg = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/eggs/btnBkg.svg"
  let token = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/token.png";
  let cryptonite = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/cryptonite.png";
  let change = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/change.png"
  let cross = "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/icons/cross.png"

  const internalTokenRef = useRef(null)
  const [InternalTokenBalance, setInternalTokenBalance] = useState(0)


  const changeTokenValue = (flag) => {
    if (flag) {
      setTokenValue(parseFloat(InternalTokenBalance).toFixed(4))
      return
    }
    if(internalTokenRef.current.value !== '' && parseFloat(internalTokenRef.current.value).toFixed(4) === InternalTokenBalance){
      return
    }
    if (internalTokenRef.current.value !== '' &&
      parseFloat(internalTokenRef.current.value) > InternalTokenBalance) {
        
        setTokenValue(parseFloat(InternalTokenBalance).toFixed(4))
        return
      }
      setTokenValue(parseFloat(internalTokenRef.current.value))
  }

  useEffect(() => {
    
    if (window.sessionStorage.getItem('token')) {

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
    
  },[])


  

  return (

    <div className={`${classes.balanceDivWrapper} ${classes.fcc}`}>
      <div className={classes.balanceDiv}>
        <p><span id="int-token-balance">{InternalTokenBalance}</span></p>
        <img src={token} />
      </div>
    </div>

  );
};

export default CryptoniteSection;