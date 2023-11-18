# Hyperlane relayer deployment steps
```
hyperlane config create chain 
```
```
hyperlane config create multisig
 hyperlane deploy core \
    --targets gbtestnet,goerli \
    --chains $CHAIN_CONFIG_FILE \
    --artifacts $PREDEPLOYED_ARTIFACT_FILE \
    --ism $MULTISIG_CONFIG_FILE \
    --out $OUT_DIR \
    --key 0x..
```

```
hyperlane deploy kurtosis-agents
```
```
hyperlane send message \
--origin goerli \
--destination gbtestnet \
--core ./artifacts/core-deployment-2023-11-18-10-32-33.json \
--key 0x..
```