# AdNode Aleo - Private Ad Network

Production-oriented full-stack scaffold for a decentralized ad network on Aleo with private-by-default campaign economics.

## What is implemented

- `contracts/` contains four Leo programs:
  - `token_registry/main.leo`
  - `ad_registry/main.leo`
  - `ad_analytics/main.leo`
  - `ad_payouts/main.leo`
- `frontend/` is a React 18 + TypeScript app with:
  - Landing page
  - Onboarding flow (wallet + role routing)
  - Hoster dashboard (campaign form, tx execution, charts)
  - Developer dashboard (slot registration, withdrawals, charts)
  - Marketplace page
  - Docs page with embed integration and explorer references
- `backend/` is Express + Mongo with:
  - `POST /api/campaigns`
  - `GET /api/campaigns`
  - `POST /api/upload` (Pinata upload)
  - `GET /api/embed.js?campaignId=X`
  - `GET /api/embed-frame?campaignId=X`
- Mongo persistence intentionally stores off-chain metadata only:
  - `aleoTxId`, `campaignId`, `title`, `description`, `creativeURI`, `category`, `ownerAddress`, `createdAt`

## Environment setup

### Backend

Copy `backend/.env.example` to `backend/.env` and set:

- `MONGODB_URI`
- `PINATA_JWT`
- `PINATA_GATEWAY`
- `PUBLIC_BASE_URL`

Run:

```bash
cd backend
npm install
npm run dev
```

### Frontend

Copy `frontend/.env.example` to `frontend/.env` and set:

- `VITE_BACKEND_URL`
- `VITE_TOKEN_REGISTRY_PROGRAM`
- `VITE_AD_REGISTRY_PROGRAM`
- `VITE_AD_ANALYTICS_PROGRAM`
- `VITE_AD_PAYOUTS_PROGRAM`

Run:

```bash
cd frontend
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Deployed contract addresses

Set these after testnet deployment:

- token_registry: `TODO_TESTNET_ADDRESS`
- ad_registry: `TODO_TESTNET_ADDRESS`
- ad_analytics: `TODO_TESTNET_ADDRESS`
- ad_payouts: `TODO_TESTNET_ADDRESS`

## Honest status / remaining work

This repository now contains the full product structure and working UI/API flow, but external deployment and final on-chain wiring still require environment-specific operator steps:

- Finalize official Aleo Testnet USDC/USDCx program IDs and exact cross-program calls in `token_registry`.
- Compile and deploy all Leo programs with your Aleo toolchain and funded testnet accounts.
- Replace placeholder program IDs in frontend `.env`.
- Execute end-to-end wallet transactions on live testnet and capture real tx IDs for both Hoster and Developer flows.
- Enable wallet-driven private record decryption (`requestRecords`) per wallet permissions in your runtime environment.

## Coming soon features (intentionally disabled in docs page)

- Automatic impression relayer (needs trusted oracle)
- Multi-token auction between hosters
- Cross-chain USDC bridge
