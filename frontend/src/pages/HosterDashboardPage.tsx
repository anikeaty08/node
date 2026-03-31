import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { saveCampaignMetadata, uploadCreative } from '../lib/api'
import { useAleoActions } from '../lib/aleoClient'
import { WalletPanel } from '../components/WalletPanel'

export function HosterDashboardPage() {
  const [txId, setTxId] = useState<string>()
  const [txStatus, setTxStatus] = useState<string>()
  const [creativeUri, setCreativeUri] = useState('')
  const [token, setToken] = useState<'USDC' | 'USDCX'>('USDC')
  const { createCampaign, wallet, requestRecords, waitForFinalStatus } = useAleoActions()

  const stats = useMemo(() => [{ label: 'C1', impressions: 0, clicks: 0, spendUsdc: 0 }], [])

  const uploadMutation = useMutation({ mutationFn: uploadCreative, onSuccess: (data) => setCreativeUri(data.uri) })
  const createMutation = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      const title = String(form.get('title') ?? '')
      const description = String(form.get('description') ?? '')
      const category = String(form.get('category') ?? '')
      const budget = BigInt(String(form.get('budget') ?? '0'))
      const cpc = BigInt(String(form.get('cpc') ?? '0'))
      const cpm = BigInt(String(form.get('cpm') ?? '0'))
      const transaction = await createCampaign(creativeUri || '0', category, budget, cpc, cpm)
      if (transaction?.transactionId) {
        setTxId(transaction.transactionId)
        const finalStatus = await waitForFinalStatus(transaction.transactionId)
        setTxStatus(finalStatus.status)
        await saveCampaignMetadata({
          aleoTxId: transaction.transactionId,
          campaignId: Date.now(),
          title,
          description,
          creativeURI: creativeUri,
          category,
          ownerAddress: wallet.address ?? '',
        })
      }
    },
  })

  const metadataQuery = useQuery({
    queryKey: ['campaign-records', wallet.address],
    queryFn: () => requestRecords('ad_registry.aleo'),
    enabled: Boolean(wallet.connected),
  })

  return (
    <div className="space-y-6">
      <WalletPanel />
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-3 text-xl text-sky-300">Create campaign</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={(event) => void createMutation.mutateAsync(event)}>
          <input name="title" className="rounded-md bg-slate-800 p-2" placeholder="Title" required />
          <input name="description" className="rounded-md bg-slate-800 p-2" placeholder="Description" required />
          <input name="category" className="rounded-md bg-slate-800 p-2" placeholder="Category" required />
          <select className="rounded-md bg-slate-800 p-2" value={token} onChange={(e) => setToken(e.target.value as 'USDC' | 'USDCX')}>
            <option value="USDC">USDC</option>
            <option value="USDCX">USDCx</option>
          </select>
          <input name="budget" type="number" className="rounded-md bg-slate-800 p-2" placeholder={`Budget ${token}`} required />
          <input name="cpc" type="number" className="rounded-md bg-slate-800 p-2" placeholder={`CPC ${token}`} required />
          <input name="cpm" type="number" className="rounded-md bg-slate-800 p-2" placeholder={`CPM ${token}`} required />
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0]
              if (file) void uploadMutation.mutateAsync(file)
            }}
            className="rounded-md bg-slate-800 p-2"
          />
          <input value={creativeUri} onChange={(e) => setCreativeUri(e.target.value)} className="rounded-md bg-slate-800 p-2 md:col-span-2" placeholder="Or paste creative URL / IPFS URI" />
          <button className="rounded-md bg-sky-600 px-4 py-2 md:col-span-2" type="submit">
            Execute create_campaign
          </button>
        </form>
        {txId && <div className="mt-3 text-sm text-emerald-300">Aleo tx: {txId}</div>}
        {txStatus && <div className="text-sm text-slate-300">Status: {txStatus}</div>}
      </section>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h3 className="mb-2 text-lg text-sky-300">Analytics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impressions" fill="#38bdf8" />
                <Bar dataKey="clicks" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line dataKey="spendUsdc" stroke="#22d3ee" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-300">Campaign private records: {metadataQuery.data?.length ?? 0}</div>
        <div className="mt-2 text-xs text-slate-400">Campaign record count: {metadataQuery.data?.length ?? 0}</div>
      </section>
    </div>
  )
}
