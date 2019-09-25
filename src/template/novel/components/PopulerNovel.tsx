import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { Text, Image } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'

import { useDispatch, useSelector } from 'react-redux'
import novelgo from '../../../utils/novelgo';
import { POSTS_HOME_POPULER } from '../../../store/novel';
import { material } from 'react-native-typography';
import shadow from '../../../utils/shadow';

const PopulerNovel = () => {

    //@ts-ignore
    const novel = useSelector(state => state.novel)
    const dispatch = useDispatch()

    useEffect(() => {
        novelgo.Populer().then(response => {
            dispatch({ type: POSTS_HOME_POPULER, payload: response })
        })
    },[])

    const renderItem = ({ item }) => (
        <View style={{ position: 'relative', maxWidth: 100, margin: 3 }}>
            <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 140, width: 100,borderRadius:10 }}
            />
            <LinearGradient
                colors={['transparent', '#6066dc']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 140
                }}
            />
            <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-end', padding: 5 }}>
                <Text numberOfLines={1} style={{ color: 'white' }}>{item.title}</Text>
            </View>
        </View>
    )

    const key = (item, index) => item + index;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ margin: 3,backgroundColor:'orange',...shadow(5),borderRadius:10,borderTopEndRadius:80,padding:5 }}>
                <Text style={material.title}>Populer</Text>
            </View>
            <FlatList
                data={novel.Populer}
                renderItem={renderItem}
                keyExtractor={key}
                horizontal
            />
        </View>
    )
}

export default PopulerNovel;