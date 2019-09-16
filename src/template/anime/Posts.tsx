import React, { Component } from 'react'
import { View, SectionList } from 'react-native';
import BannerPostsAnime from './components/BannerPostsAnime';
import ListPostsAnime from './components/ListPostsAnime';


class AnimePosts extends Component {


    static navigationOptions = { header: null }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', }}>
                
                <SectionList
                    sections={[
                        { title: 'poster', data: [this.poster] },
                        {title:'List',data:[this.List]}
                    ]}
                    renderItem={this.renderItem}
                />

            </View>
        )
    }

    private renderItem =({item}) => (<View>{item()}</View>)

    private poster = () => (<BannerPostsAnime />)
    private List =()=>(<ListPostsAnime/>)
}

export default AnimePosts;