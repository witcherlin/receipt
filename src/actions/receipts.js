import AsyncStorage from '@react-native-community/async-storage';

import uniqid from '../utils/uniqid';

export const SET_LOADING = '@@receipts/SET_LOADING';
export const SET_RECEIPTS = '@@receipts/SET_RECEIPTS';
export const RESET_RECEIPTS = '@@receipts/RESET_RECEIPTS';
export const ADD_RECEIPT = '@@receipts/ADD_RECEIPT';
export const UPDATE_RECEIPT = '@@receipts/UPDATE_RECEIPT';
export const REMOVE_RECEIPT = '@@receipts/REMOVE_RECEIPT';

export function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: value,
    };
}

export function setReceipts(receipts) {
    return {
        type: SET_RECEIPTS,
        payload: receipts,
    };
}

export function loadReceipts() {
    return async (dispatch) => {
        const receipts = JSON.parse(await AsyncStorage.getItem('@receipt/receipts')) || [];

        dispatch(setReceipts(receipts));
    };
}

export function saveReceipts() {
    return async (dispatch, getStore) => {
        const { receipts: { receipts } } = getStore();

        await AsyncStorage.setItem('@receipt/receipts', JSON.stringify(receipts));
    };
}

export function resetReceipts(column = false, value = '') {
    return async (dispatch) => {
        dispatch({
            type: RESET_RECEIPTS,
            payload: column ? { column, value } : null,
        });

        await dispatch(saveReceipts());
    };
}

export function addReceipt(data = {}) {
    return async (dispatch) => {
        dispatch({
            type: ADD_RECEIPT,
            payload: {
                ...data,
                id: uniqid(),
                createdAt: Date.now(),
            },
        });

        await dispatch(saveReceipts());
    };
}

export function updateReceipt(id, data) {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_RECEIPT,
            payload: {
                id,
                data,
            },
        });

        await dispatch(saveReceipts());
    };
}

export function removeReceipt(id) {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_RECEIPT,
            payload: id,
        });

        await dispatch(saveReceipts());
    };
}
