require("dotenv").config();

import { OpenSeaAPI, Network } from 'opensea-js'
import { getTotalKillaz, getTotalLadyKillaz, startUpdate, endUpdate, updateListing } from './ethereum'

const seaApi = new OpenSeaAPI({
  networkName: Network.Main
})

const fetch_at_once = parseInt(process.env.FETCH_IDS_AT_ONCE)
let totalKillaz = 0, totalKillazListed = 0;
let totalLadyKillaz = 0, totalLadyKillazListed = 0;

const wait = (milliseconds) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds))
}

const fetchAndUpdate = (tokenAddress, tokenMaxId) => {
  return new Promise(async (resolve, reject) => {
    let startAt = 1
    let updated = {}
    let listed = 0
    while (startAt <= tokenMaxId) {
      let tokenIds = []
      for (let i = startAt; i <= tokenMaxId && i < startAt + fetch_at_once; i++) {
        tokenIds.push(i)
      }
      console.log('tokenIds', tokenIds)
      let offset = 0
      while (true) {
        const result = await seaApi.getOrders({
          asset_contract_address: tokenAddress,
          side: 1,
          token_ids: tokenIds,
          offset
        })
        if (result.orders.length == 0) {
          break
        }
        console.log('Get Orders', result.orders.length)
        const listedIds = []
        for (let i = 0; i < result.orders.length; i++) {
          const order = result.orders[i]
          const tokenId = order.asset.tokenId
          const tokenAddress = order.asset.tokenAddress
          if (!updated[tokenId]) {
            console.log(tokenAddress, tokenId)
            updated[tokenId] = true
            listedIds.push(parseInt(tokenId))
            listed++
          }
        }
        if (listedIds.length > 0) {
          console.log('Update Listing', listedIds)
          await updateListing(tokenAddress, listedIds)
        }
        offset += result.orders.length
      }
      startAt += fetch_at_once
      await wait(1000)
    }
    resolve(listed)
  })
}

const startOralce = async () => {
  getTotalKillaz()
  .then((result) => {
    totalKillaz = result
    console.log('totalKillaz', totalKillaz)
    return getTotalLadyKillaz()
  })
  .then((result) => {
    totalLadyKillaz = result
    console.log('totalLadyKillaz', totalLadyKillaz)
    return startUpdate()
  })
  .then(() => {
    console.log('Start Updating')
    return fetchAndUpdate(process.env.KILLAZ_CONTRACT_ADDRESS, totalKillaz)
  })
  .then((listed) => {
    totalKillazListed = listed
    console.log('totalKillazListed', totalKillazListed)
    return fetchAndUpdate(process.env.LADYKILLAZ_CONTRACT_ADDRESS, totalLadyKillaz)
  })
  .then((listed) => {
    totalLadyKillazListed = listed
    console.log('totalLadyKillazListed', totalLadyKillazListed)
    return endUpdate(totalKillazListed, totalLadyKillazListed)
  })
  .then(() => {
    console.log('End Updating')
  })
}

export default startOralce