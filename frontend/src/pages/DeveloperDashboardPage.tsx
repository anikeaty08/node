import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAleoActions } from '../lib/aleoClient'
import { WalletPanel } from '../components/WalletPanel'

export function DeveloperDashboardPage() {
  const { registerSlot, withdrawUsdc, withdrawUsdcx } = useAleoActions()
  const [txId, setTxId] = useState<string>()
  const [txStatus, setTxStatus] = useState<string>()

  const earningsSeries = useMemo(
    () => [
      { label: 'D1', usdcEarned: 10, usdcxEarned: 6 },
      { label: 'D2', usdcEarned: 22, usdcxEarned: 11 },
      { label: 'D3', usdcEarned: 34, usdcxEarned: 18 },
    ],
    [],
  )

  async function submitSlot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const siteName = String(form.get('siteName') ?? '')
    const category = String(form.get('category') ?? '')
    const dailyTraffic = BigInt(String(form.get('dailyTraffic') ?? '0'))
    const tx = await registerSlot(siteName, category, dailyTraffic)
    setTxId(tx?.transactionId)
    setTxStatus('pending')
  }

  return (
    <div className="space-y-6">
      <WalletPanel />
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-3 text-xl text-sky-300">Register slot</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={(event) => void submitSlot(event)}>
          <input name="siteName" className="rounded-md bg-slate-800 p-2" placeholder="Site name" required />
          <input name="url" className="rounded-md bg-slate-800 p-2" placeholder="URL" required />
          <input name="category" className="rounded-md bg-slate-800 p-2" placeholder="Category" required />
          <input name="dailyTraffic" type="number" className="rounded-md bg-slate-800 p-2" placeholder="Daily traffic" required />
          <button className="rounded-md bg-sky-600 px-4 py-2 md:col-span-2">Execute register_slot</button>
        </form>
        {txId && <div className="mt-3 text-sm text-emerald-300">Aleo tx: {txId}</div>}
        {txStatus && <div className="text-sm text-slate-300">Status: {txStatus}</div>}
      </section>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h3 className="mb-3 text-lg text-sky-300">Earnings</h3>
        <div className="mb-3 flex gap-3">
          <button className="rounded-md bg-emerald-700 px-4 py-2" onClick={() => void withdrawUsdc('{record}', 1n)}>
            Withdraw USDC
          </button>
          <button className="rounded-md bg-cyan-700 px-4 py-2" onClick={() => void withdrawUsdcx('{record}', 1n)}>
            Withdraw USDCx
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Area dataKey="usdcEarned" fill="#0284c7" stroke="#38bdf8" />
              <Area dataKey="usdcxEarned" fill="#0e7490" stroke="#22d3ee" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-slate-300">Withdrawals execute on-chain through `ad_payouts.aleo` transitions.</div>
      </section>
    </div>
  )
}
