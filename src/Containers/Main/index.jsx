import React from "react";
import classes from "./Main.module.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./../Home";
import Farm from "./../Farm";
import Shop from "./../Shop";
import Stake from "./../Stake";
import Roulette from "./../Roulette";
import Marketplace from "./../Marketplace";
import Whitepaper from "../Whitepaper";
import MyAccount from "../MyAccount";

function Main() {
  return (
    <Router>
      <div className={classes.container}>
        <Routes>
          <Route path="/stake" element={<Stake />}></Route>
          <Route path="/roulette" element={<Roulette />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/farm" element={<Farm />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/whitepaper" element={<Whitepaper />}></Route>
          <Route path="/my-account" element={<MyAccount />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
