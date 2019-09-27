import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/logo.png')}
                style={{
                    height:100,
                    width:100
                }}
            />
            <Text style={styles.logoText}>Welcome To Westmanga</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        flexGrow: 1,

        justifyContent: 'flex-end',

        alignItems: 'center'

    },

    logoText: {

        marginVertical: 15,

        fontSize: 18,

        color: 'rgba(255, 255, 255, 0.7)'

    }

});

export default Logo;