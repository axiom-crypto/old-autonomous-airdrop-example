import { Constants } from "@/shared/constants";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { goerli } from "viem/chains";

const projectId = Constants.WALLETCONNECT_PROJECT_ID || "052b792876478e447b369f96e89f4ea5"

const metadata = {
  name: 'Autonomous Airdrop',
  description: 'Autonomous Airdrop Example',
  url: 'https://autonomous-airdrop-example.vercel.app/',
  icons: ['']
}

const chains = [goerli]

export const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig: config, projectId, chains })