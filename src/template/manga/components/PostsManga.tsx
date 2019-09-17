import React, { useEffect } from 'react'


import { View, FlatList, TouchableOpacity } from 'react-native';

//redux
import { useDispatch, useSelector } from 'react-redux'

//navigation
import { useNavigation } from 'react-navigation-hooks'
import manga from '../../../utils/manga';
import { ADD_HISTORY_MANGA, ADD_BOOKMARK_MANGA } from '../../../store/manga';
import { Text, Image, Button, Icon } from 'react-native-elements';
import { material } from 'react-native-typography';
import Bookmark from '../../../components/Bookmark';

const PostsManga = () => {

    //@ts-ignore
    const mangas = useSelector(state => state.manga);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        manga.PostsManga(navigation.getParam('id')).then(response => {
            dispatch({
                type: ADD_HISTORY_MANGA, payload: {
                    id: navigation.getParam('id'),
                    //@ts-ignore
                    data: response.data,
                    //@ts-ignore
                    item: response.item
                }
            })
        })
    }, [])

    const data = mangas.History[`${navigation.getParam('id')}`]

    const onRead = (id:string) => {
        dispatch({type:ADD_HISTORY_MANGA,payload:{[`${id}`]:true}})
    }

    const addBookmark = (id:string) => {
        dispatch({type:ADD_BOOKMARK_MANGA,payload:{[`${id}`]:true}})
    }

    const rmBookmark = (id:string) => {

    }

    return (
        <View style={{backgroundColor: '#fff',paddingBottom:15}}>
            {data ? (
                <View style={{ position: 'relative', height: 200 }}>
                    <Image
                        source={{ uri: data.data.image }}
                        style={{ height: 120, width: '100%' }}
                        blurRadius={2}
                    />
                    <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#f5f5f5', padding: 10, borderRadius: 10 }}>
                            <Image
                                source={{ uri: data.data.image }}
                                style={{ height: 100, width: 80 }}
                            />
                        </View>
                    </View>
                </View>
            ) : null}
            {data ? (
                <View>
                    <Text style={{ textAlign: 'center' }}>{data.data.author}</Text>
                    <Text style={[material.body1, { textAlign: 'center' }]}>{data.data.status} | {data.item.length}</Text>
                </View>
            ) : null}
            {data ? (
                <View style={{ paddingTop:5,flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Icon
                        name="play"
                        type="feather"
                        color="blue"
                        onPress={() => onRead(data.item[0].id)}
                    />
                    {/* <Icon
                        name="list"
                        type="feather"
                        color="blue"
                        onPress={() => console.log('pres')}
                    /> */}
                    {/* <Icon
                        name="favorite-border"
                        type="material-icons"
                        color="blue"
                        onPress={() => addBookmark(navigation.getParam('id'))}
                    /> */}
                    <Bookmark id={navigation.getParam('id')}/>
                    <Icon
                        name="share"
                        type="material-icons"
                        color="blue"
                        onPress={() => console.log('pres')}
                    />
                </View>
            ) : null}
        </View>
    )
}

export default PostsManga;