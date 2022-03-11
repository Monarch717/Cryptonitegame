import React, {useEffect, useState} from "react";
import Header from "../../Components/Header";
import classes from "./MyAccount.module.css";
import ContentHeader from "../../Components/FarmContent/ContentHeader"
import CryptoniteAPI from '../../shared/CryptoniteAPI'

let Cryptonite = new CryptoniteAPI()

const contentHeader = {
    token: 0,
    cryptonite: 0,
    binance: 0,
};

function MyAccount() {
    const [accountData, setAccountData] = useState({
        "account": {
            "transactions": [],
            "user": ""
        }
    })

    useEffect(() => {
        let transactionsUpdated = accountData
        let counter = 0
        accountData.account.transactions.forEach((transaction, index) => {
            if (!transaction.is_checked) {
                Cryptonite.check_transaction(window.sessionStorage.getItem('token'), transaction.tx_hash, transaction.id)
                    .then(result => {
                        if (result.status === 'success' || result.error === 'wrong receiver' || result.error === 'wrong sender' || result.error === 'wrong value') {
                            counter++
                            transactionsUpdated.account.transactions[index].is_checked = result.is_checked
                            transactionsUpdated.account.transactions[index].is_valid = result.is_valid
                        }

                    })
            }
        })
        if (counter > 0) {
            setAccountData(transactionsUpdated)
        }
    }, [accountData])

    useEffect(() => {
        if (window.sessionStorage.getItem('token')) {
            setTimeout(() => {
                Cryptonite.get_account_data(window.sessionStorage.getItem('token'))
                    .then(account => setAccountData(account))
            }, 500)

        }
    }, [])


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header/>
                <p className={classes.headingText}>My Account</p>
                <div className={classes.content}>
                    <ContentHeader data={contentHeader}/>
                    <div style={{width: '90%'}}>
                        {!window.sessionStorage.getItem('token') &&

                        <h1 className={classes.connectHeader}>Please connect to Metamask</h1>

                        }
                        {
                            window.sessionStorage.getItem('token') &&
                            <div>
                                <h3 className={classes.userHeader}><span
                                    className={classes.transactionTitles}>User:</span> {accountData.account.user}</h3>
                                <hr className={classes.lineBreak}/>
                            </div>

                        }
                        {window.sessionStorage.getItem('token') && accountData.account.transactions.map((transaction, i) => {
                            return (
                                <div className={classes.transaction + " transactions"} id={transaction.id}>
                                    <div className={classes.cardImages}>
                                        <img
                                            src={`https://crpyotonite-game-site.s3.eu-west-2.amazonaws.com/images/farm/packs/presale-${transaction.pack}-packs.png`}
                                            alt=""></img>
                                        <a>x{transaction.quantity}</a>
                                    </div>
                                    <div className={classes.transactionDetails}>
                                        <ul>
                                            <li><a><span
                                                className={classes.transactionTitles}>Created at:</span> {transaction.created_at}
                                            </a></li>
                                            <li><a><span
                                                className={classes.transactionTitles}>Value:</span> {transaction.final_price}
                                            </a></li>
                                            <li><a className={classes.tx_hash}
                                                   href={`https://bscscan.com/tx/${transaction.tx_hash}`}
                                                   target="_blank">{transaction.tx_hash}</a></li>
                                        </ul>
                                    </div>
                                    <a className={transaction.is_checked && transaction.is_valid ? classes.verifiedTransaction : transaction.is_checked && !transaction.is_valid ? classes.failedTransaction : classes.processingTransaction}>{transaction.is_checked && transaction.is_valid ? 'Verified' : transaction.is_checked && !transaction.is_valid ? 'Failed' : 'Processing...'}</a>


                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
