import React, { useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import Logo from './logo';
import Form from './form';

import {useNavigation} from 'react-navigation-hooks'

const Login = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                animated
                translucent
            />
            <Logo />
            <Form type="Login" />
            <View style={{flexDirection:'row',paddingVertical:10}}>
                <Text style={styles.signupText}>
                    Dont have an account yet?
            </Text>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Daftar')}
                >
                    <Text style={styles.signupButton}> Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

Login.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({

    container: {

        // backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white"
    },

    signupTextCont: {

        flexGrow: 1,

        alignItems: 'flex-end',

        justifyContent: 'center',

        paddingVertical: 16,

        flexDirection: 'row'

    },

    signupText: {

        color: 'rgba(0,0,0,0.6)',

        fontSize: 16

    },

    signupButton: {

        color: '#000',

        fontSize: 16,

        fontWeight: '500'

    }

});

export default Login;