import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
//import RNFirebase from '../../utils/firebase'
import RNFirebase from '../../utils/RNFirebase'

class Form extends React.Component<any, any>{

    private password = null;

    state = {
        email: '',
        password: '',
        loading: false
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
                        onChangeText={email => this.setState({ email })}
                        inputStyle={{ fontSize: 16 }}
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
                        onChangeText={password => this.setState({ password })}
                    />
                    {
                        this.props.type === "Login" ? (
                            <Button
                                title={this.props.type}
                                type="clear"
                                titleStyle={styles.buttonText}
                                containerStyle={styles.button}
                                onPress={this.Login}
                                loading={this.state.loading}
                            />
                        ) : (
                                <Button
                                    title={this.props.type}
                                    type="clear"
                                    titleStyle={styles.buttonText}
                                    containerStyle={styles.button}
                                    onPress={this.SignUp}
                                    loading={this.state.loading}
                                />
                            )
                    }
                </KeyboardAvoidingView>
            </View>
        )
    }

    private Login = () => {
        const { email, password } = this.state;
        this.setState({loading:true});
        if(email && password){
            RNFirebase.login({
                email,
                password
            }).then(response=>{
                this.props.navigation.navigate('Manga')
                //@ts-ignore
                this.props.accounts({ email,premium:response.status })
                this.setState({loading:false});
            }).catch((error)=>{
                this.setState({loading:false});
            })
        }else{
            Alert.alert('Errors','Kamu terlalu sombong');
            this.setState({loading:false});
        }
    }

    private SignUp = () => {
        const { email, password } = this.state;
        this.setState({loading:true})
        if(email && password){
            RNFirebase.register({email,password}).then(()=>{
                this.props.navigation.navigate('Login');
                this.setState({loading:false})
            }).catch(()=>{
                this.setState({loading:false})
            })
        }else{
            Alert.alert('Erros','Tak Kenal Maka Tak Sayang')
            this.setState({loading:false})
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
        backgroundColor: 'rgba(0,0,0,.5)',
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
    state: state.accounts
})

const mapProps = dispatch => ({
    accounts: (data: any) => dispatch({ type: "SET_ACCOUNTS", payload: data })
})

const data = connect(mapState, mapProps)(Form)
//@ts-ignore
export default withNavigation(data)
