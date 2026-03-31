import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-sky-900/50 bg-gradient-to-r from-slate-900 to-sky-950 p-8">
        <h1 className="text-4xl font-bold text-sky-200">
          The advertising network where your strategy stays private. Built on Aleo.
        </h1>
        <p className="mt-4 text-slate-300">Create -&gt; Pay in USDC/USDCx -&gt; Earn in USDC/USDCx.</p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-md bg-sky-600 px-4 py-2" to="/hoster">
            Start Advertising
          </Link>
          <Link className="rounded-md bg-slate-700 px-4 py-2" to="/developer">
            Become a Publisher
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Total campaigns" value="From Aleo mapping" />
        <StatCard label="Total slots" value="From Aleo mapping" />
        <StatCard label="Total txs" value="From Aleo history" />
      </section>
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="text-lg text-sky-300">Supported tokens</h2>
        <p className="text-slate-300">USDC + USDCx</p>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-xl text-sky-300">{value}</div>
    </div>
  )
}
