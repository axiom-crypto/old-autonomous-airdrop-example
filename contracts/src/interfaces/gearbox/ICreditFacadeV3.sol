pragma solidity 0.8.19;

import {MultiCall} from "core-v3/credit/CreditFacadeV3.sol";

interface ICreditFacadeV3 {
    function openCreditAccount(address onBehalfOf, MultiCall[] calldata calls, uint256 referralCode)
        external
        payable
        returns (address creditAccount);
    function multicall(address creditAccount, MultiCall[] calldata calls) external payable;
}
