import React, { useEffect, useState } from 'react'
import { View } from 'react-native';

import {useNavigation} from 'react-navigation-hooks'
import anime from '../../utils/anime';

const VideoAnime = () => {

    const [video,setVideo] = useState('')
    const [load,setLoad] = useState(true)
    const navigation = useNavigation()

    useEffect(()=>{
       const id =  navigation.getParam('id')
       anime.Video(id).then(res=>{
           console.log(res);
           setLoad(false)
           //@ts-ignore
           setVideo(res)
       })
    },[])
    

    return load ? (
        <View></View>
    ):(
        <View style={{flex:1}}>
            <video width="100%" height="100%" controls>
                <source src={video}/>
            </video>
        </View>
    )
}   

VideoAnime.navigationOptions = {header:null}

export default VideoAnime