# tendi-revenue-oracle
> Current project is based on nodejs 16.12 and yarn 1.22.17
### Download from github
Download zip file or git clone https://github.com/zess11/tendi-revenue-oracle.git<br>
### Install
Go to the source directory and open terminal, please run this command.<br>
> yarn install
### Config
Rename .env.example to .env and open it, then fill the proper arguments<br>
> PRIVATE_KEY=Your mainnet account's private key<br>
PROVIDER_URL=Your mainnet infra url<br>
REVENUE_CONTRACT_ADDRESS=Deployed Revenue Contract's address on mainnet<br>

![image](https://user-images.githubusercontent.com/82226713/140096672-7d4365b6-c53a-4f56-acf8-896c79c9f286.png)
As you can see, private key and privider url are for the initialization of web3js to interact with Revenue contract and update states of opensea listing.
### Setting Execution Time
Open src/index.js and set the execution time as cron time format at line 4.<br>
Please reference https://www.npmjs.com/package/node-schedule<br>
![image](https://user-images.githubusercontent.com/82226713/140097792-067f6e4d-1621-4c65-834d-fd3c9ba63711.png)
Above screen means 8:23, 1th of Every month. You can set this time to make oracle run regularly.
### Run
> yarn dev

You can progressing logs on terminal.
![image](https://user-images.githubusercontent.com/82226713/140099378-a14b193c-3664-47b7-9fbe-fda1d28c60d2.png)

**Now, you can check if claimShare and withrawShare are working on Revenue contract.**
