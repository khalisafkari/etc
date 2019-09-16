import React, { useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native';


import { useNavigation } from 'react-navigation-hooks'
import manga from '../../utils/manga';
import kitsu from '../../utils/kitsu';
import { Text, Image, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { material, materialColors } from 'react-native-typography';

const MangaGenre = () => {

    const navigation = useNavigation();
    const [banner, setBanner] = useState({})
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])

    useEffect(() => {
        manga.postGenre(navigation.getParam('id')).then(res => {
            //@ts-ignore
            kitsu.MangaKitsu(res.slice(0, 1)[0].title).then(response => {
                setBanner({
                    //@ts-ignore
                    ...res.slice(0, 1)[0],
                    //@ts-ignore
                    synopsis: response.attributes.synopsis,
                    //@ts-ignore
                    image: response.attributes.posterImage.original,
                    //@ts-ignore
                    en_jp: response.attributes.titles.en_jp
                })
            })
            //@ts-ignore
            setList(res.slice(1))
            setLoading(false)
        })
    }, [])

    const renderItem = ({ item }) => (
        <View style={{ flex: 1 / 3, margin: 3, position: 'relative' }}>
            <Image
                source={{ uri: item.image }}
                style={{ height: 140, width: '100%' }}
            />
            <LinearGradient
                colors={["transparent", "black"]}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 140
                }}
            />
            <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 3 }}>
                <Text numberOfLines={1} style={[material.caption, { color: materialColors.whiteSecondary }]}>{item.title}</Text>
            </View>
        </View>
    )

    const key = (item, index) => item + index;

    if (loading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <View style={{ position: 'relative' }}>
                <Image
                    //@ts-ignore
                    source={{ uri: `https://verdauen.com/lhscan/index.php?id=${banner.image}` }}
                    style={{
                        height: 300,
                        width: '100%'
                    }}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={["transparent", "black"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 300
                    }}
                    start={{x:1,y:0}}
                />
                <View style={{ position: 'absolute', height: '100%', padding: 5, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <Text numberOfLines={2} style={[material.button, { color: materialColors.whitePrimary }]}>{
                        //@ts-ignore
                        banner.title
                    }</Text>
                    <Text numberOfLines={4} style={[material.caption, { color: materialColors.whiteTertiary }]}>{
                        //@ts-ignore
                        banner.synopsis
                    }</Text>
                </View>
                <Icon
                    containerStyle={{
                        padding:5,
                        position:"absolute",
                        height:'100%',
                        width:'100%',
                        justifyContent:'flex-start',
                        alignItems:'flex-start'
                        
                    }}
                    name="close"
                    color="rgba(255,255,255,.9)"
                    size={35}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={key}
                numColumns={3}
            />
        </View>
    )
}

MangaGenre.navigationOptions = {
    header: null
}

export default MangaGenre;