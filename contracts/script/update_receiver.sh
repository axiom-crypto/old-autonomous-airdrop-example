source .env
cast send $MEMBERSHIP_ADDR "setRecipient(address)" $GATER_ADDR --rpc-url $PROVIDER_URI_GOERLI --private-key $PRIVATE_KEY_GOERLI
cast send $GATER_ADDR "setValidSource(address)" $MEMBERSHIP_ADDR --rpc-url $PROVIDER_URI_GBTESTNET --private-key $PRIVATE_KEY_GOERLI