import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native';


import { default as Api } from '../../../utils/manga';

import { useDispatch, useSelector } from 'react-redux'
import { POSTS_LIST_MANGA } from '../../../store/manga';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-elements';
import { material, materialColors } from 'react-native-typography';

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const ListManga = () => {

    const [total, setTotal] = useState(0)
    //@ts-ignore
    const manga = useSelector(state => state.manga)
    const dispatch = useDispatch()

    useEffect(() => {
        Api.List(Api.page).then(response => {
            //@ts-ignore
            setTotal(Number(response.data.list.total))
            //@ts-ignore
            dispatch({ type: POSTS_LIST_MANGA, payload: response.data.list.item })
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ flex: 1 / 3, margin: 3, position: 'relative' }}>
            <TouchableOpacity>
                <Image
                    source={{
                        uri: `https://verdauen.com/lhscan/?id=${item.data.image}`
                    }}
                    style={{
                        height: 120,
                        width: '100%'
                    }}
                />
                <LinearGradient
                    colors={['transparent', 'black']}
                    style={{ position: 'absolute', height: 120, top: 0, left: 0, right: 0 }}
                />
                <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-end', padding: 4 }}>
                    <Text numberOfLines={1} style={[material.caption, { color: materialColors.whitePrimary }]}>{item.data.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const key = (item, index) => item + index;
    return (
        <View>
            {manga.List.length ? (
                //@ts-ignore
                <FlatList
                    numColumns={3}
                    data={manga.List}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.1}
                    keyExtractor={key}
                    waitForInteraction
                    viewAreaCoveragePercentThreshold
                    onEndReached={() => {
                        Api.page = Api.page + 1
                        if (Api.page == total) {

                        } else {
                            Api.List(Api.page).then(res => {
                                //@ts-ignore
                                dispatch({ type: POSTS_LIST_MANGA, payload: res.data.list.item })
                            })
                        }
                    }}
                />
            ) : (
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                        numColumns={3}
                        renderItem={() => (
                            <View style={{ flex: 1, margin: 5 }}>
                                <Placeholder
                                    Animation={Fade}
                                    Left={() => (
                                        <PlaceholderMedia
                                            size={120}
                                        />
                                    )}
                                />
                            </View>
                        )}
                        keyExtractor={key}
                    />

                )}
        </View>
    )
}


export default ListManga;