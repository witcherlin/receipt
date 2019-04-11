export const SET_SPINNER = '@@common/SET_SPINNER';
export const SET_ERROR = '@@common/SET_ERROR';

export function setSpinner(value) {
    return {
        type: SET_SPINNER,
        payload: value,
    };
}

export function setError(err) {
    return {
        type: SET_ERROR,
        payload: err,
    };
}
