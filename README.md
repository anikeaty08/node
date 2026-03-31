# AdNode - Private Advertising Network on Aleo

![Aleo](https://img.shields.io/badge/Blockchain-Aleo-1d4ed8?style=for-the-badge)
![Leo](https://img.shields.io/badge/Contracts-Leo-0f172a?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%2018-0ea5e9?style=for-the-badge)
![Express](https://img.shields.io/badge/Backend-Express-16a34a?style=for-the-badge)
![Privacy First](https://img.shields.io/badge/Privacy-ZK%20by%20Default-7c3aed?style=for-the-badge)

AdNode is a decentralized ad network designed for Aleo where campaign finances and performance-sensitive data stay private by architecture, not by add-on logic.

Hosters (advertisers) launch campaigns, developers (publishers) register ad slots, and token flows are intended to run through Aleo token standards (USDC/USDCx integration path included in this codebase).

## What This Project Does

- Lets hosters create campaigns with private financial records.
- Lets developers register slots and receive earnings through on-chain payout transitions.
- Exposes only marketplace-safe metadata publicly (creative/category/status), while budget and spend remain private.
- Uses a backend only for off-chain metadata and creative delivery (Mongo + IPFS/Pinata), not private finance data.
- Provides a full React app with onboarding, dashboards, marketplace, docs, and analytics UI.

## Architecture

### 1) Aleo contracts (`contracts/`)

- `token_registry/main.leo`
  - Token integration surface for USDC/USDCx transfer and approvals.
- `ad_registry/main.leo`
  - Campaign creation, slot registration, campaign assignment, deactivation.
  - Private records + public marketplace mappings.
- `ad_analytics/main.leo`
  - Private impression/click/spend record updates and owner-only stats proof path.
- `ad_payouts/main.leo`
  - Private earnings accumulation and withdrawal transitions.

### 2) Frontend (`frontend/`)

- React 18 + TypeScript + Tailwind + Framer Motion + Recharts.
- Wallet adapters integrated (Leo + Puzzle) via Provable adapter packages.
- Pages:
  - Landing
  - Onboarding
  - Hoster Dashboard
  - Developer Dashboard
  - Marketplace
  - Docs
- Transaction execution and status flow wired via wallet adapter APIs.

### 3) Backend (`backend/`)

- Express + MongoDB + Pinata upload support.
- Off-chain metadata APIs:
  - `POST /api/campaigns`
  - `GET /api/campaigns`
  - `POST /api/upload`
  - `GET /api/embed.js?campaignId=X`
  - `GET /api/embed-frame?campaignId=X`

## Data Privacy Model

Stored on-chain privately (Aleo records):
- budget
- CPC/CPM
- spend
- earnings
- private campaign/slot/stat records

Stored publicly on-chain (Aleo mappings):
- campaign marketplace info (non-financial)
- slot marketplace info (non-financial)

Stored off-chain (Mongo only):
- `aleoTxId`
- `campaignId`
- `title`
- `description`
- `creativeURI`
- `category`
- `ownerAddress`
- `createdAt`

## Quick Start

## 1) Backend

Copy `backend/.env.example` to `backend/.env`, then configure:
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

## 2) Frontend

Copy `frontend/.env.example` to `frontend/.env`, then configure:
- `VITE_BACKEND_URL`
- `VITE_ALEO_API_URL`
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

Build:

```bash
npm run build
```

## Project Structure

```text
.
├── contracts/
│   ├── token_registry/
│   ├── ad_registry/
│   ├── ad_analytics/
│   └── ad_payouts/
├── frontend/
└── backend/
```

## Deployment Checklist (Aleo Testnet)

- Install Aleo toolchain (`leo`, `snarkos`) and Rust/Cargo.
- Compile all 4 contracts.
- Deploy contracts to Aleo testnet.
- Set deployed program IDs in `frontend/.env`.
- Fund testnet wallets and execute end-to-end hoster/developer flows.
- Verify tx IDs and mapping reads in UI.

## Contract Addresses

Fill after deployment:

- `token_registry`: `TODO_TESTNET_ADDRESS`
- `ad_registry`: `TODO_TESTNET_ADDRESS`
- `ad_analytics`: `TODO_TESTNET_ADDRESS`
- `ad_payouts`: `TODO_TESTNET_ADDRESS`

## Coming Soon (Intentionally Disabled)

- Automatic impression relayer (needs trusted oracle)
- Multi-token auction between hosters
- Cross-chain USDC bridge

## Notes

This repository is structured as a production-ready base with real UI/API flows, but final on-chain completeness depends on your local Aleo toolchain, funded wallets, and deployed program IDs in your environment.
