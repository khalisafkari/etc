import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Icon } from 'react-native-elements';
//redux

import { useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import manga from '../../../utils/manga';

const HistoryCP = (props): any => {

    const [baru, setBaru] = useState(false)
    const navigation = useNavigation()
    //@ts-ignore
    const state = useSelector(state => state.manga.History)

    useEffect(() => {
        manga.PostsManga(props.id).then(response => {
            //@ts-ignore
            if (!state[props.id].item.length === response.item.length) {
                setBaru(true)
            }
        })
    }, [])
    const data = state[props.id]

    return (
        <View style={{ flex: 1 / 3, margin: 3 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('MangaPosts',{id:props.id})}
            >
                <Image
                    source={{
                        uri: data.data.image
                    }}
                    style={{
                        height: 140,
                        width: '100%'
                    }}
                    resizeMode="stretch"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 2 }}>
                    {baru ? (<Icon name="dot-single" color="red" size={15} type="entypo" />) : null}
                    <Text numberOfLines={1}>{data.data.title}</Text>
                </View>
                <Text numberOfLines={1} style={{ fontSize: 10, margin: 2 }}>{data.item[data.item.length - 1].title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HistoryCP