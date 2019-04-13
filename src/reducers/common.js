import { SET_ERROR, SET_LOADING } from '../actions/common';

const initialState = {
    loading: true,
    error: null,
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
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
