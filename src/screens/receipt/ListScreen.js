import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Content, Icon, ListItem, Spinner, Text, Title, Toast, View } from 'native-base';

import { loadReceipts, removeReceipt } from '../../actions/receipts';

import { getReceipts } from '../../selectors/receipts';

import List from '../../components/List';

import Modal from '../../containers/Modal';

import styles, { colors } from '../../styles';

class ListScreen extends Component {
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
            <View>
                <View style={[
                    styles.bgPrimary,
                    {
                        height: 42,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
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
                                rightValue={-50}
                                data={receipts}
                                body={receipt => (
                                    <ListItem
                                        style={[
                                            styles.m0,
                                            styles.p3,
                                            styles.bb1,
                                            {
                                                height: 50,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderColor: colors.gray,
                                            },
                                        ]}
                                        button
                                        onPress={() => navigation.navigate('Detail', { id: receipt.id })}
                                    >
                                        <Text>{receipt.title}</Text>
                                        <Text style={styles.textRight} note>{receipt.createdAt}</Text>
                                    </ListItem>
                                )}
                                right={receipt => (
                                    <View style={[styles.flex1, { flexDirection: 'row', backgroundColor: '#1e1e1e' }]}>
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
            </View>
        );
    }
}

export default connect(
    state => ({
        loading: state.receipts.loading,
        receipts: getReceipts(state),
    }),
)(ListScreen);
