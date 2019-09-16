import React,{Component} from 'react'
import {View, SectionList} from 'react-native'
import NewManga from './components/NewManga';
import AnimeManga from './components/AnimeManga';
import NovelManga from './components/NovelManga';
import RecommendManga from './components/RecommendManga';
import { ListItem } from 'react-native-elements';

class MangaHome extends Component{

    static navigationOptions ={header:null}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'black'}}>
                <SectionList
                    sections={[
                        {title:'Recommend',data:[this.recommend]},
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
    private recommend = () => (<RecommendManga/>)
    private NewManga = () => (<NewManga/>);
    private Anime = () => (<AnimeManga/>)
    private Novel = () => (<NovelManga/>)
}


export default MangaHome;