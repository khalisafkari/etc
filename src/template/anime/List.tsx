import React, { useEffect } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native';


import {useDispatch,useSelector} from 'react-redux'
import anime from '../../utils/anime';
import { POSTS_LIST_ANIME } from '../../store/anime';
import { ListItem } from 'react-native-elements';

import {useNavigation} from 'react-navigation-hooks'

const AnimeList = () => {

    //@ts-ignore
    const animes = useSelector(state => state.anime)
    const dispatch = useDispatch()

    const navigation = useNavigation()

    useEffect(()=>{
        anime.ListAnime().then(response=>{
            dispatch({type:POSTS_LIST_ANIME,payload:response})
        })
    },[])


    const renderItem = ({item}) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('AnimePosts',{id:item.id})}>
                <ListItem
                    title={item.title}
                />
            </TouchableOpacity>
        </View>
    )

    const key = (item,index) => item + index;

    return(
        <View style={{flex:1}}>
            <FlatList
                data={animes.List}
                renderItem={renderItem}
                keyExtractor={key}
                maxToRenderPerBatch={50}
            />
        </View>
    )
}

//@ts-ignore

AnimeList.navigationOptions = {header:null}

export default AnimeList;