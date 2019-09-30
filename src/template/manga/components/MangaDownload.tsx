import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native';

import { connect } from 'react-redux'
import { Icon, Text } from 'react-native-elements';
import * as Filesystem from 'expo-file-system'

class MangaDownload extends Component<any, any>{

    state = {
        progress: false,
        value: 0,
    }

    // componentDidMount() {
    //     console.log(this.props.data)
    // }


    // private download = (id: string) => {
    //     this.setState({ progress: true })
    //     //@ts-ignore
    //     this.inteval = setInterval(() => {
    //         this.setState({
    //             value: this.state.value + 1
    //         })
    //     }, 500)
    // }

    // private clear = () => {
    //     //@ts-ignore
    //     clearInterval(this.inteval)
    //     return null;
    // }

    private download = async() => {
        this.setState({ progress: true })
        let id = this.props.data.id.replace('https://westmanga.info/','').replace('/','');
        const callback = downloadprogress => {
            let progress = downloadprogress.totalBytesWritten / downloadprogress.totalBytesExpectedToWrite;
            this.setState({
                value:(progress) * 100
            })
        } 

        const downloadResume = Filesystem
        .createDownloadResumable(this.props.data.download,Filesystem.documentDirectory + `${id}.pdf`,{},callback);

        try {
            const {uri} = await downloadResume.downloadAsync();
            Alert.alert('Success',`Download Success ${uri}`);
            this.setState({
                progress:false
            })
        } catch (e) {
            Alert.alert('error',e)
        }
    }

    private clear = () => {
        //@ts-ignore
        clearInterval(this.inteval)
        return null;
    }

    render() {
        return (
            <View style={{flexDirection:'row'}}>
                {this.itemDownload()}
                {this.checkMark()}
            </View>
        )
    }


    private itemDownload = () => {
        if (this.state.progress) {
            return(
                <View>
                    {this.state.value == 100 ? this.clear() : (
                        <View style={{ position: 'relative' }}>
                            <ActivityIndicator size={30} />
                            <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 8 }}>{this.state.value}%</Text>
                            </View>
                        </View>
                    )}

                </View>
            )
        } else {
           return(
            <Icon
                containerStyle={{ marginHorizontal: 2 }}
                name="ios-download"
                type="ionicon"
                size={20}
                color="rgba(0,0,0,.5)"
                onPress={() => this.download()}
            />
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

    // render() {
    //     switch (this.props.data.index) {
    //         case 0:
    //             return (
    //                 <View style={{ flexDirection: 'row' }}>
    //                     {this.state.progress ? (
    //                         <View>
    //                             {this.state.value == 100 ? this.clear() : (
    //                                 <View style={{ position: 'relative' }}>
    //                                     <ActivityIndicator size={30} />
    //                                     <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
    //                                         <Text style={{ fontSize: 8 }}>{this.state.value}%</Text>
    //                                     </View>
    //                                 </View>
    //                             )}

    //                         </View>
    //                     ) : (
    //                             <Icon
    //                                 containerStyle={{ marginHorizontal: 2 }}
    //                                 name="ios-download"
    //                                 type="ionicon"
    //                                 size={20}
    //                                 color="rgba(0,0,0,.5)"
    //                                 onPress={() => this.download(this.props.data.download)}
    //                             />
    //                         )}
    //                     {
    //                         this.props.state[this.props.data.id] ? null : (
    //                             <Icon
    //                                 name="dot-single"
    //                                 type="entypo"
    //                                 size={20}
    //                                 containerStyle={{ marginHorizontal: 2 }}
    //                                 color="red"
    //                             />
    //                         )
    //                     }

    //                 </View>
    //             )
    //         default:
    //             return this.props.accounts.premium ? null : (
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Icon
    //                         name="dollar"
    //                         type="foundation"
    //                         size={20}
    //                         color="yellow"
    //                     />
    //                     {
    //                         this.props.state[this.props.data.id] ? null : (
    //                             <Icon
    //                                 name="dot-single"
    //                                 type="entypo"
    //                                 size={20}
    //                                 containerStyle={{ marginHorizontal: 2 }}
    //                                 color="red"
    //                             />
    //                         )
    //                     }
    //                 </View>
    //             )


    //     }
    // }
}

const mapState = state => ({
    state: state.manga.ChapterHistory,
    accounts: state.accounts
})

// const mapProps = dispatch => ({
//     set_download:(id:string)=>dispatch({type:"SET_DOWNLOAD",payload:})
// })

export default connect(mapState)(MangaDownload)