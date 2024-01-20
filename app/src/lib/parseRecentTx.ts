import { Constants } from "@/shared/constants";
import { bytes32 } from "./utils";

export async function findMostRecentUniswapTx(address: string): Promise<any | null> {
  let pageKey = "";
  while (pageKey !== undefined) {
    const res = await getRecentTxs(address, pageKey);
    const recentTx = res?.transfers;
    for (const tx of recentTx) {
      // These are only the transactions that are from the user to the Uniswap contract, since we
      // constrained the query by `fromAddress` (user) and `toAddress` (Uniswap contract)
      const receipt = await getRecentReceipt(tx?.hash);
      if (receipt.logs.length > 0) {
        for (const [idx, log] of receipt.logs.entries()) {
          if (
            log.topics[0] === Constants.EVENT_SCHEMA &&
            log.topics[2].toLowerCase() === bytes32(address.toLowerCase())
          ) {
            return {
              logIdx: idx,
              log
            }
          }
        }
      }
    }
    pageKey = res?.pageKey;
  }
  console.log("Could not find any Transfer transaction");
  return null;
}

async function getRecentTxs(address: string, pageKey?: string) {
  let params: {[key: string]: any} = {
    "fromBlock": "0x" + BigInt(Constants.ELIGIBLE_BLOCK_HEIGHT).toString(16),
    "toBlock": "latest",
    "fromAddress": address.toLowerCase(),
    "toAddress": Constants.UNISWAP_UNIV_ROUTER_GOERLI,
    "withMetadata": false,
    "excludeZeroValue": false,
    "maxCount": "0x3e8",
    "order": "desc",
    "category": [
      "external"
    ],
  }
  if (typeof pageKey !== "undefined" && pageKey !== "") {
    params[pageKey] = pageKey;
  }
  const res = await fetch(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": 1,
      "jsonrpc": "2.0",
      "method": "alchemy_getAssetTransfers",
      "params": [
        params
      ]
    }),
  })
  const json = await res.json();
  return json?.result;
}

async function getRecentReceipt(hash: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": 1,
      "jsonrpc": "2.0",
      "method": "eth_getTransactionReceipt",
      "params": [hash]
    }),
  })
  const json = await res.json();
  return json?.result;
}
