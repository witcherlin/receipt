import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Share from 'react-native-share';

import { Button, Content, Icon, ListItem, Spinner, Text, Title, Toast, View } from 'native-base';

import { loadReceipts, removeReceipt } from '../../actions/receipts';

import List from '../../components/List';

import styles, { colors } from '../../styles';
import Modal from '../../containers/Modal';

class ListScreen extends Component {
    async handleShare(receipt) {
        Share.open({
            title: `#${receipt.id}`,
            message: `Share receipt #${receipt.id}`,
            subject: 'Share subject',
            url: 'https://google.com/',
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
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

    componentDidMount() {
        this.props.dispatch(loadReceipts());
    }

    render() {
        const { navigation, loading, receipts } = this.props;

        return (
            <>
                <View style={[
                    { height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                    styles.bgPrimary,
                ]}>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon style={styles.white} name="menu"/>
                    </Button>

                    <Title style={[styles.p0, styles.white]}>Квитанции</Title>

                    <Button transparent>
                        <Icon style={styles.white} name="share"/>
                    </Button>
                </View>

                <Content>
                    {loading
                        ? (
                            <View style={[styles.flex1, styles.pt4]}>
                                <Spinner color={colors.primary}/>
                            </View>
                        )
                        : (
                            <List
                                rightValue={-100}
                                data={receipts.sort((a, b) => (b.createdAt - a.createdAt))}
                                body={receipt => (
                                    <ListItem
                                        style={[
                                            styles.m0,
                                            styles.p3,
                                            {
                                                height: 50,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderBottomWidth: 1,
                                                borderBottomColor: colors.gray,
                                            },
                                        ]}
                                        button
                                        onPress={() => navigation.navigate('Detail', { id: receipt.id })}
                                    >
                                        <Text>{receipt.title}</Text>

                                        <Text style={styles.textRight} note>
                                            {moment(receipt.createdAt).format('DD.MM.YYYY HH:mm')}
                                        </Text>
                                    </ListItem>
                                )}
                                right={receipt => (
                                    <View style={[styles.flex1, { flexDirection: 'row', backgroundColor: '#1e1e1e' }]}>
                                        <Button
                                            style={[styles.flex1, { height: 'auto' }]}
                                            full
                                            primary
                                            onPress={() => this.handleShare(receipt)}
                                        >
                                            <Icon name="share"/>
                                        </Button>
                                        <Button
                                            style={[styles.flex1, { height: 'auto' }]}
                                            full
                                            danger
                                            onPress={() => this.handleRemove(receipt)}
                                        >
                                            <Icon name="trash"/>
                                        </Button>
                                    </View>
                                )}
                            />
                        )
                    }
                </Content>
            </>
        );
    }
}

export default connect(
    state => ({
        loading: state.receipts.loading,
        receipts: state.receipts.receipts,
    }),
)(ListScreen);
