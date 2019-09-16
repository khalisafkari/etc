import React from 'react'
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';


//redux
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import { ListItem, Icon } from 'react-native-elements';
import { ADD_HISTORY_CHAPTER } from '../../../store/manga';
import MangaDownload from './MangaDownload';

const MangaChapterList = () => {

    //@ts-ignore
    const state = useSelector(state => state.manga)
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const data = state.History[navigation.getParam('id')];

    const renderItem = ({ item,index }) => (
        <View>
            <TouchableOpacity
                onPress={() => onRead(item.id)}
            >
                <ListItem
                    title={item.title}
                    rightElement={(
                    //@ts-ignore
                    <MangaDownload 
                        data={{id:item.id,download:item.download,index}} />)}
                    // rightElement={(
                    //     <View style={{flexDirection:'row'}}>
                    //         <Icon
                    //             name="ios-arrow-forward"
                    //             type="ionicon"
                    //             size={15}
                    //             color={state.ChapterHistory[item.id] ? 'black' : 'rgb(0, 0, 255)'} />
                    //        <ActivityIndicator/>
                    //     </View>
                    // )}
                />
            </TouchableOpacity>
        </View>
    )

    const onRead = (id: string) => {
        dispatch({ type: ADD_HISTORY_CHAPTER, payload: { [`${id}`]: true } })
    }

    const key = (item, index) => item + index

    return (
        <View style={{ paddingTop: 15 }}>
            {data ? (
                <FlatList
                    data={data.item}
                    renderItem={renderItem}
                    keyExtractor={key}
                />
            ) : null}
        </View>
    )
}

export default MangaChapterList;