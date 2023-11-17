// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AxiomV2Client} from "./AxiomV2Client.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";

import {IMembership} from "./interfaces/IMembership.sol";

import {LibUserSegmentation} from "./libraries/LibUserSegmentation.sol";

contract Membership is IMembership, AxiomV2Client, Ownable {
    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    uint256 public testBalanceCriteria;
    address public testProvingAddress;
    uint256 public testProvingInterval;
    uint32 public constant provingInterval = 1728000;

    constructor(address _axiomV2QueryAddress, uint64 _callbackSourceChainId, bytes32 _axiomCallbackQuerySchema)
        AxiomV2Client(_axiomV2QueryAddress)
    {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function sendProvedMembership(address _provingAddress) public override {}

    function _axiomV2Callback(
        uint64, /*sourceChainId*/
        address callerAddr,
        bytes32, /*querySchema*/
        uint256, /*queryId*/
        bytes32[] calldata axiomResults,
        bytes calldata /*extraData*/
    ) internal virtual override {
        // Parse results
        uint256 _balanceCriteria = uint256(axiomResults[0]);
        address _provingAddress = address(uint160(uint256(axiomResults[1])));
        uint256 _provingInterval = uint256(axiomResults[2]);

        testBalanceCriteria = _balanceCriteria;

        // Validate the results
        // proving address should be the caller
        /*if (provingAddress == callerAddr) {
            revert("caller address and proving address mismatch");
        }*/
        // proving interval should be 1728000
        if (provingInterval != _provingInterval) {
            revert("proving interval mismatch");
        }

        // User segmentation
        // balance criteria should be used to determine the user level
        LibUserSegmentation.UserSegment _userSegment = LibUserSegmentation.segmentationByBalance(_balanceCriteria);
        if (_userSegment == LibUserSegmentation.UserSegment.None) {
            revert("_balanceCriteria invalid");
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier1) {
            // TODO: sendProvedMembership(_provingAddress);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier2) {
            // TODO: sendProvedMembership(_provingAddress);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier3) {
            // TODO: sendProvedMembership(_provingAddress);
        }
    }

    function _validateAxiomV2Call(uint64 sourceChainId, address, /*callerAddr*/ bytes32 querySchema)
        internal
        virtual
        override
    {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }
}
