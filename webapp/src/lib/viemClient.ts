import { createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
})