import { LinkButton, LinkButtonQuery }  from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";
// import { findMostRecentUniswapTx } from "@/lib/parseRecentTx";
import { fetchGearBoxTx } from "@/lib/query";

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

const MOCK_ACCOUNT_HAVE_TXHISTORY_WITH_GEARBOX = '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70';
const MOCK_GEARBOX_FACADE_ADDR = '0x15A43dbcD8dBc094f7866c2F458cAb68c35BBe16';

export default async function Check({ searchParams }: PageProps) {
  // const connected = searchParams?.connected as string ?? "";
  const connected = MOCK_ACCOUNT_HAVE_TXHISTORY_WITH_GEARBOX;
  const facadeAddress = MOCK_GEARBOX_FACADE_ADDR;
  // Find the user's uniswap transaction with the `Swap` event
  // const uniswapTx = await findMostRecentUniswapTx(connected);
  let gearboxTx = await fetchGearBoxTx(MOCK_ACCOUNT_HAVE_TXHISTORY_WITH_GEARBOX);
  
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
    // console.log(gearboxTx?.transactionHash);
    const txHash = gearboxTx?.txHash;
    const blockNumber = gearboxTx?.blockNumber;
    const logIdx = gearboxTx?.logIdx;
    gearboxTx.connected = connected;
    gearboxTx.facadeAddress = facadeAddress;

    if (txHash === undefined || blockNumber === undefined || logIdx === undefined) {
      return renderNotEligible();
    }

    return (
      <>
        <div className="text-center">
          {"Degen, Now I grant you greater leverage!"}
        </div>
        <LinkButtonQuery
          label="✨✨✨ Let Axiom Wizard to open a Degen Account for you. Build Axiom proof params! ✨✨✨"
          pathname='/claim'
          data={gearboxTx}
        />
      </>
    )
  }
  
  return (
    <>
      <Title>
        Check eligibility
      </Title>
      {gearboxTx !== null ? renderEligible() : renderNotEligible()}
    </>
  )
}
