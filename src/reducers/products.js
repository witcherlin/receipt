import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    RESET_PRODUCTS,
    SET_LOADING,
    SET_PRODUCTS,
    UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
    loading: true,
    products: [],
    updatedAt: Date.now(),
    createdAt: Date.now(),
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
                updatedAt: Date.now(),
            };
        case RESET_PRODUCTS:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (action.payload) {
                        product[action.payload.column] = action.payload.value;
                    } else {
                        product.title = '';
                        product.quantity = 0;
                        product.price = 0;
                    }
                    return product;
                }),
                updatedAt: Date.now(),
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload,
                ],
                updatedAt: Date.now(),
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            ...action.payload.data,
                        };
                    }
                    return product;
                }),
                updatedAt: Date.now(),
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                updatedAt: Date.now(),
            };
        default:
            return state;
    }
}
