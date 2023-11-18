"use client"


import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import Link from "next/link";
import LinkButton from '@/components/ui/LinkButton'
import ConnectWallet from '@/components/ui/ConnectWallet'
import { forwardSearchParams } from '@/lib/utils'
import { createPublicClient, getContract, http } from "viem";
import { gearBoxTestnet } from "@/lib/wagmiConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })
import gaterAbi from '../../abi/gater.json'

import loadingImg from '../../imgs/loading.gif'
import { useAccount } from "wagmi";

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
  const connected = searchParams?.connected as string ?? "";

  const [text, setTitle] = useState('Proof Processing')

  const router = useRouter();

  const { address: user, isConnected,  } = useAccount()

  useEffect(() => {

    let maxDebt = 0;

    async function loadEvents () {
      if (!user) return
      // pull data
      const gater = getContract({
        address: Constants.gater,
        abi: gaterAbi,
        publicClient: client
      })

      const newMaxDebt = await gater.read.maxDebt([user])

      if (BigInt(newMaxDebt as string) > maxDebt) router.push('/degen')

      console.log('newMaxDebt', newMaxDebt)

    }
    const interval = setInterval(() => {
      loadEvents()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [user, router])

  return (
    <>
      <br />
      <Title >
        Your proof is being processed...
      </Title>
      <div className="text-left">
        <br />
        <Image height={250} src={loadingImg} alt="loading"/>
        <br />
      </div> 
      <br />
    </>
  )
}
