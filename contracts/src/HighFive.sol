// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomV2Client } from './AxiomV2Client.sol';
// import { IERC20 } from '@openzeppelin-contracts/token/ERC20/IERC20.sol';
import { Ownable } from '@openzeppelin-contracts/access/Ownable.sol';

contract HighFive is AxiomV2Client, Ownable {
    event HighFived(
        address indexed sender,
        address indexed recipient,
        uint256 timestamp
    );
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);

    bytes32 public constant MINT_EVENT_SCHEMA = 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function updateCallbackQuerySchema(
        bytes32 _axiomCallbackQuerySchema
    ) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }

    function _axiomV2Callback(
        uint64,
        // uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {
        // todo: require txs are from prior to HighFive deployment block
        // or just require recipient's mint to be before block

        // Parse results
        bytes32 eventSchema = axiomResults[0];
        require(eventSchema == MINT_EVENT_SCHEMA, "Invalid event schema");

        address nftAddress0 = address(uint160(uint256(axiomResults[1])));
        address nftAddress1 = address(uint160(uint256(axiomResults[2])));
        require(nftAddress0 == nftAddress1);

        address mintFromAddress0 = address(uint160(uint256(axiomResults[3])));
        require(mintFromAddress0 == address(0));

        // sender of highfive
        address mintToAddress0 = address(uint160(uint256(axiomResults[4])));
        require(callerAddr == mintToAddress0);

        address mintFromAddress1 = address(uint160(uint256(axiomResults[5])));
        require(mintFromAddress1 == address(0));

        // recipient of highfive
        address mintToAddress1 = address(uint160(uint256(axiomResults[6])));
        require(mintToAddress1 != callerAddr);


        emit HighFived(
            callerAddr,
            mintToAddress1,
            block.timestamp
        );
    }

    function _validateAxiomV2Call(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }
}
