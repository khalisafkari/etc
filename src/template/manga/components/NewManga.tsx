import React, { useEffect } from 'react'
import { View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { material } from 'react-native-typography';

//redux
import { useDispatch, useSelector } from 'react-redux'
import { MangaApi } from '../../../../serve';
import gql from 'graphql-tag';
import { POSTS_HOME_MANGA } from '../../../store/manga';

//navigation 
import {useNavigation} from 'react-navigation-hooks'


const NewManga = () => {

    //@ts-ignore
    const manga = useSelector(state => state.manga);
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        MangaApi.query({ query: gql`${sql}` }).then(({ data }) => {
            dispatch({ type: POSTS_HOME_MANGA, payload: [...data.posts_unfilter.new.slice(0, 3), ...data.posts_unfilter.tetangga.slice(0, 6)] })
        })
    }, [])


    const renderItem = ({ item }) => (
        <View style={{ flex: 1 / 3, margin: 3, position: 'relative' }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('MangaPosts',{id:item.id})}
            >
                <Image
                    source={{ uri: `https://verdauen.com/lhscan/?id=${item.images}` }}
                    style={{ height: 160, width: '100%' }}
                />
                <LinearGradient
                    colors={['transparent', 'black']}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 160
                    }}
                />
                <View style={{ position: 'absolute', padding: 4, height: '100%', width: '100%', justifyContent: 'flex-end' }}>
                    <Text numberOfLines={1} style={[material.caption, { color: 'white', fontWeight: '400' }]}>{item.title}</Text>
                    <Text numberOfLines={1} style={[material.subheading, { color: 'white', fontSize: 8 }]}>{item.chapter.title}</Text>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <Text style={{ fontSize: 10, color: '#8D18FF' }}>{item.release}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ flex: 1,paddingTop:20 }}>
            {/* <View style={{ flex: 1, margin: 3, borderRadius: 5, borderTopRightRadius: 50, padding: 3, backgroundColor: '#A21CFF' }}>
                <Text style={[material.title, { color: 'white' }]}>Manga</Text>
            </View> */}
            <FlatList
                numColumns={3}
                data={manga.Home}
                renderItem={renderItem}
            />
        </View>
    )
}


const sql = `{
    posts_unfilter{
      new{
        id
        images
        title
        chapter{
          id
          title
        }
        release
      }
      tetangga{
        id
        images
        title
        chapter{
          id
          title
        }
        release
      }
    }
  }`

export default NewManga;