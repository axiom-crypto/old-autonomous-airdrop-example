// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Test, console } from 'forge-std/Test.sol';
import { Gater } from '../src/Gater.sol';
import { IAxiomV2Query } from '../src/interfaces/IAxiomV2Query.sol';
// import { IAccountFactoryGetters } from '../src/interfaces/IAccountFactoryGetters.sol';
import { ICreditFacadeV3 } from '../src/interfaces/ICreditFacadeV3.sol';
import { ICreditFacadeV3Multicall } from '../src/interfaces/ICreditFacadeV3Multicall.sol';
import { MultiCallBuilder } from 'core-v3/test/lib/MultiCallBuilder.sol';
import { MultiCall } from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ParamGearboxAccountTest is Test {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x8DdE5D4a8384F403F888E1419672D94C570440c9;
    address public constant GEARBOX_V2_ADDRPROVIDER_GOERLI_ADDR = 0x95f4cea53121b8A2Cb783C6BFB0915cEc44827D3;
    address public constant GEARBOX_V3_ADDRPROVIDER_PRIVATETESTNET_ADDR = 0x9ea7b04Da02a5373317D745c1571c84aaD03321D; // FIXME: 0x9ea7b04da02a5373317d745c1571c84aad03321d
    address public constant GEARBOX_V3_CREDITFACADEV3_PRIVATETESTNET_ADDR = 0xA558422397eB6cdF4d10520b4669CcAaECA1D34e;
    bytes32 public constant CALLBACK_QUERY_SCHEMA = bytes32(0x6bf0e6fdf43cd348a907e75c79aeb6a44b337690f4476e7c7a52db20b76ce6f0);
    // bytes public constant TEST_DATAQUERY = hex"00000000000000050003000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b70000006700000000c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b70000006700000002c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b700000034000000000000000000000000000000000000000000000000000000000000000000000000";
    // bytes public constant TEST_CALLBACK = hex"51b17b290000000000000000000000000000000000000000000000000000000000000005000000000000000000000000d780ba6903fecebede0d7dfcc0a558227f9eadc200000000000000000000000000000000000000000000000000000000000000002f3a19a5c1a80ef8c5f6ca793dacff43891949ff694eafa80f5ab88f74adf97e00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000003c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000000000000000000000000b392448932f6ef430555631f765df0dfae34eff3000000000000000000000000000000000000000000000000000000000092b34a0000000000000000000000000000000000000000000000000000000000000014b392448932f6ef430555631f765df0dfae34eff3000000000000000000000000";
    
    bytes32[] public callbackData;
    Gater gater;
    // IAccountFactoryGetters accountFactoryGetters;
    ICreditFacadeV3 creditFacadeV3;
    function setUp() public {
        gater = new Gater(
            AXIOM_V2_QUERY_GOERLI_ADDR, 
            5, 
            CALLBACK_QUERY_SCHEMA,
            GEARBOX_V3_CREDITFACADEV3_PRIVATETESTNET_ADDR
        );
    }

    function test_updateCreditFacadeV3Addr() public {
        address newCreditManager = 0x8DdE5D4a8384F403F888E1419672D94C570440c9; // FIXME: change to new address
        gater.updateCreditFacadeV3Addr(newCreditManager);
    }

    function test_isCorrectProvider() public {
        address gearboxProvider = GEARBOX_V3_ADDRPROVIDER_PRIVATETESTNET_ADDR;
        // FIXME
    }

    function test_openCreditAccount() public {
        // tokenTestSuite.mint(underlying, USER, creditAccountAmount);
        address randomAddress = vm.addr(uint256(keccak256("RandomSeed")));
        vm.startPrank(randomAddress);
        
        uint256 amount = 100;
        uint16 leverageFactor = 100;
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
        //approve(IERC20(weth), randomAddress, address(creditManager));

        address creditAccount = gater._openCreditAccount(amount, randomAddress, leverageFactor);
        IERC20(weth).approve(address(creditAccount), 1000000e18);
        
        vm.stopPrank();

        // balance = IERC20(underlying).balanceOf(creditAccount);

        vm.label(creditAccount, "creditAccount");
    }
        // vm.prank(msg.sender);
        // accountFactoryGetters.countCreditAccounts();
        // paramGearboxAccount._openCreditAccount(100, msg.sender);
    /* function debugDataQuery(bytes calldata dataQuery, uint256 a, uint256 b) public pure returns (bytes32) {
        return bytes32(dataQuery[a:b]);
    } */
}