import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import { Button, Content, Icon, Text, Title, View } from 'native-base';

import { updateReceipt } from '../../actions/receipts';

import { findReceipt } from '../../selectors/receipts';

import Input from '../../components/Input';

import styles, { colors } from '../../styles';

class DetailScreen extends Component {
    handleShare() {
        const { receipt } = this.props;

        this.refs.viewShot.capture().then(uri => {
            Share.open({
                title: `Квитанция #${receipt.id} для ${receipt.title}`,
                subject: `Квитанция #${receipt.id} для ${receipt.title}`,
                message: [
                    `#${receipt.id}`,
                    receipt.title,
                    moment(receipt.createdAt).format('DD.MM.YYYY HH:mm'),
                ].join('\n') + '\n',
                url: `data:image/png;base64,${uri}`,
                failOnCancel: false,
                showAppsToView: true,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.warn(err);
                });
        });
    }

    render() {
        const { navigation, receipt, dispatch } = this.props;

        if (!receipt) {
            navigation.goBack();
            return;
        }

        return (
            <>
                <View style={[
                    { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                    styles.bgPrimary,
                ]}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon style={styles.white} name="arrow-back"/>
                    </Button>

                    <Title style={[styles.p0, styles.white]}>{receipt.title}</Title>

                    <Button transparent onPress={() => this.handleShare()}>
                        <Icon style={styles.white} name="share"/>
                    </Button>
                </View>

                <Content>
                    <ViewShot ref="viewShot" options={{ result: 'base64' }}>
                        <View style={[styles.my3, { alignItems: 'center' }]}>
                            <Text>Квитанция #{receipt.id}</Text>
                            <Input
                                style={[
                                    styles.mb2,
                                    {
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.gray,
                                    },
                                ]}
                                disableFullscreenUI
                                selectTextOnFocus
                                onChangeText={text => dispatch(updateReceipt(receipt.id, { title: text }))}
                                value={receipt.title}
                            />
                            <Text note>
                                {moment(receipt.createdAt).format('DD.MM.YYYY HH:mm')}
                            </Text>
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
                                <View key={idx} style={{
                                    height: 50,
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.gray,
                                }}>
                                    <View style={[
                                        {
                                            flex: 2.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRightWidth: 1,
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.title}
                                        </Text>
                                    </View>
                                    <View style={[
                                        {
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRightWidth: 1,
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.quantity} шт
                                        </Text>
                                    </View>
                                    <View style={[
                                        {
                                            flex: 1.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRightWidth: 1,
                                            borderColor: colors.gray,
                                        },
                                    ]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {product.price} грн
                                        </Text>
                                    </View>
                                    <View style={[{ flex: 2, alignItems: 'center', justifyContent: 'center' }]}>
                                        <Text style={[{ fontSize: 16 }]}>
                                            {(product.total).toFixed(2)} грн
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
                                    { flex: 1.25 },
                                    {
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderLeftWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: colors.gray,
                                    },
                                ]}>
                                    <Text style={[styles.fontBold, { fontSize: 16 }]}>
                                        Итого:
                                    </Text>
                                </View>
                                <View style={[
                                    { flex: 2 },
                                    {
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderLeftWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: colors.gray,
                                    },
                                ]}>
                                    <Text style={[styles.fontBold, { fontSize: 16 }]}>
                                        {receipt.total.toFixed(2)} грн
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ViewShot>

                    <Button style={styles.mb3} full danger>
                        <Text>Удалить квитанцию</Text>
                    </Button>
                </Content>
            </>
        );
    }
}

export default connect(
    (state, props) => ({
        receipt: findReceipt(state, props.navigation.state.params.id),
    }),
)(DetailScreen);
