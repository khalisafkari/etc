import React, { useEffect } from 'react'
import { View,TouchableOpacity,FlatList  } from 'react-native';

//redux & nav
import {useDispatch,useSelector} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'
import manga from '../utils/manga';
import { POSTS_RECOMMEND_MANGA } from '../store/manga';
import { Text, Image } from 'react-native-elements';
import { material } from 'react-native-typography';

const Recommended = () => {

    const navigation = useNavigation();
    //@ts-ignore
    const state = useSelector(state => state.manga)
    const dispatch = useDispatch();

    useEffect(()=>{
        manga.RecommendManga()
        .then(response=>{
            dispatch({type:POSTS_RECOMMEND_MANGA,payload:response})
        })
    })

    const renderItem = ({item}:any) => (
        <View style={{maxWidth:100,margin:3}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('MangaPosts',{id:item.id})}
            >
            <Image
                source={{uri:`https://verdauen.com/lhscan/index.php?id=${item.images}`}}
                style={{height:140,width:100}}
                resizeMode="stretch"
            />
            <View>
                <Text style={[material.button,{fontSize:10}]} numberOfLines={1}>{item.title}</Text>
                <Text style={[material.caption,{fontSize:8}]}>{item.chapter.title}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )

    const key = (item,index)=> item + index;

    return(
        <View>
            <FlatList
                data={state.Recommend}
                renderItem={renderItem}
                horizontal
                keyExtractor={key}
            />
        </View>
    )
}

export default Recommended;