// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomTest, AxiomVm } from "@axiom-crypto/v2-periphery/test/AxiomTest.sol";
import { AutonomousAirdrop } from "../src/AutonomousAirdrop.sol";
import { UselessToken } from "../src/UselessToken.sol";

contract AutonomousAirdropTest is AxiomTest {
    address public constant AXIOM_V2_QUERY_MOCK_SEPOLIA_ADDR = 0x83c8c0B395850bA55c830451Cfaca4F2A667a983;

    bytes32 querySchema;
    AutonomousAirdrop autonomousAirdrop;
    UselessToken uselessToken;

    function setUp() public {
        string memory artifact = vm.readFile("./app/axiom/data/compiled.json");
        querySchema = bytes32(vm.parseJson(artifact, ".querySchema"));

        autonomousAirdrop = new AutonomousAirdrop(AXIOM_V2_QUERY_GOERLI_ADDR, 5, CALLBACK_QUERY_SCHEMA);
        uselessToken = new UselessToken(address(autonomousAirdrop));
        autonomousAirdrop.updateAirdropToken(address(uselessToken));
    }

}
