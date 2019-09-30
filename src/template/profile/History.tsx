import React from 'react'
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HistoryCP from './component/HistoryCP';
import { Header, Text } from 'react-native-elements';

class ProfileHistory extends React.Component<any>{

    static navigationOptions = {
        header: null
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    backgroundColor="black"
                    leftComponent={{
                        icon: "arrow-back",
                        onPress: () => this.props.navigation.goBack()
                    }}
                />
                {Object.keys(this.props.History) ? (
                    <FlatList
                        data={Object.keys(this.props.History)}
                        renderItem={this.renderItem}
                        numColumns={3}
                    />
                ) : (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text>Belum Ada History</Text>
                    </View>
                )}
            </View>
        )
    }

    private renderItem = ({ item }) => (<HistoryCP id={item} />)
}

const mapProps = state => ({
    History: state.manga.History
})

export default connect(mapProps)(ProfileHistory);