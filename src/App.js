import React, { Component } from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Container, Root } from 'native-base';

import Drawer from './containers/Drawer';
import Modal from './containers/Modal';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/receipt/ListScreen';
import DetailScreen from './screens/receipt/DetailScreen';

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

export default class App extends Component {
    render() {
        return (
            <Root>
                <Container>
                    <AppContainer/>

                    <Modal ref={ref => (Modal.instance = ref)}/>
                </Container>
            </Root>
        );
    }
}
