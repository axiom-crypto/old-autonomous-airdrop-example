import AdvanceStepButton from '@/components/ui/AdvanceStepButton'
import Title from '@/components/ui/Title'
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
  return (
    <>
      <Title>
        Autonomous Airdrop
      </Title>
      <div className="text-center">
        Anyone who has used <Link href="https://app.uniswap.org/swap" target="_blank">Uniswap</Link> (swapping a token for a token that is <b>not</b> ETH) on 
        Sepolia testnet after block 4000000 is eligible for an airdrop of a test token called UselessToken. You may need to wait a few minutes after executing 
        your swap for the indexer to pick it up.
      </div>
      <AdvanceStepButton
        label="Check Eligibility"
        href={"/check"}
      />
    </>
  )
}
