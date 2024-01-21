"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../../axiom/swapEvent.circuit";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import ClaimAirdropClient from "./ClaimAirdropClient";
import { UserInput } from "@axiom-crypto/client";
import { useAccount } from "wagmi";
import { bytes32 } from "@/lib/utils";

export default function BuildQuery({
  inputs,
  callbackAddress,
  callbackExtraData,
  airdropAbi
}: {
  inputs: UserInput<CircuitInputs>;
  callbackAddress: string;
  callbackExtraData?: string;
  airdropAbi: any[];
}) {
  const {
    build,
    builtQuery,
    setParams,
    areParamsSet
  } = useAxiomCircuit<UserInput<CircuitInputs>>();

  const { address: refundee } = useAccount();

  if (callbackExtraData === undefined) {
    callbackExtraData = bytes32("0");
  }

  useEffect(() => {
    if (refundee === undefined) {
      return;
    }
    setParams(inputs, callbackAddress, callbackExtraData, refundee);
    // setParams({
    //   blockNumber: 5000000,
    //   address: "0xEaa455e4291742eC362Bc21a8C46E5F2b5ed4701"
    // }, callbackAddress, callbackExtraData, refundee);
  }, [setParams, inputs, callbackAddress, callbackExtraData, refundee]);

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      console.log("params are set, building query...", inputs, callbackAddress, callbackExtraData, refundee);
      const b = await build();
      console.log("b",b);
    };
    buildQuery();
  }, [build, areParamsSet]);

  if (!builtQuery) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={airdropAbi} />;
}
