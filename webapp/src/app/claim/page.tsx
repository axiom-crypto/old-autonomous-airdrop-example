import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { CircuitInputs } from "@/lib/circuit/circuit";
import { bytes32 } from "@/lib/utils";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";

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
  const connected = searchParams?.connected as string ?? "";
  const txHash = searchParams?.txHash as string ?? "";
  const blockNumber = searchParams?.blockNumber as string ?? "";
  const logIdx = searchParams?.logIdx as string ?? "";

  const tx = await publicClient.getTransaction({
    hash: txHash as `0x${string}`,
  });
  const txIdx = tx.transactionIndex.toString();

  const inputs: CircuitInputs = {
    blockNumber: Number(blockNumber),
    txIdx: Number(txIdx),
    logIdx: Number(logIdx),
  }

  return (
    <>
      <Title>
        Claim airdrop
      </Title>
      <div className="text-center">
        Please wait while we generate a compute proof in wasm for the Axiom Query. Once complete, you can click the buttom below to claim your UselessToken airdrop. UselessToken is purely used for testing purposes and holds no financial or nonmonetary value.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackAddress={Constants.AUTO_AIRDROP_ADDR}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
          airdropAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
