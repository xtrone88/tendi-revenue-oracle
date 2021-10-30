require("dotenv").config()

import HDWalletProvider from "truffle-hdwallet-provider"
import Web3 from "web3"

const web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.PROVIDER_URL))

const revenueContract = new web3.eth.Contract(JSON.parse(process.env.REVENUE_CONTRACT_ABI), process.env.REVENUE_CONTRACT_ADDRESS)
const killazContract = new web3.eth.Contract(JSON.parse(process.env.NFT_CONTRACT_ABI), process.env.TEST_KILLAZ_CONTRACT_ADDRESS)
const ladyKillazContract = new web3.eth.Contract(JSON.parse(process.env.NFT_CONTRACT_ABI), process.env.TEST_LADYKILLAZ_CONTRACT_ADDRESS)

const account = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err === null) {
        resolve(accounts[0])
      } else {
        reject(err)
      }
    })
  })
}

export const getTotalKillaz = () => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      killazContract.methods.totalSupply()
        .call({ from: account })
        .then((result) => {
          resolve(result)
        })
    })
  })
}

export const getTotalLadyKillaz = () => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      ladyKillazContract.methods.totalSupply()
        .call({ from: account })
        .then((result) => {
          resolve(result)
        })
    })
  })
}

export const startUpdate = () => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      revenueContract.methods.startUpdate()
        .send({ from: account })
        .then((result) => {
          resolve(result)
        })
    })
  })
}

export const endUpdate = (killaz, ladyKillaz) => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      revenueContract.methods.endUpdate(killaz, ladyKillaz)
        .send({ from: account })
        .then((result) => {
          resolve(result)
        })
    })
  })
}

export const updateListing = (token, tokenId) => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      revenueContract.methods.updateListing(token, tokenId)
        .send({ from: account })
        .then((result) => {
          resolve(result)
      })
    })
  })
}