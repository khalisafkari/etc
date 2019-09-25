import React, { Component } from 'react'
import { View, SectionList, StatusBar, BackHandler } from 'react-native'
import PromoAnime from './components/PromoAnime';
import HomePage from './components/HomePage';

class AnimeHome extends Component {

    static navigationOptions = { header: null }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    animated
                    translucent
                />
                <SectionList
                    sections={[
                        { title: 'Promo', data: [this.Promo] },
                        { title: 'Home', data: [this.home] }
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={this.key}
                />
            </View>
        )
    }

    private renderItem = ({ item }) => (<View>{item()}</View>)
    private key = (item, index) => item + index;
    private Promo = () => (<PromoAnime />)
    private home = () => (<HomePage />)
}


export default AnimeHome;