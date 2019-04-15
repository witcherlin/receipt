import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Content, Icon, ListItem, Spinner, Text, Title, Toast, View } from 'native-base';

import { addProduct, removeProduct, resetProducts, updateProduct } from '../actions/products';
import { addReceipt } from '../actions/receipts';

import { getProducts, getProductsTotal } from '../selectors/products';

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
        const { products, total, dispatch } = this.props;

        Modal.show({
            state: {
                title: '',
                valid: false,
            },
            title: 'Сохранить квитанцию?',
            body: (modal) => (
                <Input
                    style={[
                        styles.bb1,
                        styles.fontRegular,
                        {
                            color: !modal.state.valid || total <= 0 ? colors.danger : colors.dark,
                            borderColor: !modal.state.valid || total <= 0 ? colors.danger : colors.gray,
                        },
                    ]}
                    disableFullscreenUI
                    selectTextOnFocus
                    autoFocus
                    onChangeText={text => modal.setState({ title: text, valid: text.length > 2 })}
                    value={modal.state.title}
                />
            ),
            buttons: (modal) => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        if (!modal.state.valid || total <= 0) {
                            return;
                        }

                        Modal.hide();

                        await dispatch(addReceipt({
                            title: modal.state.title,
                            products,
                            total,
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
            title: 'Очистить количество?',
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

    async handleUpdate(product, property, value) {
        await this.props.dispatch(updateProduct(product.id, { [property]: value }));
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

    render() {
        const { loading, products, total } = this.props;

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
                                        styles.bb1,
                                        {
                                            height: 50,
                                            flexDirection: 'row',
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <View style={[styles.flex2, styles.br1, { borderColor: colors.gray }]}>
                                            <Input
                                                style={{ height: 50, fontSize: 16 }}
                                                textAlign="center"
                                                disableFullscreenUI
                                                selectTextOnFocus
                                                onChangeText={text => this.handleUpdate(product, 'title', text)}
                                                value={product.title}
                                            />
                                        </View>
                                        <View style={[
                                            styles.flex2,
                                            styles.bgLight,
                                            styles.br1,
                                            { borderColor: colors.gray },
                                        ]}>
                                            <Input
                                                style={{ height: 49, fontSize: 16 }}
                                                keyboardType="decimal-pad"
                                                textAlign="center"
                                                disableFullscreenUI
                                                selectTextOnFocus
                                                onChangeText={text => this.handleUpdate(product, 'quantity', toNumber(text))}
                                                value={product.quantity.toString()}
                                            />
                                        </View>
                                        <View style={[styles.flex1, styles.br1, { borderColor: colors.gray }]}>
                                            <Input
                                                style={{ height: 50, fontSize: 16 }}
                                                keyboardType="decimal-pad"
                                                textAlign="center"
                                                disableFullscreenUI
                                                selectTextOnFocus
                                                onChangeText={text => this.handleUpdate(product, 'price', toNumber(text))}
                                                value={product.price.toString()}
                                            />
                                        </View>
                                        <View style={[styles.flex2, { alignItems: 'center' }]}>
                                            <Text style={[styles.fontRegular, styles.fontBold]}>
                                                {product.total.toFixed(2)}
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
                                {total.toFixed(2)} грн
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
        products: getProducts(state),
        total: getProductsTotal(state),
    }),
)(HomeScreen);
