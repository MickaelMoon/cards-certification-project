import { Box, Heading } from "@chakra-ui/react";
import WalletConnectionButtons from "@/components/WalletConnectionButtons";

export default function Header() {
    return (
        <Box as="header" display="flex" justifyContent="space-between" alignItems="center" padding="1rem">
            <Heading>BiCertif</Heading>
            <WalletConnectionButtons />
        </Box>
    );
}