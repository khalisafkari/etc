import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux'
import { Icon, Text, Slider } from 'react-native-elements';

class MangaDownload extends Component<any, any>{

    state = {
        progress: false,
        value: 0,
    }


    private download = (id: string) => {
        this.setState({ progress: true })
        //@ts-ignore
        this.inteval = setInterval(() => {
            this.setState({
                value: this.state.value + 1
            })
        }, 500)
    }

    private clear = () => {
        //@ts-ignore
        clearInterval(this.inteval)
        return null;
    }

    render() {
        if (!this.props.accounts.premium) {
            switch (this.props.data.index) {
                case 1:
                    return this.allowDownload()
                case 2:
                    return this.allowDownload()
                default:
                    return this.ReguireBuy()
            }
        }
        return (
            <View>
                {this.allowDownload()}
            </View>
        )
    }

    private allowDownload = () => (
        <View style={{ flexDirection: 'row' }}>
            {this.state.progress ? (
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
            ) : (
                    <Icon
                        containerStyle={{ marginHorizontal: 2 }}
                        name="ios-download"
                        type="ionicon"
                        size={20}
                        color="rgba(0,0,0,.5)"
                        onPress={() => this.download(this.props.data.download)}
                    />
                )}
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

    private ReguireBuy = () => (
        <View style={{ flexDirection: 'row' }}>
            <Icon
                name="dollar"
                type="foundation"
                size={20}
                color="yellow"
            />
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

const mapProps = state => ({
    state: state.manga.ChapterHistory,
    accounts: state.accounts
})

export default connect(mapProps)(MangaDownload)