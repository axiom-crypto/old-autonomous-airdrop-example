// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Gater} from "../src/Gater.sol";

contract GaterScript is Script {
    address creditFacadeV3 = 0xA558422397eB6cdF4d10520b4669CcAaECA1D34e;
    address creditManager = 0xf409B587Bd0b9baC4DF791117F0cbdA424c195e1;
    address mailbox = 0xBFa7585dE906f8F606a01f8f4de6Ba4A377cb79E;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Gater gater = new Gater(creditFacadeV3, creditManager, mailbox );

        vm.stopBroadcast();
    }
}
