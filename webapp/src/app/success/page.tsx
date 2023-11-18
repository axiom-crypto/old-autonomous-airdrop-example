import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import Link from "next/link";
import LinkButton from '@/components/ui/LinkButton'
import ConnectWallet from '@/components/ui/ConnectWallet'
import { forwardSearchParams } from '@/lib/utils'

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

export default async function Success({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  const renderButton = () => {

    if (connected) {
      return <LinkButton
        label="✨✨✨ Let Axiom Wizard to open a Degen Account for you ✨✨✨"
        //TODO: Link membership.sol
        href={"/gbdegen?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet />;
  } 

  return (
    <>
      <Title>
        You are a Degen!!! 
      </Title>
      <div className="text-left">
        <></>
        <></>
        Proof is generated! <br />
        You borrowing amount limitation: 100 WETH
      </div> 
      {renderButton()}
    </>
  )
}
