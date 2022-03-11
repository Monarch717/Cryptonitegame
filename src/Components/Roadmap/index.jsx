import React from "react";
import classes from "./Roadmap.module.css";
import RoadmapTile from "../RoadmapTile";

function Roadmap() {
  let spaceship =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/spaceship.svg";
  let dateBackground1 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/date-background-1.png";
  let dateBackground2 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/date-background-2.png";
  let dateBackground3 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/date-background-3.png";
  let dateBackground4 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/date-background-4.png";
  let dateBackground5 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/date-background-5.png";
  let bigRock1 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/big-rock1.png";
  let bigRock2 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/big-rock2.png";
  let bigRock3 =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/big-rock3.png";
  let arcImage =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/arc.png";
  let smallRock =
    "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/small-rock2.png";

  const planning = [
    { text: "Study of markets and technologies", status: true },
    { text: "Project concept", status: true },
    { text: "Core team recruitment", status: true },
    { text: "Farming mechanics concept", status: true },
    { text: "Economic structural concept", status: true },
    { text: "Dev project plan infrastructure", status: true },
    { text: "Finalised economic structure", status: true },
  ];

  const phase1 = [
    { text: "Branding", status: true },
    { text: "2D art design", status: true },
    { text: "Website draft", status: true },
    { text: "Backend infrastructure", status: true },
    { text: "Automated tests and security", status: true },
    { text: "Social media presence", status: true },
    { text: "Ongoing internal testing", status: true },
  ];

  const phase2 = [
    { text: "Website launch", status: true },
    { text: "Marketing campaign", status: true },
    { text: "Team expansion", status: true },
    { text: "Final alien designs", status: true },
    { text: "Web 2.0", status: true },
    { text: "Presale", status: true },
    //{ text: "New alien", status: false }
  ];

  const phase3 = [
    { text: "Contract development", status: true },
    { text: "Token launch", status: true },
    { text: "Coingecko and Coinmarketcap", status: true },
    { text: "Farm mode launch private", status: true },
    { text: "Farm mode launch public", status: true },
  ];

  const phase4 = [
    { text: "Roulette implementation", status: true },
    { text: "New alien", status: false },
    { text: "Staking system implementation", status: false },
    { text: "Marketplace release", status: false },
    { text: "Farm mode improvement & automation", status: false },
    { text: "Battle pass implementation", status: false },
    { text: "Further team expansion", status: false },
    { text: "List on more Exchanges", status: false },
    { text: "3D art design", status: false },
    { text: "Gameplay infrastructure", status: false },
    { text: "P2E Gameplay: Seekers of the Stone", status: false },
    { text: "Mobile launch", status: false },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>ROADMAP</h1>
        <img src={spaceship} alt="" loading="lazy" />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.tileContainer}>
          <div>
            <div className={classes.leftContent}>
              <div className={classes.dateContainer}>
                <img src={dateBackground1} alt="" loading="lazy" />
                <div style={{ minWidth: "170px" }}>
                  <div className={classes.spot}></div>Q4 2021 Sep-Oct
                </div>
              </div>
              <div>
                <img src={bigRock1} alt="" loading="lazy" />
              </div>
              <img src={arcImage} alt="" loading="lazy" />
              <div className={classes.borderImage}></div>
            </div>
            <div className={classes.smallRockContainer}>
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
            </div>
          </div>
          <div>
            <div className={classes.dateContainer2}>
              <img src={dateBackground1} alt="" loading="lazy" />
              <div style={{ minWidth: "170px" }}>
                <div className={classes.spot}></div>Q4 2021 Sep-Oct
              </div>
            </div>
            <RoadmapTile
              heading={"PROJECT PLANNING"}
              arr={planning}
              index={0}
            />
          </div>
        </div>

        <div className={classes.tileContainer}>
          <div>
            <div className={classes.leftContent}>
              <div className={classes.dateContainer}>
                <img src={dateBackground2} alt="" loading="lazy" />
                <div style={{ minWidth: "170px" }}>
                  <div className={classes.spot}></div>Q4 2021 Oct-Nov
                </div>
              </div>
              <div>
                <img src={bigRock2} alt="" loading="lazy" />
              </div>
              <img src={arcImage} alt="" loading="lazy" />
              <div className={classes.borderImage}></div>
            </div>
            <div className={classes.smallRockContainer}>
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
            </div>
          </div>
          <div>
            <div className={classes.dateContainer2}>
              <img src={dateBackground2} alt="" loading="lazy" />
              <div style={{ minWidth: "170px" }}>
                <div className={classes.spot}></div>Q4 2021 Oct-Nov
              </div>
            </div>
            <RoadmapTile heading={"PHASE 1 RELEASE"} arr={phase1} index={1} />
          </div>
        </div>

        <div className={classes.tileContainer}>
          <div>
            <div className={classes.leftContent}>
              <div className={classes.dateContainer}>
                <img src={dateBackground3} alt="" loading="lazy" />
                <div style={{ minWidth: "170px" }}>
                  <div className={classes.spot}></div>Q4 2021 Nov-Dec
                </div>
              </div>
              <div>
                <img src={bigRock3} alt="" loading="lazy" />
              </div>
              <img src={arcImage} alt="" loading="lazy" />
              <div className={classes.borderImage}></div>
            </div>
            <div className={classes.smallRockContainer}>
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
            </div>
          </div>
          <div>
            <div className={classes.dateContainer2}>
              <img src={dateBackground3} alt="" loading="lazy" />
              <div style={{ minWidth: "170px" }}>
                <div className={classes.spot}></div>Q4 2021 Nov-Dec
              </div>
            </div>
            <RoadmapTile heading={"PHASE 2 PRESALE"} arr={phase2} index={2} />
          </div>
        </div>

        <div className={classes.tileContainer}>
          <div>
            <div className={classes.leftContent}>
              <div className={classes.dateContainer}>
                <img src={dateBackground4} alt="" loading="lazy" />
                <div style={{ minWidth: "130px" }}>
                  <div className={classes.spot}></div>Q1 2022 Jan-Feb
                </div>
              </div>
              <div>
                <img src={bigRock2} alt="" loading="lazy" />
              </div>
              <img src={arcImage} alt="" loading="lazy" />
              <div className={classes.borderImage}></div>
            </div>
            <div className={classes.smallRockContainer}>
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
              <img src={smallRock} alt="" loading="lazy" />
            </div>
          </div>
          <div>
            <div className={classes.dateContainer2}>
              <img src={dateBackground4} alt="" loading="lazy" />
              <div style={{ minWidth: "130px" }}>
                <div className={classes.spot}></div>Q1 2022 Jan-Feb
              </div>
            </div>
            <RoadmapTile
              heading={"PHASE 3 TOKEN DEPLOY"}
              arr={phase3}
              index={3}
            />
          </div>
        </div>

        <div className={classes.tileContainer}>
          <div>
            <div className={classes.leftContent}>
              <div className={classes.dateContainer}>
                <img src={dateBackground5} alt="" loading="lazy" />
                <div style={{ minWidth: "100px" }}>
                  <div className={classes.spot}></div>Q1 2022 Mar
                </div>
              </div>
              <div>
                <img src={bigRock3} alt="" loading="lazy" />
              </div>
              <img src={arcImage} alt="" loading="lazy" />
              <div className={classes.borderImage}></div>
            </div>
          </div>
          <div>
            <div className={classes.dateContainer2}>
              <img src={dateBackground5} alt="" loading="lazy" />
              <div style={{ minWidth: "100px" }}>
                <div className={classes.spot}></div>Q1 2022 Mar
              </div>
            </div>
            <RoadmapTile heading={"PHASE 4"} arr={phase4} index={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
