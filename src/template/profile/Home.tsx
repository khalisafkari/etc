import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import Pricing from '../../components/Pricing';
import axios from 'axios'

interface Props {
    navigation: NavigationStackProp<NavigationStackScreenProps>
}

class ProfileHome extends Component<Props> {

    static navigationOptions = { header: null }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <Header />
                {this.renderContent()}
                <Pricing/>
            </View>
        )
    }

    private renderContent = () => (
        <View>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileHistory')}
            >
                <ListItem
                    containerStyle={{
                        backgroundColor: 'rgba(160, 179, 176, 0.25)'
                    }}
                    leftIcon={{
                        name: "history",
                        color: "#a0b3b0",
                        size: 20
                    }}
                    title="History"
                    titleStyle={{
                        color: "#a0b3b0"
                    }}
                    
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DownloadFile')}
            >
            <ListItem
                containerStyle={{
                    backgroundColor: 'rgba(160, 179, 176, 0.25)'
                }}
                leftIcon={{
                    name: "download",
                    color: "#a0b3b0",
                    type: "feather",
                    size: 20
                }}
                title="Download"
                titleStyle={{
                    color: "#a0b3b0"
                }}
                
            />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileBookmark')}
            >
                <ListItem
                    containerStyle={{
                        backgroundColor: 'rgba(160, 179, 176, 0.25)'
                    }}
                    leftIcon={{
                        name: "bookmark",
                        color: "#a0b3b0",
                        type: "feather",
                        size: 20
                    }}
                    title="My bookmark"
                    titleStyle={{
                        color: "#a0b3b0"
                    }}
                    rightSubtitle="10"
                />
            </TouchableOpacity>
        </View>
    )
}

export default ProfileHome;