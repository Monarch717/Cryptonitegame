import React, { useState, useRef, useEffect } from "react";
import Header from "../../Components/Header";
import Card from "../../Components/Marketplace/Card";
import classes from "./Marketplace.module.css";
import Sorter from "../../Components/Marketplace/Sorter";
import Rarity from "../../Components/Marketplace/Rarity";
import Price from "../../Components/Marketplace/Price";
import Alien from "../../Components/Marketplace/Alien";
import CryptoniteSection from "./../../Components/FarmContent/CryptoniteSection";
import { useMediaQuery } from "react-responsive";

const info = [
  {
    id: 1,
    type: 1,
    rarity: 1,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 2,
    type: 1,
    rarity: 2,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 3,
    type: 1,
    rarity: 3,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 4,
    type: 1,
    rarity: 4,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 5,
    type: 1,
    rarity: 5,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 6,
    type: 1,
    rarity: 6,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 7,
    type: 2,
    rarity: 1,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 8,
    type: 2,
    rarity: 2,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 9,
    type: 2,
    rarity: 3,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 10,
    type: 2,
    rarity: 4,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 11,
    type: 2,
    rarity: 5,
    price: 1650,
    idNum: 9,
  },
  {
    id: 12,
    type: 2,
    rarity: 6,
    price: 150,
    idNum: 8989,
  },
  {
    id: 13,
    type: 3,
    rarity: 1,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 14,
    type: 3,
    rarity: 2,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 15,
    type: 3,
    rarity: 3,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 16,
    type: 3,
    rarity: 4,
    price: 1350,
    idNum: 8989,
  },
  {
    id: 17,
    type: 3,
    rarity: 5,
    price: 1350,
    idNum: 10000,
  },
  {
    id: 18,
    type: 3,
    rarity: 6,
    price: 1350,
    idNum: 8989,
  },
];
let btn =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-btn.png";
let line =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-line.png";
let symbol =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-symbol.png";
let dropArrow =
  "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/marketplace/filter-drop-arrow.png";
const Marketplace = () => {
  const is675 = useMediaQuery({ query: "(max-width:675px)" });
  const [showSorter, setShowSorter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [marketplaceCards, setMarketplaceCards] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    clearFilterCriteria();
  }, []);
  const clearFilterCriteria = () => {
    setCardsData(info);
    setFilterCriteria({
      sortingBy: "Lowest Price",
      type: {
        water: false,
        fire: false,
        acid: false,
      },
      rarity: {
        common: false,
        uncommon: false,
        rare: false,
        mythical: false,
        legendary: false,
        epic: false,
      },
      price: {
        low: 0,
        high: 0,
      },
    });
  };
  const setSortingCriteria = (crta) => {
    const updatedCriteria = { ...filterCriteria };
    setFilterCriteria({
      ...updatedCriteria,
      sortingBy: crta,
    });
    setShowSorter(false);
  };
  const setPriceCriteria = (min, max) => {
    const updatedCriteria = { ...filterCriteria };
    setFilterCriteria({
      ...updatedCriteria,
      price: {
        low: min,
        high: max,
      },
    });
  };
  const setAlienCriteria = (water, acid, fire) => {
    const updatedCriteria = { ...filterCriteria };
    setFilterCriteria({
      ...updatedCriteria,
      type: {
        water: water,
        acid: acid,
        fire: fire,
      },
    });
  };
  const setRarityCriteria = (a, b, c, d, e, f) => {
    const updatedCriteria = { ...filterCriteria };
    setFilterCriteria({
      ...updatedCriteria,
      rarity: {
        common: a,
        uncommon: b,
        rare: c,
        mythical: d,
        legendary: e,
        epic: f,
      },
    });
  };
  useEffect(() => {
    // setShowFilter(true);
    is675 ? setShowFilter(false) : setShowFilter(true);
  }, [is675]);
  useEffect(() => {
    if (filterCriteria.type && filterCriteria.rarity && filterCriteria.price) {
      let dataToFilter = [...info];
      dataToFilter.sort((a, b) => {
        if (filterCriteria.sortingBy === "Lowest Price") {
          return a.price - b.price;
        }
        if (filterCriteria.sortingBy === "Highest Price") {
          return b.price - a.price;
        }
        if (filterCriteria.sortingBy === "Lowest ID") {
          return a.idNum - b.idNum;
        }
        if (filterCriteria.sortingBy === "Highest ID") {
          return b.idNum - a.idNum;
        }
        return b.id - a.id;
      });

      // console.log(dataToFilter);
      if (
        filterCriteria.type.water ||
        filterCriteria.type.acid ||
        filterCriteria.type.fire
      ) {
        dataToFilter = dataToFilter.filter(
          (card) =>
            (card.type === 1 && filterCriteria.type.water) ||
            (card.type === 2 && filterCriteria.type.fire) ||
            (card.type === 3 && filterCriteria.type.acid)
        );
      }
      //   rarity: {
      //     common: false,
      //     uncommon: false,
      //     rare: false,
      //     mythical: false,
      //     legendary: false,
      //     epic: false,
      //   },
      //   price: {
      //     low: 0,
      //     high: 5000,
      //   },
      if (
        filterCriteria.rarity.common ||
        filterCriteria.rarity.uncommon ||
        filterCriteria.rarity.rare ||
        filterCriteria.rarity.mythical ||
        filterCriteria.rarity.legendary ||
        filterCriteria.rarity.epic
      ) {
        dataToFilter = dataToFilter.filter(
          (card) =>
            (card.rarity === 1 && filterCriteria.rarity.common) ||
            (card.rarity === 2 && filterCriteria.rarity.uncommon) ||
            (card.rarity === 3 && filterCriteria.rarity.rare) ||
            (card.rarity === 4 && filterCriteria.rarity.mythical) ||
            (card.rarity === 5 && filterCriteria.rarity.legendary) ||
            (card.rarity === 6 && filterCriteria.rarity.epic)
        );
      }
      if (filterCriteria.price.low > 0 || filterCriteria.price.high > 0) {
        dataToFilter = dataToFilter.filter(
          (card) =>
            card.price >= filterCriteria.price.low &&
            card.price <= filterCriteria.price.high
        );
      }
      setCardsData(dataToFilter);
    }
  }, [filterCriteria]);
  useEffect(() => {
    let theCards = [];
    cardsData.map((item) => {
      theCards.push(
        <Card
          key={item.id}
          type={item.type}
          rarity={item.rarity}
          price={item.price}
          idNum={item.idNum}
        />
      );
    });
    setMarketplaceCards(theCards);
  }, [cardsData]);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Header />
        <div className={classes.pageContent}>
          <div className={classes.filterContainer}>
            <div className={classes.cryptoniteSection}>
              <CryptoniteSection />
            </div>

            {is675 ? (
              <>
                <div
                  className={classes.mobileSorterNfilter}
                  style={{ marginBottom: !showFilter ? "24px" : "0px" }}
                >
                  <div className={classes.sorterContainer}>
                    <div
                      className={classes.sorterDiv}
                      onClick={() => setShowSorter((prev) => !prev)}
                    >
                      <p>{filterCriteria.sortingBy}</p>
                      <img src={dropArrow} alt="Drop Arrow" />
                    </div>
                    <div
                      className={classes.sortSelector}
                      style={{
                        opacity: showSorter ? "1" : "0",
                        transform: showSorter
                          ? "translateY(0px)"
                          : "translateY(-40px)",
                        visibility: showSorter ? "visible" : "hidden",
                      }}
                    >
                      <ul>
                        <li onClick={() => setSortingCriteria("Lowest ID")}>
                          Lowest ID
                        </li>
                        <li onClick={() => setSortingCriteria("Highest ID")}>
                          Highest ID
                        </li>
                        <li onClick={() => setSortingCriteria("Lowest Price")}>
                          Lowest Price
                        </li>
                        <li onClick={() => setSortingCriteria("Highest Price")}>
                          Highest Price
                        </li>
                        <li onClick={() => setSortingCriteria("Latest")}>
                          Latest
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className={classes.mobClearFilter}
                    style={{
                      background: showFilter
                        ? `radial-gradient(
    47.35% 79.1% at 50.44% 107.32%,
    #00d3c2 0%,
    #0083c2 100%
  )`
                        : "transparent",
                      border: !showFilter ? "1px solid #fff" : "none",
                    }}
                    onClick={() => setShowFilter((prev) => !prev)}
                  >
                    <p>Filter</p>
                  </div>
                </div>
                {showFilter ? (
                  <div className={classes.mobFilterBorder} />
                ) : null}
              </>
            ) : null}
            {showFilter ? (
              <>
                <div className={classes.filterControls}>
                  <div className={classes.filterDo}>
                    <img src={symbol} alt="Filter" />
                    <p>FILTER</p>
                  </div>
                  <div
                    className={classes.clearFilter}
                    onClick={clearFilterCriteria}
                  >
                    <img src={btn} />
                    <p>Clear Filter</p>
                  </div>
                </div>
                <div className={`${classes.filterLine} ${classes.filterLineA}`}>
                  <img src={line} alt="Separator" />
                </div>
                <Sorter
                  showSorter={showSorter}
                  setShowSorter={setShowSorter}
                  sortBy={filterCriteria.sortingBy}
                  sortingHandler={setSortingCriteria}
                />
                <div className={classes.filterLine}>
                  <img src={line} alt="Separator" />
                </div>
                <Alien
                  alienCriteriaHandler={setAlienCriteria}
                  aliens={filterCriteria.type}
                />
                <div className={classes.filterLine}>
                  <img src={line} alt="Separator" />
                </div>
                <Rarity
                  rarityCriteriaHandler={setRarityCriteria}
                  rarities={filterCriteria.rarity}
                />
                <div className={classes.filterLine}>
                  <img src={line} alt="Separator" />
                </div>
                <Price
                  priceCriteriaHandler={setPriceCriteria}
                  prices={filterCriteria.price}
                />
              </>
            ) : null}
          </div>
          <div className={classes.content}>{marketplaceCards}</div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
