source .env
forge script script/Membership.s.sol:MembershipScript --private-key $PRIVATE_KEY_GOERLI --broadcast --rpc-url $PROVIDER_URI_GOERLI -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/Membership.sol/Membership.json ../webapp/src/lib/abi/Membership.json