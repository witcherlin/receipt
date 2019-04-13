import { Platform, StyleSheet } from 'react-native';

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

const space = 5;

function toUpperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @typedef Styles
 * @property {Object} transparent
 * @property {Object} primary
 * @property {Object} secondary
 * @property {Object} info
 * @property {Object} success
 * @property {Object} danger
 * @property {Object} warning
 * @property {Object} dark
 * @property {Object} white
 * @property {Object} light
 * @property {Object} bgTransparent
 * @property {Object} bgPrimary
 * @property {Object} bgSecondary
 * @property {Object} bgInfo
 * @property {Object} bgSuccess
 * @property {Object} bgDanger
 * @property {Object} bgWarning
 * @property {Object} bgDark
 * @property {Object} bgWhite
 * @property {Object} bgLight
 * @property {Object} m0
 * @property {Object} m1
 * @property {Object} m2
 * @property {Object} m3
 * @property {Object} m4
 * @property {Object} m5
 * @property {Object} mx0
 * @property {Object} mx1
 * @property {Object} mx2
 * @property {Object} mx3
 * @property {Object} mx4
 * @property {Object} mx5
 * @property {Object} my0
 * @property {Object} my1
 * @property {Object} my2
 * @property {Object} my3
 * @property {Object} my4
 * @property {Object} my5
 * @property {Object} mt0
 * @property {Object} mt1
 * @property {Object} mt2
 * @property {Object} mt3
 * @property {Object} mt4
 * @property {Object} mt5
 * @property {Object} mr0
 * @property {Object} mr1
 * @property {Object} mr2
 * @property {Object} mr3
 * @property {Object} mr4
 * @property {Object} mr5
 * @property {Object} mb0
 * @property {Object} mb1
 * @property {Object} mb2
 * @property {Object} mb3
 * @property {Object} mb4
 * @property {Object} mb5
 * @property {Object} ml0
 * @property {Object} ml1
 * @property {Object} ml2
 * @property {Object} ml3
 * @property {Object} ml4
 * @property {Object} ml5
 * @property {Object} p0
 * @property {Object} p1
 * @property {Object} p2
 * @property {Object} p3
 * @property {Object} p4
 * @property {Object} p5
 * @property {Object} px0
 * @property {Object} px1
 * @property {Object} px2
 * @property {Object} px3
 * @property {Object} px4
 * @property {Object} px5
 * @property {Object} py0
 * @property {Object} py1
 * @property {Object} py2
 * @property {Object} py3
 * @property {Object} py4
 * @property {Object} py5
 * @property {Object} pt0
 * @property {Object} pt1
 * @property {Object} pt2
 * @property {Object} pt3
 * @property {Object} pt4
 * @property {Object} pt5
 * @property {Object} pr0
 * @property {Object} pr1
 * @property {Object} pr2
 * @property {Object} pr3
 * @property {Object} pr4
 * @property {Object} pr5
 * @property {Object} pb0
 * @property {Object} pb1
 * @property {Object} pb2
 * @property {Object} pb3
 * @property {Object} pb4
 * @property {Object} pb5
 * @property {Object} pl0
 * @property {Object} pl1
 * @property {Object} pl2
 * @property {Object} pl3
 * @property {Object} pl4
 * @property {Object} pl5
 * @property {Object} flex0
 * @property {Object} flex1
 * @property {Object} flex2
 * @property {Object} flex3
 * @property {Object} flex4
 * @property {Object} flex5
 * @property {Object} textLeft
 * @property {Object} textCenter
 * @property {Object} textRight
 * @property {Object} textJustify
 */
export default StyleSheet.create({
    /* Base */
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fafafa',
        zIndex: 1000,
    },

    /* Font */
    fontBold: {
        fontWeight: 'bold',
    },

    /* Color */
    ...Object.keys(colors).reduce((styles, key) => ({
        ...styles,
        [key]: { color: colors[key] },
        [`bg${toUpperCaseFirst(key)}`]: { backgroundColor: colors[key] },
    }), {}),

    /* Margin */
    ...[0, 1, 2, 3, 4, 5].reduce((styles, value) => ({
        ...styles,
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
    }), {}),

    /* Padding */
    ...[0, 1, 2, 3, 4, 5].reduce((styles, value) => ({
        ...styles,
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
    }), {}),

    /* Flex */
    ...[0, 1, 2, 3, 4, 5].reduce((styles, value) => ({
        ...styles,
        [`flex${value}`]: { flex: value },
    }), {}),

    /* Text */
    ...['left', 'center', 'right', 'justify'].reduce((styles, value) => ({
        ...styles,
        [`text${toUpperCaseFirst(value)}`]: { textAlign: value },
    }), {}),
});
