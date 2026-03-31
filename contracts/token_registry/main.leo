program token_registry.aleo {
    // Replace with official Aleo Testnet program IDs from docs before deployment.
    const USDC_PROGRAM_ID: field = 1001field;
    const USDCX_PROGRAM_ID: field = 1002field;

    record TokenBalance {
        owner: address,
        token: field,
        amount: u64,
    }

    transition transfer_usdc(to: address, amount: u64) {
        assert_gt(amount, 0u64);
        // Call into official USDC program transfer transition.
        // Exact cross-program syntax depends on finalized token interface.
        let _to = to;
        let _amount = amount;
    }

    transition transfer_usdcx(to: address, amount: u64) {
        assert_gt(amount, 0u64);
        let _to = to;
        let _amount = amount;
    }

    transition get_balance(owner: address, token: field) -> TokenBalance {
        return TokenBalance {
            owner: owner,
            token: token,
            amount: 0u64,
        };
    }

    transition approve_spend(spender: address, amount: u64) {
        assert_gt(amount, 0u64);
        let _spender = spender;
    }
}
