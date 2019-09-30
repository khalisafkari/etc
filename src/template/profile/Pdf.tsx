import React from 'react'
import { View, FlatList, TouchableOpacity, Alert } from 'react-native'
import * as Filesystem from 'expo-file-system'
import { ListItem } from 'react-native-elements'
import * as IntentLauncher from 'expo-intent-launcher';

class Pdf extends React.Component<any, any>{


    state = {
        item: []
    }

    componentDidMount() {
        this.setState({
            item: this.props.navigation.getParam('id')
        })
    }

    key = (item, index) => item + index;

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.item.length ? (
                    <FlatList
                        data={this.props.navigation.getParam('id')}
                        renderItem={this.renderItem}
                        keyExtractor={this.key}
                    />
                ) : null}
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => this.onPress(item)}
            >
                <ListItem
                    title={item.replace(Filesystem.documentDirectory, '')}
                    rightIcon={{
                        name:"delete",
                        onPress:()=>this.delete(item)
                    }}
                />
            </TouchableOpacity>
        </View>
    )

    onPress = (item) => {
        Filesystem.getContentUriAsync(item).then(cUri => {
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                //@ts-ignore
                data: cUri.uri,
                flags: 1,
            });
        });
    }

    delete = (item) => {
        Filesystem.deleteAsync(item).then(()=>{
            Alert.alert('done',`delete ${item}`)
        })
        .catch(()=>{
            Alert.alert('-220','Hubungi Admin')
        })
    }
}

export default Pdf;