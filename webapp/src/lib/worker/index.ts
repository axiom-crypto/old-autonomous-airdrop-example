import { CircuitScaffold } from '@axiom-crypto/halo2-js';
import { AxiomCircuitRunner } from '@axiom-crypto/experimental';
import { getHalo2Wasm, Halo2LibWasm, getHalo2LibWasm } from "@axiom-crypto/halo2-js/wasm/web";
import { expose } from 'comlink';
import { ethers } from 'ethers';
import { vk, config, CircuitInputs } from '../circuit/constants';
import { circuit } from '../circuit';
import { convertToBytes } from '../utils';

export class Circuit extends CircuitScaffold {
  private provider: ethers.JsonRpcProvider;
  private halo2Lib!: Halo2LibWasm;

  constructor(provider?: string) {
    super(null, { shouldTime: false });
    this.provider = new ethers.JsonRpcProvider(provider);
    this.config = config;
  }

  async setup(numThreads: number) {
    this.halo2wasm = await getHalo2Wasm(numThreads);
  }

  async newCircuit() {
    if(!this.halo2wasm) throw new Error("Must call setup first");
    super.newCircuitFromConfig(this.config);
    if(this.halo2Lib) this.halo2Lib.free();
    this.halo2Lib = getHalo2LibWasm(this.halo2wasm);
    await super.loadParamsAndVk(new Uint8Array(vk));
  }

  async buildCircuit(inputs: CircuitInputs) {
    const { results } = await AxiomCircuitRunner(this.halo2wasm, this.halo2Lib, config, this.provider).build(circuit, inputs);
    await AxiomCircuitRunner(this.halo2wasm, this.halo2Lib, config, this.provider).run(circuit, inputs, results);
    console.time("Proving")
    this.proof = this.prove();
    console.timeEnd("Proving");
  }

  async getComputeProof() {
    if( !this.proof) throw new Error("No proof generated");
    let publicInstancesHiLo = this.getInstances().slice(0, 8).map(BigInt);
    let publicInstances = []
    for(let i = 0; i < publicInstancesHiLo.length; i+=2) {
      const val = (publicInstancesHiLo[i] << BigInt(128)) + publicInstancesHiLo[i+1]
      publicInstances.push(val.toString(16).padStart(64, "0"));
    }
    console.log(publicInstances);
    const publicInstancesBytes = "0x" + publicInstances.join("");
    const computeProof = publicInstancesBytes + convertToBytes(this.proof);
    return { computeProof, resultLen: 4 };
  }
}

expose(Circuit);
