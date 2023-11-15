import LinkButton from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";
import { findMostRecentUniswapTx } from "@/lib/parseRecentTx";

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

export default async function Check({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  // Find the user's uniswap transaction with the `Swap` event
  const uniswapTx = await findMostRecentUniswapTx(connected);

  const renderNotEligible = () => {
    return (
      <>
        <div className="text-center">
          {"Sorry, we couldn't find a Swap event (swapping a token for a token that is not ETH) for this address after Goerli block 9000000."}
        </div>
        <LinkButton
          label="Go back"
          href="/"
        />
      </>
    )
  }

  const renderEligible = () => {
    const log = uniswapTx?.log;
    const txHash = log?.transactionHash;
    const blockNumber = log?.blockNumber;
    const logIdx = uniswapTx?.logIdx;

    if (txHash === undefined || blockNumber === undefined || logIdx === undefined) {
      return renderNotEligible();
    }

    return (
      <>
        <div className="text-center">
          {"Congratulations! You're eligible for the UselessToken airdrop."}
        </div>
        <LinkButton
          label="Build Axiom proof params"
          href={"/claim?" + new URLSearchParams({
            connected,
            txHash,
            blockNumber: blockNumber.toString(),
            logIdx: logIdx.toString(),
          })}
        />
      </>
    )
  }

  return (
    <>
      <Title>
        Check eligibility
      </Title>
      {uniswapTx !== null ? renderEligible() : renderNotEligible()}
    </>
  )
}
