import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, H1, Root, Spinner, Text, View } from 'native-base';

import { loadProducts } from '../actions/products';
import { loadReceipts } from '../actions/receipts';

import StatusBar from '../components/StatusBar';

import Products from './Products';
import Footer from './Footer';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(loadProducts());
        this.props.dispatch(loadReceipts());
    }

    render() {
        const { common } = this.props;

        return (
            <Root>
                <StatusBar/>

                <Container>
                    {common.error
                        ? (
                            <Content>
                                <View style={{
                                    flex: 1,
                                    padding: 14,
                                }}>
                                    <H1 style={{ marginBottom: 14 }}>Произошла ошибка</H1>
                                    <Text>{common.error.stack}</Text>
                                </View>
                            </Content>
                        )
                        : common.spinner
                            ? <Spinner color="#36469b"/>
                            : (
                                <>
                                    <Content>
                                        <Products/>
                                    </Content>

                                    <Footer/>
                                </>
                            )
                    }
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
