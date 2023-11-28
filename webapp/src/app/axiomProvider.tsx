"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import { circuit } from "@/lib/circuit/circuit";
import circuitBuild from "@/lib/circuit/build.json";

export default function AxiomProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      circuit={circuit}
      build={circuitBuild}
      providerUri={process.env.NEXT_PUBLIC_ALCHEMY_URI_GOERLI as string}
      chainId={5}
      mock={true}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}
