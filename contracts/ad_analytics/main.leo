program ad_analytics.aleo {
    record CampaignStats {
        owner: address,
        campaign_id: u64,
        impressions: u64,
        clicks: u64,
        spend_usdc: u64,
    }

    transition record_impression(stats: CampaignStats) -> CampaignStats {
        assert_eq(stats.owner, self.caller);
        return CampaignStats {
            owner: stats.owner,
            campaign_id: stats.campaign_id,
            impressions: stats.impressions + 1u64,
            clicks: stats.clicks,
            spend_usdc: stats.spend_usdc,
        };
    }

    transition record_click(stats: CampaignStats, cpc: u64) -> CampaignStats {
        assert_eq(stats.owner, self.caller);
        return CampaignStats {
            owner: stats.owner,
            campaign_id: stats.campaign_id,
            impressions: stats.impressions,
            clicks: stats.clicks + 1u64,
            spend_usdc: stats.spend_usdc + cpc,
        };
    }

    transition get_stats_proof(stats: CampaignStats) -> (u64, u64, u64) {
        assert_eq(stats.owner, self.caller);
        return (stats.impressions, stats.clicks, stats.spend_usdc);
    }
}
