import { http, createConfig } from 'wagmi';
import { sepolia } from "wagmi/chains";
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [
    sepolia,
  ],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_PROVIDER_URI_SEPOLIA as string),
  }
})
