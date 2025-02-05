import { Box, Heading } from "@chakra-ui/react";
import WalletConnectionButtons from "@/components/WalletConnectionButtons";

export default function Header() {
    return (
        <Box as="header" display="flex" justifyContent="space-between" alignItems="center" padding="1rem" height="6rem">
            <Heading>Cardify</Heading>
            <WalletConnectionButtons />
        </Box>
    );
}