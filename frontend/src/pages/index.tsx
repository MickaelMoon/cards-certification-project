import {useReadContract, useAccount, useConnect, useDisconnect} from 'wagmi';
import {Box, Heading, Image, Spinner, VStack, Text} from "@chakra-ui/react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Remplace par l'adresse de ton contrat

const abi = [
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
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

export default function Home() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { data: card, isLoading, isError } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "getCard",
        args: [BigInt(1)], // Token ID
    });



    console.log("Card:", card);
    console.log("Loading:", isLoading);
    console.log("Error:", isError);

    // Déstructurer le tableau retourné par `getCard`
    const [name, grade, imageUrl] = card || ["", 0, ""];

    return (
        <Box>
            <Heading>Ma carte Pokémon</Heading>
            {!isConnected ? (
                <button onClick={() => connect({ connector: connectors[0] })}>Connecter le wallet</button>
            ) : (
                <>
                    <button onClick={() => disconnect?.()}>Déconnecter le wallet</button>
                    <p>Connecté avec : {address}</p>
                    {isLoading ? (
                        <VStack colorPalette="teal">
                            <Spinner color="colorPalette.600" />
                            <Text color="colorPalette.600">Loading...</Text>
                        </VStack>
                    ) : isError ? (
                        <p>Erreur lors de la récupération de la carte.</p>
                    ) : card ? (
                        <div>
                            <p>Nom: {name}</p>
                            <p>Grade: {grade.toString()}</p>
                            <p>Image: <Image
                                height="200px"
                                src={imageUrl}
                            /></p>
                        </div>
                    ) : (
                        <p>Aucune carte trouvée.</p>
                    )}
                </>
            )}
        </Box>
    );
}