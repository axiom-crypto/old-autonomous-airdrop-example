"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from '@/components/axiom/AxiomCircuitProvider';

export default function AxiomProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      providerUri={process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string}
      chainId={5}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  )
}
