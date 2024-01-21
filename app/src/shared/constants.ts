export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/sepolia/query/",
  UNISWAP_UNIV_ROUTER_GOERLI: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),

  AUTO_AIRDROP_ADDR: "0x04A10F33693126819E84B99FB1A313838e2f0fFD",
  TOKEN_ADDR: "0x832Af473bB9c0812f5697EaB7c69D62D0394264f",

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA:
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
  ELIGIBLE_BLOCK_HEIGHT: 4000000
});
