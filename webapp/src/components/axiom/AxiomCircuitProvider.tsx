"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Axiom,
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  BuiltQueryV2,
  QueryV2,
} from "@axiom-crypto/experimental";
import { wrap, Remote } from "comlink";
import { Circuit } from "./worker";
import { CircuitInputs, config, vk } from "./circuit/constants";
import { convertToBytes32 } from "./utils";

const axiom = new Axiom({
  providerUri: process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string,
  version: "v2",
  chainId: 5,
});

const AxiomCircuitContext = createContext({
  axiom: axiom,
  buildQuery: (inputs: CircuitInputs, callback: AxiomV2Callback) => { },
  builtQuery: null as BuiltQueryV2 | null,
  payment: null as string | null,
  reset: () => { },
});

const useAxiomCircuit = () => {
  const context = useContext(AxiomCircuitContext);
  if (context === undefined) {
    throw new Error("useAxiomCircuit must be used within a AxiomCircuitProvider");
  }
  return context;
}

function AxiomCircuitProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [builtQuery, setBuiltQuery] = useState<BuiltQueryV2 | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const workerApi = useRef<Remote<Circuit>>();

  const buildQuery = async (inputs: CircuitInputs, callback: AxiomV2Callback) => {
    console.log("bq");
    if (builtQuery !== null) {
      return;
    }
    const setupWorker = async () => {
      const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" });
      const Halo2Circuit = wrap<typeof Circuit>(worker);
      workerApi.current = await new Halo2Circuit(process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string);
      await workerApi.current.setup(window.navigator.hardwareConcurrency);
    }

    const build = async () => {
      await workerApi.current?.newCircuit();
      await workerApi.current?.buildCircuit(inputs);
    }

    const generateQuery = async () => {
      const { computeProof, resultLen } = workerApi.current!.getComputeProof();
      const compute: AxiomV2ComputeQuery = {
        k: config.k,
        resultLen,
        vkey: convertToBytes32(new Uint8Array(vk)),
        computeProof,
      };

      const query = (axiom.query as QueryV2).new();
      query.setComputeQuery(compute);
      query.setCallback(callback);

      // Build the Query
      const built = await query.build();
      const payment = query.calculateFee();

      setBuiltQuery(built);
      setPayment(payment)
    }
    await setupWorker();
    await build();
    await generateQuery();
  }

  const reset = () => {
    setBuiltQuery(null);
    setPayment(null);
  }

  const contextValues = {
    axiom,
    buildQuery,
    builtQuery,
    payment,
    reset,
  };

  return (
    <AxiomCircuitContext.Provider value={contextValues}>
      {children}
    </AxiomCircuitContext.Provider>
  )
}

export { useAxiomCircuit, AxiomCircuitProvider };
