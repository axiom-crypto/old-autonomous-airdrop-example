// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IMailbox} from "./interfaces/hyperlane/IMailbox.sol";

abstract contract HyperlaneSender {
    IMailbox public immutable mailBoxAddress;

    constructor(address _mailBoxAddress) {
        mailBoxAddress = IMailbox(_mailBoxAddress);
    }

    function dispatch(uint32 destinationDomain, bytes32 recipientAddress, bytes memory messageBody)
        public
        payable
        returns (bytes32 messageId)
    {
        return mailBoxAddress.dispatch(destinationDomain, recipientAddress, messageBody);
    }
}
