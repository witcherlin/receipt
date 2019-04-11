import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { Button, FooterTab, Form, H3, Icon, Input, Item, Label, Text, Toast, View } from 'native-base';

import { addProduct, refreshProducts } from '../actions/products';
import { addReceipt } from '../actions/receipts';

const styles = StyleSheet.create({
    modal: {
        padding: 14,
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    container: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#3f51b5',
    },
    icon: {
        color: '#c6d5ec',
    },
    total: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d2d2d',
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalType: false,
            modalInputTitle: '',
            modalInputIssuedTo: '',
        };
    }

    async handleAdd() {
        await this.props.dispatch(addProduct({
            id: Math.random().toString(16).slice(2) + Date.now().toString(16).slice(2),
            title: '',
            quantity: 0,
            price: 0,
        }));

        Toast.show({
            position: 'bottom',
            text: 'Товар добавлен',
            buttonText: 'Закрыть',
        });

        this.handleClose();
    }

    async handleSave() {
        const { products, dispatch } = this.props;
        const { modalInputTitle, modalInputIssuedTo } = this.state;

        if (modalInputTitle.length < 3 || modalInputIssuedTo.length < 3 || products.length === 0) {
            return;
        }

        await dispatch(addReceipt({
            title: modalInputTitle,
            issuedTo: modalInputIssuedTo,
            products: [...products],
        }));

        Toast.show({
            position: 'bottom',
            text: 'Квитанция сохранена',
            buttonText: 'Закрыть',
        });

        this.handleClose();
    }

    async handleRefresh() {
        await this.props.dispatch(refreshProducts('quantity', 0));

        Toast.show({
            position: 'bottom',
            text: 'Таблица очищена',
            buttonText: 'Закрыть',
        });

        this.handleClose();
    }

    handleClose() {
        this.setState({
            modalType: false,
            modalInputTitle: '',
            modalInputIssuedTo: '',
        });
    }

    computeTotal() {
        return this.props.products.reduce((total, product) => (total + (product.quantity * product.price)), 0);
    }

    render() {
        const { modalType, modalInputTitle, modalInputIssuedTo } = this.state;

        return (
            <>
                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    isVisible={modalType === 'add'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={styles.modal}>
                        <H3>Добавить товар?</H3>

                        <View style={{ marginBottom: 14 }}/>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}>
                            <Button style={{ marginRight: 7 }} transparent onPress={() => this.handleClose()}>
                                <Text>Отменить</Text>
                            </Button>
                            <Button style={{ marginLeft: 7 }} onPress={async () => this.handleAdd()}>
                                <Text>Добавить</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    isVisible={modalType === 'save'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={styles.modal}>
                        <H3>Сохранить квитанцию?</H3>

                        <Form style={{ marginBottom: 14 }}>
                            <Item style={{ marginLeft: 0 }} stackedLabel error={modalInputTitle.length < 3}>
                                <Label>Название</Label>
                                <Input
                                    onChangeText={text => this.setState({ modalInputTitle: text })}
                                    value={modalInputTitle}
                                />
                            </Item>
                            <Item style={{ marginLeft: 0 }} stackedLabel error={modalInputIssuedTo.length < 3}>
                                <Label>Кому выдана</Label>
                                <Input
                                    onChangeText={text => this.setState({ modalInputIssuedTo: text })}
                                    value={modalInputIssuedTo}
                                />
                            </Item>
                        </Form>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}>
                            <Button style={{ marginRight: 7 }} transparent onPress={() => this.handleClose()}>
                                <Text>Отменить</Text>
                            </Button>
                            <Button style={{ marginLeft: 7 }} onPress={async () => this.handleSave()}>
                                <Text>Сохранить</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    isVisible={modalType === 'refresh'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={styles.modal}>
                        <H3>Очистить таблицу?</H3>

                        <View style={{ marginBottom: 14 }}/>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}>
                            <Button style={{ marginRight: 7 }} transparent onPress={() => this.handleClose()}>
                                <Text>Отменить</Text>
                            </Button>
                            <Button style={{ marginLeft: 7 }} onPress={async () => this.handleRefresh()}>
                                <Text>Очистить</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <View style={styles.container}>
                    <FooterTab>
                        <Button full onPress={() => this.setState({ modalType: 'add' })}>
                            <Icon style={styles.icon} type="MaterialIcons" name="add"/>
                        </Button>
                        <Button full onPress={() => this.setState({ modalType: 'save' })}>
                            <Icon style={styles.icon} type="MaterialIcons" name="save"/>
                        </Button>
                        <Button full onPress={() => this.setState({ modalType: 'refresh' })}>
                            <Icon style={styles.icon} type="MaterialIcons" name="refresh"/>
                        </Button>
                    </FooterTab>
                    <View style={styles.total}>
                        <Text style={styles.text}>{this.computeTotal().toFixed(2)} грн</Text>
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
