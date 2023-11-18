// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IReceiver} from "./interfaces/hyperlane/IReceiver.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";

contract Gater is IReceiver, Ownable {
    bytes32 public validSource;

    function setValidSource(address _validSource) public onlyOwner {
        validSource = bytes32(uint256(uint160(_validSource)));
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable {
        require(_sender == validSource, "Hyerlane: receive massage from invalid source.");
        emit Handle(_origin, _sender);
        // Todo: open credit account with tiers
    }
}
