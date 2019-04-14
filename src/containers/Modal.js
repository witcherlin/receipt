import React, { Component } from 'react';

import RNModal from 'react-native-modal';

import { Button, Text, Title, View } from 'native-base';

import styles from '../styles';

export default class Modal extends Component {
    static instance = null;

    static show(options = {}) {
        if (this.instance) {
            this.instance.show(options);
        }
    }

    static hide() {
        if (this.instance) {
            this.instance.hide();
        }
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    show({ state = {}, title, description, body, buttons }) {
        this.setState({
            state: { ...state },
            title,
            description,
            body,
            buttons,
            visible: true,
        });
    }

    hide() {
        if (this.state.visible) {
            this.setState({
                visible: false,
            });

            setTimeout(() => {
                this.setState({
                    state: {},
                    title: null,
                    description: null,
                    body: null,
                    buttons: null,
                });
            }, 300);
        }
    }

    render() {
        const { title, description, body, buttons, visible } = this.state;

        const modal = {
            ...this.state,
            setState: (state) => this.setState({
                state: {
                    ...this.state.state,
                    ...state,
                },
            }),
        };

        return (
            <RNModal
                animationIn="fadeIn"
                animationInTiming={300}
                animationOut="fadeOut"
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}
                avoidKeyboard
                useNativeDriver
                isVisible={visible}
                onBackButtonPress={() => this.hide()}
                onBackdropPress={() => this.hide()}
            >
                <View
                    style={[styles.mx2, styles.p3, styles.bgWhite, { borderRadius: 4 }]}
                    pointerEvents={visible ? 'auto' : 'none'}
                >
                    {title && (
                        <Title style={[
                            description || body || buttons ? styles.mb3 : styles.mb0,
                            styles.textLeft,
                            styles.dark,
                        ]}>
                            {title}
                        </Title>
                    )}

                    {description && (
                        <Text style={[body || buttons ? styles.mb3 : styles.mb0, styles.textLeft, styles.dark]}>
                            {description}
                        </Text>
                    )}

                    {body && (
                        <View style={buttons ? styles.mb5 : styles.mb0}>
                            {body(modal)}
                        </View>
                    )}

                    {buttons && (
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            {buttons(modal).map(({ close, text, onPress, ...props }, idx) => (
                                <Button
                                    key={idx}
                                    style={idx === 0 ? styles.ml0 : styles.ml1}
                                    onPress={(...args) => {
                                        if (visible) {
                                            if (close) {
                                                this.hide();
                                            }
                                            if (onPress) {
                                                onPress(...args);
                                            }
                                        }
                                    }}
                                    {...props}
                                >
                                    <Text>{text}</Text>
                                </Button>
                            ))}
                        </View>
                    )}
                </View>
            </RNModal>
        );
    }
}
