import React from 'react'
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BookmarkCP from './component/BookmarkCP';

class ProfileBookmark extends React.Component<any>{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
            <View style={{flex:1}}>
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