import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native';
import novelgo from '../../../utils/novelgo';
import { Image, Text } from 'react-native-elements';
import { material, materialColors } from 'react-native-typography';

//redux
import {useDispatch,useSelector} from 'react-redux'
import { POSTS_HOME_POPULER } from '../../../store/novel';

 



const NovelManga = () => {


    //@ts-ignore
    const novel = useSelector(state => state.novel)
    const dipatch = useDispatch()

    useEffect(() => {
        novelgo.Populer().then(response => {
            dipatch({type:POSTS_HOME_POPULER,payload:response})
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ flex: 1 / 3, margin: 3 }}>
            <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 120, width: '100%' }}
            />
        </View>
    )



    const key = (item, index) => item + index;

    return (
        <View>
            
            <View style={{flex:1,margin:3,borderRadius:5,borderTopRightRadius:50,padding:3,backgroundColor:'#A21CFF'}}>
                <Text style={[material.title,{color:'white'}]}>Novel</Text>
               
            </View>
            <FlatList
                data={novel.Populer.slice(0,6)}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={key}
            />
        </View>
    )
}

export default NovelManga;
