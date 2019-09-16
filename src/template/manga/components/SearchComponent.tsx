import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import kitsu from '../../../utils/kitsu';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Icon, Text } from 'react-native-elements';
import { material, materialColors } from 'react-native-typography';


import {useNavigation} from 'react-navigation-hooks'

export const SearchComponentManga = (props): any => {

    const [posterImage, setposterImage] = useState('')
    const [synopsis, setsynopsis] = useState('')
    const [averageRating, setaverageRating] = useState(0)
    const [serialization, setserialization] = useState('')
    const navigation  = useNavigation()

    useEffect(() => {
        kitsu.MangaKitsu(props.title).then(res => {
            //@ts-ignore
            setposterImage(res.attributes.posterImage.original)
            //@ts-ignore
            setsynopsis(res.attributes.synopsis)
            //@ts-ignore
            setaverageRating(Number(res.attributes.averageRating))
            //@ts-ignore
            setserialization(res.attributes.serialization);
        })
    }, [])

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row', margin: 3 }}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: props.image }}
                        style={{ height: 120, width: 80 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120
                        }}
                    />
                    <Icon
                        containerStyle={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        name="chrome-reader-mode"
                        color="rgba(255,255,255,0.7)"
                    />
                </View>
                <View style={{ flex: 1, position: 'relative' }}>
                    <Image
                        source={{uri:posterImage}}
                        style={{height:120,width:'100%'}}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,1)']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120
                        }}
                    />
                    <View style={{position:'absolute',height:'100%',width:'100%',paddingHorizontal:5,justifyContent:'flex-start'}}>
                        <Text numberOfLines={1} style={[material.button,{color:materialColors.whitePrimary}]}>{props.title}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[material.body2,{color:materialColors.whitePrimary,marginHorizontal:2}]}>{averageRating}</Text>
                            <Text numberOfLines={1} style={[material.body2,{color:materialColors.whitePrimary,marginHorizontal:2}]}>{serialization}</Text>
                        </View>
                        <Text numberOfLines={3} style={[material.caption,{color:materialColors.whitePrimary}]}>{synopsis}</Text>
                        <Text style={[material.button,{color:'#3E38F2'}]}>Manga</Text>
                    </View>
                </View>
            </View>
        </>
    )
}


export const SearchComponentAnime = (props): any => {
    const [posterImage, setposterImage] = useState('')
    const [synopsis, setsynopsis] = useState('')
    const [averageRating, setaverageRating] = useState(0)
    const [serialization, setserialization] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        kitsu.AnimeKitsu(props.id.replace('https://nanime.in/anime//','').replace('/movie/','')).then(res => {
            //@ts-ignore
            setposterImage(res.posterImage.original)
            //@ts-ignore
            setsynopsis(res.synopsis)
            //@ts-ignore
            setaverageRating(Number(res.averageRating))
            //@ts-ignore
            setserialization(res.serialization);
        })
    }, [])

    return (
        <>
            <View >
                <TouchableOpacity
                    onPress={() => navigation.navigate('AnimePosts',{id:props.id.replace('https://nanime.in/anime//','https://nanime.in/anime/')})}
                    style={{ flex: 1, flexDirection: 'row', margin: 3 }}
                >
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: props.images }}
                        style={{ height: 120, width: 80 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120
                        }}
                    />
                    <Icon
                        containerStyle={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        name="playcircleo"
                        type="antdesign"
                        color="rgba(255,255,255,0.7)"
                    />
                </View>
                <View style={{ flex: 1, position: 'relative' }}>
                    <Image
                        source={{uri:posterImage}}
                        style={{height:120,width:'100%'}}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,1)']}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 120
                        }}
                    />
                    <View style={{position:'absolute',height:'100%',width:'100%',paddingHorizontal:5,justifyContent:'flex-start'}}>
                        <Text numberOfLines={1} style={[material.button,{color:materialColors.whitePrimary}]}>{props.title}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[material.body2,{color:materialColors.whitePrimary,marginHorizontal:2}]}>{averageRating}</Text>
                            <Text numberOfLines={1} style={[material.body2,{color:materialColors.whitePrimary,marginHorizontal:2}]}>{serialization}</Text>
                        </View>
                        <Text numberOfLines={3} style={[material.caption,{color:materialColors.whitePrimary}]}>{synopsis}</Text>
                        <Text style={[material.button,{color:'#F20505'}]}>Anime</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </>
    )
}



