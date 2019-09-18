import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { material } from 'react-native-typography';

//redux
import { useSelector } from 'react-redux'
import manga from '../../../utils/manga';
import {useNavigation} from 'react-navigation-hooks'


const BookmarkCP = (props): any => {

    const [title, setTitle] = useState('')
    const [last, setLast] = useState('')
    const [image, setImage] = useState('')
    const [rate,setRate] = useState(null);
    const navigation = useNavigation()

    //@ts-ignore
    const state = useSelector(state => state.manga.Bookmark)

    useEffect(() => {
        manga.PostsManga(props.id).then(response => {
            //@ts-ignore
            setTitle(response.data.title)
            //@ts-ignore
            setLast(response.item[0].title)
            //@ts-ignore
            setImage(response.data.image)
            //@ts-ignore
            setRate(Number(response.data.rating))
        })
    }, [])

    return (
        <View >
            <TouchableOpacity
                onPress={() => navigation.navigate('MangaPosts',{id:props.id})}
                style={{ flex: 1, flexDirection: 'row', padding: 5 }}
            >
            <Image
                source={{ uri: image }}
                style={{
                    height: 100,
                    width: 80
                }}
                resizeMode="stretch"
            />
            <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text numberOfLines={2} style={[material.body2]}>{title}</Text>
                <Text style={[material.caption]}>{last}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default BookmarkCP;