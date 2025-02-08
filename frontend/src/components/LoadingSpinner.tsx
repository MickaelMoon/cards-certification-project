import { VStack, Spinner, Text } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <VStack colorPalette="blue">
            <Spinner color="colorPalette.500" />
            <Text color="colorPalette.500">Loading...</Text>
        </VStack>
    );
}