import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCampaignMetadata, fetchCampaignsPublicMapping } from '../lib/api'

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const { data = [] } = useQuery({ queryKey: ['marketplace-campaigns'], queryFn: fetchCampaignMetadata })
  const publicMappingQuery = useQuery({
    queryKey: ['campaigns-public-mapping'],
    queryFn: fetchCampaignsPublicMapping,
  })

  const items = useMemo(
    () =>
      data
        .filter((x) => (!query ? true : x.title.toLowerCase().includes(query.toLowerCase())))
        .filter((x) => (!category ? true : x.category === category)),
    [category, data, query],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-sky-300">Marketplace</h1>
      <div className="flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-md bg-slate-800 p-2" placeholder="Search by title" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md bg-slate-800 p-2" placeholder="Filter category" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.campaignId} className="rounded-xl border border-sky-900/40 bg-slate-900 p-3">
            <img src={item.creativeURI} className="mb-2 h-36 w-full rounded-md object-cover" />
            <div className="font-medium">{item.title}</div>
            <div className="text-sm text-slate-400">{item.category}</div>
            <button className="mt-3 rounded-md bg-sky-600 px-3 py-1 text-sm">Connect wallet to assign</button>
          </article>
        ))}
      </div>
      {items.length === 0 && <div className="text-slate-400">No campaigns found.</div>}
      <div className="text-xs text-slate-400">
        Public mapping entries: {publicMappingQuery.data?.length ?? 0}
      </div>
    </div>
  )
}
