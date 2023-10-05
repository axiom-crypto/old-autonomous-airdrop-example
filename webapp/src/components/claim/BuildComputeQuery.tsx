"use client";

import { Constants } from "@/shared/constants";
import { AxiomV2Callback, AxiomV2ComputeQuery, BuiltQueryV2, QueryV2, bytes32, getFunctionSelector } from "@axiom-crypto/experimental";
import { useEffect, useRef, useState } from "react";
import { wrap, Remote } from "comlink";
import { Circuit } from "@/lib/worker";
import { convertToBytes, convertToBytes32 } from "@/lib/utils";
import { config, vk, defaultInputs } from "@/lib/circuit/constants";
import ClaimAirdropClient from "./ClaimAirdropClient";
import { newAxiomV2 } from "@/lib/axiom";
import LoadingAnimation from "../ui/LoadingAnimation";

export default function BuildComputeQuery(
  { airdropAbi, address, txHash, blockNumber, logIdx }:{
    airdropAbi: any[],
    address: string,
    txHash: string,
    blockNumber: string,
    logIdx: string,
  }
) {
  const [builtQuery, setBuiltQuery] = useState<BuiltQueryV2 | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const workerApi = useRef<Remote<Circuit>>();

  useEffect(() => {
    const run = async () => {
      const setupWorker = async () => {
        const worker = new Worker(new URL("../../lib/worker", import.meta.url), { type: "module" });
        const Halo2Circuit = wrap<typeof Circuit>(worker);
        workerApi.current = await new Halo2Circuit(process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string);
        await workerApi.current.setup(window.navigator.hardwareConcurrency);
      }

      const build = async () => {
        const circuitInputs = {
          txHash,
          logIdx: Number(logIdx),
        };
        console.log("CircuitInputs", circuitInputs);
        await workerApi.current?.newCircuit();
        // await workerApi.current?.buildCircuit(circuitInputs);
      }
    
      const generateQuery = async () => {
        await build();
        // await workerApi.current?.prove();
    
        // const proof = await workerApi.current!.getProof();
        // const publicInstances = await workerApi.current!.getCallbackData();
        // const publicInstancesBytes = "0x" + publicInstances.map((instance) => instance.slice(2).padStart(64, "0")).join("");
    
        // const compute: AxiomV2ComputeQuery = {
        //   k: config.k,
        //   vkey: convertToBytes32(new Uint8Array(vk)),
        //   computeProof: publicInstancesBytes + convertToBytes(proof),
        // };
    
        // const callback: AxiomV2Callback = {
        //   callbackAddr: Constants.AUTO_AIRDROP_ADDR as `0x${string}`,
        //   callbackFunctionSelector: getFunctionSelector("axiomV2Callback(uint64,address,bytes32,bytes32,bytes32[],bytes)"),
        //   resultLen: publicInstances.length / 2,
        //   callbackExtraData: bytes32(address as string),
        // }
    
        // const query = (newAxiomV2().query as QueryV2).new();
        // query.setComputeQuery(compute);
        // query.setCallback(callback);
        // const builtQuery = await query.build();
        // const payment = query.calculateFee();
        // setBuiltQuery(builtQuery);
        // setPayment(payment)
      }
      await setupWorker();
      await generateQuery();
    }
    run();
  }, [address, blockNumber, logIdx, txHash, setBuiltQuery, setPayment]);

  if (!builtQuery || !payment) {
    return(
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
      );
  }

  return (
    <ClaimAirdropClient
      airdropAbi={airdropAbi}
      builtQuery={builtQuery}
      payment={payment}
    />
  )
}