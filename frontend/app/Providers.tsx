'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider value={defaultSystem}>
                    <Header />
                    {children}
                    <Footer />
                </ChakraProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
