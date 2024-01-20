import {
  add,
  sub,
  mul,
  div,
  checkLessThan,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getReceipt,
  getTx,
} from "@axiom-crypto/client";

/// For type safety, define the input types to your circuit here.
/// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  txIdx: CircuitValue,
  logIdx: CircuitValue,
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to 
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag 
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {
  const eventSchema =
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

  // specify and fetch the data you want Axiom to verify
  const receipt = getReceipt(inputs.blockNumber, inputs.txIdx);
  const receiptLog = receipt.log(inputs.logIdx); //get the log at index 3

  // get the topic at index 0 (event schema)
  const swapSchema = await receiptLog.topic(0, eventSchema);

  // get the topic at index 2
  const swapTo = await receiptLog.topic(2, eventSchema);

  // get the block number for receipt
  const blockNum = await receipt.blockNumber();

  // get the `to` field of the transaction
  const tx = getTx(inputs.blockNumber, inputs.txIdx);
  const txTo = await tx.to();

  addToCallback(swapSchema);
  addToCallback(swapTo);
  addToCallback(blockNum);
  addToCallback(txTo);
};