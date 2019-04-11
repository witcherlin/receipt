import { ADD_RECEIPT, LOAD_RECEIPTS, REMOVE_RECEIPT, RESET_RECEIPTS, UPDATE_RECEIPT } from '../actions/receipts';

const initialState = [];

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case LOAD_RECEIPTS:
            return [...action.payload];
        case RESET_RECEIPTS:
            return [...initialState];
        case ADD_RECEIPT:
            return [
                ...state,
                action.payload,
            ];
        case UPDATE_RECEIPT:
            return state.map((receipt) => {
                if (receipt.id === action.payload.id) {
                    return {
                        ...receipt,
                        ...action.payload.data,
                    };
                }
                return receipt;
            });
        case REMOVE_RECEIPT:
            return state.filter(receipt => receipt.id !== action.payload);
        default:
            return state;
    }
}
