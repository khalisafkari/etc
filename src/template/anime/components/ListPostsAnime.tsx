import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native';
import anime from '../../../utils/anime';
import { ListItem } from 'react-native-elements';
import { materialColors, material } from 'react-native-typography';
import { useNavigation } from 'react-navigation-hooks'

const ListPostsAnime = () => {

    const [list,setList] = useState([])
    const navigation = useNavigation()

    useEffect(()=>{
        anime.ReadingAnime(navigation.getParam('id'))
        .then(res=>{
            //@ts-ignore
           setList(res.anime)
        })
    },[])

    const renderItem = ({item}) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('VideoAnime',{id:item.id})}>
            <ListItem
                containerStyle={{backgroundColor:'black'}}
                title={item.title}
                titleProps={{
                    style:[material.caption,{color:materialColors.whitePrimary}]
                }}
            />
            </TouchableOpacity>
        </View>
    ) 

    return(
        <View>
            <FlatList
                data={list}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ListPostsAnime