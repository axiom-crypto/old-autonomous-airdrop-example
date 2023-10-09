import { Halo2Lib } from "@axiom-crypto/halo2-js";
import { AxiomData } from "@axiom-crypto/experimental"
import { CircuitInputs } from "./constants";

export const circuit = async (
  halo2Lib: Halo2Lib,
  halo2Data: AxiomData,
  { blockNumber, txIdx, logIdx }: CircuitInputs
) => {
  const { add, and, or, log } = halo2Lib;
  const { getReceipt, getTx, addToCallback } = halo2Data;
  // `Swap(address,uint256,uint256,uint256,uint256,address)` event schema
  const eventSchema =
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

  // "blockNumber": 9610835,
  // "txIdx": 6,

  // specify and fetch the data you want Axiom to verify
  let receipt = getReceipt(blockNumber, txIdx);
  let receiptLog = receipt.log(logIdx); //get the log at index 3

  // get the topic at index 0 (event schema)
  let swapSchema = receiptLog.topic(0, eventSchema);

  // get the topic at index 2
  let swapTo = receiptLog.topic(2, eventSchema).toCircuitValue();

  // get the block number for receipt
  let blockNum = receipt.blockNumber().toCircuitValue();

  // get the `to` field of the transaction
  let tx = getTx(blockNumber, txIdx);
  let txTo = tx.to().toCircuitValue();

  addToCallback(swapSchema);
  addToCallback(swapTo);
  addToCallback(blockNum);
  addToCallback(txTo);

  log(swapSchema);
  log(swapTo);
  log(blockNum);
  log(txTo);
};
