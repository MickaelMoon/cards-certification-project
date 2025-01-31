import {Button, Box, Text} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {Tooltip} from "@/components/ui/tooltip";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"

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
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Menu
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem value="new-file">New File...</MenuItem>
                            <MenuItem value="new-win">New Window</MenuItem>
                            <MenuItem color="fg.error" value="disconnect" onClick={() => disconnect?.()}>Déconnecter le wallet</MenuItem>
                        </MenuContent>
                    </MenuRoot>
                    <Tooltip showArrow content={address} interactive>
                        <Text cursor="pointer" truncate>Connecté avec : {address}</Text>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}