export function getProducts(state) {
    return state.products.products.map(product => ({
        ...product,
        total: product.quantity * product.price,
    }));
}

export function getProductsTotal(state) {
    return getProducts(state).reduce((total, product) => (total + product.total), 0);
}
