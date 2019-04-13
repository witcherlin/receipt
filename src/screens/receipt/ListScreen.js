import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Share from 'react-native-share';

import { ActionSheet, Body, Button, Content, Icon, ListItem, Right, Text, Title, Toast, View } from 'native-base';

import { loadReceipts, removeReceipt } from '../../actions/receipts';

import List from '../../components/List';

import styles, { colors } from '../../styles';

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

        ActionSheet.show(
            {
                title: 'Удалить квитанцию?',
                options: ['Удалить', 'Отменить'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    await dispatch(removeReceipt(receipt.id));

                    Toast.show({
                        position: 'bottom',
                        text: 'Квитанция удалена',
                        buttonText: 'Закрыть',
                    });
                }
            },
        );
    }

    componentDidMount() {
        this.props.dispatch(loadReceipts());
    }

    render() {
        const { navigation, receipts } = this.props;

        console.log(receipts);

        return (
            <>
                <View style={[{ height: 42, flexDirection: 'row', alignItems: 'center' }, styles.bgPrimary]}>
                    <View style={[styles.flex1]}>
                        <Button transparent onPress={() => navigation.openDrawer()}>
                            <Icon style={styles.white} name="menu"/>
                        </Button>
                    </View>
                    <View style={[styles.flex1]}>
                        <Title style={[styles.p0, styles.white]}>Квитанции</Title>
                    </View>
                    <View style={[styles.flex1]}/>
                </View>

                <Content>
                    <List
                        rightValue={-100}
                        data={receipts.sort((a, b) => (b.createdAt - a.createdAt))}
                        body={receipt => (
                            <ListItem
                                style={[
                                    styles.m0,
                                    styles.pr3,
                                    {
                                        height: 50,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.gray,
                                    },
                                ]}
                                button
                                onPress={() => navigation.navigate('Detail', { receipt })}
                            >
                                <Body>
                                    <Text>{receipt.title}</Text>
                                </Body>
                                <Right>
                                    <Text style={styles.textRight} note>
                                        {moment(receipt.createdAt).format('DD.MM.YYYY HH:mm')}
                                    </Text>
                                </Right>
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
                </Content>
            </>
        );
    }
}

export default connect(
    state => ({
        receipts: state.receipts,
    }),
)(ListScreen);
