"use client";

import Link from "next/link";
import ConnectWallet from "../ui/ConnectWallet";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-4 border-b-[1px] border-darkgrey shadow-md">
      <Link href="/" className="text-xl text-white font-mono">
        <div >
          Autonomous Airdrop Example
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 sm:gap-8">
        <Link href="https://axiom.xyz">
          Axiom
        </Link>
        <Link href="https://docs.axiom.xyz/">
          Docs
        </Link>
        <Link href="https://github.com/axiom-crypto/autonomous-airdrop-example">
          Github
        </Link>
        <ConnectWallet />
      </div>
    </div>
  )
}
