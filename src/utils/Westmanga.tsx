import React, { Component, useEffect } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';

class Westmanga extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        )
    }
}

//@ts-ignore
export default connect()(Westmanga);