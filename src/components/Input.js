import React, { Component } from 'react';

import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default class Input extends Component {
    render() {
        const { ...props } = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => this.textInput.focus()}>
                <View pointerEvents="box-only">
                    <TextInput ref={ref => this.textInput = ref} {...props}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
