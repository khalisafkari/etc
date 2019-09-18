import React from 'react'
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HistoryCP from './component/HistoryCP';

class ProfileHistory extends React.Component<any>{

    componentDidMount(){
        // console.log()
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    data={Object.keys(this.props.History)}
                    renderItem={this.renderItem}
                    numColumns={3}
                />
            </View>
        )
    }

    private renderItem = ({item}) => (<HistoryCP id={item} />)
}

const mapProps = state => ({
    History:state.manga.History
})

export default connect(mapProps)(ProfileHistory);