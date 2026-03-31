program ad_registry.aleo {
    record Campaign {
        owner: address,
        campaign_id: u64,
        budget_usdc: u64,
        cpc_usdc: u64,
        cpm_usdc: u64,
        active: bool,
    }

    record AdSlot {
        owner: address,
        slot_id: u64,
        campaign_id: u64,
    }

    struct CampaignPublicInfo {
        campaign_id: u64,
        creative_uri: field,
        category: field,
        active: bool,
    }

    struct SlotPublicInfo {
        slot_id: u64,
        developer: address,
        site_name: field,
        category: field,
    }

    mapping campaigns_public: u64 => CampaignPublicInfo;
    mapping slots_public: u64 => SlotPublicInfo;
    mapping campaign_nonce: field => u64;
    mapping slot_nonce: field => u64;

    transition create_campaign(creative_uri: field, category: field, budget: u64, cpc: u64, cpm: u64) -> Campaign {
        let owner: address = self.caller;
        let current = Mapping::get_or_use(campaign_nonce, 0field, 0u64);
        let next = current + 1u64;
        Mapping::set(campaign_nonce, 0field, next);
        Mapping::set(campaigns_public, next, CampaignPublicInfo {
            campaign_id: next,
            creative_uri: creative_uri,
            category: category,
            active: true,
        });

        return Campaign {
            owner: owner,
            campaign_id: next,
            budget_usdc: budget,
            cpc_usdc: cpc,
            cpm_usdc: cpm,
            active: true,
        };
    }

    transition register_slot(site_name: field, category: field, daily_traffic: u64) -> AdSlot {
        let _daily_traffic = daily_traffic;
        let owner: address = self.caller;
        let current = Mapping::get_or_use(slot_nonce, 0field, 0u64);
        let next = current + 1u64;
        Mapping::set(slot_nonce, 0field, next);
        Mapping::set(slots_public, next, SlotPublicInfo {
            slot_id: next,
            developer: owner,
            site_name: site_name,
            category: category,
        });

        return AdSlot {
            owner: owner,
            slot_id: next,
            campaign_id: 0u64,
        };
    }

    transition assign_campaign(slot: AdSlot, campaign_id: u64) -> AdSlot {
        assert_eq(slot.owner, self.caller);
        return AdSlot {
            owner: slot.owner,
            slot_id: slot.slot_id,
            campaign_id: campaign_id,
        };
    }

    transition deactivate_campaign(campaign: Campaign) -> Campaign {
        assert_eq(campaign.owner, self.caller);
        Mapping::set(campaigns_public, campaign.campaign_id, CampaignPublicInfo {
            campaign_id: campaign.campaign_id,
            creative_uri: 0field,
            category: 0field,
            active: false,
        });
        return Campaign {
            owner: campaign.owner,
            campaign_id: campaign.campaign_id,
            budget_usdc: campaign.budget_usdc,
            cpc_usdc: campaign.cpc_usdc,
            cpm_usdc: campaign.cpm_usdc,
            active: false,
        };
    }
}
