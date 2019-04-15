export const SET_LOADING = '@@common/SET_LOADING';

export function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: value,
    };
}
