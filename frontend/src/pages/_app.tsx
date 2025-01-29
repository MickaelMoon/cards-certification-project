import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { config } from "@/lib/wagmi";
import {WagmiProvider} from "wagmi";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
                <ChakraProvider value={defaultSystem}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ChakraProvider>
            </QueryClientProvider>
      </WagmiProvider>
  );
}
