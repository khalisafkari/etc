import React from 'react'
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BookmarkCP from './component/BookmarkCP';
import { Header } from 'react-native-elements';

class ProfileBookmark extends React.Component<any>{

    static navigationOptions = {
        header:null
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    backgroundColor="black"
                    leftComponent={{
                        icon:"arrow-back",
                        onPress:()=>this.props.navigation.goBack()
                    }}
                />
                <FlatList
                    data={Object.keys(this.props.state)}
                    renderItem={this.renderItem}
                    keyExtractor={this.key}
                />
            </View>
        )
    }

    private renderItem = ({item}) => (<BookmarkCP id={item}/>)
    private key = (item,index) => item + index;
}

const mapProps = state => ({
    state:state.manga.Bookmark
})

export default connect(mapProps)(ProfileBookmark);