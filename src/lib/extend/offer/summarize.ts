import { TradeOffer, ItemsDict, OurTheirItemsDict, ItemsValue } from 'steam-tradeoffer-manager';
import { Currency } from '../../../types/TeamFortress2';
import SchemaManager from 'tf2-schema-2';

import Currencies from 'tf2-currencies';
import SKU from 'tf2-sku-2';

export = function (schema: SchemaManager.Schema): string {
    const self = this as TradeOffer;
    const value: { our: Currency; their: Currency } = self.data('value') as ItemsValue;

    const items: {
        our: OurTheirItemsDict;
        their: OurTheirItemsDict;
    } = (self.data('dict') as ItemsDict) || { our: null, their: null };

    if (!value) {
        return 'Asked: ' + summarizeItems(items.our, schema) + '\nOffered: ' + summarizeItems(items.their, schema);
    } else {
        return (
            'Asked: ' +
            new Currencies(value.our).toString() +
            ' (' +
            summarizeItems(items.our, schema) +
            ')\nOffered: ' +
            new Currencies(value.their).toString() +
            ' (' +
            summarizeItems(items.their, schema) +
            ')'
        );
    }
};

function summarizeItems(dict: OurTheirItemsDict, schema: SchemaManager.Schema): string {
    if (dict === null) {
        return 'unknown items';
    }

    const summary: string[] = [];

    for (const sku in dict) {
        if (!Object.prototype.hasOwnProperty.call(dict, sku)) {
            continue;
        }

        const amount = dict[sku].amount;
        const name = schema.getName(SKU.fromString(sku), false);

        summary.push(name + (amount > 1 ? ` x${amount}` : ''));
    }

    if (summary.length === 0) {
        return 'nothing';
    }

    return summary.join(', ');
}
