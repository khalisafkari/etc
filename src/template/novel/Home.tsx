import React,{Component} from 'react'
import {View,SectionList} from 'react-native'
import NewNovel from './components/NewNovel';
import PopulerNovel from './components/PopulerNovel';
import RecentsNovel from './components/RecentsNovel';
import { Header } from 'react-native-elements';


class NovelHome extends Component{

    static navigationOptions = {header:null}

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#333'}}>
                <Header
                    backgroundImage={{uri:'http://raw.cdn.baca.co.id/c895ffba-85f9-47c5-8712-80c82e62bf1b'}}
                />
                <SectionList
                    sections={[
                        {title:'NewNovel',data:[this.NewNovel]},
                        {title:'PopulerNovel',data:[this.PopulerNovel]},
                        {title:'RecentsNovel',data:[this.RecentsNovel]}
                    ]}
                    keyExtractor={this.key}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

    private renderItem = ({item}) => (<View>{item()}</View>)
    private key = (item,index) => item + index;

    private NewNovel = () => (<NewNovel/>)
    private PopulerNovel = () => (<PopulerNovel/>)
    private RecentsNovel = () => (<RecentsNovel/>)
}


export default NovelHome;