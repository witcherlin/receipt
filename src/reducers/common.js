import { SET_LOADING } from '../actions/common';

const initialState = {
    loading: true,
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
