export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Remplace par l'adresse de ton contrat

export const abi_getCard = [
    {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "getCard",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "grade",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "imageUrl",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;

export const abi_certifyCard = [
    {
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "grade",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "imageUrl",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "certifyCard",
        "outputs": [],
        "stateMutability": "nonpayable"
    }
] as const;

export const abi_getCards = [
    {
        "type": "function",
        "name": "getNumberOfCards",
        "inputs": [],
        "outputs": [
            {
                "name": "number",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    }
] as const;