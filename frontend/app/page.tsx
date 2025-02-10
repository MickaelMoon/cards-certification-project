'use client';
import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { Box, Stack, Text } from '@chakra-ui/react';
import LandingPage from '@/components/LandingPage';
import { contractAddress, abi_getCard, abi_getCards } from '@/config/contract';
import LoadingSpinner from '@/components/LoadingSpinner';
import Card from '@/components/CardShowcase';

// Composant enfant qui récupère une carte selon son id (tokenId)
function CardItem({ id }: {id: number}) {
    const { data: card, isLoading, isError } = useReadContract({
        address: contractAddress,
        abi: abi_getCard,
        functionName: 'getCard',
        args: [BigInt(id)],
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Text>Erreur lors de la récupération de la carte {id}.</Text>;
    if (!card) return <Text>Aucune carte trouvée pour id {id}.</Text>;

    // Supposons que card est un tableau [name, grade, imageUrl]
    const [name, grade, imageUrl, amount] = card;
    return <Card name={name} grade={grade} imageUrl={imageUrl} amount={amount} />;
}

export default function Home() {
    const { isConnected } = useAccount();
    const [isConnectionChecked, setIsConnectionChecked] = useState(false);

    // Lecture du nombre total de cartes
    const { data: numberOfCards, isLoading: isLoadingCount, isError: isErrorCount } = useReadContract({
        address: contractAddress,
        abi: abi_getCards,
        functionName: 'getNumberOfCards',
    });

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
                isLoadingCount ? (
                    <LoadingSpinner />
                ) : isErrorCount ? (
                    <Text>Erreur lors de la récupération du nombre de cartes.</Text>
                ) : (
                    // Convertir le nombre récupéré (qui peut être un BigNumber) en nombre JavaScript
                    <Stack direction="row" gap={10}>
                        {Array.from({ length: Number(numberOfCards) }).map((_, index) => (
                            <CardItem key={index} id={index} />
                        ))}
                    </Stack>
                )
            ) : (
                <LandingPage />
            )}
        </Box>
    );
}
