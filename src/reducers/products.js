import {
    ADD_PRODUCT,
    LOAD_PRODUCTS,
    REFRESH_PRODUCTS,
    REMOVE_PRODUCT,
    RESET_PRODUCTS,
    UPDATE_PRODUCT,
} from '../actions/products';

const initialState = [];

export default function products(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return [...action.payload];
        case RESET_PRODUCTS:
            return [...initialState];
        case ADD_PRODUCT:
            return [
                ...state,
                action.payload,
            ];
        case UPDATE_PRODUCT:
            return state.map((product) => {
                if (product.id === action.payload.id) {
                    return {
                        ...product,
                        ...action.payload.data,
                    };
                }
                return product;
            });
        case REMOVE_PRODUCT:
            return state.filter(product => product.id !== action.payload);
        case REFRESH_PRODUCTS:
            return state.map((product) => {
                if (action.payload) {
                    product[action.payload.column] = action.payload.value;
                } else {
                    product.title = '';
                    product.quantity = 0;
                    product.price = 0;
                }
                return product;
            });
        default:
            return state;
    }
}
