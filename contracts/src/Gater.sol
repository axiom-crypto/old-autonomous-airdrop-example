// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Ownable } from 'openzeppelin-contracts/contracts/access/Ownable.sol';
import { ICreditFacadeV3 } from './interfaces/gearbox/ICreditFacadeV3.sol';
import { ICreditFacadeV3Multicall } from './interfaces/gearbox/ICreditFacadeV3Multicall.sol';
import { MultiCallBuilder } from 'core-v3/test/lib/MultiCallBuilder.sol';
import { MultiCall } from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gater is Ownable {
    // save for future reference
    mapping (address => uint16) public leverageFactors;
    
    event CreditManagerAddressUpdated(address creditManager);

    address public creditFacadeV3Addr;
    ICreditFacadeV3 public creditFacade;

    constructor(
        address _creditFacadeV3Addr
    ) {
        creditFacadeV3Addr = _creditFacadeV3Addr;
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
    }

    function updateCreditFacadeV3Addr(address _creditFacadeV3Addr) public onlyOwner {
        creditFacadeV3Addr = _creditFacadeV3Addr;
        emit CreditManagerAddressUpdated(_creditFacadeV3Addr);
    }

    function _openCreditAccount(
        uint256 amount,
        address callerAddr,
        uint16 leverageFactor
    ) public returns (address) { // FIXME: change to internal 
        leverageFactors[callerAddr] = leverageFactor; // save the calculated leverage factor for future reference
        uint256 debt = (amount * leverageFactor) / 100; // LEVERAGE_DECIMALS; // F:[FA-5]
        
        // Open account for user
        return creditFacade.openCreditAccount(
            callerAddr,
            MultiCallBuilder.build(
            ),
            0
        );
    } 

    function _multicall(address creditAccount, MultiCall[] calldata calls) external payable {
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // FIXME: approve token outside so that weth don't need to be hardcoded
        creditFacade.multicall(creditAccount, calls);
    }

    function getCreditFacadeAddr() public view returns (address) {
        return creditFacadeV3Addr;
    }
}
