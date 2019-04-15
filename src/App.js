import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Container, Root, Spinner, View } from 'native-base';

import { setLoading } from './actions/common';
import { loadProducts } from './actions/products';
import { loadReceipts } from './actions/receipts';

import Drawer from './containers/Drawer';
import Modal from './containers/Modal';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/receipt/ListScreen';
import DetailScreen from './screens/receipt/DetailScreen';

import styles, { colors } from './styles';

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Receipt: {
            screen: createStackNavigator(
                {
                    List: { screen: ListScreen },
                    Detail: { screen: DetailScreen },
                },
                {
                    headerMode: 'none',
                    initialRouteName: 'List',
                },
            ),
        },
    },
    {
        drawerType: 'slide',
        initialRouteName: 'Home',
        contentComponent: props => <Drawer {...props} />,
    },
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
    async componentDidMount() {
        const { dispatch } = this.props;

        dispatch(setLoading(true));
        await dispatch(loadProducts());
        await dispatch(loadReceipts());
        dispatch(setLoading(false));
    }

    render() {
        const { loading } = this.props;

        console.log(loading);

        return (
            <Root>
                <Container>
                    {loading
                        ? (
                            <View style={[styles.flex1, styles.pt4]}>
                                <Spinner color={colors.primary}/>
                            </View>
                        )
                        : (
                            <AppContainer/>
                        )
                    }

                    <Modal ref={ref => (Modal.instance = ref)}/>
                </Container>
            </Root>
        );
    }
}

export default connect(
    state => ({
        loading: state.common.loading,
    }),
)(App);
