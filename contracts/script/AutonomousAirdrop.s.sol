// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { Script, console2 } from "forge-std/Script.sol";
import { AutonomousAirdrop } from '../src/AutonomousAirdrop.sol';
import { UselessToken } from '../src/UselessToken.sol';

contract AutonomousAirdropScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x28CeE427fCD58e5EF1cE4C93F877b621E2Db66df;
    bytes32 public constant QUERY_SCHEMA = 0x9e3023501fc622d57a75f27cd8a3186773d9805ce6ca4eeb87bdc928aa8d210b;

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
