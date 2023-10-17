"use client";

import Title from "@/components/ui/Title";
import { defaultInputs } from "@/lib/circuit";
// import { useTmp } from "@axiom-crypto/wp-react";
import { useAxiomCircuit } from "@axiom-crypto/react";
import { useEffect } from "react";

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

export default function Test({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  // const { pressed, tmpButton } = useTmp();
  // console.log(pressed, tmpButton)

  const { builtQuery, payment, setParams } = useAxiomCircuit();

  // useEffect(() => {
  setParams(defaultInputs, {});
  // }, []);

  return (
    <>
      <Title>
        Test
      </Title>
      <div className="text-center">
        This is a test
      </div>
    </>
  )
}
