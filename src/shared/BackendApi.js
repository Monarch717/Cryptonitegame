import MetamaskAPI from "./MetamaskAPI";
import Web3 from "web3";
import {ethers} from "ethers";

let Metamask = new MetamaskAPI(Web3, ethers);

let MetamaskUserSignature = (ethereum, token) =>
    Metamask.MetamaskUserSignature(ethereum, token);

export const login = async (publicAddress) => {
    try {
        let response = await fetch(
            `https://backend-api-v3.cryptonitegame.io/auth/login?publicAdress=${publicAddress}`,
            {method: "GET"}
        );

        let json = await response.json();

        if (json.nonce) {
            let userSigned = await MetamaskUserSignature(window.ethereum, json.nonce);
            if (userSigned.address && userSigned.signature) {
                const data = {
                    address: userSigned.address,
                    signature: userSigned.signature,
                };
                response = await fetch(
                    `https://backend-api-v3.cryptonitegame.io/auth/v1`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'x-forwarded-for': 'any-value'
                        },
                        body: JSON.stringify(data),
                    }
                );
                json = await response.json();

                if (!json.token) {
                    return {
                        success: false,
                        error: json.error
                    };
                }
                window.sessionStorage.setItem(
                    "token",
                    json.token
                );

                return {
                    success: true,
                    token: json.token,
                    address: window.ethereum.selectedAddress
                }
            }
        }
    } catch (e) {
        console.log('BackendAPI-login-ex', e.message)
    }
    return null;
}

export default {
    login
}
