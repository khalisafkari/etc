import React,{Component} from 'react'
import {View, SectionList, StatusBar} from 'react-native'
import NewManga from './components/NewManga';
import AnimeManga from './components/AnimeManga';
import NovelManga from './components/NovelManga';

class MangaHome extends Component{

    static navigationOptions ={header:null}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'black'}}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" animated />
                <SectionList
                    sections={[
                        {title:'Manga',data:[this.NewManga]},
                        {title:'Anime',data:[this.Anime]},
                        {title:'Novel',data:[this.Novel]}
                    ]}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

    private renderItem =({item}) => (<View>{item()}</View>)
    private NewManga = () => (<NewManga/>);
    private Anime = () => (<AnimeManga/>)
    private Novel = () => (<NovelManga/>)
}


export default MangaHome;