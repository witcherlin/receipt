import moment from 'moment';

import { computeProducts } from './products';

export function computeReceipts(receipts) {
    return receipts.map((receipt) => {
        const products = computeProducts(receipt.products);

        receipt.products = products.products;
        receipt.total = products.total;
        receipt.createdAt = moment(receipt.createdAt).format('DD.MM.YYYY HH:mm');

        return receipt;
    });
}

export function getReceipts(state) {
    return computeReceipts(state.receipts.receipts)
        .sort((a, b) => (b.createdAt - a.createdAt));
}

export function getReceiptById(state, id) {
    return getReceipts(state)
        .find(receipt => receipt.id === id);
}
