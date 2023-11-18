// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomV2Client } from './AxiomV2Client.sol';
// import { IERC20 } from '@openzeppelin-contracts/token/ERC20/IERC20.sol';
import { Ownable } from 'openzeppelin-contracts/contracts/access/Ownable.sol';
import { IAxiomV2Query } from './interfaces/axiom/IAxiomV2Query.sol';
// import { AxiomV2Decoder } from './libraries/AxiomV2Decoder.sol';
import { ICreditFacadeV3 } from './interfaces/gearbox/ICreditFacadeV3.sol';
import { ICreditFacadeV3Multicall } from './interfaces/gearbox/ICreditFacadeV3Multicall.sol';
import { MultiCallBuilder } from 'core-v3/test/lib/MultiCallBuilder.sol';
import { MultiCall } from "@gearbox-protocol/core-v2/contracts/libraries/MultiCall.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gater is AxiomV2Client, Ownable {
    // save for future reference
    mapping (address => uint16) public leverageFactors;
    
    event OpenAccount(

    );
    event OpenAccountError(

    );
    /* event ClaimAirdrop(
        address indexed user,
        uint256 indexed queryId,
        uint256 numTokens,
        bytes32[] axiomResults
    );
    event ClaimAirdropError(
        address indexed user,
        string error
    ); */
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event CreditManagerAddressUpdated(address creditManager);

    // bytes32 public constant SWAP_EVENT_SCHEMA = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;
    // address public constant UNI_UNIV_ROUTER_ADDR = 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    address public creditFacadeV3Addr;
    ICreditFacadeV3 public creditFacade;
    mapping(address => bool) public querySubmitted;
    mapping(address => bool) public hasClaimed;

    /* constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackCallerAddr = address(this);
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    } */

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema,
        address _creditFacadeV3Addr
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        // axiomCallbackCallerAddr = address(this);
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        creditFacadeV3Addr = _creditFacadeV3Addr;
        creditFacade = ICreditFacadeV3(_creditFacadeV3Addr);
    }


    function updateCallbackQuerySchema(
        bytes32 _axiomCallbackQuerySchema
    ) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }


    function updateCreditFacadeV3Addr(address _creditFacadeV3Addr) public onlyOwner {
        creditFacadeV3Addr = _creditFacadeV3Addr;
        emit CreditManagerAddressUpdated(_creditFacadeV3Addr);
    }

/*     function claimAirdrop(
        IAxiomV2Input.AxiomV2QueryData calldata axiomData
    ) external payable {
        require(!hasClaimed[msg.sender], "User has already claimed this airdrop");
        require(!querySubmitted[msg.sender], "Query has already been submitted");

        address user = abi.decode(axiomData.callback.extraData, (address));
        require(user == msg.sender, "Address sent in extraData must be the same as the caller");

        _validateDataQuery(axiomData.dataQuery);

        querySubmitted[msg.sender] = true;
        uint256 queryId = IAxiomV2Query(axiomV2QueryAddress).sendQuery{ value: msg.value }(
            axiomData.sourceChainId,
            axiomData.dataQueryHash,
            axiomData.computeQuery,
            axiomData.callback,
            axiomData.userSalt,
            axiomData.maxFeePerGas,
            axiomData.callbackGasLimit,
            axiomData.refundee,
            axiomData.dataQuery
        );
    } */

/*     function _axiomV2Callback(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {
        // require(!hasClaimed[callerAddr], "Autonomous Airdrop: User has already claimed this airdrop");

        // Parse results
        bytes32 eventSchema = axiomResults[0];
        address userEventAddress = address(uint160(uint256(axiomResults[1])));
        uint32 blockNumber = uint32(uint256(axiomResults[2]));
        // address uniswapUniversalRouterAddr = address(uint160(uint256(axiomResults[3])));

        // Validate the results
        require(eventSchema == SWAP_EVENT_SCHEMA, "Autonomous Airdrop: Invalid event schema");
        require(userEventAddress == callerAddr, "Autonomous Airdrop: Invalid user address for event");
        require(blockNumber >= 9000000, "Autonomous Airdrop: Block number for transaction receipt must be 9000000 or greater");
        // require(uniswapUniversalRouterAddr == UNI_UNIV_ROUTER_ADDR, "Autonomous Airdrop: Transaction `to` address is not the Uniswap Universal Router address");

        // Transfer tokens to user
        hasClaimed[callerAddr] = true;
        uint256 numTokens = 100 * 10**18;
        token.transfer(callerAddr, numTokens);

        emit ClaimAirdrop(
            callerAddr,
            queryId,
            numTokens,
            axiomResults
        );
    } */

    function _axiomV2Callback(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {
        // Parse the results
        bytes32 eventSchema = axiomResults[0];
        address userEventAddress = address(uint160(uint256(axiomResults[1])));
        uint32 blockNumber = uint32(uint256(axiomResults[2]));

        // Validate the results
        // FIXME _openCreditAccount();

        emit OpenAccount();
    }

    function _openCreditAccount(
        uint256 amount,
        address callerAddr,
        uint16 leverageFactor
    ) public returns (address) { // FIXME: change to internal 
        leverageFactors[callerAddr] = leverageFactor; // save the calculated leverage factor for future reference
        // uint16 leverageFactor = 100;
        uint256 debt = (amount * leverageFactor) / 100; // LEVERAGE_DECIMALS; // F:[FA-5]
        
        // Open account for user
        return creditFacade.openCreditAccount(
            callerAddr,
            MultiCallBuilder.build(
            ),
            0
        );
        /* 
        MultiCall({
                    target: address(creditFacade),
                    callData: abi.encodeCall(ICreditFacadeV3Multicall.addCollateral, (weth, 1e18)) // FIXME: change token
                })
         */

        /* 
        MultiCall({
                    target: address(creditFacade),
                    callData: abi.encodeCall(ICreditFacadeV3Multicall.addCollateral, (underlying, amount))
                })
         */
    } 

    function _multicall(address creditAccount, MultiCall[] calldata calls) external payable {
        address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // FIXME
        creditFacade.multicall(creditAccount, calls);
    }

    function getCreditFacadeAddr() public view returns (address) {
        return creditFacadeV3Addr;
    }

    function _validateAxiomV2Call(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        // require(callerAddr == axiomCallbackCallerAddr, "AxiomV2: caller address mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }
}
