import React, { Component } from 'react'
import { View, SectionList } from 'react-native';
import PostsManga from './components/PostsManga';
import MangaSynopsis from './components/MangaSynopsis';
import MangaChapterList from './components/MangaChapterList';
import { Header } from 'react-native-elements';
import { AdmobOnPosts } from '../../components/AdmobOnPosts';


class MangaPosts extends Component<any,any> {

    static navigationOptions = {
        header:null
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                <Header
                    statusBarProps={{barStyle:"light-content",translucent:true}}
                    backgroundColor="white"
                    leftComponent={{
                        icon:"arrow-back",
                        onPress:()=>this.props.navigation.goBack()
                    }}
                    centerComponent={{

                    }}
                />
                <SectionList
                    sections={[
                        {title:"Banner",data:[this.Banner]},
                        {title:'Ads',data:[this.ads]},
                        {title:"Synopsis",data:[this.Synopsis]},
                        {title:"Chapter",data:[this.List]}
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={this.key}
                />
            </View>
        )
    }

    private renderItem = ({item}) => (<View>{item()}</View>)
    private key = (item,index) => item + index;
    private Banner = () => (<PostsManga />)
    private ads = () => (<AdmobOnPosts/>)
    private Synopsis = () => (<MangaSynopsis />)
    private List = () => (<MangaChapterList/>)
}

export default MangaPosts;