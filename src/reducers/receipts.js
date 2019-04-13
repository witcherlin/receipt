import {
    ADD_RECEIPT,
    REMOVE_RECEIPT,
    RESET_RECEIPTS,
    SET_LOADING,
    SET_RECEIPTS,
    UPDATE_RECEIPT,
} from '../actions/receipts';

const initialState = {
    loading: false,
    receipts: [],
    updatedAt: Date.now(),
    createdAt: Date.now(),
};

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_RECEIPTS:
            return {
                ...state,
                receipts: [...action.payload],
                updatedAt: Date.now(),
            };
        case RESET_RECEIPTS:
            return {
                ...state,
                receipts: state.receipts.map((receipt) => {
                    if (action.payload) {
                        receipt[action.payload.column] = action.payload.value;
                    }
                    return receipt;
                }),
                updatedAt: Date.now(),
            };
        case ADD_RECEIPT:
            return {
                ...state,
                receipts: [
                    ...state.receipts,
                    action.payload,
                ],
                updatedAt: Date.now(),
            };
        case UPDATE_RECEIPT:
            return {
                ...state,
                receipts: state.receipts.map((receipt) => {
                    if (receipt.id === action.payload.id) {
                        return {
                            ...receipt,
                            ...action.payload.data,
                        };
                    }
                    return receipt;
                }),
                updatedAt: Date.now(),
            };
        case REMOVE_RECEIPT:
            return {
                ...state,
                receipts: state.receipts.filter(receipt => receipt.id !== action.payload),
                updatedAt: Date.now(),
            };
        default:
            return state;
    }
}
