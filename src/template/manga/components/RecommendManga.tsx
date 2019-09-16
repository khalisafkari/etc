import React, { useEffect,useState } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Swipers from 'react-native-swiper/src'
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import manga from '../../../utils/manga';
import { POSTS_RECOMMEND_MANGA } from '../../../store/manga';
import kitsu from '../../../utils/kitsu';
import { material, materialColors } from 'react-native-typography';



const RecommendManga = () => {

    //@ts-ignore
    const mangas  = useSelector(state => state.manga);
    const dispatch = useDispatch()
    useEffect(()=>{
        manga.RecommendManga().then(res=>{
            dispatch({type:POSTS_RECOMMEND_MANGA,payload:res});
        })
    },[])


    return (
        <View>
             {mangas.Recommend.length ? (
             <Swipers showsPagination={false}
             autoplay={true} autoplayTimeout={10} index={0} containerStyle={{maxHeight:400}}>
                {mangas.Recommend.map((i)=>(
                    <View>
                        <Swipe {...i}/>
                    </View>
                ))}
              </Swipers>):null}
        </View>
    )
}

const Swipe = (props) => {

    const [poster,setPoster] = useState(props.images)
    const [title,setTitle] = useState(props.title)
    const [synopsis,setsynopsis] = useState('')
    const navigation = useNavigation()

    useEffect(()=>{
        kitsu.MangaKitsu(props.title).then(res=>{
            //@ts-ignore
            setPoster(res.attributes.posterImage.original)
            //@ts-ignore
            setTitle(res.attributes.titles.en_jp)
            //@ts-ignore
            setsynopsis(res.attributes.synopsis)
        })
    },[])

    return(
        <View style={{flex:1,position:'relative'}}>
            <TouchableOpacity
               
            >
            <Image
                source={{uri:poster}}
                style={{height:400,width:'100%'}}
                resizeMode="stretch"
            />
            <LinearGradient
                colors={['transparent','black']}
                style={{
                    position:'absolute',
                    top:0,
                    right:0,
                    left:0,
                    height:400
                }}
            />
            <View style={{position:'absolute',padding:5,height:'100%',width:'100%',justifyContent:'flex-end'}}>
                <Text numberOfLines={2} style={[material.button,{color:materialColors.whitePrimary}]}>{title}</Text>
                <Text numberOfLines={3} style={[material.caption,{color:materialColors.whiteSecondary}]}>{synopsis}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default RecommendManga;