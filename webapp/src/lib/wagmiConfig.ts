import { Constants } from "@/shared/constants";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { goerli } from "viem/chains";
import { defineChain } from 'viem/utils'

const projectId = Constants.WALLETCONNECT_PROJECT_ID!

const metadata = {
  name: 'Autonomous Airdrop',
  description: 'Autonomous Airdrop Example',
  url: 'https://autonomous-airdrop-example.vercel.app/',
  icons: ['']
}

export const gearBoxTestnet = defineChain({
    id: 7878,
    name: 'Gearbox Testnet',
    network: 'gearbox',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [Constants.GEARBOX_RPC],
      },
      public: {
        http: [Constants.GEARBOX_RPC],
      },
    },
  })

const chains = [goerli, gearBoxTestnet]

export const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig: config, projectId, chains })