import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import { Button, Content, Icon, Text, Title, Toast, View } from 'native-base';

import { removeReceipt, updateReceipt } from '../../actions/receipts';

import { getReceiptById } from '../../selectors/receipts';

import Modal from '../../containers/Modal';

import Input from '../../components/Input';

import styles, { colors } from '../../styles';

class DetailScreen extends Component {
    async handleShare(receipt) {
        const uri = await this.viewShot.capture();

        await Share.open({
            title: `Квитанция #${receipt.id} - ${receipt.title}`,
            subject: `Квитанция #${receipt.id} - ${receipt.title}`,
            message: [`#${receipt.id}`, receipt.title, receipt.createdAt].join('\n'),
            url: `data:image/png;base64,${uri}`,
            failOnCancel: false,
            showAppsToView: true,
        });
    }

    async handleUpdate(receipt, property, text) {
        await this.props.dispatch(updateReceipt(receipt.id, { [property]: text }));
    }

    async handleRemove(receipt) {
        const { dispatch } = this.props;

        Modal.show({
            title: 'Удалить квитанцию?',
            buttons: () => ([
                {
                    transparent: true,
                    close: true,
                    text: 'Отменить',
                },
                {
                    onPress: async () => {
                        await dispatch(removeReceipt(receipt.id));

                        Toast.show({
                            position: 'bottom',
                            text: 'Квитанция удалена',
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

    componentDidUpdate() {
        const { navigation, receipt } = this.props;

        if (!receipt) {
            navigation.goBack();
        }
    }

    render() {
        const { navigation, receipt } = this.props;

        if (!receipt) {
            return <View/>;
        }

        return (
            <>
                <View style={[
                    styles.bgPrimary,
                    {
                        height: 42,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                ]}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon style={styles.white} name="arrow-back"/>
                    </Button>

                    <Title style={[styles.p0, styles.white]}>{receipt.title}</Title>

                    <Button transparent onPress={() => this.handleShare(receipt)}>
                        <Icon style={styles.white} name="share"/>
                    </Button>
                </View>

                <Content>
                    <ViewShot style={styles.bgWhite} ref={ref => (this.viewShot = ref)} options={{ result: 'base64' }}>
                        <View style={[styles.my3, { alignItems: 'center' }]}>
                            <Text>Квитанция #{receipt.id}</Text>
                            <Input
                                style={[
                                    styles.mb2,
                                    styles.bb1,
                                    styles.fontRegular,
                                    styles.fontBold,
                                    {
                                        borderColor: colors.gray,
                                    },
                                ]}
                                disableFullscreenUI
                                selectTextOnFocus
                                onChangeText={text => this.handleUpdate(receipt, 'title', text)}
                                value={receipt.title}
                            />
                            <Text note>{receipt.createdAt}</Text>
                        </View>

                        <View style={styles.mb3}>
                            <View
                                style={[styles.bgPrimary, { height: 42, flexDirection: 'row', alignItems: 'center' }]}>
                                <Title style={[{ flex: 2.25 }, styles.white]}>Название</Title>
                                <Title style={[{ flex: 1 }, styles.white]}>Кол.</Title>
                                <Title style={[{ flex: 1.25 }, styles.white]}>Цена</Title>
                                <Title style={[{ flex: 2 }, styles.white]}>Сумма</Title>
                            </View>

                            {receipt.products.map((product, idx) => (
                                <View key={idx} style={[
                                    styles.bb1,
                                    {
                                        height: 50,
                                        flexDirection: 'row',
                                        borderColor: colors.gray,
                                    },
                                ]}>
                                    <View style={[
                                        styles.br1,
                                        {
                                            flex: 2.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.title}
                                        </Text>
                                    </View>
                                    <View style={[
                                        styles.br1,
                                        {
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.quantity} шт
                                        </Text>
                                    </View>
                                    <View style={[
                                        styles.br1,
                                        {
                                            flex: 1.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.price} грн
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={[styles.fontRegular, styles.fontBold]}>
                                            {product.total.toFixed(2)} грн
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            <View style={{
                                height: 50,
                                flexDirection: 'row',
                            }}>
                                <View style={{ flex: 2.25 }}/>
                                <View style={{ flex: 1 }}/>
                                <View style={[
                                    styles.bl1,
                                    styles.bb1,
                                    {
                                        flex: 1.25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: colors.gray,
                                    },
                                ]}>
                                    <Text style={[styles.fontBold, { fontSize: 16 }]}>
                                        Итого:
                                    </Text>
                                </View>
                                <View style={[
                                    styles.bl1,
                                    styles.bb1,
                                    {
                                        flex: 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: colors.gray,
                                    },
                                ]}>
                                    <Text style={[styles.fontRegular, styles.fontBold]}>
                                        {receipt.total.toFixed(2)} грн
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ViewShot>

                    <Button full danger onPress={() => this.handleRemove(receipt)}>
                        <Text>Удалить квитанцию</Text>
                    </Button>
                </Content>
            </>
        );
    }
}

export default connect(
    (state, props) => ({
        receipt: getReceiptById(state, props.navigation.state.params.id),
    }),
)(DetailScreen);
