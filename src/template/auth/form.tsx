import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import firebase from '../../utils/firebase'

class Form extends React.Component<any, any>{

    private password = null;

    state = {
        email:'',
        password:''
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <Input
                        containerStyle={styles.inputBox}
                        inputContainerStyle={{
                            borderBottomWidth: 0
                        }}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        inputStyle={{fontSize:16}}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Email"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <Input
                        containerStyle={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        inputContainerStyle={{
                            borderBottomWidth: 0
                        }}
                        secureTextEntry={true}
                        placeholderTextColor="#ffffff"
                        ref={(input) => this.password = input}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={this.sigIn}
                    >
                        <Text style={styles.buttonText}>{this.props.type}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }

    private sigIn = () => {
        const {email,password} = this.state;
        if(email && password){
            firebase.Auth.login(email,password)
            .then(res=>{
                //@ts-ignore
                firebase.firestore.Get(email).then(response=>{
                    this.props.accounts({
                        email,
                        //@ts-ignore
                        premium:response.data().status
                    })
                    this.props.navigation.navigate('Manga')
                })
            }).catch((err)=>{
                console.log(err)
                //Alert.alert('Error','Email / Password Not Valid')
            })
        }else{
            console.log('Not Valid')
           // Alert.alert('Ups!!!','Not Valid Data')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },



    inputBox: {

        width: 300,

        backgroundColor: 'rgba(255, 255,255,0.2)',

        borderRadius: 25,

        paddingHorizontal: 16,

        fontSize: 16,

        color: '#ffffff',

        marginVertical: 10

    },

    button: {

        width: 300,

        backgroundColor: '#1c313a',

        borderRadius: 25,

        marginVertical: 10,

        paddingVertical: 13

    },

    buttonText: {

        fontSize: 16,

        fontWeight: '500',

        color: '#ffffff',

        textAlign: 'center'

    }
})

const mapState = state => ({
    state:state.accounts
})

const mapProps = dispatch => ({
    accounts:(data:any)=> dispatch({type:"SET_ACCOUNTS",payload:data})
})

const data = connect(mapState,mapProps)(Form)
//@ts-ignore
export default withNavigation(data)
