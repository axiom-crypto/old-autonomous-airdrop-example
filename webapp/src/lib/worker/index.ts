import { CircuitScaffold, CircuitRunner } from '@axiom-crypto/halo2-js';
import { expose } from 'comlink';
import { circuit } from '../circuit';
import { config, CircuitInputs, vk } from '../circuit/constants';

export class Circuit extends CircuitScaffold {
  constructor(provider?: string) {
    super(provider);
  }

  async buildCircuit(inputs: CircuitInputs) {
    this.dataQuery = (await CircuitRunner(this.halo2wasm, this.config, this.provider).run(circuit, inputs)).dataQuery;
    super.assignPublicInstances();
  }

  async newCircuit() {
    super.newCircuitFromConfig(config);
    await super.loadParamsAndVk(new Uint8Array(vk));
  }
}

expose(Circuit);