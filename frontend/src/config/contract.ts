export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Remplace par l'adresse de ton contrat

export const abi = [
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
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;