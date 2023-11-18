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
  // TODO: add theGraph fetching function for gearbox tx

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
    let log = uniswapTx?.log;
    let txHash = log?.transactionHash;
    let blockNumber = log?.blockNumber;
    let logIdx = uniswapTx?.logIdx;

    // FIXME: remove this after thegraph integrated.
    log = 1;
    txHash = 1;
    blockNumber = 1;
    logIdx = 1;

    if (txHash === undefined || blockNumber === undefined || logIdx === undefined) {
      return renderNotEligible();
    }

    return (
      <>
        <div className="text-center">
          {"Degen, Now I grant you greater leverage!"}
        </div>
        <LinkButton
          label="✨✨✨ Let Axiom Wizard to open a Degen Account for you ✨✨✨"
          href={"/opendegenaccount?" + new URLSearchParams({
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
      {uniswapTx !== null ? renderNotEligible() : renderEligible()} // FIXME: swap these 2 cases after thegraph integrated.
      {/* {uniswapTx !== null ? renderEligible() : renderNotEligible()}  */}
    </>
  )
}
