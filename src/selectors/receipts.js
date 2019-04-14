import moment from 'moment';

export function getReceipts(state) {
    return state.receipts.receipts
        .sort((a, b) => (b.createdAt - a.createdAt))
        .map(receipt => ({
            ...receipt,
            products: receipt.products.filter(product => product.total > 0),
            createdAt: moment(receipt.createdAt).format('DD.MM.YYYY HH:mm'),
        }));
}

export function getReceiptById(state, id) {
    return getReceipts(state).find(receipt => receipt.id === id);
}
