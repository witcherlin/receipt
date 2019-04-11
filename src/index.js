import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App';

import common from './reducers/common';
import products from './reducers/products';
import receipts from './reducers/receipts';

const reducers = combineReducers({
    common,
    products,
    receipts,
});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
));

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}
