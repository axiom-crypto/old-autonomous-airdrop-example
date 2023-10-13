"use client";

import { shortenAddress } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import Button from './Button';

export default function ConnectWallet({ connected }: { connected: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  const disconnectWallet = () => {
    disconnect();
    router.replace(pathname);
  }

  useEffect(() => {
    if (isConnected && address && connected !== address && !searchParams.get("connected")) {
      router.replace(`${pathname}/?connected=${address}&${searchParams}`);
    }
  }, [address, connected, isConnected, router, pathname, searchParams]);

  if (isConnected) {
    return (
      <Button
        onClick={() => {
          disconnectWallet();
        }}
      >
        {ensName ? ensName : shortenAddress(address as string)}
      </Button>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
        >
          {"Connect Wallet"}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
