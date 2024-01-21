import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { CircuitInputs } from "../../../axiom/swapEvent.circuit";
import { Constants } from "@/shared/constants";
import { UserInput } from "@axiom-crypto/client";

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
  const blockNumber = searchParams?.blockNumber as string ?? "";
  const txIdx = searchParams?.txIdx as string ?? "";
  const logIdx = searchParams?.logIdx as string ?? "";

  const inputs: UserInput<CircuitInputs> = {
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
          airdropAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
