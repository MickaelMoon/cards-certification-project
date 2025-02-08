'use client';

import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { Box, Text } from '@chakra-ui/react';
import LandingPage from '@/components/LandingPage';
import { contractAddress, abi } from '@/config/contract';
import LoadingSpinner from '@/components/LoadingSpinner';
import Card from '@/components/CardShowcase';

export default function Home() {
    const { isConnected } = useAccount();
    const [isConnectionChecked, setIsConnectionChecked] = useState(false);

    const { data: card, isLoading, isError } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: 'getCard',
        args: [BigInt(0)], // Token ID
    });

    // Supposons que card est un tableau [name, grade, imageUrl]
    const [name, grade, imageUrl] = card || ['', BigInt(0), ''];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsConnectionChecked(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

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