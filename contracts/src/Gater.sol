// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IReceiver} from "./interfaces/hyperlane/IReceiver.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin-contracts/token/ERC20/IERC20.sol";
import {ICreditFacadeV3} from "./interfaces/gearbox/ICreditFacadeV3.sol";
import {ICreditManagerV3} from "./interfaces/gearbox/ICreditManagerV3.sol";
import {ICreditFacadeV3Multicall} from "./interfaces/gearbox/ICreditFacadeV3Multicall.sol";
import {MultiCallBuilder} from "core-v3/test/lib/MultiCallBuilder.sol";
import {MultiCall} from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";

contract Gater is IReceiver, Ownable {
    event CreditManagerAddressUpdated(address creditManager);
    event CreditAccountOpened(address caAddr, uint256 userMaxDebt);

    // membership contract address in bytes32 that control the max debt management
    bytes32 public trustedSource;
    // address public creditFacadeV3Addr;
    ICreditFacadeV3 public creditFacade;
    ICreditManagerV3 public creditManager;
    // cross chain mailbox
    address public mailbox;

    // max leverage any user can borrow
    mapping(address user => uint256 debt) public maxDebt;
    mapping(address ca => address owner) public ownerOf;

    constructor(address _creditFacadeV3Addr, address _creditManager, address _mailbox) {
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
        creditManager = ICreditManagerV3(_creditManager);
        mailbox = _mailbox;
    }

    function setValidSource(address _validSource) public onlyOwner {
        validSource = bytes32(uint256(uint160(_validSource)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable {
        require(_sender == validSource, "Gater: receive massage from invalid source.");
        require(msg.sender == mailbox, "Gater: un-authorized mailbox");
        emit Handle(_origin, _sender);

        (uint256 userMaxDebt, address user) = abi.decode(_message, (uint256, address));

        address caAddr = _openCreditAccount(user, userMaxDebt);

        emit CreditAccountOpened(caAddr, userMaxDebt);
    }

    function updateCreditFacadeV3Addr(address _creditFacadeV3Addr) public onlyOwner {
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
        emit CreditManagerAddressUpdated(_creditFacadeV3Addr);
    }

    /**
     * FIXME: remove this after testing, only use `handle`
     */
    function openCreditAccount(address callerAddr, uint256 userMaxDebt) public returns (address) {
        return _openCreditAccount(callerAddr, userMaxDebt);
    }

    function _openCreditAccount(address callerAddr, uint256 userMaxDebt) internal returns (address) {
        maxDebt[callerAddr] = userMaxDebt; // save the calculated leverage factor for future reference

        // Open account for user, controlled by this account
        address ca = creditFacade.openCreditAccount(address(this), MultiCallBuilder.build(), 0);

        ownerOf[ca] = callerAddr;

        return ca;
    }

    function multicall(address creditAccount, MultiCall[] calldata calls) external payable {
        if (msg.sender != ownerOf[creditAccount]) revert("wrong caller");
        _multicall(creditAccount, calls);

        // check that users cannot borrow more than their leverage factor
        _checkMaxDebt(creditAccount);
    }

    function _multicall(address creditAccount, MultiCall[] calldata calls) internal {
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // FIXME: approve token outside so that weth don't need to be hardcoded
        creditFacade.multicall(creditAccount, calls);
    }

    function _checkMaxDebt(address creditAccount) internal view {
        uint256 debtCeiling = maxDebt[creditAccount];
        (
            uint256 debt, //uint256 cumulativeIndexLastUpdate,
            , //uint128 cumulativeQuotaInterest,
            , //uint128 quotaFees,
            , //uint256 enabledTokensMask,
            , //uint16 flags,
            , //uint64 lastDebtUpdate,
            , //address borrower
        ) = creditManager.creditAccountInfo(creditAccount);

        require(debt <= debtCeiling, "debt ceiling reached");
    }

    function getCreditFacadeAddr() public view returns (address) {
        return address(creditFacade);
    }
}
