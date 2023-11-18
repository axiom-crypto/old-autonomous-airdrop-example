// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Ownable } from 'openzeppelin-contracts/contracts/access/Ownable.sol';
import { ICreditFacadeV3 } from './interfaces/gearbox/ICreditFacadeV3.sol';
import { ICreditManagerV3 } from './interfaces/gearbox/ICreditManagerV3.sol';
import { ICreditFacadeV3Multicall } from './interfaces/gearbox/ICreditFacadeV3Multicall.sol';
import { MultiCallBuilder } from 'core-v3/test/lib/MultiCallBuilder.sol';
import { MultiCall } from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gater is Ownable {
    
    // max leverage any user can borrow
    mapping (address user => uint256 debt) public maxDebt;

    mapping (address ca => address owner) public ownerOf;

    event CreditManagerAddressUpdated(address creditManager);
    event CreditAccountOpened(address caAddr, uint256 userMaxDebt);

    // address public creditFacadeV3Addr;
    ICreditFacadeV3 public creditFacade;

    ICreditManagerV3 public creditManager;

    // cross chain mailbox
    address public mailbox;

    // membership contract that control the max debt management
    address public membership;

    constructor(
        address _creditFacadeV3Addr,
        address _creditManager,
        address _mailbox,
        address _membership
    ) {
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
        creditManager = ICreditManagerV3(_creditManager);
        mailbox = _mailbox;
        membership = _membership;
    }

    function updateCreditFacadeV3Addr(address _creditFacadeV3Addr) public onlyOwner {
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
        emit CreditManagerAddressUpdated(_creditFacadeV3Addr);
    }

    // todo: make this the entrypoint
    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external {
        if (msg.sender != mailbox) revert("un-authorized");
        if (uint256(_sender) != uint256(uint160(membership))) revert("call sender is not membership");

        (address user, uint256 userMaxDebt) = abi.decode(_message, (address, uint256));

        _openCreditAccount(user, userMaxDebt);
    }

    /**
     * FIXME: remove this after testing, only use `handle`
     */
    function openCreditAccount(
        address callerAddr,
        uint256 userMaxDebt
    ) public returns (address) {
        return _openCreditAccount(callerAddr, userMaxDebt);
    } 

    function _openCreditAccount(
        address callerAddr,
        uint256 userMaxDebt
    ) internal returns (address) {

        maxDebt[callerAddr] = userMaxDebt; // save the calculated leverage factor for future reference

        // Open account for user, controlled by this account
        address ca = creditFacade.openCreditAccount(
            address(this),
            MultiCallBuilder.build(),
            0
        );

        ownerOf[ca] = callerAddr;

        emit CreditAccountOpened(ca, userMaxDebt);

        return ca;
    }

    function multicall(address creditAccount, MultiCall[] calldata calls) external payable {
        if (msg.sender != ownerOf[creditAccount]) revert ("wrong caller");
        _multicall(creditAccount, calls);

        // check that users cannot borrow more than their leverage factor
        _checkMaxDebt(creditAccount);
    }

    function _multicall(address creditAccount, MultiCall[] calldata calls) internal {
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // FIXME: approve token outside so that weth don't need to be hardcoded
        creditFacade.multicall(creditAccount, calls);
    }

    function _checkMaxDebt(address creditAccount) internal view {
        uint debtCeiling = maxDebt[creditAccount];
        (
            uint256 debt
            ,//uint256 cumulativeIndexLastUpdate,
            ,//uint128 cumulativeQuotaInterest,
            ,//uint128 quotaFees,
            ,//uint256 enabledTokensMask,
            ,//uint16 flags,
            ,//uint64 lastDebtUpdate,
            ,//address borrower
        ) = creditManager.creditAccountInfo(creditAccount);

        require(debt <= debtCeiling, "debt ceiling reached");
    }

    function getCreditFacadeAddr() public view returns (address) {
        return address(creditFacade);
    }
}
