// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./IAxiomV2Verifier.sol";
import "./IAxiomV2HeaderVerifier.sol";

interface IAxiomV2Query {
    /// @notice States of an on-chain query
    /// @param  Inactive The query has not been made or was refunded.
    /// @param  Active The query has been requested, but not fulfilled.
    /// @param  Fulfilled The query was successfully fulfilled.
    /// @param  Paid The query was successfully fulfilled and the payee has claimed the escrow amount.
    enum AxiomQueryState {
        Inactive,
        Active,
        Fulfilled,
        Paid
    }

    /// @notice Stores metadata about a query
    /// @param  state The state of the query.
    /// @param  deadlineBlockNumber The deadline (in block number) after which a refund may be granted.
    /// @param  payee The address of the account that will receive payment.
    /// @param  payment The amount of the payment, in wei.
    struct AxiomQueryMetadata {
        AxiomQueryState state;
        uint32 deadlineBlockNumber;
        address payee;
        uint256 payment;
    }

    /// @notice Stores data for initialization of AxiomV2Query
    /// @param  axiomHeaderVerifierAddress The address of the IAxiomV2HeaderVerifier.
    /// @param  verifierAddress The address of the ZK verifier for queries.
    /// @param  axiomProverAddress The address of the AxiomV2Prover.
    /// @param  axiomResultStoreAddress The address of AxiomResultstore.
    /// @param  aggregateVkeyHashes A list of allowed aggregateVkeyHashes for query verification
    /// @param  queryDeadlineInterval The number of blocks after which a query may be refunded.
    /// @param  proofVerificationGas The amount of gas allotted for ZK proof verification.
    /// @param  axiomQueryFee The fee, in gwei, paid to Axiom for query fulfillment.
    /// @param  timelock The address of the timelock contract.
    /// @param  guardian The address of the guardian contract.
    /// @param  unfreeze The address of the unfreeze contract.
    struct AxiomV2QueryInit {
        address axiomHeaderVerifierAddress;
        address verifierAddress;
        address axiomProverAddress;
        address axiomResultStoreAddress;
        bytes32[] aggregateVkeyHashes;
        uint32 queryDeadlineInterval;
        uint32 proofVerificationGas;
        uint256 axiomQueryFee;
        address timelock;
        address guardian;
        address unfreeze;
    }

    /// @notice Stores witness data associated to a queryId.
    /// @param  caller The address of the account that initiated the query.
    /// @param  userSalt The salt used to generate the queryId.
    /// @param  queryHash Hash of the query data.
    /// @param  callbackHash Hash of the callback data.
    /// @param  refundee The address to send any refunds to.
    struct AxiomV2QueryWitness {
        address caller;
        bytes32 userSalt;
        bytes32 queryHash;
        bytes32 callbackHash;
        address refundee;
    }

    /// @notice Stores public instances of the query fulfillment proof
    /// @param  sourceChainId The ID of the chain the query reads from.
    /// @param  dataResultsRoot The Keccak Merkle root of the data results.
    /// @param  dataResultsPoseidonRoot The Poseidon Merkle hash of the data results.
    /// @param  computeResultsHash The Keccak hash of the compute results.
    /// @param  queryHash The unique hash identifier of the query.
    /// @param  querySchema The schema of the query, defined as `keccak(k . vkeyLen . vkey)`
    /// @param  blockhashMmrKeccak The Keccak hash of the packed Merkle mountain range peaks the proof verifies
    ///         against. These are indexed so that `peaks[idx]` is either 0 or the Merkle root of `2 ** idx` block hashes.
    /// @param  aggregateVkeyHash The Poseidon hash of the aggregate vkey.
    /// @param  payee The address of the account that will receive payment.
    struct AxiomProofData {
        uint64 sourceChainId;
        bytes32 dataResultsRoot;
        bytes32 dataResultsPoseidonRoot;
        bytes32 computeResultsHash;
        bytes32 queryHash;
        bytes32 querySchema;
        bytes32 blockhashMmrKeccak;
        bytes32 aggregateVkeyHash;
        address payee;
    }

    /// @notice Stores data used to call callback after fulfillment
    /// @param  sourceChainId The ID of the chain the query reads from.
    /// @param  payee The address of the account that will receive payment.
    /// @param  queryHash The unique hash identifier of the query.
    /// @param  querySchema The schema of the query, defined as `keccak(k . vkeyLen . vkey)`
    /// @param  computeResultsHash The Keccak hash of the compute results.
    struct AxiomProofCallbackData {
        uint64 sourceChainId;
        address payee;
        bytes32 queryHash;
        bytes32 querySchema;
        bytes32 computeResultsHash;
    }

    /// @notice Stores data associated to the compute query circuit.
    /// @param  k The degree of the circuit.
    /// @param  vkey The verification key of the circuit.
    /// @param  computeProof The proof data of the circuit.
    struct AxiomV2ComputeQuery {
        uint8 k;
        uint16 resultLen;
        bytes32[] vkey;
        bytes computeProof;
    }

    /// @notice Stores data associated to the callback to be called after query fulfillment.
    /// @param  target The address of the contract to call with the query results.
    /// @param  extraData Extra data to be passed to the callback function.
    struct AxiomV2Callback {
        address target;
        bytes extraData;
    }

    error AxiomHeaderVerifierAddressIsZero();
    error VerifierAddressIsZero();
    error AxiomProverAddressIsZero();
    error AxiomResultStoreAddressIsZero();
    error TimelockAddressIsZero();
    error GuardianAddressIsZero();
    error UnfreezeAddressIsZero();
    error DepositTooLarge();
    error CannotFulfillIfNotActive();
    error CannotFulfillFromOffchainIfNotInactive();
    error CannotRefundIfNotRefundee();
    error CannotRefundIfNotActive();
    error CannotRefundBeforeDeadline();
    error QueryHashDoesNotMatchProof();
    error ProofVerificationFailed();
    error ComputeResultsHashDoesNotMatch();
    error CallbackExtraDataHashDoesNotMatch();
    error SourceChainIdDoesNotMatch();
    error AggregateVkeyHashIsNotValid();
    error NewMaxQueryPriMustBeLargerThanPrevious();
    error InsufficientFunds();
    error CallbackHashDoesNotMatchQueryWitness();
    error EscrowIsNotActive();
    error EscrowAmountExceedsBalance();
    error OnlyCallerCanIncreaseGas();
    error CanOnlyIncreaseGasOnActiveQuery();
    error QueryIsNotFulfilled();
    error QueryIsNotInactive();
    error QueryIsNotActive();
    error UnescrowAmountExceedsEscrowedAmount();
    error OnlyPayeeCanUnescrow();
    error WithdrawalAmountExceedsFreeBalance();

    /// @notice Emitted when the `IAxiomV2HeaderVerifier` address is updated.
    /// @param  newAddress The updated address.
    event UpdateAxiomHeaderVerifierAddress(address newAddress);

    /// @notice Emitted when the query verifier address is updated.
    /// @param  newAddress The updated address.
    event UpdateVerifierAddress(address newAddress);

    /// @notice Emitted when the prover address is updated.
    /// @param  newAddress The updated address.
    event UpdateAxiomProverAddress(address newAddress);

    /// @notice Emitted when the Axiom result store address is updated.
    /// @param  newAddress The updated address.
    event UpdateAxiomResultStoreAddress(address newAddress);

    /// @notice Emitted when a new aggregateVkeyHash is added
    /// @param  aggregateVkeyHash The `aggregateVkeyHash` which was added.
    event AddAggregateVkeyHash(bytes32 aggregateVkeyHash);

    /// @notice Emitted when an aggregateVkeyHash is removed
    /// @param  aggregateVkeyHash The `aggregateVkeyHash` which was removed.
    event RemoveAggregateVkeyHash(bytes32 aggregateVkeyHash);

    /// @notice Emitted when the query deadline interval is updated
    /// @param  newQueryDeadlineInterval The updated query deadline interval.
    event UpdateQueryDeadlineInterval(uint32 newQueryDeadlineInterval);

    /// @notice Emitted when the proof gas is updated
    /// @param  newProofVerificationGas The updated proof gas.
    event UpdateProofVerificationGas(uint32 newProofVerificationGas);

    /// @notice Emitted when the query fee is updated
    /// @param  newAxiomQueryFee The updated query fee.
    event UpdateAxiomQueryFee(uint256 newAxiomQueryFee);

    /// @notice Emitted when a query is initiated on-chain.
    /// @param  caller The address of the account that initiated the query.
    /// @param  queryHash The unique hash identifying the query.
    /// @param  queryId The unique ID identifying the query.
    /// @param  userSalt The salt used to generate the query hash.
    /// @param  refundee The address to send any refunds to.
    /// @param  target The address of the contract to call with the query results.
    /// @param  extraData Extra data to be passed to the callback function.
    event QueryInitiatedOnchain(
        address indexed caller,
        bytes32 indexed queryHash,
        uint256 indexed queryId,
        bytes32 userSalt,
        address refundee,
        address target,
        bytes extraData
    );

    /// @notice Emitted when a query is initiated with data availability on IPFS.
    /// @param  caller The address of the account that initiated the query.
    /// @param  queryHash The unique hash identifying the query.
    /// @param  queryId The unique ID identifying the query.
    /// @param  userSalt The salt used to generate the query hash.
    /// @param  ipfsHash The IPFS hash with the query.
    /// @param  refundee The address to send any refunds to.
    /// @param  target The address of the contract to call with the query results.
    /// @param  extraData Extra data to be passed to the callback function.
    event QueryInitiatedWithIpfsData(
        address indexed caller,
        bytes32 indexed queryHash,
        uint256 indexed queryId,
        bytes32 userSalt,
        bytes32 ipfsHash,
        address refundee,
        address target,
        bytes extraData
    );

    /// @notice Emitted when a query is initiated.
    /// @param  queryId The unique ID identifying the query.
    /// @param  deadlineBlockNumber The deadline (in block number) after which a refund may be granted.
    /// @param  maxFeePerGas The maximum fee per gas the payee wishes the callback to be called with.
    /// @param  callbackGasLimit The gasLimit the payee wishes the callback to be called with.
    event QueryFeeInfoRecorded(
        uint256 indexed queryId, uint32 deadlineBlockNumber, uint64 maxFeePerGas, uint32 callbackGasLimit
    );

    /// @notice Emitted when the gas allowance for a query is increased.
    /// @param  queryId The unique ID of the query.
    /// @param  maxFeePerGas The maximum fee per gas the payee wishes the callback to be called with.
    /// @param  callbackGasLimit The gasLimit the payee wishes the callback to be called with.
    event QueryGasIncreased(uint256 indexed queryId, uint64 maxFeePerGas, uint32 callbackGasLimit);

    /// @notice Emitted when a query requested on-chain is fulfilled.
    /// @param  queryId The unique ID identifying the query.
    /// @param  payee The address of the account that will receive payment.
    event QueryFulfilled(uint256 indexed queryId, address payee);

    /// @notice Emitted when a query requested off-chain is fulfilled.
    /// @param  queryId The unique ID identifying the query.
    event OffchainQueryFulfilled(uint256 indexed queryId);

    /// @notice Emitted when a query is refunded.
    /// @param  queryId The unique ID identifying the query.
    /// @param  refundee The address the refund is sent to.
    event QueryRefunded(uint256 indexed queryId, address indexed refundee);

    /// @notice Emitted when a deposit is made for fees to be paid by an account
    /// @param  payor The account receiving the deposit.
    /// @param  amount The amount of the deposit, in wei.
    event Deposit(address indexed payor, uint256 amount);

    /// @notice Emitted when an escrow is created for an on-chain query.
    /// @param  payor The account paying for the query.
    /// @param  queryId The unique ID identifying the query.
    /// @param  amount The amount escrowed, in wei.
    event Escrow(address indexed payor, uint256 indexed queryId, uint256 amount);

    /// @notice Emitted when payment is claimed by the payee
    /// @param  payor The account paying for the query.
    /// @param  queryId The unique ID identifying the query.
    /// @param  payee The account receiving payment.
    /// @param  refundee The account receiving a partial refund.
    /// @param  amountUsed The amount of the escrow used, in wei.
    event Unescrow(
        address indexed payor, uint256 indexed queryId, address indexed payee, address refundee, uint256 amountUsed
    );

    /// @notice Emitted when a withdrawal is made of unused funds.
    /// @param  payor The account to withdraw from.
    /// @param  amount The amount of the withdrawal, in wei.
    /// @param  payee The address receiving the withdrawal.
    event Withdraw(address indexed payor, uint256 amount, address payee);

    /// @notice Send a query to Axiom.
    /// @param  sourceChainId The ID of the chain the query reads from.
    /// @param  dataQueryHash The hash of the data query.
    /// @param  computeQuery The data associated to the compute query circuit.
    /// @param  callback The data associated to the callback to be called after query fulfillment.
    /// @param  userSalt The salt used to generate the queryId.
    /// @param  maxFeePerGas The maximum fee per gas the payee wishes the callback to be called with.
    /// @param  callbackGasLimit The gasLimit the payee wishes the callback to be called with.
    /// @param  refundee The address to send any refunds to.
    /// @param  dataQuery The raw data query.
    /// @return queryId The unique ID identifying the query.
    function sendQuery(
        uint64 sourceChainId,
        bytes32 dataQueryHash,
        AxiomV2ComputeQuery calldata computeQuery,
        AxiomV2Callback calldata callback,
        bytes32 userSalt,
        uint64 maxFeePerGas,
        uint32 callbackGasLimit,
        address refundee,
        bytes calldata dataQuery
    ) external payable returns (uint256 queryId);

    /// @notice Send a query to Axiom with data availability on IPFS.
    /// @param  queryHash The unique hash identifying the query.
    /// @param  ipfsHash The IPFS hash with the query.
    /// @param  callback The data associated to the callback to be called after query fulfillment.
    /// @param  userSalt The salt used to generate the queryId.
    /// @param  maxFeePerGas The maximum fee per gas the payee wishes the callback to be called with.
    /// @param  callbackGasLimit The gasLimit the payee wishes the callback to be called with.
    /// @param  refundee The address to send any refunds to.
    /// @return queryId The unique ID identifying the query.
    function sendQueryWithIpfsData(
        bytes32 queryHash,
        bytes32 ipfsHash,
        AxiomV2Callback calldata callback,
        bytes32 userSalt,
        uint64 maxFeePerGas,
        uint32 callbackGasLimit,
        address refundee
    ) external payable returns (uint256 queryId);

    /// @notice Increase the fees allocated for a query while paying additional fees. Anyone can call this.
    /// @param  queryId The unique ID identifying the query.
    /// @param  newMaxFeePerGas The new maximum fee per gas the payee wishes the callback to be called with.
    /// @param  newCallbackGasLimit The new gasLimit the payee wishes the callback to be called with.
    function increaseQueryGas(uint256 queryId, uint64 newMaxFeePerGas, uint32 newCallbackGasLimit) external payable;

    /// @notice Fulfill an Axiom query made on-chain.
    /// @param  mmrWitness Witness data allowing verification of the proof against the MMR of block
    ///         hashes in AxiomV2Core.
    /// @param  computeResults The query results to be passed to the callback.
    /// @param  proof The ZK proof data.
    /// @param  callback Callback to be called after.
    /// @param  queryWitness Witness data identifying the query.
    function fulfillQuery(
        IAxiomV2HeaderVerifier.MmrWitness calldata mmrWitness,
        bytes32[] calldata computeResults,
        bytes calldata proof,
        AxiomV2Callback calldata callback,
        AxiomV2QueryWitness calldata queryWitness
    ) external;

    /// @notice Fulfill an Axiom query made off-chain.
    /// @param  mmrWitness Witness data allowing verification of the proof against the MMR of block
    ///         hashes in AxiomV2Core.
    /// @param  computeResults The query results to be passed to the callback.
    /// @param  proof The ZK proof data.
    /// @param  callback The callback to be called with the query results.
    /// @param  caller The address of the account that initiated the query, which is the fulfilling address.
    /// @param  userSalt The salt used to generate the queryId
    function fulfillOffchainQuery(
        IAxiomV2HeaderVerifier.MmrWitness calldata mmrWitness,
        bytes32[] calldata computeResults,
        bytes calldata proof,
        AxiomV2Callback calldata callback,
        address caller,
        bytes32 userSalt
    ) external;

    /// @notice Refund a query.
    /// @param  queryWitness Witness data identifying the query.
    function refundQuery(AxiomV2QueryWitness calldata queryWitness) external;

    /// @notice Deposit funds to be used for query fees
    /// @param  payor The account receiving the deposit.
    function deposit(address payor) external payable;

    /// @notice Claim payment for a query
    /// @param  queryWitness Witness data identifying the query.
    /// @param  amountUsed The amount of the escrow used, in wei.
    function unescrow(AxiomV2QueryWitness calldata queryWitness, uint256 amountUsed) external;

    /// @notice Withdraw unused funds.
    /// @param  amount The amount of the withdrawal, in wei.
    /// @param  payee The address receiving the withdrawal.
    function withdraw(uint256 amount, address payable payee) external;
}
