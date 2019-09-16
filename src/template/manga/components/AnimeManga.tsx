import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Image as Img } from 'react-native';


//redux
import { useDispatch, useSelector } from 'react-redux'
import { AnimeApi } from '../../../../serve';
import gql from 'graphql-tag';
import { POSTS_HOME_RECOMMENDED } from '../../../store/anime';
import { Image, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import kitsu from '../../../utils/kitsu';
import { material } from 'react-native-typography';


import { useNavigation } from 'react-navigation-hooks'

const AnimeManga = () => {

    //state
    //@ts-ignore
    const [id, setId] = useState('');
    const [title, settitle] = useState('')
    const [images, setImages] = useState('')
    const [tiny, setImageTiny] = useState('')
    const [synopsis, setsynopsis] = useState('')


    //@ts-ignore
    const anime = useSelector(state => state.anime)
    const dispatch = useDispatch();

    const navigation = useNavigation()

    useEffect(() => {
        AnimeApi.query({ query: gql`${sql}` }).then(({ data, errors, loading }) => {
            dispatch({ type: POSTS_HOME_RECOMMENDED, payload: data.Home.Home })
            const todos = []
            for (let a of data.Home.Home) {
                //@ts-ignore
                if (a.id.indexOf('/movie/') !== -1) { } else {
                    todos.push(a)
                }
            }
            kitsu.AnimeKitsu(`${todos[10].id.replace('https://nanime.in/anime/', '')}`)
                .then(response => {
                    //@ts-ignore
                    setId(todos[10].id);

                    //@ts-ignore
                    settitle(response.titles.en_jp)
                    //@ts-ignore
                    setImages(response.posterImage.original)
                    //@ts-ignore
                    setImageTiny(response.posterImage.small)
                    //@ts-ignore
                    setsynopsis(response.synopsis);
                })
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ maxWidth: 140, position: 'relative', marginHorizontal: 3, marginVertical: 5 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AnimePosts', { id: item.id })}
            >
                <Image
                    source={{ uri: `https://verdauen.com/lhscan/?id=${item.images}` }}
                    style={{
                        height: 220,
                        width: 140
                    }}
                />
            </TouchableOpacity>
        </View>
    )

    const key = (item, index) => item + index;

    return (
        <View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Anime')}
                >
                    <View style={{ flex: 1, margin: 3, borderRadius: 5, borderTopRightRadius: 50, padding: 3, backgroundColor: '#A21CFF' }}>
                        <Text style={[material.title, { color: 'white' }]}>Anime</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={anime.Recommend.slice(0, 6)}
                renderItem={renderItem}
                keyExtractor={key}
                horizontal
            />
        </View>
    )
}

const sql = `{
    Home{
      Home{
        id
        images
        title
      }
    }
}`

export default AnimeManga;