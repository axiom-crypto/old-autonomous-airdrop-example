// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { Script, console2 } from "forge-std/Script.sol";
import { AutonomousAirdrop } from '../src/AutonomousAirdrop.sol';
import { UselessToken } from '../src/UselessToken.sol';

contract AutonomousAirdropScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0xBbd0d3671093A36D6e3b608a7E3B1fdC96Da1116;
    bytes32 public constant QUERY_SCHEMA = 0xe19729df9a4240baed62edcbff6e87f5f6b00b07b5063ef0e2f17dbd39db9289;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        AutonomousAirdrop aa = new AutonomousAirdrop(
            AXIOM_V2_QUERY_GOERLI_ADDR,
            5,
            QUERY_SCHEMA
        );

        UselessToken ut = new UselessToken(address(aa));
        aa.updateAirdropToken(address(ut));

        vm.stopBroadcast();
    }
}
