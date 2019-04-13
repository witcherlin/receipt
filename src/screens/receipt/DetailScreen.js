import moment from 'moment';

import React, { Component } from 'react';

import { Button, Content, Icon, Text, Title, View } from 'native-base';

import styles from '../../styles';

export default class DetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const { receipt } = navigation.state.params;

        console.log('DetailScreen:', navigation, receipt);

        return (
            <>
                <View style={[{ height: 42, flexDirection: 'row', alignItems: 'center' }, styles.bgPrimary]}>
                    <View style={[styles.flex1]}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon style={styles.white} name="arrow-back"/>
                        </Button>
                    </View>
                    <View style={[styles.flex1]}>
                        <Title style={[styles.p0, styles.white]}>
                            #{receipt.id}
                        </Title>
                    </View>
                    <View style={[styles.flex1]}>
                        <Button transparent>
                            <Icon style={styles.white} name="share"/>
                        </Button>
                    </View>
                </View>

                <Content padder>
                    <Text>#{receipt.id}</Text>
                    <Text>{receipt.title}</Text>
                    <Text note>
                        {moment(receipt.createdAt).format('DD.MM.YYYY HH:mm')}
                    </Text>
                </Content>
            </>
        );
    }
}
