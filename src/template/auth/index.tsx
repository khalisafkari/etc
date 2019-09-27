import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Logo from './logo';
import Form from './form';

const Auth = () => {
    return (
        <View style={styles.container}>
            <Logo />
            <Form type="Login" />
            <Text style={styles.signupText}>
                Dont have an account yet?
            </Text>
            <TouchableOpacity>
                <Text style={styles.signupButton}> Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

Auth.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({

    container: {

        backgroundColor: '#455a64',

        flex: 1,

        alignItems: 'center',

        justifyContent: 'center'

    },

    signupTextCont: {

        flexGrow: 1,

        alignItems: 'flex-end',

        justifyContent: 'center',

        paddingVertical: 16,

        flexDirection: 'row'

    },

    signupText: {

        color: 'rgba(255,255,255,0.6)',

        fontSize: 16

    },

    signupButton: {

        color: '#ffffff',

        fontSize: 16,

        fontWeight: '500'

    }

});

export default Auth;