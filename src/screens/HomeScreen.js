import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActionSheet, Button, Content, Icon, ListItem, Text, Title, Toast, View } from 'native-base';

import { loadProducts, removeProduct, updateProduct } from '../actions/products';

import List from '../components/List';
import Input from '../components/Input';

import Footer from '../containers/Footer';

import { toNumber } from '../utils/string';

import styles, { colors } from '../styles';

class HomeScreen extends Component {
    async handleRemove(product) {
        const { dispatch } = this.props;

        ActionSheet.show(
            {
                title: 'Удалить товар?',
                options: ['Удалить', 'Отменить'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    await dispatch(removeProduct(product.id));

                    Toast.show({
                        position: 'bottom',
                        text: 'Товар удален',
                        buttonText: 'Закрыть',
                    });
                }
            },
        );
    }

    componentDidMount() {
        this.props.dispatch(loadProducts());
    }

    render() {
        const { products, dispatch } = this.props;

        console.log(products);

        return (
            <>
                <Content>
                    <View style={[
                        styles.bgPrimary,
                        { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
                    ]}>
                        <View style={styles.flex2}>
                            <Title style={styles.white}>Название</Title>
                        </View>
                        <View style={styles.flex2}>
                            <Title style={styles.white}>Кол.</Title>
                        </View>
                        <View style={styles.flex1}>
                            <Title style={styles.white}>Цена</Title>
                        </View>
                        <View style={styles.flex2}>
                            <Title style={styles.white}>Сумма</Title>
                        </View>
                    </View>

                    <List
                        data={products}
                        body={(product) => (
                            <ListItem style={[
                                styles.m0,
                                styles.p0,
                                {
                                    height: 50,
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.gray,
                                },
                            ]}>
                                <View style={[styles.flex2, { borderRightWidth: 1, borderColor: colors.gray }]}>
                                    <Input
                                        style={[styles.flex1, { fontSize: 17 }]}
                                        textAlign="center"
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        onChangeText={text => dispatch(updateProduct(product.id, { title: text }))}
                                        value={product.title}
                                    />
                                </View>
                                <View style={[
                                    styles.flex2,
                                    styles.bgLight,
                                    { borderRightWidth: 1, borderColor: colors.gray },
                                ]}>
                                    <Input
                                        style={[styles.flex1, { fontSize: 17 }]}
                                        keyboardType="decimal-pad"
                                        textAlign="center"
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        onChangeText={text => dispatch(updateProduct(product.id, { quantity: toNumber(text) }))}
                                        value={product.quantity.toString()}
                                    />
                                </View>
                                <View style={[styles.flex1, { borderRightWidth: 1, borderColor: colors.gray }]}>
                                    <Input
                                        style={[styles.flex1, { fontSize: 17 }]}
                                        keyboardType="decimal-pad"
                                        textAlign="center"
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        onChangeText={text => dispatch(updateProduct(product.id, { price: toNumber(text) }))}
                                        value={product.price.toString()}
                                    />
                                </View>
                                <View style={[styles.flex2, { borderColor: colors.gray }]}>
                                    <Text style={[styles.fontBold, { alignSelf: 'center', fontSize: 17 }]}>
                                        {(product.quantity * product.price).toFixed(2)}
                                    </Text>
                                </View>
                            </ListItem>
                        )}
                        right={(product) => (
                            <Button
                                danger
                                onPress={() => this.handleRemove(product)}
                            >
                                <Icon name="trash"/>
                            </Button>
                        )}
                    />
                </Content>

                <Footer/>
            </>
        );
    }
}

export default connect(
    state => ({
        products: state.products,
    }),
)(HomeScreen);
