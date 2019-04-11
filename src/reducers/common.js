import { SET_ERROR, SET_SPINNER } from '../actions/common';

const initialState = {
    spinner: false,
    error: null,
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case SET_SPINNER:
            return {
                ...state,
                spinner: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
