import { Constants } from "@/shared/constants";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { sepolia } from "viem/chains";

const projectId = Constants.WALLETCONNECT_PROJECT_ID!

const metadata = {
  name: 'Autonomous Airdrop',
  description: 'Autonomous Airdrop Example',
  url: 'https://autonomous-airdrop-example.vercel.app/',
  icons: ['']
}

const chains = [sepolia]

export const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig: config, projectId, chains })