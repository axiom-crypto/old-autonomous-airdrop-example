// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Test, console } from 'forge-std/Test.sol';
import { Gater } from '../src/Gater.sol';
import { ICreditFacadeV3 } from '../src/interfaces/gearbox/ICreditFacadeV3.sol';
import { ICreditFacadeV3Multicall } from '../src/interfaces/gearbox/ICreditFacadeV3Multicall.sol';
import { MultiCallBuilder } from 'core-v3/test/lib/MultiCallBuilder.sol';
import { MultiCall } from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ParamGearboxAccountTest is Test {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x8DdE5D4a8384F403F888E1419672D94C570440c9;
    address public constant GEARBOX_V2_ADDRPROVIDER_GOERLI_ADDR = 0x95f4cea53121b8A2Cb783C6BFB0915cEc44827D3;
    address public constant GEARBOX_V3_ADDRPROVIDER_PRIVATETESTNET_ADDR = 0x9ea7b04Da02a5373317D745c1571c84aaD03321D;
    address public constant GEARBOX_V3_CREDITFACADEV3_PRIVATETESTNET_ADDR = 0xA558422397eB6cdF4d10520b4669CcAaECA1D34e;
    bytes32 public constant CALLBACK_QUERY_SCHEMA = bytes32(0x6bf0e6fdf43cd348a907e75c79aeb6a44b337690f4476e7c7a52db20b76ce6f0);
    
    bytes32[] public callbackData;
    Gater gater;
    ICreditFacadeV3 creditFacadeV3;
    function setUp() public {
        gater = new Gater(
            GEARBOX_V3_CREDITFACADEV3_PRIVATETESTNET_ADDR
        );
    }

    function test_updateCreditFacadeV3Addr() public {
        address randomAddress = vm.addr(uint256(keccak256("RandomSeed")));
        gater.updateCreditFacadeV3Addr(newCreditManager);
    }

    function test_openCreditAccount() public {
        address randomAddress = vm.addr(uint256(keccak256("RandomSeed")));
        vm.startPrank(randomAddress);
        
        uint256 amount = 100;
        uint16 leverageFactor = 100;
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

        address creditAccount = gater._openCreditAccount(amount, randomAddress, leverageFactor);
        IERC20(weth).approve(address(creditAccount), 1000000e18);
        
        vm.stopPrank();
        vm.label(creditAccount, "creditAccount");
    }
}