import React, { useEffect, useState } from "react";
import classes from "./Shop.module.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Card from "../../Components/Shop/Card";

import CryptoniteSection from "./../../Components/FarmContent/CryptoniteSection";
import ContentHeader from "../../Components/FarmContent/ContentHeader";

const visualData = [
  {
    id: 1,
    imagePath: "egg-common",
    price: 40,
    name: "common egg",
  },
  {
    id: 2,
    imagePath: "egg-rare",
    price: 80,
    name: "rare egg",
  },
  {
    id: 3,
    imagePath: "chest-tool",
    price: 0.60,
    name: "tool chest",
  },
  {
    id: 4,
    imagePath: "chest-potion",
    price: 0.30,
    name: "potion chest",
  },
];

function Shop() {
  const [ctntPrice, setCtntPrice] = useState(0)

  useEffect(()=> {
    if (ctntPrice === 0) {
      fetch(`https://backend-api-v3.cryptonitegame.io/shop/ctnt_price`)
      .then(response => response.json())
      .then(json => {
        setCtntPrice((json.price));
      })
    }
  },[])
  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Header />
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '100px'
          }}>
          
          {/* <div className={classes.cryptoniteSection}>
            { <CryptoniteSection/>}
          </div> */}
          <ContentHeader/>  
          </div>
          
          <div className={classes.content}>
          
            {visualData.map((data) => (
              <Card
                key={data.id}
                imagePath={data.imagePath}
                cardPrice={data.price}
                name={data.name}
                tokenPrice={ctntPrice}
              />
            ))}
          </div>
          <div className={classes.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
