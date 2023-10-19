// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IAxiomV2HeaderVerifier {
    error BlockhashMmrKeccakDoesNotMatchProof();
    error MmrEndBlockNotRecent();
    error BlockHashWitnessNotRecent();
    error ClaimedMMRDoesNotMatchRecent();
    error NoMoreRecentBlockhashMMR();

    /// @notice Emitted upon update of the address of the AxiomV2Core contract
    /// @param  axiomCoreAddress The new address of the AxiomV2Core contract
    event UpdateAxiomCoreAddress(address axiomCoreAddress);

    /**
     * @notice Stores witness data for checking MMRs
     * @param  snapshotPmmrSize The `pmmrSize` as in `IAxiomV2State`.
     * @param  proofMmrPeaks Peaks of the MMR, formatted so that `proofMmrPeaks[i]` is a Merkle
     *         root of `2 ** i` claimed block hashes.
     * @param  mmrComplementOrPeaks This has two different semantic meanings depending on the
     *         value of `proofPmmrSize = number of blocks committed to by proofMmrPeaks`.
     *         If `proofPmmrSize <= snapshotPmmrSize`:
     *           -- `mmrComplementOrPeaks[:10]` form a complementary MMR to `proofMmrPeaks[:10]`
     *              formatted so that `mmrComplementOrPeaks[idx]` is a Merkle root of `2 ** idx` hashes
     *              which together with `witnessMmrPeaks` forms a padded leaf.
     *           -- `mmrComplementOrPeaks[10]` is either `bytes32(0x0)` or a Merkle root of a padded leaf.
     *              -- It is expected to be a Merkle root of a padded leaf exactly when
     *                    snapshotPmmrSize - (snapshotPmmrSize % BLOCK_BATCH_SIZE) >= proofPmmrSize
     *           -- The remaining elements are a list of Merkle roots of 1024 block hashes, to be
     *              appended in increasing index order.
     *         If `proofPmmrSize > snapshotPmmrSize`:
     *           -- This is the MMR peaks committed to in the PMMR at `snapshotPmmrSize`,
     *              formatted so that `mmrComplementOrPeaks[idx]` is a Merkle root of `2 ** idx`
     *              block hashes.
     */
    struct MmrWitness {
        uint32 snapshotPmmrSize;
        bytes32[] proofMmrPeaks;
        bytes32[] mmrComplementOrPeaks;
    }

    /// @notice Verify the claimed `proofMmrKeccak` is validly read from the history
    ///         of the source chain using witness data from `mmrWitness`
    /// @param  proofMmrKeccak The Keccak hash of the claimed MMR of historic block hashes
    ///         formatted so that hash `idx` is the Merkle root of `2 ** idx` block hashes
    /// @param  mmrWitness Witness data for verification
    function verifyQueryHeaders(bytes32 proofMmrKeccak, MmrWitness calldata mmrWitness) external;

    /// @notice Return the `chainId` of the source chain
    /// @return chainId The `chainId`
    function getSourceChainId() external view returns (uint64);
}
