export const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080',
  aleoApiUrl: import.meta.env.VITE_ALEO_API_URL ?? 'https://api.explorer.provable.com/v1/testnet',
  network: 'Aleo Testnet',
  programs: {
    tokenRegistry: import.meta.env.VITE_TOKEN_REGISTRY_PROGRAM ?? 'token_registry.aleo',
    adRegistry: import.meta.env.VITE_AD_REGISTRY_PROGRAM ?? 'ad_registry.aleo',
    adAnalytics: import.meta.env.VITE_AD_ANALYTICS_PROGRAM ?? 'ad_analytics.aleo',
    adPayouts: import.meta.env.VITE_AD_PAYOUTS_PROGRAM ?? 'ad_payouts.aleo',
  },
}
