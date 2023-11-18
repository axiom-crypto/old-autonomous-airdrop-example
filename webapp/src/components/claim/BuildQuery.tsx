"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../lib/circuit";
import { AxiomV2Callback } from "@axiom-crypto/core";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import ClaimAirdropClient from "./ClaimAirdropClient";

export default function BuildQuery({
  inputs,
  callback,
  airdropAbi
}: {
  inputs: CircuitInputs;
  callback: AxiomV2Callback;
  airdropAbi: any[];
}) {
  const {
    build,
    builtQuery,
    payment,
    setOptions,
    setParams,
    areParamsSet
  } = useAxiomCircuit();

  useEffect(() => {
    setParams(inputs, callback);
    setOptions({
      maxFeePerGas: "40000000000",
      callbackGasLimit: 500000
    });
  }, [setParams, setOptions, inputs, callback]);

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [build, areParamsSet]);

  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={airdropAbi} />;
}
