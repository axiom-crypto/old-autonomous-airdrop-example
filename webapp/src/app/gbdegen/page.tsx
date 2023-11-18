"use client"

import Title from "@/components/ui/Title";
import { gearBoxTestnet } from "@/lib/wagmiConfig";
import { Constants } from "@/shared/constants";
import { useState, useEffect } from "react";
import { createPublicClient, http } from "viem";

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Success() {

  const ca = "0x1234567890123456789012345678901234567890"
  
  const [maxDebt, setMaxDebt] = useState(0);

  

  return (
    <>
      <Title>
      Hi Degen!!! &#128056;
      </Title>
      <div className="text-left">
        Max Debt: <br />
        CA Address: <br />
      </div> 
    </>
  )
}
