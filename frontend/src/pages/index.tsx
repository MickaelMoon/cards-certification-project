import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { Box, Text } from "@chakra-ui/react";
import LandingPage from "@/components/LandingPage";
import { contractAddress, abi } from "@/config/contract";
import LoadingSpinner from "@/components/LoadingSpinner";
import Card from "@/components/CardShowcase";

export default function Home() {
    const { isConnected } = useAccount();
    const [isConnectionChecked, setIsConnectionChecked] = useState(false); // État pour vérifier si la connexion a été vérifiée

    const { data: card, isLoading, isError } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "getCard",
        args: [BigInt(0)], // Token ID
    });

    const [name, grade, imageUrl] = card || ["", BigInt(0), ""];

    useEffect(() => {
        // Simule une vérification de connexion
        setTimeout(() => {
            setIsConnectionChecked(true);
        }, 500); // Temps d'attente pour simuler la vérification
    }, []);

    // Affiche un spinner pendant que la connexion est en cours de vérification
    if (!isConnectionChecked) {
        return <LoadingSpinner />;
    }

    return (
        <Box
            height="calc(100vh - 12rem)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="2rem"
            >
            {isConnected ? (
                isLoading ? (
                    <LoadingSpinner />
                ) : isError ? (
                    <Text>Erreur lors de la récupération de la carte.</Text>
                ) : card ? (
                    <Card name={name} grade={grade} imageUrl={imageUrl} />
                ) : (
                    <Text>Aucune carte trouvée.</Text>
                )
            ) : (
                <LandingPage />
            )}
        </Box>
    );
}