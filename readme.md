# Autonomous Airdrop

This example allows users to autonomously claim an airdrop of an example ERC20 token. Users utilize a data-fetching layer on top of Axiom to autonomously prove that their account matches some parameters before submitting a Query. In this case, it is the user has used Uniswap on Goerli testnet after block 9000000.

## Contracts

`/contracts` contains all of the Solidity contract code.

## Webapp

`/webapp` is a full Next.js 13 (app router) implementation of an Autonomous Airdrop dApp. The AxiomREPL code to generate this Compute Query is located at `/webapp/src/lib/circuit/index.ts`.
