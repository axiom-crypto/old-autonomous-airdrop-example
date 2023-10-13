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
  const { builtQuery, payment, setParams } = useAxiomCircuit();
  console.log("BuildQuery");
  // buildQuery(inputs, callback);
  // const builtQuery = false;
  // const payment = false;
  useEffect(() => {
    setParams(inputs, callback);
  }, [setParams, inputs, callback]);


  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={airdropAbi} />;
}
