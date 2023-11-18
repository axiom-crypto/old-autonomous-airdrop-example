source .env
forge script script/Gater.s.sol:GaterScript --private-key $PRIVATE_KEY_GBTESTNET --broadcast --rpc-url $PROVIDER_URI_GBTESTNET -vvvv
cp out/Gater.sol/Gater.json ../webapp/src/lib/abi/Gater.json