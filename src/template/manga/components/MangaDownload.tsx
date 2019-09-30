import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native';

import { connect } from 'react-redux'
import { Icon, Text } from 'react-native-elements';
import * as Filesystem from 'expo-file-system'

class MangaDownload extends Component<any, any>{

    state = {
        progress: false,
        value: 0,
        show: true,
    }

    private download = async () => {
        this.setState({ progress: true })
        let Folder = this.props.data.nav.replace('https://westmanga.info/manga/', '').replace('/', '').replace(/-/g, ' ')
        Filesystem.makeDirectoryAsync(Filesystem.documentDirectory + `${Folder}`)
        this.goTo()
    }

    private goTo = async () => {
        let id = this.props.data.id.replace('https://westmanga.info/', '').replace('/', '');
        let Folder = this.props.data.nav.replace('https://westmanga.info/manga/', '').replace('/', '').replace(/-/g, ' ')
        const callback = downloadprogress => {
            let progress = downloadprogress.totalBytesWritten / downloadprogress.totalBytesExpectedToWrite;
            this.setState({
                value: (progress) * 100
            })
        }

        const downloadResume = Filesystem
            .createDownloadResumable(this.props.data.download, Filesystem.documentDirectory + `${Folder}/${id}.pdf`, {}, callback);

        try {
            const { uri } = await downloadResume.downloadAsync();
            Alert.alert('Success', `Download Success ${uri}`);
            this.setState({
                progress: false,
                show: false
            })
        } catch (e) {
            Alert.alert('error', e)
        }
    }

    private clear = () => {
        //@ts-ignore
        clearInterval(this.inteval)
        return null;
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {this.itemDownload()}
                {this.checkMark()}
            </View>
        )
    }


    private itemDownload = () => {
        if (this.state.progress) {
            return (
                <View>
                    {this.state.value == 100 ? null : (
                        <View style={{ position: 'relative' }}>
                            <ActivityIndicator size={30} />
                            <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 8 }}>{this.state.value.toFixed(2)}%</Text>
                            </View>
                        </View>
                    )}

                </View>
            )
        } else {
            return (
                <View>
                    {this.state.show ? (
                        <Icon
                        containerStyle={{ marginHorizontal: 2 }}
                        name="ios-download"
                        type="ionicon"
                        size={20}
                        color="rgba(0,0,0,.5)"
                        // onPress={() => this.download()}
                        onPress={() => this.download()}
                    />
                    ):null}
                </View>
            )
        }
    }

    private checkMark = () => {
        return (
            <View>
                {
                    this.props.state[this.props.data.id] ? null : (
                        <Icon
                            name="dot-single"
                            type="entypo"
                            size={20}
                            containerStyle={{ marginHorizontal: 2 }}
                            color="red"
                        />
                    )
                }
            </View>
        )
    }

}

const mapState = state => ({
    state: state.manga.ChapterHistory,
    accounts: state.accounts
})

const mapProps = dispatch => ({
    set_download: (data) => dispatch({ type: "SET_DOWNLOAD", payload: data })
})

export default connect(mapState, mapProps)(MangaDownload)