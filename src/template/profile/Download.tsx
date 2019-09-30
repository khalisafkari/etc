import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { Text, ListItem } from 'react-native-elements'
import * as IntentLauncher from 'expo-intent-launcher';

class DownloadFile extends Component<any, any>{

    state = {
        item: []
    }

    async componentDidMount() {
        const data = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
        const todos = []
        data.forEach((i) => {
            if (i === "appData") {
            } else {
                todos.push(i);
            }
        })
        this.setState({ item: todos });
    }

    private key = (item, index) => item + index;

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.item ? (
                    <FlatList
                        data={this.state.item}
                        renderItem={this.renderItem}
                        keyExtractor={this.key}
                    />
                ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text h3>Belum Ada Manga yang di download</Text>
                        </View>
                    )}
            </View>
        )
    }

    private renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onView(item)}
                >
                    <ListItem
                        title={item}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    private onView = (item) => {
        FileSystem.getContentUriAsync(FileSystem.documentDirectory + item).then(cUri => {
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                //@ts-ignore
                data: cUri.uri,
                flags: 1,
            });
        });
    }
}

export default DownloadFile;