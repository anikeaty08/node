import { Network } from '@provablehq/aleo-types'
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react'

export function WalletPanel() {
  const { wallets, wallet, connected, connect, disconnect, selectWallet, address } = useWallet()

  return (
    <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
      <h3 className="mb-3 text-lg font-semibold text-sky-300">Wallet</h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {wallets.map((entry) => (
          <button
            key={entry.adapter.name}
            onClick={() => selectWallet(entry.adapter.name)}
            className={`rounded-md px-3 py-1 text-sm ${
              wallet?.adapter.name === entry.adapter.name ? 'bg-sky-600' : 'bg-slate-700'
            }`}
          >
            {entry.adapter.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => connect(Network.TESTNET)} className="rounded-md bg-sky-600 px-3 py-1 text-sm">
          Connect
        </button>
        <button onClick={() => disconnect()} className="rounded-md bg-slate-700 px-3 py-1 text-sm">
          Disconnect
        </button>
      </div>
      <div className="mt-3 text-sm text-slate-300">Network: Aleo Testnet</div>
      <div className="text-sm text-slate-300">Status: {connected ? 'Connected' : 'Disconnected'}</div>
      {address && <div className="break-all text-xs text-slate-400">{address}</div>}
    </section>
  )
}
