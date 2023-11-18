# Autonomous Airdrop (using AxiomREPL)

This example allows users to autonomously claim an airdrop of an example ERC20 token. Users utilize a data-fetching layer on top of Axiom to autonomously prove that their account matches some parameters before submitting a Query. In this case, it is the user has used Uniswap (swapping a token for a token that is **not** ETH) on Goerli testnet after block 9000000.

This example was created by generating a compute proof with [AxiomREPL](https://repl.axiom.xyz/).

## Contracts

`/contracts` contains all of the Solidity contract code.

## Webapp

`/webapp` is a full Next.js 13 (app router) implementation of an Autonomous Airdrop dApp.

The AxiomREPL code to generate this Compute Query is located at `/webapp/src/lib/circuit/index.ts`.


0x3B07E3939d11A07254068B76D0A58Ddf96F98e00
0xa9E656d0b61Ff79f08A469099b0D5e69561f3d56
0xB5ab6512dDBE89f90B3e3AfFaDd7EeF336c9D771
0x4Ff717175000A865e83802d0D3645ee4D730Ac0A
