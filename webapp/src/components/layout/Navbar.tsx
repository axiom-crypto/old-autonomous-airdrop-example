"use client";

import Link from "next/link";
import ConnectWallet from "../ui/ConnectWallet";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  
  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-4 border-b-[1px] border-darkgrey shadow-md">
      <Link href="/" className="text-xl text-white font-mono">
      <div >
          Domain Expansion
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 sm:gap-8">
        <Link href="https://axiom.xyz">
          Axiom
        </Link>
        <Link href="https://gearbox.fi/">
         GearBox
        </Link>
        <Link href="https://www.hyperlane.xyz/">
          HyperLane
        </Link>
        <Link href="https://thegraph.com/">
          The Graph
        </Link>
        <ConnectWallet />
      </div>
    </div>
  )
}
