// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IReceiver {
    event Handle(uint32 indexed _origin, bytes32 indexed _sender);

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable;
}
