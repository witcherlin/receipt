import React, { Component } from 'react';

import { SwipeRow, View } from 'native-base';

import styles from '../styles';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.opened = null;
        this.rows = {};
    }

    closeOpened() {
        if (this.opened) {
            this.opened.closeRow();
            this.opened = null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.closeOpened();

        this.rows = Object.keys(this.rows)
            .reduce((rows, key) => this.rows[key] ? { ...rows, [key]: this.rows[key] } : rows, {});
    }

    render() {
        const { style, data, left, body, right, leftValue = 50, rightValue = -50, list = true } = this.props;

        return (
            <View style={[styles.m0, styles.p0, style]}>
                {data.map((item, idx, data) => (
                    <SwipeRow
                        key={idx}
                        style={[styles.m0, styles.p0]}
                        ref={ref => (ref && ref._root ? (this.rows[idx] = ref._root) : null)}
                        disableLeftSwipe={!right}
                        disableRightSwipe={!left}
                        leftOpenValue={leftValue}
                        rightOpenValue={rightValue}
                        recalculateHiddenLayout
                        onRowOpen={() => (this.opened = this.rows[idx])}
                        onRowClose={() => (this.opened = null)}
                        swipeGestureBegan={() => (this.opened !== this.rows[idx] && this.closeOpened())}
                        left={left && left(item, idx, data)}
                        body={body(item, idx, data, this.rows[idx])}
                        right={right && right(item, idx, data)}
                        list={list}
                    />
                ))}
            </View>
        );
    }
}
