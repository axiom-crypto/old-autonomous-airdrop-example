"use client";

import { WagmiProvider } from "wagmi";
import { config } from '@/lib/wagmiConfig';
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      {mounted && children}
    </WagmiProvider>
  )
}
