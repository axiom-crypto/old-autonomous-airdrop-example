import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


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

export default async function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Check Eligibility"
        href={"/check?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  }

  return (
    <>
      <Title>
        Send someone a high five
      </Title>
      <div className="text-center">
        You can high five anyone that has minted the same NFT collection as you. Input a friend's address and the address of an NFT collection you've both minted. 
      </div>
      {renderButton()}
    </>
  )
}
