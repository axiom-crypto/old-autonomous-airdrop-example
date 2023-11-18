# How to use the graph

## Commands

```bash
cast call 0x2aD4A2f1BDd815E285a22CDCc072FbB43818b09b "creditFacade()" --rpc-url "https://eth-goerli.g.alchemy.com/v2$ALCHEMY_API"
```

```bash
yarn global add @graphprotocol/graph-cli
```

## References

- https://www.npmjs.com/package/@graphprotocol/graph-cli
- https://api.studio.thegraph.com/proxy/58827/gearbox-creditfacade/v0.0.1/graphql?query=query+MyQuery+%7B%0A++openCreditAccounts(where:+%7BonBehalfOf:+%22%22%7D)+%7B%0A++++onBehalfOf%0A++%7D%0A%7D
- https://thegraph.com/studio/subgraph/gearbox-creditfacade/
- https://goerli.etherscan.io/txs?a=0x15a43dbcd8dbc094f7866c2f458cab68c35bbe16&p=6
- https://www.youtube.com/watch?v=obOEMAZ-05s&t=1501s
- https://thegraph.com/docs/en/developing/creating-a-subgraph/
- https://goerli.etherscan.io/address/0x95f4cea53121b8A2Cb783C6BFB0915cEc44827D3#readContract
- https://goerli.etherscan.io/address/0xAc056CBa71Db1F0f6d15c0C2e57E0fD99B50E2Fc#readContract
- https://goerli.etherscan.io/address/0x9B8cc86B2C3b9dBb69bEf306054Bb1D8dB213E24#readContract
- https://goerli.etherscan.io/address/0x0D81c71667fB13A7dEA38F196e2c9fDbBc74aeB1
- https://book.getfoundry.sh/reference/cast/cast-call
- https://github.com/Gearbox-protocol/core-v2
- https://dev.gearbox.fi/
