import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react'
import { LeoWalletAdapter } from '@provablehq/aleo-wallet-adaptor-leo'
import { PuzzleWalletAdapter } from '@provablehq/aleo-wallet-adaptor-puzzle'
import { Network } from '@provablehq/aleo-types'

const queryClient = new QueryClient()
const wallets = [new LeoWalletAdapter(), new PuzzleWalletAdapter()]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AleoWalletProvider wallets={wallets} network={Network.TESTNET}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AleoWalletProvider>
  </StrictMode>,
)
