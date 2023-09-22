// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { Script, console2 } from "forge-std/Script.sol";
import { AutonomousAirdrop } from '../src/AutonomousAirdrop.sol';
import { UselessToken } from '../src/UselessToken.sol';

contract AutonomousAirdropScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x8DdE5D4a8384F403F888E1419672D94C570440c9;
    bytes32 public constant DATA_QUERY_QUERY_SCHEMA = bytes32(0);
    bytes32 public constant COMPUTE_QUERY_QUERY_SCHEMA = 0x1e9129a2abe9fd64aabd42b3c559b98af28dc6e7b26d6f4074238147485bbd70;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        
        AutonomousAirdrop aa = new AutonomousAirdrop(
            AXIOM_V2_QUERY_GOERLI_ADDR,
            5,
            COMPUTE_QUERY_QUERY_SCHEMA
        );

        UselessToken ut = new UselessToken(address(aa));
        aa.updateAirdropToken(address(ut));

        vm.stopBroadcast();
    }
}
