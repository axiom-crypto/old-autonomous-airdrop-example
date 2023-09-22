import BuildComputeQuery from "@/components/claim/BuildComputeQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';

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

export default async function Claim({ searchParams }: PageProps) {
  const address = searchParams?.address as string ?? "";
  const txHash = searchParams?.txHash as string ?? "";
  const blockNumber = searchParams?.blockNumber as string ?? "";
  const logIdx = searchParams?.logIdx as string ?? "";

  return (
    <>
      <Title>
        Claim airdrop
      </Title>
      <div className="text-center">
        Click the buttom below to claim your UselessToken airdrop. UselessToken is purely used for testing purposes and holds no financial or nonmonetary value.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildComputeQuery
          airdropAbi={autoAirdropJson.abi}
          address={address}
          txHash={txHash}
          blockNumber={blockNumber}
          logIdx={logIdx}
        />
      </div>
    </>
  )
}