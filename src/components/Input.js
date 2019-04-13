import React, { Component } from 'react';

import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

import styles from '../styles';

export default class Input extends Component {
    render() {
        const { ...props } = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => this.textInput.focus()}>
                <View style={styles.flex1} pointerEvents="box-only">
                    <TextInput ref={ref => this.textInput = ref} {...props}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
