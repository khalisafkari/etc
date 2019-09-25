import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { ListItem, Image, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { material } from 'react-native-typography'


import { useDispatch, useSelector } from 'react-redux'
import novelgo from '../../../utils/novelgo';

import { POSTS_HOME_RECENTS } from '../../../store/novel';
import shadow from '../../../utils/shadow';



const RecentsNovel = () => {

    //@ts-ignore
    const novel = useSelector(state => state.novel)
    const dispatch = useDispatch()

    useEffect(() => {
        novelgo.Recents().then(res => {
            dispatch({ type: POSTS_HOME_RECENTS, payload: res })
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, ...shadow(5) }}>
            <ListItem
                leftElement={(
                    <Image
                        source={{ uri: item.novel.thumbnail }}
                        style={{
                            height: 120,
                            width: 80,
                            borderRadius:10
                        }}
                    />
                )}

                containerStyle={{ ...shadow(5), alignItems: 'flex-start', margin: 0, paddingVertical: 2 }}
                titleStyle={{ marginHorizontal: 5 }}
                titleProps={{
                    style: material.caption
                }}
                title={item.novel.title}
                subtitle={(<View style={{ marginHorizontal: 5 }}>
                    <HTML html={item.title} containerStyle={{ fontSize: 10 }} />
                </View>)}
            />
        </View>
    )

    const key = (item, index) => item + index;

    const renderPlaceholder = () => (
        <Placeholder
            style={{ padding: 5 }}
            Animation={Fade}
            Left={() => (<PlaceholderMedia style={{ height: 120, width: 80 }} />)}

        >
            <PlaceholderLine width={80} style={{ margin: 3 }} />
            <PlaceholderLine width={60} style={{ margin: 3 }} />
        </Placeholder>
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={{ margin: 3,backgroundColor:'orange',...shadow(5),borderRadius:10,borderTopEndRadius:80,padding:5 }}>
                <Text style={material.title}>Recents</Text>
            </View>
            {novel.Recents.length ? (
                <FlatList
                    data={novel.Recents}
                    renderItem={renderItem}
                    keyExtractor={key}
                />
            ) : (
                    <FlatList
                        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                        renderItem={renderPlaceholder}
                        keyExtractor={key}
                    />
                )}
        </View>
    )
}

export default RecentsNovel;