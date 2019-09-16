import React, { useEffect, useState } from 'react'
import { View } from 'react-native';

import { useNavigation } from 'react-navigation-hooks'
import kitsu from '../../../utils/kitsu';
import { Image, Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { material, materialColors } from 'react-native-typography';


const BannerPostsAnime = (props) => {

    // console.log(props)

    const [title, setTitle] = useState('')
    const [small, setSmall] = useState('')
    const [poster, setPoster] = useState('')
    const [subtype, setSubtype] = useState('')
    const [status, setStatus] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [youtube, setYoutube] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        // kitsu.AnimeKitsu(`${navigation.getParam('id').replace('https://nanime.in/anime/','')}`)
        // .then(response=>{
        //     console.log(response)
        // })

        kitsu.AnimeKitsu(`${navigation.getParam('id').replace('https://nanime.in/anime/','')}`).then(res => {
            // console.log(res)
            //@ts-ignore
            setTitle(res.titles.en_jp)
            //@ts-ignore
            setSmall(res.posterImage.small)
            //@ts-ignore
            setPoster(res.posterImage.original)
            //@ts-ignore
            setSubtype(res.subtype)
            //@ts-ignore
            setStatus(res.status)
            //@ts-ignore
            setSynopsis(res.synopsis)
            //@ts-ignore
            setYoutube(`https://www.youtube.com/watch?v=${res.youtubeVideoId}`)
        })
    }, [])

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                source={{
                    uri: `https://verdauen.com/lhscan/?id=${poster}`
                }}
                style={{
                    height: 250,
                    width: '100%'
                }}
                resizeMode="cover"
                blurRadius={1}
            />
            <LinearGradient
                colors={['transparent', 'black']}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    height: 250
                }}
            />
            <View style={{position:'absolute',height:'100%',width:'100%',justifyContent:'flex-end',padding:5,alignItems:'center'}}>
                <Image
                    source={{uri:small}}
                    style={{
                        height:120,
                        width:80
                    }}
                />
                <Text style={{ color: 'white' }}>{title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly' }}>
                    <Text style={[material.body2, { color: materialColors.whitePrimary,marginHorizontal:2 }]}>{subtype}</Text>
                    <Text style={[material.body2, { color: materialColors.whitePrimary,marginHorizontal:2 }]}>{status}</Text>
                </View>
                <Text numberOfLines={3} style={[material.caption,{ color: materialColors.whitePrimary }]}>{synopsis}</Text>
            </View>
            <View style={{position:"absolute",padding:5,height:"100%",width:"100%",justifyContent:"flex-start",alignItems:"flex-start"}}>
                <View style={{backgroundColor:'rgba(0,0,0,.5)',justifyContent:'center',alignItems:'center',borderRadius:50,height:40,width:40}}>
                    <Icon
                        name="close"
                        color="white"
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </View>
    )
}

export default BannerPostsAnime;