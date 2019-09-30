import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-elements';
import { material } from 'react-native-typography';
import axios from 'axios'
import { connect } from 'react-redux'
import RNFirebase from './utils/firebase'
import { WebView } from 'react-native-webview'
import Manga from './utils/manga'
//import RNFirebase from './utils/RNFirebase'

interface State {
    loading: boolean
    webview: boolean

}

interface Props {
    accounts: {
        indonesia: boolean
    }
    navigation: any
    indonesia: any,
    POSTS_LIST_MANGA: Function,
    detect(data:boolean):Function
}

class Loading extends Component<Props, State>{

    state: State = {
        loading: true,
        webview: false
    }

    async componentWillMount() {
        if (this.props.accounts.indonesia) {
            RNFirebase.onChange((data) => {
                if (data) {
                    RNFirebase.onCheck(cb => {
                        this.props.detect(cb.status)
                    })
                    this.props.navigation.navigate('Manga');
                } else {
                    this.props.navigation.navigate('Secure');
                }
            })
        } else {
            const data = await axios.get('https://api-geolocation.zeit.sh/')
            if (data.data.country === "Indonesia") {
                this.props.indonesia();
                this.props.navigation.navigate('Secure');
            } else {
                this.setState({
                    loading: false,
                    webview: true
                })
            }
        }
    }

    async componentDidMount() {
        const data = await Manga.List(Manga.page)
        //@ts-ignore
        this.props.POSTS_LIST_MANGA(data.data.list.item)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading && this.renderLogo()}
                {this.state.webview && this.renderWebview()}
                {this.renderFooter()}
            </View>
        )
    }

    private renderLogo = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        height: 100,
                        width: 100
                    }}
                />
            </View>
        )
    }

    private renderWebview() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: 'https://verdauen.com'
                    }}
                />
            </View>
        )
    }

    private renderFooter = () => {
        return (
            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={material.caption}>Wait</Text>
            </View>
        )
    }

    static navigationOptions = { header: null }
}

const mapState = state => ({
    accounts: state.accounts,
    manga: state.manga
})

const mapProps = dispatch => ({
    indonesia: () => dispatch({ type: "SET_INDONESIA", payload: true }),
    detect:(data)=>dispatch({type:"SET_PREMIUM",payload:data}),
    POSTS_LIST_MANGA: (data) => dispatch({ type: "POSTS_LIST_MANGA", payload: data })
})

export default connect(mapState, mapProps)(Loading);