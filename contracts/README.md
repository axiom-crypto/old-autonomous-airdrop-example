# Contracts for AxiomV2 Autonomous Airdrop Example

## Setup

Rename `env.example` to `.env` and fill out the parameters.

## Compile

```bash
forge compile
```

## Deploy

Run `./script/deploy_goerli.sh` to deploy to Goerli testnet (please ensure you have some Goerli testnet ETH before deploying).
Run `./script/deploy_gbtestnet.sh` to deploy to gearbox testnet (please ensure you have some gearbox testnet ETH before deploying).

## Update smart contract addresses

Update the `.env` file with the deployed address `MEMBERSHIP_ADDR`, `GATER_ADDR`.
Run `./script/set_state.sh` to set the smart contract address states to the deployed address.

# Test

```bash
forge test --fork-url gearbox
```
