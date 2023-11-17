// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library LibUserSegmentation {
    enum UserSegment {
        None,
        Tier1,
        Tier2,
        Tier3
    }

    function segmentationByBalance(uint256 balanceCriteria) internal pure returns (UserSegment) {
        if (balanceCriteria >= 3 ether) {
            return UserSegment.Tier3;
        } else if (balanceCriteria >= 2 ether) {
            return UserSegment.Tier2;
        } else if (balanceCriteria >= 1 ether) {
            return UserSegment.Tier1;
        } else {
            return UserSegment.None;
        }
    }

    function segmentationByV2Usage(uint256 usedTimes) internal pure returns (UserSegment) {}
}
