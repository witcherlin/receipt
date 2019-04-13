import AsyncStorage from '@react-native-community/async-storage';

import uniqid from '../utils/uniqid';

import { setError, setSpinner } from './common';

export const LOAD_RECEIPTS = '@@receipts/LOAD_RECEIPTS';
export const RESET_RECEIPTS = '@@receipts/RESET_RECEIPTS';
export const ADD_RECEIPT = '@@receipts/ADD_RECEIPT';
export const UPDATE_RECEIPT = '@@receipts/UPDATE_RECEIPT';
export const REMOVE_RECEIPT = '@@receipts/REMOVE_RECEIPT';

export function loadReceipts() {
    return async (dispatch) => {
        await dispatch(setSpinner(true));

        try {
            const receipts = await AsyncStorage.getItem('@receipt/receipts');

            await dispatch({
                type: LOAD_RECEIPTS,
                payload: JSON.parse(receipts) || [],
            });

            setTimeout(() => dispatch(setSpinner(false)), 1250);
        } catch (err) {
            await dispatch(setError(err));
        }
    };
}

export function saveReceipts() {
    return async (dispatch, getStore) => {
        const { receipts } = getStore();

        try {
            await AsyncStorage.setItem('@receipt/receipts', JSON.stringify(receipts));
        } catch (err) {
            await dispatch(setError(err));
        }
    };
}

export function resetReceipts() {
    return async (dispatch) => {
        await dispatch({
            type: RESET_RECEIPTS,
        });

        await dispatch(saveReceipts());
    };
}

export function addReceipt(receipt) {
    return async (dispatch) => {
        await dispatch({
            type: ADD_RECEIPT,
            payload: {
                ...receipt,
                id: uniqid(),
                createdAt: Date.now(),
            },
        });

        await dispatch(saveReceipts());
    };
}

export function updateReceipt(id, data) {
    return async (dispatch) => {
        await dispatch({
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
        await dispatch({
            type: REMOVE_RECEIPT,
            payload: id,
        });

        await dispatch(saveReceipts());
    };
}
