import { Axiom } from '@axiom-crypto/experimental';

export const newAxiomV2 = (): Axiom => {
  const axiom = new Axiom({
    providerUri: process.env.NEXT_PUBLIC_PROVIDER_URI_GOERLI as string,
    version: "v2",
    chainId: 5,
  });
  return axiom;
}