"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import React from 'react';
import {
  Axiom,
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  BuiltQueryV2,
  QueryV2,
} from "@axiom-crypto/experimental";
import { Halo2Circuit } from "./halo2";
import { CircuitInputs, config, vk } from "./circuit/constants";
import { convertToBytes32 } from "./utils";

const AxiomCircuitContext = createContext({
  axiom: new Axiom({ providerUri: "https://init" }),
  setParams: (inputs: CircuitInputs, callback: AxiomV2Callback) => { },
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
  providerUri,
  chainId,
  children,
}: {
  providerUri: string,
  chainId?: number | string | BigInt,
  children: React.ReactNode,
}) {
  const [inputs, setInputs] = useState<CircuitInputs | null>(null);
  const [callback, setCallback] = useState<AxiomV2Callback | null>(null);
  const [builtQuery, setBuiltQuery] = useState<BuiltQueryV2 | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const halo2Circuit = useRef<Halo2Circuit | null>(null);

  const axiom = new Axiom({
    providerUri: providerUri,
    version: "v2",
    chainId: chainId ?? 1,
  });

  const bq = async (inputs: CircuitInputs, callback: AxiomV2Callback) => {
    if (builtQuery !== null) {
      return;
    }
    const setup = async () => {
      halo2Circuit.current = new Halo2Circuit(providerUri);
      await halo2Circuit.current.setup();
    }

    const build = async () => {
      await halo2Circuit.current?.newCircuit();
      await halo2Circuit.current?.buildCircuit(inputs);
    }

    const generateQuery = async () => {
      const { computeProof, resultLen } = await halo2Circuit.current!.getComputeProof();
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
    await setup();
    await build();
    await generateQuery();
  }
  const buildQuery = useCallback(bq, [builtQuery, axiom.query, providerUri]);

  useEffect(() => {
    if (!inputs || !callback) {
      return;
    }
    buildQuery(inputs, callback);
  }, [buildQuery, inputs, callback]);

  const reset = () => {
    setBuiltQuery(null);
    setPayment(null);
  }

  const setParams = (inputs: CircuitInputs, callback: AxiomV2Callback) => {
    setInputs(inputs);
    setCallback(callback);
  }

  const contextValues = {
    axiom,
    setParams,
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
