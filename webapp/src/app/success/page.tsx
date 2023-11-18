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

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })
import gaterAbi from '../../abi/gater.json'

import loadingImg from '../../imgs/loading.gif'

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

  useEffect(() => {

    console.log('start watching!!!!!')
    const unwatch = client.watchContractEvent({
      address: Constants.gater,
      abi: gaterAbi,
      eventName: 'CreditAccountOpened',
      onLogs: logs => console.log('get logs!!!', logs)
    })

      const gater = getContract({
        address: Constants.gater,
        abi: gaterAbi,
        publicClient: client
      })

      gater.getEvents.then((logs) => {
        console.log('logs', logs)
        if (logs.length > 0) {
          setTitle('Proof Processed')
        }
      })


    // async function loadEvents () {
    //   console.log('load events')
    //   // pull data
    //   const gater = getContract({
    //     address: Constants.gater,
    //     abi: gaterAbi,
    //     publicClient: client
    //   })

    //   console.log('logs', gater)

    // }
    // const interval = setInterval(() => {
      // loadEvents()
    // }, 10000)

    return unwatch
  }, [])

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
