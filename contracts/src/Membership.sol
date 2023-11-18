// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AxiomV2Client} from "./AxiomV2Client.sol";
import {HyperlaneSender} from "./HyperlaneSender.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";

import {IMembership} from "./interfaces/IMembership.sol";

import {LibUserSegmentation} from "./libraries/LibUserSegmentation.sol";

contract Membership is IMembership, AxiomV2Client, HyperlaneSender, Ownable {
    uint64 public callbackSourceChainId;
    uint32 public messageDestinationDomain;
    bytes32 public axiomCallbackQuerySchema;
    address public recipientAddress;

    uint32 public constant PROVING_INTERVAL = 1728000;

    constructor(
        address _axiomV2QueryAddress,
        address _mailBoxAddress,
        uint64 _callbackSourceChainId,
        uint32 _messageDestinationDomain,
        bytes32 _axiomCallbackQuerySchema,
        address _recipientAddress
    ) AxiomV2Client(_axiomV2QueryAddress) HyperlaneSender(_mailBoxAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        messageDestinationDomain = _messageDestinationDomain;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        recipientAddress = _recipientAddress;
    }

    function sendProvedMembership(address provingAddress) public override {}

    function _axiomV2Callback(
        uint64, /*sourceChainId*/
        address callerAddr,
        bytes32, /*querySchema*/
        uint256, /*queryId*/
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {
        // Parse results
        uint256 _balanceCriteria = uint256(axiomResults[0]);
        address _provingAddress = address(uint160(uint256(axiomResults[1])));
        uint256 _provingInterval = uint256(axiomResults[2]);
        uint256 _amount = abi.decode(extraData, (uint256));

        // Validate the results
        // proving address should be the caller
        /*if (provingAddress == callerAddr) {
            revert("caller address and proving address mismatch");
        }*/
        // proving interval should be 1728000
        if (_provingInterval != PROVING_INTERVAL) {
            revert("proving interval mismatch");
        }

        // User segmentation
        // balance criteria should be used to determine the user level
        //
        // example of decoding when destination chain received this
        // (uint256 amount, uint16 leverageFactor, address callerAddr) =
        //     abi.decode(_messageBody, (uint256, uint16, address));
        LibUserSegmentation.UserSegment _userSegment = LibUserSegmentation.segmentationByBalance(_balanceCriteria);
        if (_userSegment == LibUserSegmentation.UserSegment.None) {
            revert("_balanceCriteria invalid");
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier1) {
            bytes memory _messageBody = abi.encodePacked(_amount, uint16(1), _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier2) {
            bytes memory _messageBody = abi.encodePacked(_amount, uint16(2), _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier3) {
            bytes memory _messageBody = abi.encodePacked(_amount, uint16(3), _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
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
