import React,{Component} from 'react'
import {View, SectionList} from 'react-native'
import NewManga from './components/NewManga';
import AnimeManga from './components/AnimeManga';
import NovelManga from './components/NovelManga';
import { Header, Image } from 'react-native-elements';
import { material, materialColors } from 'react-native-typography';
import AdmobBanner from '../../components/Admob';

class MangaHome extends Component{

    static navigationOptions ={header:null}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'black'}}>
                <Header
                    containerStyle={{
                        borderBottomWidth:0
                    }}
                    statusBarProps={{
                        backgroundColor:"rgba(0,0,0,0)",
                        translucent:true,
                        animated:true
                    }}
                    backgroundColor="rgba(0,0,0,0)"
                    leftComponent={(<Image style={{height:40,width:120}} source={{uri:'https://westmanga.info/wp-content/uploads/2019/03/Untitled-2.png'}}/>)}
                />
                <SectionList
                    sections={[
                        {title:'Manga',data:[this.NewManga]},
                        {title:'Ads',data:[this.ads]},
                        {title:'Anime',data:[this.Anime]},
                        // {title:'Novel',data:[this.Novel]}
                    ]}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

    private renderItem =({item}) => (<View>{item()}</View>)
    private NewManga = () => (<NewManga/>);
    private ads = () => (<AdmobBanner/>)
    private Anime = () => (<AnimeManga/>)
    // private Novel = () => (<NovelManga/>)
}


export default MangaHome;