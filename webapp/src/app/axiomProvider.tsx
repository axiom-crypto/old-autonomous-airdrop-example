"use client";

import { useEffect, useState } from "react";
// import { AxiomCircuitProvider } from '@axiom-crypto/react';

export default function AxiomProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && children}
    </>
  )
}
