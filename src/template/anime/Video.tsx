import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native';
import anime from '../../utils/anime';
import IVideo from 'react-native-ivideo';

class VideoAnime extends React.Component<any,any>{

    state = {
        loading:true,
        video:''
    }

    async componentDidMount(){
        const data = await anime.Video(this.props.navigation.getParam('id'))
        this.setState({
            loading:false,
            video:data
        })
    }


    render(){
        if(this.state.loading){
            return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>
        }
        return(
            <View style={{flex:1}}>
                <IVideo
                    source={{
                        uri:this.state.video
                    }}
                    width='100%'
                    height={240}
                    startFullscreen={true}   
                />
            </View>
        )
    }

    static navigationOptions = {header:null}

}


export default VideoAnime