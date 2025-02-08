'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, Button } from '@chakra-ui/react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error;
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Box textAlign="center" padding="4rem">
            <Text fontSize="4xl" fontWeight="bold">
                Oups, une erreur est survenue !
            </Text>
            <Text mt="2">
                {error.message || "Une erreur s'est produite."}
            </Text>
            <Button mt="4" onClick={() => reset()}>
                Réessayer
            </Button>
            <Button mt="4" ml="4" onClick={() => router.push('/')}>
                Retour à l'accueil
            </Button>
        </Box>
    );
}
