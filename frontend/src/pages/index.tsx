import {useReadContract, useAccount} from 'wagmi';
import {Box, Image, Spinner, VStack, Text} from "@chakra-ui/react";
import LandingPage from "@/components/LandingPage";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Remplace par l'adresse de ton contrat

const abi = [
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

export default function Home() {
    const {isConnected} = useAccount();
    const {data: card, isLoading, isError} = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "getCard",
        args: [BigInt(0)], // Token ID
    });


    console.log("Card:", card);
    console.log("Loading:", isLoading);
    console.log("Error:", isError);

    // Déstructurer le tableau retourné par `getCard`
    const [name, grade, imageUrl] = card || ["", 0, ""];

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
        >
            {isConnected ? (
                isLoading ? (
                    <VStack colorPalette="teal">
                        <Spinner color="colorPalette.600"/>
                        <Text color="colorPalette.600">Loading...</Text>
                    </VStack>
                ) : isError ? (
                    <Text>Erreur lors de la récupération de la carte.</Text>
                ) : card ? (
                    <Box>
                        <Text>Nom: {name}</Text>
                        <Text>Grade: {grade.toString()}</Text>
                        <Text>Image: <Image
                            height="200px"
                            src={imageUrl}
                        /></Text>
                    </Box>
                ) : (
                    <Text>Aucune carte trouvée.</Text>
                )
            ) : (
                <LandingPage/>
            )}
        </Box>
    )
}