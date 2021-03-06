import Bot from '../../Bot';

import { craftWeapons } from '../../../lib/data';

export default function craftClassWeapons(bot: Bot): Promise<void> {
    if (!bot.options.crafting.weapons.enable) {
        return;
    }
    const currencies = bot.inventoryManager.getInventory().getCurrencies();

    craftEachClassWeapons(bot, craftWeapons.scout, currencies);
    craftEachClassWeapons(bot, craftWeapons.soldier, currencies);
    craftEachClassWeapons(bot, craftWeapons.pyro, currencies);
    craftEachClassWeapons(bot, craftWeapons.demoman, currencies);
    craftEachClassWeapons(bot, craftWeapons.heavy, currencies);
    craftEachClassWeapons(bot, craftWeapons.engineer, currencies);
    craftEachClassWeapons(bot, craftWeapons.medic, currencies);
    craftEachClassWeapons(bot, craftWeapons.sniper, currencies);
    craftEachClassWeapons(bot, craftWeapons.spy, currencies);
}

function craftEachClassWeapons(bot: Bot, weapons: string[], currencies: { [sku: string]: string[] }): void {
    weapons.forEach((sku1, i) => {
        // first loop
        const wep1 = currencies[sku1].length;

        // check if that weapon1 only have 1 in inventory AND it's not in pricelist
        const isWep1 = wep1 === 1 && bot.pricelist.getPrice(sku1, true) === null;

        weapons.forEach((sku2, j) => {
            // second loop inside first loop, but ignore same index (same weapons)
            if (j !== i) {
                const wep2 = currencies[sku2].length;

                // check if that weapon2 only have 1 in inventory AND it's not in pricelist
                const isWep2 = wep2 === 1 && bot.pricelist.getPrice(sku2, true) === null;
                if (isWep1 && isWep2) {
                    // if both are different weapons and both wep1 and wep2 conditions are true, call combine function
                    bot.tf2gc.combineClassWeapon([sku1, sku2]);
                    // break
                    return;
                }
            }
        });
    });
}
