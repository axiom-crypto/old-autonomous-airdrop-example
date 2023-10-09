import { CircuitScaffold, CircuitConfig, AxiomCircuitRunner } from '@axiom-crypto/halo2-js';
import { Halo2Wasm, getHalo2Wasm } from "@axiom-crypto/halo2-js/wasm/web";
import { expose } from 'comlink';
import { ethers } from 'ethers';
import { vk, config, CircuitInputs } from '../circuit/constants';
import { circuit } from '../circuit';
import { convertToBytes } from '../utils';

export class Circuit extends CircuitScaffold {
  private provider: ethers.JsonRpcProvider;
  private results: { [key: string]: string } | undefined;

  constructor(config: CircuitConfig, provider?: string) {
    super(null, { shouldTime: false });
    this.provider = new ethers.JsonRpcProvider(provider);
  }

  async setup(numThreads: number) {
    this.halo2wasm = await getHalo2Wasm(numThreads);
  }

  async newCircuit() {
    super.newCircuitFromConfig(config as CircuitConfig);
    await super.loadParamsAndVk(new Uint8Array(vk));
  }

  async buildCircuit(inputs: CircuitInputs) {
    this.results = await AxiomCircuitRunner(this.halo2wasm, config, this.provider).build(circuit, inputs);
  }

  async getComputeProof(inputs: string) {
    await this.newCircuit();
    let circuitInputs: CircuitInputs;
    try {
      circuitInputs = JSON.parse(inputs);
    } catch (error) {
      console.error(error);
      return;
    }
    await this.buildCircuit(circuitInputs);
    console.time("Proving")
    const proof = this.prove();
    console.timeEnd("Proving");

    const publicInstances = this.getInstances();
    console.log(publicInstances);
    const publicInstancesBytes = "0x" + publicInstances.map((instance) => instance.slice(2).padStart(64, "0")).join("");
    const computeProof = publicInstancesBytes + convertToBytes(proof);
    return { computeProof, resultLen: publicInstances.length / 2 };
  }
}

expose(Circuit);
