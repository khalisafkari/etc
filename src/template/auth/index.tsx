// import React from 'react'
// import { View } from 'react-native';
// import firebase from 'react-native-firebase';
// import { Input, Button } from 'react-native-elements';

// interface State {
//     code:string
//     phone:string
// }

// class Auth extends React.Component<any,State>{


//     constructor(props){
//         super(props)
//         //@ts-ignore 
//     }

//     state:State = {
//         code:"+62",
//         phone:''
//     }


//     static navigationOptions = {
//         header:null
//     }



//     render(){
//         return(
//             <View style={{flex:1,justifyContent:'center'}}>
//                 <Input
//                     value={this.state.phone}
//                     placeholder="Phone Number"
//                     onChangeText={phone => this.setState({phone})}
//                 />
//                 <Button
//                     containerStyle={{
//                         padding:10,
//                     }}
//                     title="Login"
//                     onPress={this.login}
//                 />
//             </View>
//         )
//     }

//     login = () => {
//         firebase.auth().
//     }
// }

// export default Auth;
import React, { Component } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

import firebase from 'react-native-firebase';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class Auth extends Component<any, any>{

    private unsubscribe = null;
    state = {
        user: null,
        message: '',
        codeInput: '',
        phoneNumber: '+62',
        confirmResult: null,
    }

    public componentDidMount = () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                Alert.alert('Hey', this.state.user)
            } else {
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+44',
                    confirmResult: null,
                });
            }
        })
    }

    public componentWillUnmount = () => {
        if (this.unsubscribe) this.unsubscribe();
    }

    private sigIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending Code...' })
        firebase.auth().signInWithPhoneNumber(phoneNumber)
             .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
             .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    }


    private renderPhoneNumberInput = () => (
        <View style={{ marginTop: 25, padding: 25 }}>
            <Input
                autoFocus
                placeholder="Phone Number"
                inputContainerStyle={{
                    height: 40, marginTop: 15, marginBottom: 15
                }}
                value={this.state.phoneNumber}
                onChangeText={value => this.setState({ phoneNumber: value })}
            />
            <Button
                title="Sig In"
                onPress={this.sigIn}
            />
        </View>
    )

    private renderMessage = () => {
        const { message } = this.state;
        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        )
    }

    private renderVerificationCodeInput = () => {
        const { codeInput } = this.state;
        return (
            <View style={{ marginTop: 25, padding: 25 }}>
                <Input
                    autoFocus
                    inputContainerStyle={{
                        height: 40, marginTop: 15, marginBottom: 15
                    }}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={'Code ... '}
                    value={codeInput}
                />
                
            </View>
        )
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {!user && !confirmResult && this.renderPhoneNumberInput()}
                {this.renderMessage()}
                {/* {!user && confirmResult && } */}
            </View>
        )
    }
}

export default Auth;

