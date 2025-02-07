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
In the **/backend** folder there is a <ins>**start-anvil.sh**</ins> script to start Anvil automatically if you prefer to start it manually you can run the following command :
```shell
$ anvil
```
Here is the result of this command in your terminal

```shell
                             _   _
                            (_) | |
      __ _   _ __   __   __  _  | |
     / _` | | '_ \  \ \ / / | | | |
    | (_| | | | | |  \ V /  | | | |
     \__,_| |_| |_|   \_/   |_| |_|

    0.3.0 (5a8bd89 2024-12-20T08:45:53.195623000Z)
    https://github.com/foundry-rs/foundry

Available Accounts
==================

(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000.000000000000000000 ETH)
(1) 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000.000000000000000000 ETH)
(2) 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000.000000000000000000 ETH)
(3) 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000.000000000000000000 ETH)
(4) 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000.000000000000000000 ETH)
(5) 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000.000000000000000000 ETH)
(6) 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000.000000000000000000 ETH)
(7) 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000.000000000000000000 ETH)
(8) 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000.000000000000000000 ETH)
(9) 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000.000000000000000000 ETH)

Private Keys
==================

(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
(1) 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
(2) 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
(3) 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
(4) 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
(5) 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
(6) 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
(7) 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
(8) 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
(9) 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Wallet
==================
Mnemonic:          test test test test test test test test test test test junk
Derivation path:   m/44'/60'/0'/0/


Chain ID
==================

31337

Base Fee
==================

1000000000

Gas Limit
==================

30000000

Genesis Timestamp
==================

1737806041

Listening on 127.0.0.1:8545
```

### 4. Deploy the smart contract
- Pick the Anvil URL from the terminal result and replace the <ANVIL_URL> in the command below.
- Pick a private key from the list and replace the <PUT_A_PRIVATE_KEY_FROM_ANVIL_LIST> in the command below.
```shell
forge create --rpc-url <ANVIL_URL> --private-key <PUT_A_PRIVATE_KEY_FROM_ANVIL_LIST> src/PokemonCertification.sol:PokemonCertification --broadcast
```

### 5. Cast functions from the smart contract
```shell
cast send <SMART_CONTRACT_HASH> "certifyCard(address,string,uint256,string,uint256)" <PUBLIC_OWNER_ADDRESS> "Noctali VMAX" 10 "https://cccgrading.com/files/noctali-vmax-evolution-celeste-215-alternative-ccc-10_d3f61549adaa7290cb4e3859d88c4bee.jpeg" 1 --rpc-url <ANVIL_URL> --private-key <PUT_THE_PRIVATE_KEY_WHO_DEPLOYED_THE_SMART_CONTRACT>
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