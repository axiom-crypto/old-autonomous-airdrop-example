"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import { circuit } from "@/lib/circuit";

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
      providerUri={process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string}
      chainId={5}
      mock={true}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}
