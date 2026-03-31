import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react'

const links = [
  { to: '/', label: 'Landing' },
  { to: '/onboarding', label: 'Onboarding' },
  { to: '/hoster', label: 'Hoster' },
  { to: '/developer', label: 'Developer' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/docs', label: 'Docs' },
]

const truncate = (address: string) => `${address.slice(0, 8)}...${address.slice(-6)}`

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { address } = useWallet()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-sky-900/40 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="font-semibold text-sky-300">AdNode on Aleo</div>
          <nav className="flex gap-2">
            {links.map((link) => {
              const active = location.pathname === link.to
              return (
                <Link key={link.to} to={link.to} className="relative rounded-md px-3 py-1 text-sm">
                  {active && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute inset-0 rounded-md bg-sky-900/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="text-xs text-slate-300">{address ? truncate(address) : 'Not connected'}</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
