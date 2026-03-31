import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { HosterDashboardPage } from './pages/HosterDashboardPage'
import { DeveloperDashboardPage } from './pages/DeveloperDashboardPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { DocsPage } from './pages/DocsPage'
import { ShellLayout } from './components/ShellLayout'

function App() {
  return (
    <ShellLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/hoster" element={<HosterDashboardPage />} />
        <Route path="/developer" element={<DeveloperDashboardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ShellLayout>
  )
}

export default App
