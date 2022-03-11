
export default class MetamaskAPI {
  constructor(web3, ethers) {
    this.web3 = web3 // import Web3 from 'web3'
    this.ethers = ethers // import { ethers } from 'ethers'
    this.abi = require('./abi.json')
    this.contractAddress = '0x145812dd822Cca602161e9E1ea96963be290b549'
    this.myWeb3 = undefined
    this.contractCreator = '0x43D65B22682B08aA3A9da5E379E2d09DC58a4c2B'
    this.gameRewards = '0x876543548a5e7B1B4e5E01917B781CA9d1b38c00'

    this.myWeb3 = new this.web3('https://bsc-dataseed1.binance.org:443');
  }

  // ethereum parameter = window.ethereum (be carefull with this as its only available if metamask is installed in browser)

  connectToMetamaskWallet(ethereum) {
    // first function to call on connect to metamask click button, after resolve call Cryptonite API to get user nonce from backend
    return new Promise((resolve, reject) => {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => reject(err));
    });
  }

  async MetamaskUserSignature(ethereum, nonce) {
    // this needs to be called right after receive user NONCE from backend after clicking connect to metamask
    let provider = new this.ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(
      `Cryptonite-game-user-login-signature: ${nonce}`
    );
    const address = await signer.getAddress();
    return {
      // this object needs to be sent to backend API to Authenticate user in backend, the api sends a Json web token back.
      signer,
      signature,
      address,
    };
  }

  weiToEther(weiValue) {
    return this.ethers.utils.formatEther(weiValue); // Tool for price conversions
  }

  etherTowei(etherValue) {
    return this.ethers.utils.parseEther(etherValue)._hex; // Tool for price conversions
  }

  getUserBalance(ethereum) {
    // Gets user BNB Balance to display in front end
    return new Promise((resolve) => {
      ethereum
        .request({
          method: "eth_getBalance",
          params: [ethereum.selectedAddress, "latest"],
        })
        .then((balance) => {
          resolve(this.weiToEther(balance));
        });
    });
  }

  makeUserTransaction(ethereum) { // PRESALE AND BNB FEE
    return new Promise((resolve, reject) => {
      this.myWeb3.eth.estimateGas({from: ethereum.selectedAddress, to: this.gameRewards, amount: this.etherTowei("0.004")}).then(
        gas => {
          const transactionParameters = {
            nonce: "0x00", // ignored by MetaMask
            to: this.gameRewards, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: this.etherTowei("0.004"), // Only required to send ether to the recipient from the initiating external account.
            gas: gas.toString(),
            //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: "0x38", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          };

          ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        .then((txHash) => {
          resolve({txHash: txHash}); // returns transaction token HASH that we need to verify after transaction checkUserTransactionWeb3
        })
        .catch((err) => resolve(err));
        }
      )
      
    });
  }

  toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
  }


  makeUserTokensDeposit(web3, ethereum, etherValue) { // PRESALE AND BNB FEE
    let provider = new this.web3(web3.currentProvider);

    return new Promise((resolve, reject) => {
      let cryptoniteContract = new provider.eth.Contract(this.abi, this.contractAddress)
      provider.eth.estimateGas({from: ethereum.selectedAddress, to: this.contractCreator, amount: this.etherTowei(this.toFixedTrunc(etherValue, 2))}).then(
        gas => {
          console.log(gas)
          cryptoniteContract.methods
            .transfer(this.contractCreator, parseFloat(this.toFixedTrunc(etherValue, 2)).toFixed(2) * 10000)  //function in contract
            .send({
              from: ethereum.selectedAddress,
              to: this.contractCreator,
              value: this.etherTowei("0"),
              gasPrice: "20000000000"
        })
        .then((txHash) => {
          resolve({txHash: txHash}); // returns transaction token HASH that we need to verify after transaction checkUserTransactionWeb3
        })
        .catch((err) => console.log(err));
        }
      )
    });
  }

  checkUserTransactionWeb3(ethereum, txHash, transaction_id) {
    // needs window.ethereum and txHash received from metamask transaction
    // as we don't know if the transaction has been completed on submision we need to request metamask the
    // transaction receipt until the transaction has been completed, this can return a failure or success receipt
    // that we will double check in our last call to back end api before create users items into the database.
    var myWeb3 = new this.web3(ethereum);
    return new Promise((resolve, reject) => {
      myWeb3.eth
        .getTransaction(txHash)
        .then((result) => {
          if (
            result.transactionIndex === undefined ||
            result.transactionIndex === null ||
            result.transactionIndex === "null"
          ) {
            // if transaction is not completed yet, keep trying
            // we need a timeout limit for this really, if after 5 minutes there is no transaction we should return an error here
            setTimeout(() => {
              resolve(this.checkUserTransactionWeb3(ethereum, txHash, transaction_id));
            }, 800);
          } else {
            resolve({ completed: true, receipt: result, tx_hash: txHash, transaction_id: transaction_id }); // this receipt is what we need to send to backend api.
          }
        })
        .catch((err) => resolve(err));
    });
  }

  getCryptoniteBalance(selectedAddress) {
    return new Promise ((resolve, reject) => {
      //let myWeb3 = new this.web3('https://bsc-dataseed1.binance.org:443');
      let cryptoniteContract = new this.myWeb3.eth.Contract(this.abi, this.contractAddress)
      cryptoniteContract.methods.balanceOf(selectedAddress).call()
      .then(value => {
        resolve(value / 10000)
      })
    })
    
    
  }
}
