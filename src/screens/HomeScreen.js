import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Content, Icon, ListItem, Spinner, Text, Title, Toast, View } from 'native-base';

import { addProduct, loadProducts, removeProduct, resetProducts, updateProduct } from '../actions/products';
import { addReceipt } from '../actions/receipts';

import { getProducts } from '../selectors/products';

import List from '../components/List';
import Input from '../components/Input';

import Modal from '../containers/Modal';

import { toNumber } from '../utils/string';

import styles, { colors } from '../styles';

class HomeScreen extends Component {
    async handleAdd() {
        const { dispatch } = this.props;

        Modal.show({
            title: 'Добавить товар?',
            buttons: () => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        await dispatch(addProduct());

                        Toast.show({
                            position: 'bottom',
                            text: 'Товар добавлен',
                            buttonText: 'Закрыть',
                        });
                    },
                    primary: true,
                    close: true,
                    text: 'Добавить',
                },
            ]),
        });
    }

    async handleSave() {
        const { products, dispatch } = this.props;

        Modal.show({
            state: {
                title: '',
                valid: false,
            },
            title: 'Сохранить квитанцию?',
            body: (state) => (
                <Input
                    style={{
                        fontSize: 16,
                        color: !state.valid ? colors.danger : colors.dark,
                        borderBottomWidth: 1,
                        borderBottomColor: !state.valid ? colors.danger : colors.gray,
                    }}
                    disableFullscreenUI
                    selectTextOnFocus
                    autoFocus
                    onChangeText={text => state.set({ title: text, valid: text.length > 2 })}
                    value={state.title}
                />
            ),
            buttons: (state) => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        if (!state.valid) {
                            return;
                        }

                        Modal.hide();

                        await dispatch(addReceipt({
                            title: state.title,
                            products: [...products],
                        }));

                        Toast.show({
                            position: 'bottom',
                            text: 'Квитанция сохранена',
                            buttonText: 'Закрыть',
                        });
                    },
                    primary: true,
                    text: 'Сохранить',
                },
            ]),
        });
    }

    async handleReset() {
        const { dispatch } = this.props;

        Modal.show({
            title: 'Очистить таблицу?',
            buttons: () => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        await dispatch(resetProducts('quantity', 0));

                        Toast.show({
                            position: 'bottom',
                            text: 'Таблица очищена',
                            buttonText: 'Закрыть',
                        });
                    },
                    primary: true,
                    close: true,
                    text: 'Очистить',
                },
            ]),
        });
    }

    async handleRemove(product) {
        const { dispatch } = this.props;

        Modal.show({
            title: 'Удалить товар?',
            buttons: () => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        await dispatch(removeProduct(product.id));

                        Toast.show({
                            position: 'bottom',
                            text: 'Товар удален',
                            buttonText: 'Закрыть',
                        });
                    },
                    primary: true,
                    close: true,
                    text: 'Удалить',
                },
            ]),
        });
    }

    computeTotal() {
        return this.props.products.reduce((total, product) => (total + (product.quantity * product.price)), 0);
    }

    componentDidMount() {
        this.props.dispatch(loadProducts());
    }

    render() {
        const { loading, products, dispatch } = this.props;

        return (
            <>
                <Content>
                    <View style={[styles.bgPrimary, { height: 42, flexDirection: 'row', alignItems: 'center' }]}>
                        <Title style={[styles.flex2, styles.white]}>Название</Title>
                        <Title style={[styles.flex2, styles.white]}>Кол.</Title>
                        <Title style={[styles.flex1, styles.white]}>Цена</Title>
                        <Title style={[styles.flex2, styles.white]}>Сумма</Title>
                    </View>

                    {loading
                        ? (
                            <View style={[styles.flex1, styles.pt4]}>
                                <Spinner color={colors.primary}/>
                            </View>
                        )
                        : (
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
                                                style={{ height: 50, fontSize: 16 }}
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
                                                style={{ height: 49, fontSize: 16 }}
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
                                                style={{ height: 50, fontSize: 16 }}
                                                keyboardType="decimal-pad"
                                                textAlign="center"
                                                disableFullscreenUI
                                                selectTextOnFocus
                                                onChangeText={text => dispatch(updateProduct(product.id, { price: toNumber(text) }))}
                                                value={product.price.toString()}
                                            />
                                        </View>
                                        <View style={[styles.flex2, { alignItems: 'center' }]}>
                                            <Text style={[styles.fontBold, { fontSize: 16 }]}>
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
                        )
                    }
                </Content>

                {!loading && (
                    <View style={[styles.bgSecondary, { height: 42, flexDirection: 'row' }]}>
                        <View style={[styles.flex1, { flexDirection: 'row' }]}>
                            <Button
                                style={[styles.flex1, { height: 'auto' }]}
                                full
                                onPress={() => this.handleAdd()}
                            >
                                <Icon style={styles.white} type="MaterialIcons" name="add"/>
                            </Button>
                            <Button
                                style={[styles.flex1, { height: 'auto' }]}
                                full
                                onPress={() => this.handleSave()}
                            >
                                <Icon style={styles.white} type="MaterialIcons" name="save"/>
                            </Button>
                            <Button
                                style={[styles.flex1, { height: 'auto' }]}
                                full
                                onPress={() => this.handleReset()}
                            >
                                <Icon style={styles.white} type="MaterialIcons" name="refresh"/>
                            </Button>
                        </View>

                        <View style={[styles.flex1, styles.bgDark, { alignItems: 'center', justifyContent: 'center' }]}>
                            <Title style={styles.white}>
                                {this.computeTotal().toFixed(2)} грн
                            </Title>
                        </View>
                    </View>
                )}
            </>
        );
    }
}

export default connect(
    state => ({
        loading: state.products.loading,
        products: state.products.products,
    }),
)(HomeScreen);
