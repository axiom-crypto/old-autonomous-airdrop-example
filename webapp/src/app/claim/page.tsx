import { CircuitInputs } from "@/components/axiom/circuit/constants";
import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/experimental";

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
  const callback: AxiomV2Callback = {
    target: Constants.AUTO_AIRDROP_ADDR as `0x${string}`,
    extraData: bytes32(connected),
  }

  return (
    <>
      <Title>
        Claim airdrop
      </Title>
      <div className="text-center">
        Click the buttom below to claim your UselessToken airdrop. UselessToken is purely used for testing purposes and holds no financial or nonmonetary value.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callback={callback}
          airdropAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
