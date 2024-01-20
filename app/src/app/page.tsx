import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
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
        Autonomous Airdrop
      </Title>
      <div className="text-center">
        Anyone who has used <Link href="https://app.uniswap.org/swap" target="_blank">Uniswap</Link> (swapping a token for a token that is <b>not</b> ETH) on Goerli testnet
        after Goerli block 9000000 is eligible for an airdrop of a newly deployed test token called UselessToken. You may need to wait a few minutes
        after executing your swap for the indexer to pick it up.
      </div>
      {renderButton()}
    </>
  )
}
