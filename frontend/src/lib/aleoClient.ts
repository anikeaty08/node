import { useWallet } from '@provablehq/aleo-wallet-adaptor-react'
import type { TransactionOptions } from '@provablehq/aleo-types'
import { config } from './config'

export function useAleoActions() {
  const wallet = useWallet()

  async function execute(program: string, fn: string, inputs: string[]) {
    const tx: TransactionOptions = { program, function: fn, inputs, privateFee: true }
    return wallet.executeTransaction(tx)
  }

  async function requestRecords(program: string) {
    const records = await wallet.requestRecords(program, true)
    return records as Array<Record<string, unknown>>
  }

  async function waitForFinalStatus(transactionId: string, timeoutMs = 90000) {
    const started = Date.now()
    while (Date.now() - started < timeoutMs) {
      const status = await wallet.transactionStatus(transactionId)
      if (status.status === 'accepted' || status.status === 'rejected' || status.status === 'failed') {
        return status
      }
      await new Promise((resolve) => setTimeout(resolve, 2500))
    }
    return { status: 'pending', transactionId }
  }

  return {
    wallet,
    requestRecords,
    waitForFinalStatus,
    createCampaign: (creativeUri: string, category: string, budget: bigint, cpc: bigint, cpm: bigint) =>
      execute(config.programs.adRegistry, 'create_campaign', [
        `${creativeUri}field`,
        `${category}field`,
        `${budget}u64`,
        `${cpc}u64`,
        `${cpm}u64`,
      ]),
    registerSlot: (siteName: string, category: string, dailyTraffic: bigint) =>
      execute(config.programs.adRegistry, 'register_slot', [
        `${siteName}field`,
        `${category}field`,
        `${dailyTraffic}u64`,
      ]),
    assignCampaign: (slotRecord: string, campaignId: bigint) =>
      execute(config.programs.adRegistry, 'assign_campaign', [slotRecord, `${campaignId}u64`]),
    deactivateCampaign: (campaignRecord: string) =>
      execute(config.programs.adRegistry, 'deactivate_campaign', [campaignRecord]),
    withdrawUsdc: (earningsRecord: string, amount: bigint) =>
      execute(config.programs.adPayouts, 'withdraw_usdc', [earningsRecord, `${amount}u64`]),
    withdrawUsdcx: (earningsRecord: string, amount: bigint) =>
      execute(config.programs.adPayouts, 'withdraw_usdcx', [earningsRecord, `${amount}u64`]),
  }
}
