export const Constants = Object.freeze({
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/goerli/query/",
  COVALENT_BASE_URI: "https://api.covalenthq.com/v1",
  COVALENT_API_KEY: process.env.COVALENT_API_KEY as string,
  UNISWAP_UNIV_ROUTER_GOERLI: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),

  AUTO_AIRDROP_ADDR: "0xaF4c2D0AFDe8B40025Ff9bF7CaF21ac97286Ef9e",
  TOKEN_ADDR: "0x0a3B35c39b7B8917cF857e9378d4d400301ddd71",

  // Swap (address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)
  EVENT_SCHEMA: "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
  ELIGIBLE_BLOCK_HEIGHT: 9000000,
})
