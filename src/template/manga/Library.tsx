import React,{Component} from 'react'
import { View, SectionList } from 'react-native';
import ListManga from './components/ListManga';



class MangaLibrary extends Component{

    static navigationOptions = {header:null}

    render(){
        return(
            <View style={{flex:1}}>
                <SectionList
                    sections={[
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
    private List = () => (<ListManga/>)
}

export default MangaLibrary;