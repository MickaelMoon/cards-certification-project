import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";


export default function LandingPage() {


    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="2rem"
        >
            <VStack gap="10">
                <Heading as="h1" size="2xl" textAlign="center">
                    Bienvenue à BiCertif
                </Heading>
                <Text fontSize="xl" textAlign="center">
                    Votre plateforme de confiance pour les certifications numériques de vos cartes physiques.
                </Text>

            </VStack>
        </Box>
    );
}