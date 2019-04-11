import React, { Component } from 'react';
import { Platform, StatusBar as StatusBarNative, StyleSheet } from 'react-native';

import { View } from 'native-base';

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : StatusBarNative.currentHeight,
    },
});

export default class StatusBar extends Component {
    render() {
        const { barStyle = 'light-content', backgroundColor = '#36469b', ...props } = this.props;

        return (
            <View style={[styles.statusBar, { backgroundColor }]}>
                <StatusBarNative translucent barStyle={barStyle} backgroundColor={backgroundColor} {...props}/>
            </View>
        );
    }
}
