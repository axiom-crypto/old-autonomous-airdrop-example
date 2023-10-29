source .env
forge script script/HighFive.s.sol:HighFiveScript --private-key $PRIVATE_KEY_GOERLI --broadcast --rpc-url $PROVIDER_URI_GOERLI -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/HighFive.sol/HighFive.json ../webapp/src/lib/abi/HighFive.json