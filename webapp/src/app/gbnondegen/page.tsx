import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import Link from "next/link";
import LinkButton from '@/components/ui/LinkButton'
import ConnectWallet from '@/components/ui/ConnectWallet'
import { forwardSearchParams } from '@/lib/utils'


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

export default async function Success({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";


  return (
    <>
      <Title>
      Hi Newbie &#128018;
      </Title>
      <div className="text-left">
        Max Debt: <br />
        CA Address: <br />
      </div>  
    </>
  )
}
