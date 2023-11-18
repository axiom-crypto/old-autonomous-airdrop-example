// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IReceiver} from "./interfaces/hyperlane/IReceiver.sol";

contract Gater is IReceiver {
    bytes32 validSource;

    constructor(address _validSource) {
        validSource = bytes32(uint256(uint160(_validSource)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable {
        require(_sender == validSource, "Hyerlane: receive massage from invalid source.");
        emit Handle(_origin, _sender);
        // Todo: open credit account with tiers
    }
}
