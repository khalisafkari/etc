import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native';
import manga from '../../utils/manga';
import { WebView } from 'react-native-webview'
import { Header } from 'react-native-elements';

interface State {
    data: Array<any>
    loading: boolean
}

class MangaRead extends Component<any, State>{

    constructor(props) {
        super(props)
    }

    state: State = {
        data: [],
        loading: true
    }

    async componentDidMount() {
        const data = await manga.ReadManga(this.props.navigation.getParam('id'))
        this.setState({
            //@ts-ignore
            data: data.data,
            loading: false
        })
    }

    static navigationOptions = {header:null};

    render() {
        if (this.state.loading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>
        }
        return (
            <View style={{ flex: 1 }}>
                
                <WebView
                    source={{
                        html: `
                       <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                        <body>
                            ${this.state.data.map((i)=> `<img src="${i}" height="100%" width="100%"/>`)}
                        <script src="//instant.page/2.0.0" type="module" defer integrity="sha384-D7B5eODAUd397+f4zNFAVlnDNDtO1ppV8rPnfygILQXhqu3cUndgHvlcJR2Bhig8"></script>
                        </body>
                       </html>
                       
                       `
                    }}
                />
            </View>
        )
    }
}

export default MangaRead;