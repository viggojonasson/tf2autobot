import { ItemsDict, TradeOffer } from 'steam-tradeoffer-manager';

export default function itemList(offer: TradeOffer): ItemSKUList {
    const items: { our: Record<string, unknown>; their: Record<string, unknown> } = offer.data('dict') as ItemsDict;
    const their: string[] = [];
    for (const theirItemsSku in items.their) {
        if (!Object.prototype.hasOwnProperty.call(items.their, theirItemsSku)) {
            continue;
        }
        their.push(theirItemsSku);
    }

    const our: string[] = [];
    for (const ourItemsSku in items.our) {
        if (!Object.prototype.hasOwnProperty.call(items.our, ourItemsSku)) {
            continue;
        }
        our.push(ourItemsSku);
    }
    return { their, our };
}

interface ItemSKUList {
    their: string[];
    our: string[];
}
