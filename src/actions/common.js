export const SET_LOADING = '@@common/SET_LOADING';
export const SET_ERROR = '@@common/SET_ERROR';

export function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: value,
    };
}

export function setError(err) {
    return {
        type: SET_ERROR,
        payload: err,
    };
}
