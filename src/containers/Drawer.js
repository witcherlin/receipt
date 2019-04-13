import React, { Component } from 'react';

import { Container, Content, Icon, Left, List, ListItem, Right, Text, Title, View } from 'native-base';

import styles, { colors } from '../styles';

export default class Drawer extends Component {
    render() {
        const { activeItemKey, navigation } = this.props;

        return (
            <Container>
                <View style={[{ height: 42, alignItems: 'center', justifyContent: 'center' }, styles.bgPrimary]}>
                    <Title style={styles.white}>Меню</Title>
                </View>

                <Content>
                    <List>
                        <ListItem
                            style={[
                                styles.m0,
                                styles.px3,
                                {
                                    height: 50,
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.gray,
                                },
                            ]}
                            first
                            button
                            selected={activeItemKey === 'Home'}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Left>
                                <Text>Калькулятор</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem
                            style={[styles.m0, styles.px3]}
                            last
                            button
                            selected={activeItemKey === 'Receipt'}
                            onPress={() => navigation.navigate('Receipt')}
                        >
                            <Left>
                                <Text>Квитанции</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
