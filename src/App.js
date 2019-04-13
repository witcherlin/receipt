import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Container, Content, Root, Spinner, Text, Title, View } from 'native-base';

import { setLoading } from './actions/common';

import Drawer from './components/Drawer';

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
        initialRouteName: 'Receipt',
        contentComponent: props => <Drawer {...props} />,
    },
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
    componentWillMount() {
        const { dispatch } = this.props;

        setTimeout(() => dispatch(setLoading(false)), 500);
    }

    render() {
        const { common } = this.props;

        if (common.error) {
            return (
                <Root>
                    <Container>
                        <View style={styles.overlay}>
                            <Content padder>
                                <Title style={[styles.mb3, styles.dark]}>Произошла ошибка</Title>
                                <Text>{common.error.stack}</Text>
                            </Content>
                        </View>
                    </Container>
                </Root>
            );
        }

        return (
            <Root>
                <Container>
                    {common.loading && (
                        <View style={styles.overlay}>
                            <Spinner color={colors.primary}/>
                        </View>
                    )}

                    <AppContainer/>
                </Container>
            </Root>
        );
    }
}

export default connect(
    state => ({
        common: state.common,
    }),
)(App);
