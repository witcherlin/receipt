import { Platform, StyleSheet } from 'react-native';

import { toUpperCaseFirst } from '../utils/string';

export const space = 5;
export const colors = {
    transparent: 'transparent',
    primary: Platform.OS === 'ios' ? '#007aff' : '#3f51b5',
    secondary: Platform.OS === 'ios' ? '#0076e6' : '#36469b',
    info: '#62B1F6',
    success: '#5cb85c',
    danger: '#d9534f',
    warning: '#f0ad4e',
    dark: '#000000',
    white: '#ffffff',
    light: '#f4f4f4',
    gray: '#e1e1e1',
};

export default StyleSheet.create({
    /* Font */
    fontRegular: {
        fontSize: 16
    },
    fontBold: {
        fontWeight: 'bold',
    },

    /* Colors */
    ...Object.keys(colors).reduce((styles, key) => ({
        ...styles,
        [key]: { color: colors[key] },
        [`bg${toUpperCaseFirst(key)}`]: { backgroundColor: colors[key] },
    }), {}),

    /* Border, Margin, Padding, Flex */
    ...[0, 1, 2, 3, 4, 5].reduce((styles, value) => ({
        ...styles,

        [`b${value}`]: {
            borderTopWidth: value * space,
            borderRightWidth: value * space,
            borderBottomWidth: value * space,
            borderLeftWidth: value * space,
        },
        [`bx${value}`]: {
            borderRightWidth: value * space,
            borderLeftWidth: value * space,
        },
        [`by${value}`]: {
            borderTopWidth: value * space,
            borderBottomWidth: value * space,
        },
        [`bt${value}`]: {
            borderTopWidth: value * space,
        },
        [`br${value}`]: {
            borderRightWidth: value * space,
        },
        [`bb${value}`]: {
            borderBottomWidth: value * space,
        },
        [`bl${value}`]: {
            borderLeftWidth: value * space,
        },

        [`m${value}`]: {
            marginTop: value * space,
            marginRight: value * space,
            marginBottom: value * space,
            marginLeft: value * space,
        },
        [`mx${value}`]: {
            marginRight: value * space,
            marginLeft: value * space,
        },
        [`my${value}`]: {
            marginTop: value * space,
            marginBottom: value * space,
        },
        [`mt${value}`]: {
            marginTop: value * space,
        },
        [`mr${value}`]: {
            marginRight: value * space,
        },
        [`mb${value}`]: {
            marginBottom: value * space,
        },
        [`ml${value}`]: {
            marginLeft: value * space,
        },

        [`p${value}`]: {
            paddingTop: value * space,
            paddingRight: value * space,
            paddingBottom: value * space,
            paddingLeft: value * space,
        },
        [`px${value}`]: {
            paddingRight: value * space,
            paddingLeft: value * space,
        },
        [`py${value}`]: {
            paddingTop: value * space,
            paddingBottom: value * space,
        },
        [`pt${value}`]: {
            paddingTop: value * space,
        },
        [`pr${value}`]: {
            paddingRight: value * space,
        },
        [`pb${value}`]: {
            paddingBottom: value * space,
        },
        [`pl${value}`]: {
            paddingLeft: value * space,
        },

        [`flex${value}`]: { flex: value },
    }), {}),

    /* Text */
    ...['left', 'center', 'right', 'justify'].reduce((styles, value) => ({
        ...styles,
        [`text${toUpperCaseFirst(value)}`]: { textAlign: value },
    }), {}),
});
