"use client";

import { useEffect, useRef, useState } from "react";
import { wrap, Remote } from "comlink";
import { Circuit } from "./worker";
import { CircuitInputs, config, vk } from "./circuit/constants";
import { AxiomV2Callback, AxiomV2ComputeQuery, QueryV2 } from "@axiom-crypto/experimental";
import { convertToBytes32, newAxiomV2 } from "./utils";

export default function AxiomCircuit({
  inputs,
  callback,
  children,
}: {
  inputs: CircuitInputs,
  callback: AxiomV2Callback,
  children: React.ReactNode,
}) {
  // const [mounted, setMounted] = useState<boolean>(false);

  // const workerApi = useRef<Remote<Circuit>>();

  // // Ensure that the Web Worker is only mounted once, even with React strict mode on in development mode.
  // useEffect(() => setMounted(true), []);

  // useEffect(() => {
  //   if (!mounted) {
  //     return;
  //   }
  //   const run = async () => {
  //     const setupWorker = async () => {
  //       const worker = new Worker(new URL("../../lib/worker", import.meta.url), { type: "module" });
  //       const Halo2Circuit = wrap<typeof Circuit>(worker);
  //       workerApi.current = await new Halo2Circuit(process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string);
  //       await workerApi.current.setup(window.navigator.hardwareConcurrency);
  //     }

  //     const build = async () => {
  //       await workerApi.current?.newCircuit();
  //       await workerApi.current?.buildCircuit(inputs);
  //     }

  //     const generateQuery = async () => {
  //       const { computeProof, resultLen } = await workerApi.current!.getComputeProof();

  //       const compute: AxiomV2ComputeQuery = {
  //         k: config.k,
  //         resultLen,
  //         vkey: convertToBytes32(new Uint8Array(vk)),
  //         computeProof,
  //       };

  //       const query = (newAxiomV2().query as QueryV2).new();
  //       query.setComputeQuery(compute);
  //       query.setCallback(callback);
  //       const builtQuery = await query.build();
  //       const payment = query.calculateFee();
  //       setBuiltQuery(builtQuery);
  //       setPayment(payment)
  //     }
  //     await setupWorker();
  //     await build();
  //     await generateQuery();
  //   }
  //   run();
  // }, [address, blockNumber, logIdx, txIdx, txHash, setBuiltQuery, setPayment, mounted]);

  return (
    <div>
      {children}
    </div>
  )
}
