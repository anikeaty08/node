program ad_payouts.aleo {
    record DeveloperEarnings {
        owner: address,
        earnings_usdc: u64,
        earnings_usdcx: u64,
    }

    transition add_earnings(earnings: DeveloperEarnings, amount_usdc: u64) -> DeveloperEarnings {
        assert_eq(earnings.owner, self.caller);
        return DeveloperEarnings {
            owner: earnings.owner,
            earnings_usdc: earnings.earnings_usdc + amount_usdc,
            earnings_usdcx: earnings.earnings_usdcx,
        };
    }

    transition withdraw_usdc(earnings: DeveloperEarnings, amount: u64) -> DeveloperEarnings {
        assert_eq(earnings.owner, self.caller);
        assert_gte(earnings.earnings_usdc, amount);
        return DeveloperEarnings {
            owner: earnings.owner,
            earnings_usdc: earnings.earnings_usdc - amount,
            earnings_usdcx: earnings.earnings_usdcx,
        };
    }

    transition withdraw_usdcx(earnings: DeveloperEarnings, amount: u64) -> DeveloperEarnings {
        assert_eq(earnings.owner, self.caller);
        assert_gte(earnings.earnings_usdcx, amount);
        return DeveloperEarnings {
            owner: earnings.owner,
            earnings_usdc: earnings.earnings_usdc,
            earnings_usdcx: earnings.earnings_usdcx - amount,
        };
    }
}
