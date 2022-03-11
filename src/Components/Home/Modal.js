import * as React from "react";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {makeStyles, styled} from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import {blue} from "@mui/material/colors";
import metamask from "./Img/mm.png";
import walletconnet from "./Img/walletconnet.png";
import coinbase from "./Img/coinbase.png";
import {useWeb3React} from "@web3-react/core";
import {connectors} from "../../connectors";
import {toHex, truncateAddress} from "../../utils";
import {ethers} from "ethers";
import BackendApi from "../../shared/BackendApi";

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles({
    list: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "2em",
        backgroundColor: "black",
        padding: "16px 30px 16px 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 30,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        // height: 48,
        padding: "0 30px",
    },
});

// const customizeList = styled(List)(({ theme }) => ({
//     borderRadius: "2em",
// }));
function SimpleDialog(props) {
    const {onClose, selectedValue, open} = props;
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        provider,
    } = useWeb3React();
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: toHex(56)}],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [networkParams[toHex(56)]],
                    });
                } catch (error) {
                    setError(error);
                }
            }
        }
    };
    const handleMetaMask = async () => {
        await activate(connectors.injected);
        setProvider("injected");
        handleClose();
        switchNetwork();
    };

    const handleCoinBase = async () => {
        activate(connectors.coinbaseWallet);
        setProvider("coinbaseWallet");
        handleClose();
    };

    const handleWalletConnect = () => {
        activate(connectors.walletConnect);
        setProvider("walletConnect");
        handleClose();
    };

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    const cbLoginBackend = async (publicAddress) => {
        let res = await BackendApi.login(publicAddress)
        if (res) {
            if (res.success) {
                console.log('success', res)
            } else {
                console.log('error', res)
            }
        } else {
            console.log("backend-api-error")
        }
    }

    useEffect(() => {
        if (account) {
            cbLoginBackend(account)
        }
    }, [account])


    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{pt: 0}}
            PaperProps={{
                style: {borderRadius: 30},
            }}
        >
            <List className={classes.root} sx={{pt: 0}}>
                <ListItem button sx={{height: 100}} onClick={handleMetaMask}>
                    <ListItemAvatar sx={{marginLeft: 4, marginRight: 7}}>
                        <img src={metamask} width="50px"/>
                    </ListItemAvatar>
                    <h1>MetaMask</h1>
                    <ListItemText/>
                </ListItem>
                <ListItem button sx={{height: 100}} onClick={handleCoinBase}>
                    <ListItemAvatar sx={{marginLeft: 4, marginRight: 7}}>
                        <img src={coinbase} width="50px"/>
                    </ListItemAvatar>
                    <h1>CoinBase</h1>
                    <ListItemText/>
                </ListItem>
                <ListItem
                    button
                    sx={{height: 100}}
                    onClick={handleWalletConnect}
                >
                    <ListItemAvatar sx={{marginLeft: 4, marginRight: 7}}>
                        <img src={walletconnet} width="50px"/>
                    </ListItemAvatar>
                    <h1>WalletConnect</h1>
                    <ListItemText/>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
    const {library, chainId, account, activate, deactivate, active} =
        useWeb3React();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState(undefined);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
    };

    // const handleDisconnect = () => {
    //     refreshState();
    //     deactivate();
    // };
    async function handleDisconnect() {
        try {
            deactivate();
            console.log("success");
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <div>
            {!active ? (
                <Button
                    variant="text"
                    onClick={handleClickOpen}
                    style={{color: "white"}}
                >
                    Select Wallet
                </Button>
            ) : (
                <Button variant="text" style={{color: "white"}}>
                    {`Addr: ${truncateAddress(account)}`}
                </Button>
            )}

            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
