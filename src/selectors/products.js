export function computeProducts(products) {
    return products.reduce((accumulator, product) => {
        const total = product.quantity * product.price;

        return {
            products: [...accumulator.products, { ...product, total }],
            total: accumulator.total + total,
        };
    }, {
        products: [],
        total: 0,
    });
}

export function getProducts(state) {
    return computeProducts(state.products.products);
}
