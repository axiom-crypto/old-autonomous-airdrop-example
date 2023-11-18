/* eslint-disable @next/next/no-async-client-component */
"use client"

import { useCallback } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import { LinkButton } from '@/components/ui/LinkButton'
import Button from '@/components/ui/Button'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useState } from 'react'

import logo from '../imgs/janissary-removebg-preview.png'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useRouter } from 'next/navigation'

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

export default function Home({ searchParams }: PageProps) {
  const { address, isConnected,  } = useAccount()

  const { open } = useWeb3Modal()

  const [leverageFactor, setLeverageFactor] = useState(0);

  const route = useRouter()

  const onGenerateProof = useCallback(async() => {
    console.log('generating proofs....')

    // todo: all the stuff

    
    // go to success
    route.push('/success')
  }, [])

  const renderButton = () => {
    if (isConnected && address) {
      return <Button
          onClick={onGenerateProof}
          //TODO: Link membership.sol
          // href={"/check?" + forwardSearchParams(searchParams)}
          // href={"/success?" + forwardSearchParams(searchParams)}
        > Generate Proof </Button>;
    }
    return <ConnectWallet />;
  }

  return (
    <>
      <Image height={200} src={logo} alt="logo"/>
      <Title>
        {/* Welcome to DeFi Loyalty and Reward System */}
        Welcome to Janissary Farm
      </Title>
      <div className="text-left">
        {/* 1. Connect wallet <br /> */}
        Leveraged DeFi access based on on-chain credit<br />
        {/* Generate the proof of your loyalty tier and open a CA with better leverage flexibility on Gearbox  */}
        <br />
      </div> 
      {renderButton()}
    </>
  )
}
