"use client";

import { WagmiConfig } from "wagmi";
import { config } from '@/lib/wagmiConfig';
import { useEffect, useState } from "react";
// import { TmpProvider } from "@axiom-crypto/wp-react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={config}>
      {mounted && children}
    </WagmiConfig>
  )
}
