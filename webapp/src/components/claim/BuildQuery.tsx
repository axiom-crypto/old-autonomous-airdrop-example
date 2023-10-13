"use client";

import { Constants } from "@/shared/constants";
import { useAxiomCircuit } from "../axiom/AxiomCircuitProvider";
import { CircuitInputs, defaultInputs } from "../axiom/circuit/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/experimental";
import { useEffect, useMemo } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import ClaimAirdropClient from "./ClaimAirdropClient";

export default function BuildQuery({
  inputs,
  callback,
  airdropAbi,
}: {
  inputs: CircuitInputs,
  callback: AxiomV2Callback,
  airdropAbi: any[],
}) {
  const { buildQuery, builtQuery, payment } = useAxiomCircuit();

  buildQuery(inputs, callback);

  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={airdropAbi} />;
}
