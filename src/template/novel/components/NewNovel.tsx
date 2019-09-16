import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { Text, Image } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'

import novelgo from '../../../utils/novelgo';

import { useSelector, useDispatch } from 'react-redux'
import { POSTS_HOME_NOVEL } from '../../../store/novel';

const NewNovel = () => {

    //@ts-ignore
    const novel = useSelector(state => state.novel);
    const dispatch = useDispatch();


    useEffect(() => {
        novelgo.Home().then(response => {
            dispatch({ type: POSTS_HOME_NOVEL, payload: response })
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ position: 'relative', maxWidth: 100, margin: 3 }}>
            <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 160, width: 100,borderRadius:10 }}
            />
            <LinearGradient
                colors={['transparent', 'black']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 160
                }}
            />
            <View style={{position:'absolute',height:'100%',width:'100%',justifyContent:'flex-end',padding:5}}>
                <Text numberOfLines={1} style={{color:'white'}}>{item.title}</Text>
            </View>
        </View>
    )

    const key = (item, index) => item + index;

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={novel.Home}
                renderItem={renderItem}
                keyExtractor={key}
                horizontal
            />
        </View>
    )
}

export default NewNovel;