import { computeProducts } from './products';

export function findReceipt(state, id) {
    const receipt = state.receipts.receipts.find(receipt => receipt.id === id);

    if (!receipt) {
        return null;
    }

    const products = computeProducts(receipt.products);

    receipt.products = products.products;
    receipt.total = products.total;

    return receipt;
}
