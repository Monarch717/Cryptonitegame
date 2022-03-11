export default class CryptoniteAPI {
  constructor() {
    //this.hostname = "https://backend-api-v3.cryptonitegame.io";
    this.hostname = "https://backend-api-v3.cryptonitegame.io";
  }
  getLotteryTicket(token) {
    return fetch(`${this.hostname}/auth/get_loteries`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
    }).then((result) => result.json());
  }

  listUserEggs(token) {
    return fetch(`${this.hostname}/auth/get_eggs`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
    }).then((result) => result.json());
  }

  listUserPacks(token) {
    return fetch(`${this.hostname}/auth/get_packs`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
    }).then((result) => result.json());
  }

  listUserConsumibles(token) {
    return fetch(`${this.hostname}/auth/get_consumibles`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
    }).then((result) => result.json());
  }

  listUserAliens(token) {
    return fetch(`${this.hostname}/inventory/get_aliens`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
    }).then((result) => result.json());
  }

  check_transaction(token, txHash, transaction_id) {
    return fetch(`${this.hostname}/transactions/check_transaction`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token,
      },
      body: JSON.stringify({
        tx_hash: txHash,
        transaction_id: transaction_id
      }),
    }).then((result) => result.json());
  }

  register_transaction_hash(token, tx_hash, transaction_id) {
    const data = {
      tx_hash: tx_hash,
      transaction_id: transaction_id
    }
    return fetch(`${this.hostname}/transactions/register_transaction_hash`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }).then((result) => result.json());
  }

  register_presale_transaction(token, item, quantity) {
    const data = {
      qty: quantity,
      pack_type: item
    }
    return fetch(`${this.hostname}/transactions/register_presale_transaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }).then((result) => result.json());
  }

  get_presale_supply() {
    return fetch(`${this.hostname}/transactions/get_presale_supply`, {
      method: "GET"
    }).then((result) => result.json());
  }

  get_account_data(token) {
    return fetch(`${this.hostname}/auth/my_account`, {
      method: "GET",
      headers: {
        'auth-token': token

      }
    }).then((result) => result.json());
  }
}