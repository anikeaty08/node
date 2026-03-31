import { config } from '../lib/config'

const embedCode = `<script async src="http://localhost:8080/api/embed.js?campaignId=1001"></script>
<div id="adnode-slot"></div>`

export function DocsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-sky-300">Docs</h1>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-2 text-lg text-sky-300">Embed AdNode slot</h2>
        <pre className="overflow-x-auto rounded-md bg-slate-950 p-3 text-xs">{embedCode}</pre>
      </section>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-2 text-lg text-sky-300">Supported tokens</h2>
        <p>USDC and USDCx</p>
      </section>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-2 text-lg text-sky-300">Aleo explorer links</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>token_registry: {config.programs.tokenRegistry}</li>
          <li>ad_registry: {config.programs.adRegistry}</li>
          <li>ad_analytics: {config.programs.adAnalytics}</li>
          <li>ad_payouts: {config.programs.adPayouts}</li>
        </ul>
      </section>
      <section className="rounded-xl border border-amber-800 bg-amber-950/20 p-4 text-amber-300">
        <h2 className="mb-2 text-lg">Coming soon</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Automatic impression relayer (needs trusted oracle)</li>
          <li>Multi-token auction between hosters</li>
          <li>Cross-chain USDC bridge</li>
        </ul>
      </section>
    </div>
  )
}
