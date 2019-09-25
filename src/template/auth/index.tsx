import React from 'react'
import { View } from 'react-native';

class Auth extends React.Component<any>{
    

    constructor(props){
        super(props)
        //@ts-ignore
        
    }

    private ws = new WebSocket('wss://node.westmanga.info:8443');

    componentDidMount(){
        this.ws.onopen = () => {
            setInterval(()=>{
                this.ws.send('apa kabar')
            },1000)
            this.props.navigation.navigate('Manga')
        }
        this.ws.onmessage = (e) => {
            // a message was received
            console.log(e.data);
          };
          
          this.ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
          };
          
          this.ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
          };
    }

    render(){
        return(
            <View>

            </View>
        )
    }
}

export default Auth;