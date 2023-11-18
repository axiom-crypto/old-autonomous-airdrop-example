# Contracts for AxiomV2 Autonomous Airdrop Example

## Setup

Rename `env.example` to `.env` and fill out the parameters.

## Compile

```bash
forge compile
```

## Deploy

Run `./script/deploy_goerli.sh` to deploy to Goerli testnet (please ensure you have some Goerli testnet ETH before deploying).

# Test

```bash
forge test --fork-url gearbox
```