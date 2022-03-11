import React, {useRef, useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import classes from "./header.module.css";
import AWN from "awesome-notifications";
import MetamaskAPI from "../../shared/MetamaskAPI";
import {ethers} from "ethers";
import Web3 from "web3";
import BasicModal from "../Home/Modal";
import {useWeb3React} from "@web3-react/core";
import BackendApi from "../../shared/BackendApi";

const Header = () => {
    let logo =
        "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/logo-small.svg";
    let metaMaskBtn =
        "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/metamask-btn.png";
    let metaMask =
        "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/metamask.png";
    let navIcon =
        "https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/nav-icon.png";
    let Metamask = new MetamaskAPI(Web3, ethers);

    let MetamaskUserSignature = (ethereum, token) =>
        Metamask.MetamaskUserSignature(ethereum, token);
    let connectToMetamaskWallet = (ethereum) =>
        Metamask.connectToMetamaskWallet(ethereum);

    const [defaultAccount, setDefaultAccount] = useState("");
    const [userNetwork, setUserNetwork] = useState(null);
    const [userToken, setUserToken] = useState("");

    const {library, chainId, account, activate, deactivate, active} =
        useWeb3React();
    useEffect(() => {
        setTimeout(() => {
            if (window.ethereum.selectedAddress) {
                if (window.sessionStorage.getItem("token")) {
                    fetch(
                        `https://backend-api-v3.cryptonitegame.io/auth/session`,
                        {
                            method: "GET",
                            headers: {
                                "auth-token":
                                    window.sessionStorage.getItem("token"),
                            },
                        }
                    )
                        .then((response) => response.json())
                        .then((json) => {
                            if (json.status === "error") {
                                new AWN().alert(json.info, {
                                    labels: {alert: "Session expired"},
                                });
                                setTimeout(() => {
                                    accountChangedHandler();
                                }, 2500);
                            }
                        });
                }

                if (
                    window.ethereum.selectedAddress &&
                    window.sessionStorage.getItem("token")
                ) {
                    window.ethereum.on(
                        "accountsChanged",
                        accountChangedHandler
                    );
                    window.ethereum.on("chainChanged", accountChangedHandler);
                }

                if (
                    !window.ethereum.selectedAddress &&
                    window.sessionStorage.getItem("token")
                ) {
                    accountChangedHandler();
                }

                if (
                    window.ethereum.selectedAddress &&
                    defaultAccount === "" &&
                    window.sessionStorage.getItem("token")
                ) {
                    setDefaultAccount(window.ethereum.selectedAddress);
                }
            }
        }, 400);
    }, []);

    const userLoginHandler = async (publicAddress) => {
        console.log('address', publicAddress);

        let res = await BackendApi.login(publicAddress);
        if (res) {
            setDefaultAccount(
                window.ethereum.selectedAddress
            );
        }
        // window.location.reload();
    };

    const connectWalletHandler = () => {
        if (window.ethereum) {
            // user has metamask installed
            if (chainId === "0x38") {

                console.log(account);
                userLoginHandler(account);
            } else {
                console.log("here", account);
                // new AWN().alert(
                //     "Please select the Smart Chain network (BSC) and try again.",
                //     {labels: {alert: "Wrong network"}}
                // );
            }
        } else {
            new AWN().Info("Please install Metamask and try again.", {
                labels: {alert: "Install Metamask"},
            });
        }
    };

    const accountChangedHandler = () => {
        window.sessionStorage.removeItem("token");
        window.location.reload();
    };

    const ref = useRef();

    function navToggler() {
        if (
            ref.current.style.transform === "translateX(-500px)" ||
            ref.current.style.transform === ""
        ) {
            ref.current.style.transform = "translateX(0px)";
        } else {
            ref.current.style.transform = "translateX(-500px)";
        }
    }

    const location = useLocation();
    const [isActive, setIsActive] = useState("0");
    const isActiveCheck = () => {
        switch (location.pathname) {
            case "/":
                setIsActive("1");
                break;
            case "/farm":
                setIsActive("2");
                break;
            case "/shop":
                setIsActive("3");
                break;
            case "/roulette":
                setIsActive("4");
                break;
            case "/stake":
                setIsActive("5");
                break;
            case "/marketplace":
                setIsActive("6");
                break;
            case "/whitepaper":
                setIsActive("7");
                break;
            default:
        }
    };
    useEffect(() => {
        isActiveCheck();
    }, [location.pathname]);

    useEffect(() => {
        window.sessionStorage.getItem("token")
            ? setUserToken(window.sessionStorage.getItem("token"))
            : () => {
            };
    }, []);

    const handleSubmenu = () => {
        document.querySelector("#connect-submenu").classList.toggle("active");
    };

    return (
        <div
            className={
                window.location.href == "http://127.0.0.1:8082/#/"
                    ? classes.navbarHome
                    : classes.navbar
            }
            id="nav"
            style={{zIndex: "999999"}}
        >
            <div className={classes.cryptoniteLogo}>
                <Link to="/">
                    <img src={logo} alt="Cryptonite Logo"/>
                </Link>
            </div>
            <div className={classes.navIcon} onClick={navToggler}>
                <img src={navIcon} alt="Navbar Icon"/>
            </div>
            <div className={classes.links} ref={ref}>
                <ul>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "1" ? "aqua" : "white"}`,
                            }}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "2" ? "aqua" : "white"}`,
                            }}
                            to="/farm"
                        >
                            Farm
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "3" ? "aqua" : "white"}`,
                            }}
                            to="/shop"
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "6" ? "aqua" : "white"}`,
                            }}
                            to="/marketplace"
                        >
                            Marketplace
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "4" ? "aqua" : "white"}`,
                            }}
                            to="/roulette"
                        >
                            Roulette
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "5" ? "aqua" : "white"}`,
                            }}
                            to="/stake"
                        >
                            Stake
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                color: `${isActive === "7" ? "aqua" : "white"}`,
                            }}
                            to="/whitepaper"
                        >
                            Whitepaper
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={classes.links2} ref={ref}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/farm">Farm</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/marketplace">Marketplace</Link>
                    </li>
                    <li>
                        <Link to="/roulette">Roulette</Link>
                    </li>
                    <li>
                        <Link to="/stake">Stake</Link>
                    </li>
                </ul>
            </div>
            <div className={classes.metamaskBtn} id="connect-btn">
                <img src={metaMaskBtn} alt="Metamask Logo"/>
                <div
                    onClick={
                        account == undefined
                            ? connectWalletHandler
                            : handleSubmenu
                    }
                >
                    {/* <div> */}

                    <img src={metaMask} alt=""/>
                    {/* <div>{ defaultAccount === '' ? 'Connect metamask' : `Address: ${defaultAccount.substring(0,3)}...${defaultAccount.substring(defaultAccount.length-3,defaultAccount.length)}`}</div> */}
                    <div>
                        <BasicModal/>
                    </div>
                    {account === "" ? (
                        () => {
                        }
                    ) : (
                        <ul className={classes.links3} id="connect-submenu">
                            <li>
                                <Link to="/my-account">My account</Link>
                            </li>
                            <li>
                                <a onClick={accountChangedHandler}>
                                    Disconnect
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
