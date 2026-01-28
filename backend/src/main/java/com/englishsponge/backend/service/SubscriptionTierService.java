package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.SubscriptionTiersDto;
import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.remote.DbExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Slf4j
@Service
public class SubscriptionTierService {

    private final DbExecutor dbExecutor;
    List<SubscriptionTiersDto> subscriptionTiers;

    public SubscriptionTierService(DbExecutor dbExecutor) {
        this.dbExecutor = dbExecutor;
        subscriptionTiers = dbExecutor.run("select * from subscription_tiers order by price;",
                                           SubscriptionTiersDto.class,
                                           null);
    }

    public Set<Integer> validSubscriptionTiers(UserDto user) {
        Set<Integer> validSubscriptionTiers = new HashSet<>();

        // In case no user logged in and null is propogating
        if (user == null) {
            validSubscriptionTiers.add(subscriptionTiers.getFirst().getId());
            return validSubscriptionTiers;
        }

        for (SubscriptionTiersDto subscriptionTier : subscriptionTiers) {
            if (Objects.equals(subscriptionTier.getId(), user.getSubscriptionTier())) {
                validSubscriptionTiers.add(subscriptionTier.getId());
                break;
            }
            validSubscriptionTiers.add(subscriptionTier.getId());
        }
        return validSubscriptionTiers;
    }

    public void refreshSubscriptionTiers() {
        subscriptionTiers = dbExecutor.run("select * from subscription_tiers order by price;",
                                           SubscriptionTiersDto.class,
                                           null);
    }

    public List<SubscriptionTiersDto> getTiers() {
        return subscriptionTiers;
    }
}
