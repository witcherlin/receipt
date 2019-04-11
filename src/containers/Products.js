import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';

import { Button, Form, H3, Icon, Input, Item, SwipeRow, Text, Toast, View } from 'native-base';

import { removeProduct, updateProduct } from '../actions/products';
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    modal: {
        padding: 14,
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    white: {
        color: '#ffffff',
    },
    fill: {
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    head: {
        height: 42,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3f51b5',
    },
    row: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
    },
    form: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantity: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    price: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    total: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalType: false,
            modelProduct: null,
        };
    }

    async handleChangeText(product, key, value) {
        await this.props.dispatch(updateProduct(product.id, {
            [key]: value,
        }));
    }

    async handleRemove(product) {
        await this.props.dispatch(removeProduct(product.id));

        Toast.show({
            position: 'bottom',
            text: 'Товар удален',
            buttonText: 'Закрыть',
        });

        this.handleClose();
    }

    handleClose() {
        this.setState({
            modalType: false,
            modalProduct: null,
        });
    }

    stringToNumber(string) {
        return string.replace(/^(?:.*?)((?:\d+)?(?:\.)?(?:\d+)?)(?:.*)$/g, '$1');
    }

    render() {
        const { products } = this.props;
        const { modalType, modalProduct } = this.state;

        return (
            <View>
                <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    avoidKeyboard
                    isVisible={modalType === 'remove'}
                    onBackButtonPress={() => this.handleClose()}
                    onBackdropPress={() => this.handleClose()}
                >
                    <View style={styles.modal}>
                        <H3>Удалить товар?</H3>

                        <View style={{ marginBottom: 14 }}/>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}>
                            <Button style={{ marginRight: 7 }} transparent onPress={() => this.handleClose()}>
                                <Text>Отменить</Text>
                            </Button>
                            <Button style={{ marginLeft: 7 }} onPress={async () => this.handleRemove(modalProduct)}>
                                <Text>Удалить</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <View style={styles.head}>
                    <View style={styles.title}>
                        <Text style={[styles.white, styles.bold]}>Название</Text>
                    </View>
                    <View style={styles.quantity}>
                        <Text style={[styles.white, styles.bold]}>Кол.</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={[styles.white, styles.bold]}>Цена</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={[styles.white, styles.bold]}>Сумма</Text>
                    </View>
                </View>

                {products.map((product) => (
                    <SwipeRow
                        key={product.id}
                        style={styles.row}
                        disableRightSwipe
                        rightOpenValue={-75}
                        recalculateHiddenLayout
                        body={(
                            <Form style={styles.form}>
                                <Item style={styles.title} regular>
                                    <Input
                                        style={styles.fill}
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        onChangeText={text => this.handleChangeText(product, 'title', text)}
                                        value={product.title}
                                    />
                                </Item>
                                <Item style={[styles.quantity, { backgroundColor: '#ebebeb' }]} regular>
                                    <Input
                                        style={styles.fill}
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        keyboardType="decimal-pad"
                                        onChangeText={text => this.handleChangeText(product, 'quantity', this.stringToNumber(text))}
                                        value={product.quantity.toString()}
                                    />
                                </Item>
                                <Item style={styles.price} regular>
                                    <Input
                                        style={styles.fill}
                                        disableFullscreenUI
                                        selectTextOnFocus
                                        keyboardType="decimal-pad"
                                        onChangeText={text => this.handleChangeText(product, 'price', this.stringToNumber(text))}
                                        value={product.price.toString()}
                                    />
                                </Item>
                                <Item style={styles.total} regular>
                                    <Text style={styles.bold}>
                                        {(product.quantity * product.price).toFixed(2)}
                                    </Text>
                                </Item>
                            </Form>
                        )}
                        right={(
                            <Button danger onPress={() => this.setState({ modalType: 'remove', modalProduct: product })}>
                                <Icon active name="trash"/>
                            </Button>
                        )}
                    />
                ))}
            </View>
        );
    }
}

export default connect(
    state => ({
        products: state.products,
    }),
)(Products);
