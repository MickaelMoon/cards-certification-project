import {Button, Box, Text} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {Tooltip} from "@/components/ui/tooltip";

export default function WalletConnectionButtons() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <Box >
            {!isConnected ? (
                <Button colorPalette="blue" onClick={() => connect({ connector: connectors[0] })}>Connecter le wallet</Button>
            ) : (
                <Box maxWidth="200px" display="flex" justifyContent="center" flexDirection="column">
                    <Button colorPalette="red" onClick={() => disconnect?.()}>Déconnecter le wallet</Button>
                    <Tooltip showArrow content={address} interactive>
                        <Text truncate>Connecté avec : {address}</Text>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}