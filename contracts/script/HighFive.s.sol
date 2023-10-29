// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { Script, console2 } from "forge-std/Script.sol";
import { HighFive } from '../src/HighFive.sol';

contract HighFiveScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x28CeE427fCD58e5EF1cE4C93F877b621E2Db66df;
    bytes32 public constant QUERY_SCHEMA = 0xa3d1943899bdde30ca9c75ca66c1ff46d7f74121a47df5fd945a4b5f690fac87;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        HighFive hf = new HighFive(
            AXIOM_V2_QUERY_GOERLI_ADDR,
            5,
            QUERY_SCHEMA
        );


        vm.stopBroadcast();
    }
}
