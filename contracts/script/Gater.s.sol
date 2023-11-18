// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Gater} from "../src/Gater.sol";

contract GaterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Gater gater = new Gater();

        vm.stopBroadcast();
    }
}
