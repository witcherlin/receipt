import AsyncStorage from '@react-native-community/async-storage';

import uniqid from '../utils/uniqid';

import { setError, setSpinner } from './common';

export const LOAD_PRODUCTS = '@@products/LOAD_PRODUCTS';
export const RESET_PRODUCTS = '@@products/RESET_PRODUCTS';
export const REFRESH_PRODUCTS = '@@products/REFRESH_PRODUCTS';
export const ADD_PRODUCT = '@@products/ADD_PRODUCT';
export const UPDATE_PRODUCT = '@@products/UPDATE_PRODUCT';
export const REMOVE_PRODUCT = '@@products/REMOVE_PRODUCT';

export function loadProducts() {
    return async (dispatch) => {
        await dispatch(setSpinner(true));

        try {
            const products = await AsyncStorage.getItem('@receipt/products');

            await dispatch({
                type: LOAD_PRODUCTS,
                payload: JSON.parse(products) || [],
            });

            setTimeout(() => dispatch(setSpinner(false)), 250);
        } catch (err) {
            await dispatch(setError(err));
        }
    };
}

export function saveProducts() {
    return async (dispatch, getStore) => {
        const { products } = getStore();

        try {
            await AsyncStorage.setItem('@receipt/products', JSON.stringify(products));
        } catch (err) {
            await dispatch(setError(err));
        }
    };
}

export function resetProducts() {
    return async (dispatch) => {
        await dispatch({
            type: RESET_PRODUCTS,
        });

        await dispatch(saveProducts());
    };
}

export function refreshProducts(column = false, value = '') {
    return async (dispatch) => {
        await dispatch({
            type: REFRESH_PRODUCTS,
            payload: column ? {
                column,
                value,
            } : null,
        });

        await dispatch(saveProducts());
    };
}

export function addProduct(data = {}) {
    return async (dispatch) => {
        await dispatch({
            type: ADD_PRODUCT,
            payload: {
                title: '',
                quantity: 0,
                price: 0,
                ...data,
                id: uniqid(),
            },
        });

        await dispatch(saveProducts());
    };
}

export function updateProduct(id, data) {
    return async (dispatch) => {
        await dispatch({
            type: UPDATE_PRODUCT,
            payload: {
                id,
                data,
            },
        });

        await dispatch(saveProducts());
    };
}

export function removeProduct(id) {
    return async (dispatch) => {
        await dispatch({
            type: REMOVE_PRODUCT,
            payload: id,
        });

        await dispatch(saveProducts());
    };
}
