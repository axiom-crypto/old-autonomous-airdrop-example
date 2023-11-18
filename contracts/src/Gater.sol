// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IReceiver} from "./interfaces/hyperlane/IReceiver.sol";

contract Gater is IReceiver {
    uint32 validSource;

    constructor(address _validSource) {
        validSource = uint32(uint160(_validSource));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable {
        require(_sender == validSource, "Hyerlane: receive massage from invalid source.");
        emit Handle(_origin, _sender, _message);
        // Todo: open credit account with tiers
    }
}
