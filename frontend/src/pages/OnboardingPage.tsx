import { useNavigate } from 'react-router-dom'
import { WalletPanel } from '../components/WalletPanel'

export function OnboardingPage() {
  const navigate = useNavigate()
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <WalletPanel />
      <section className="rounded-xl border border-sky-900/40 bg-slate-900 p-4">
        <h2 className="mb-4 text-xl font-semibold text-sky-300">Select role</h2>
        <div className="flex gap-3">
          <button className="rounded-md bg-sky-600 px-4 py-2" onClick={() => navigate('/hoster')}>
            Hoster
          </button>
          <button className="rounded-md bg-slate-700 px-4 py-2" onClick={() => navigate('/developer')}>
            Developer
          </button>
        </div>
      </section>
    </div>
  )
}
