import React, { Component } from 'react';

import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

import styles from '../styles';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pointerEvents: 'box-only',
        };
    }

    handlePress() {
        this.setState({ pointerEvents: 'auto' });

        this.textInput.focus();
    }

    handleBlur() {
        const { onBlur } = this.props;

        this.setState({
            pointerEvents: 'box-only',
        });

        if (onBlur) {
            onBlur();
        }
    }

    render() {
        const { style, ...props } = this.props;
        const { pointerEvents } = this.state;

        return (
            <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                <View pointerEvents={pointerEvents}>
                    <TextInput
                        ref={ref => this.textInput = ref}
                        style={[styles.p1, style]}
                        onBlur={() => this.handleBlur()}
                        {...props}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
