import React,{Component} from 'react'
import { View, SectionList } from 'react-native';
import ListManga from './components/ListManga';
import Recommended from '../../components/Recommend';
import { Header } from 'react-native-elements';
import { material } from 'react-native-typography';



class MangaLibrary extends Component{

    static navigationOptions = {header:null}

    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    statusBarProps={{
                        barStyle:"light-content",
                        translucent:true
                    }}
                    backgroundColor="#fff"
                    centerComponent={{
                        text:"Library",
                        style:[material.button]
                    }}
                />
                <SectionList
                    sections={[
                        {title:'Recommended',data:[this.recommend]},
                        {title:'List',data:[this.List]}
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={this.key}
                />
            </View>
        )
    }

    private renderItem = ({item}) => (<View>{item()}</View>)
    private key = (item,index) => item + index;
    private recommend = () => (<Recommended/>)
    private List = () => (<ListManga/>)
}

export default MangaLibrary;