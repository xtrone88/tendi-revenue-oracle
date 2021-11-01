# tendi-revenue-oracle
### Install
yarn install
### Config
Rename .env.example to .env and open it, then fill the proper arguments<br/>
PRIVATE_KEY=Your mainnet account's private key<br/>
PROVIDER_URL=Your mainnet infra url<br/>
REVENUE_CONTRACT_ADDRESS=Deployed Revenue Contract's address on mainnet
### Setting Execution Time
Open src/index.js and set the execution time as cron time format at line 4.<br/>
Please reference https://www.npmjs.com/package/node-schedule
### Run
yarn dev
