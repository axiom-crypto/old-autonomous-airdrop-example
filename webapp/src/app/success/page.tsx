"use client"


import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import { createPublicClient, getContract, http } from "viem";
import { gearBoxTestnet } from "@/lib/wagmiConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })
import gaterAbi from '../../abi/gater.json'

import loadingImg from '../../imgs/loading.gif'
import { useAccount } from "wagmi";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Success({ searchParams }: PageProps) {
  const router = useRouter();

  const { address: user, isConnected,  } = useAccount()

  const [ready, setReady] = useState(false);

  useEffect(() => {

    const gater = getContract({
      address: Constants.gater,
      abi: gaterAbi,
      publicClient: client
    })

    let maxDebt = 0;

    async function updateDebt () {
      if (!user) return
      // pull data
      
      const newMaxDebt = await gater.read.maxDebt([user])

      const newMaxDebtNum = Number(BigInt(newMaxDebt as string).toString())

      if (maxDebt == 0) maxDebt = newMaxDebtNum;

      if (newMaxDebtNum !== maxDebt ) {
        console.log('updated')
        setReady(true)
      } else {
        console.log('newMaxDebt', newMaxDebtNum)
      }

    }

    updateDebt();
    const interval = setInterval(() => {
      updateDebt()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [user])

  return (
    <>
      <Title >
        Your proof is being processed...
      </Title>
      <div className="text-left">
        <br />
        <Image height={250} src={loadingImg} alt="loading"/>
        <br />
        <center>
        <LinkButton 
          disabled={!ready}
          label="Reveal my Identity"
          href={"/portfolio/"}
        /> 
        </center>
      </div> 
      <br />
    </>
  )
}
