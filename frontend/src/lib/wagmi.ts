import { createConfig, http } from 'wagmi';
import { foundry } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Configuration des chaînes supportées
const chains = [foundry] as const;

// Configuration des connecteurs (wallets supportés)
const connectors = [
    injected(), // Supporte les wallets comme MetaMask
];

// Configuration des fournisseurs (providers)
const transports = {
    [foundry.id]: http('http://127.0.0.1:8545'), // Utilise Anvil comme provider local
};

// Création de la configuration Wagmi
export const config = createConfig({
    chains,
    connectors,
    transports,
    ssr: true,
});




