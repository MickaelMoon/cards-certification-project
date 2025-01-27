# Setup our environment


### **If foundry is installed skip this step !**
**WARN : First follow the steps to install foundry !**
https://ethereum-blockchain-developer.com/2022-06-nft-truffle-hardhat-foundry/14-foundry-setup/


## Setup steps 
### 1. Clone the project
You will find at the root of the project two folders, one for the front-end and one for the backend.

### 2. Build the project
Access to the **/backend** folder and start running those commands
```shell
$ forge build
```

### 3. Start Anvil
```shell
$ anvil
```

### 4. Deploy the smart contract
```shell
forge create --rpc-url <ANVIL_URL> --private-key <PUT_A_PRIVATE_KEY_FROM_ANVIL_LIST> src/PokemonCertification.sol:PokemonCertification --broadcast
```

### 5. Cast functions from the smart contract
```shell
cast send <SMART_CONTRACT_HASH> "certifyCard(string,uint256,string)" "Noctali VMAX" 10 "https://cccgrading.com/files/noctali-vmax-evolution-celeste-215-alternative-ccc-10_d3f61549adaa7290cb4e3859d88c4bee.jpeg" --rpc-url <ANVIL_URL> --private-key <PUT_THE_PRIVATE_KEY_WHO_DEPLOYED_THE_SMART_CONTRACT>
```

```shell
cast call <SMART_CONTRACT_HASH> "getCard(uint256)" 0 --rpc-url <ANVIL_URL>
```
#### if you get a response here is that you have successfully deployed the smart contract and casted a valid pokemon card.

### 6. Start the front-end
Access to the **/frontend** folder and start running those commands

```shell
$ npm run dev
```