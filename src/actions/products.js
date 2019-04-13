import AsyncStorage from '@react-native-community/async-storage';

import uniqid from '../utils/uniqid';

import { setError } from './common';

export const SET_LOADING = '@@products/SET_LOADING';
export const SET_PRODUCTS = '@@products/SET_PRODUCTS';
export const RESET_PRODUCTS = '@@products/RESET_PRODUCTS';
export const ADD_PRODUCT = '@@products/ADD_PRODUCT';
export const UPDATE_PRODUCT = '@@products/UPDATE_PRODUCT';
export const REMOVE_PRODUCT = '@@products/REMOVE_PRODUCT';

export function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: value,
    };
}

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        payload: products,
    };
}

export function loadProducts() {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const products = JSON.parse(await AsyncStorage.getItem('@receipt/products')) || [];

            dispatch(setProducts(products));

            setTimeout(() => dispatch(setLoading(false)), 500);
        } catch (err) {
            console.error('LoadProductsError:', err);

            dispatch(setError(err));
        }
    };
}

export function saveProducts() {
    return async (dispatch, getStore) => {
        const { products: { products } } = getStore();

        try {
            await AsyncStorage.setItem('@receipt/products', JSON.stringify(products));
        } catch (err) {
            console.error('SaveProductsError:', err);

            dispatch(setError(err));
        }
    };
}

export function resetProducts(column = false, value = '') {
    return async (dispatch) => {
        dispatch({
            type: RESET_PRODUCTS,
            payload: column ? { column, value } : null,
        });

        await dispatch(saveProducts());
    };
}

export function addProduct(data = {}) {
    return async (dispatch) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: {
                title: '',
                quantity: 0,
                price: 0,
                ...data,
                id: uniqid(),
                createdAt: Date.now(),
            },
        });

        await dispatch(saveProducts());
    };
}

export function updateProduct(id, data) {
    return async (dispatch) => {
        dispatch({
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
        dispatch({
            type: REMOVE_PRODUCT,
            payload: id,
        });

        await dispatch(saveProducts());
    };
}
