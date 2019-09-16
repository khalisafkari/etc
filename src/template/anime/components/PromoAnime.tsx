import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'


import Anime from '../../../utils/anime';
import { useDispatch, useSelector } from 'react-redux'
import { POSTS_HOME_ANIME, POSTS_HOME_RECOMMENDED } from '../../../store/anime';
import { Image, Text, Icon } from 'react-native-elements';
import kitsu from '../../../utils/kitsu';
import { material, materialColors } from 'react-native-typography';


import {useNavigation} from 'react-navigation-hooks'

const PromoAnime = () => {

    const [id, seid] = useState('')
    const [image, setimage] = useState('');
    const [synopsis, setsynopsis] = useState('')
    const [title, settitle] = useState('')
    const [small,setsmall] = useState('')

    const navigation = useNavigation()

    //@ts-ignore
    const dispatch = useDispatch();

    useEffect(() => {
        Anime.Home().then(res => {
            const todos = []
            //@ts-ignore
            for (let i = 0; i < res.length; i++) {
                if (res[i].id.indexOf('/movie/') !== -1) { }
                else {
                    todos.push(res[i])
                }
            }
            seid(todos[0].id);
            settitle(todos[0].title)
            kitsu.AnimeKitsu(`${todos[0].id.replace('https://nanime.in/anime/', '')}`)
                .then(response => {
                    //@ts-ignore
                    setimage(response.posterImage.original)
                    //@ts-ignore
                    setsynopsis(response.synopsis);
                    //@ts-ignore
                    setsmall(response.posterImage.small)
                })
            dispatch({ type: POSTS_HOME_ANIME, payload: todos })
        })

        Anime.Recommend().then(res=>{
            dispatch({type:POSTS_HOME_RECOMMENDED,payload:res})
        })

    }, [])



    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                source={{ uri: image }}
                style={{
                    height: 250,
                    width: '100%'
                }}
            />
            <LinearGradient
                colors={['transparent', 'black']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250
                }}
            />
            
            <View style={{ flexDirection: 'row', position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-start', padding: 5, alignItems: 'flex-end' }}>
                <Image
                    source={{uri:small}}
                    style={{
                        height:100,
                        width:70,
                        borderRadius:10
                    }}
                />
                <View style={{flex:1,marginHorizontal:3}}>
                    <Text numberOfLines={1} style={[material.button, { color: materialColors.whitePrimary }]}>{title}</Text>
                    <Text numberOfLines={3} style={[material.caption,{ color: materialColors.whiteTertiary }]}>{synopsis}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('AnimePosts',{id})}
                style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="playcircleo" color="rgba(255,255,255,0.5)" type="antdesign" />
            </TouchableOpacity>
        </View>
    )
}

export default PromoAnime;