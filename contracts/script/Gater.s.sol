// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Gater} from "../src/Gater.sol";

contract GaterScript is Script {
    address public constant MEMBERSHIP_ADDR = ;
    function setup() public {}

    function run() public {
        vm.startBroadcast();

        Gater gater = new Gater(
            MEMBERSHIP_ADDR
        );

        vm.stopBroadcast();
    }
}
