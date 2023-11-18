"use client"

import Title from "@/components/ui/Title";
import { gearBoxTestnet } from "@/lib/wagmiConfig";
import { Constants } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPublicClient, formatEther, getContract, http, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import gaterAbi from '../../abi/gater.json'

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })

import tierAImg from '../../imgs/tierA.jpg'
import tierBImg from '../../imgs/tierB.jpg'
import tierSImg from '../../imgs/tierS.jpg'
import Image from "next/image";

enum Tiers {
  Loading = "Loading",
  TierB = "Tier B",
  TierA = "Tier A",
  TierS = "Tier S",
}

export default function Degen() {

  const [maxDebt, setMaxDebt] = useState(BigInt(0))

  const [ca, setCA] = useState<string>(zeroAddress)

  const [tier, setTier] = useState<Tiers>(Tiers.Loading)

  const [loading, setIsLoading] = useState(true)

  const router = useRouter();

  const { address: user, isConnected } = useAccount()

  useEffect(() => {
    async function setDebtAndCA() {
      if (!user) return

      // pull data
      const gater = getContract({
        address: Constants.gater,
        abi: gaterAbi,
        publicClient: client
      })

      const newMaxDebt = await gater.read.maxDebt([user]) as bigint
      setMaxDebt(newMaxDebt)

      const caAccount = await gater.read.userCa([user]) as `0x${string}`
      setCA(caAccount)

      setIsLoading(false)
    }
    setDebtAndCA()
    const interval = setInterval(() => {
      setDebtAndCA()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [user, router])

  useEffect(() => {
    if (loading) return setTier(Tiers.Loading)

    // if (maxDebt <= BigInt(2e18)) return setTier(Tiers.TierB)

    // if (maxDebt <= BigInt(6e18)) 
    return setTier(Tiers.TierA)

    // setTier(Tiers.TierS)

  }, [maxDebt, loading])

  return (
    <>
      <Title>
        {tier !== Tiers.Loading ? `Hi, You're proven to be ${tier}` : 'Loading...'}
      </Title>

      {tier !== Tiers.Loading && <Image style={{height: 230, width: 230}} src={tier === Tiers.TierB ? tierBImg : tier === Tiers.TierA ? tierAImg : tierSImg} alt="tier" width={300} height={300} /> }

      <div className="text-left">
      <br />
      Max Debt: {formatEther(maxDebt)} <br />
      CA Address:  {ca === zeroAddress ? '' : ca} <br />
      <br />
      </div> 
    </>
  )
}
