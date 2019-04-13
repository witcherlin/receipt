import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';

import { ActionSheet, Button, Form, Icon, Input, Item, Label, Text, Title, Toast, View } from 'native-base';

import { addProduct, refreshProducts, removeProduct } from '../actions/products';
import { addReceipt } from '../actions/receipts';

import uniqid from '../utils/uniqid';

import styles from '../styles';

class Footer extends Component {
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

    async handleRefresh() {
        const { dispatch } = this.props;

        ActionSheet.show(
            {
                title: 'Очистить таблицу?',
                options: ['Очитстить', 'Отменить'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    await dispatch(refreshProducts('quantity', 0));

                    Toast.show({
                        position: 'bottom',
                        text: 'Таблица очищена',
                        buttonText: 'Закрыть',
                    });
                }
            },
        );
    }

    handleClose() {
        this.setState({
            modalType: false,
            modalInputTitle: '',
        });
    }

    computeTotal() {
        return this.props.products.reduce((total, product) => (total + (product.quantity * product.price)), 0);
    }

    render() {
        const { modalType, modalInputTitle } = this.state;

        return (
            <>
                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    isVisible={modalType === 'save'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={[styles.p3, styles.bgWhite, { borderRadius: 5 }]}>
                        <Title style={[styles.mb2, styles.dark]}>Сохранить квитанцию?</Title>

                        <Form style={styles.mb3}>
                            <Item style={styles.m0} stackedLabel error={modalInputTitle.length < 3}>
                                <Label>Название</Label>
                                <Input
                                    onChangeText={text => this.setState({ modalInputTitle: text })}
                                    value={modalInputTitle}
                                />
                            </Item>
                        </Form>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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

                <View style={[styles.bgSecondary, { flexDirection: 'row' }]}>
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
                            onPress={() => this.handleRefresh()}
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
            </>
        );
    }
}

export default connect(
    state => ({
        products: state.products,
    }),
)(Footer);
