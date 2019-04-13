import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';

import { ActionSheet, Button, Content, Icon, ListItem, Spinner, Text, Title, Toast, View } from 'native-base';

import { addProduct, loadProducts, removeProduct, resetProducts, updateProduct } from '../actions/products';
import { addReceipt } from '../actions/receipts';

import List from '../components/List';
import Input from '../components/Input';

import { toNumber } from '../utils/string';

import styles, { colors } from '../styles';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalType: false,
            modalInputTitle: '',
        };
    }

    async handleAdd() {
        const { dispatch } = this.props;

        ActionSheet.show(
            {
                title: 'Добавить товар?',
                options: ['Добавить', 'Отменить'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    await dispatch(addProduct());

                    Toast.show({
                        position: 'bottom',
                        text: 'Товар добавлен',
                        buttonText: 'Закрыть',
                    });
                }
            },
        );
    }

    async handleSave() {
        const { products, dispatch } = this.props;
        const { modalInputTitle } = this.state;

        if (modalInputTitle.length < 2 || products.length === 0) {
            return;
        }

        this.handleClose();

        await dispatch(addReceipt({
            title: modalInputTitle,
            products: [...products],
        }));

        Toast.show({
            position: 'bottom',
            text: 'Квитанция сохранена',
            buttonText: 'Закрыть',
        });
    }

    async handleReset() {
        const { dispatch } = this.props;

        ActionSheet.show(
            {
                title: 'Очистить таблицу?',
                options: ['Очистить', 'Отменить'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    await dispatch(resetProducts('quantity', 0));

                    Toast.show({
                        position: 'bottom',
                        text: 'Таблица очищена',
                        buttonText: 'Закрыть',
                    });
                }
            },
        );
    }

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

    async handleClose() {
        this.setState({
            modalType: false,
            modalInputTitle: '',
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
        const { modalType, modalInputTitle } = this.state;

        console.log('HomeScreen:', loading, products);

        return (
            <>
                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    useNativeDriver
                    isVisible={modalType === 'save'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={[styles.mx5, styles.p3, styles.bgWhite, { borderRadius: 5 }]}>
                        <Title style={[styles.mb2, styles.textLeft, styles.dark]}>
                            Сохранить квитанцию?
                        </Title>

                        <Input
                            style={[styles.mb4, { fontSize: 16, borderBottomWidth: 1, borderBottomColor: colors.gray }]}
                            disableFullscreenUI
                            selectTextOnFocus
                            autoFocus
                            onChangeText={text => this.setState({ modalInputTitle: text })}
                            value={modalInputTitle}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Button
                                style={styles.mx1}
                                transparent
                                onPress={() => this.handleClose()}
                            >
                                <Text>Отменить</Text>
                            </Button>
                            <Button
                                style={styles.mx1}
                                primary
                                onPress={() => this.handleSave()}
                            >
                                <Text>Сохранить</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

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
                                onPress={() => this.setState({ modalType: 'save' })}
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
