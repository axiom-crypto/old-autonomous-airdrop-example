// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IMailbox} from "./interfaces/hyperlane/IMailbox.sol";

abstract contract HyperlaneSender {
    IMailbox public immutable mailBoxAddress;

    constructor(IMailbox _mailBoxAddress) {
        mailBoxAddress = _mailBoxAddress;
    }

    function _dispatch(uint32 destinationDomain, bytes32 recipientAddress, bytes calldata messageBody)
        internal
        payable
        returns (bytes32 messageId)
    {
        return mailBoxAddress.dispatch(destinationDomain, recipientAddress, messageBody);
    }
}
