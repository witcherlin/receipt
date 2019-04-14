import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, View } from 'react-native';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import products from './reducers/products';
import receipts from './reducers/receipts';

import App from './App';

import styles, { colors } from './styles';

const reducers = combineReducers({
    products,
    receipts,
});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
));

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={[{ height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }, styles.bgSecondary]}>
                    <StatusBar translucent barStyle="light-content" backgroundColor={colors.secondary}/>
                </View>

                <App/>
            </Provider>
        );
    }
}
