// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IReceiver {
    event Handle(uint32 indexed _origin, uint32 indexed _sender, uint32 indexed _message);

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable;
}
