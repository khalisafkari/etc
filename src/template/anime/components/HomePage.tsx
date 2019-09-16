import React, { useEffect } from 'react'
import { View, FlatList,Image, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

import {useDispatch,useSelector} from 'react-redux'
import { Text } from 'react-native-elements';
import { material } from 'react-native-typography';

import {useNavigation} from 'react-navigation-hooks'

const HomePage = () => {
 
     
    //@ts-ignore
    const anime = useSelector(state => state.anime)

    const navigation = useNavigation()


    const renderItem = ({item}) => (
        <View style={{flex:1,margin:3,maxWidth:100,position:'relative'}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AnimePosts',{id:item.id})}
            >
            <Image
                source={{uri:item.images}}
                style={{
                    height:140,
                    width:100,
                    borderRadius:5
                }}
            />
            <LinearGradient
                colors={["transparent",'black']}
                start={{x:0.1,y:0}}
                style={{
                    position:'absolute',
                    left:0,
                    top:0,
                    right:0,
                    height:140
                }}
            />
            <Text numberOfLines={1} style={[material.caption,{color:'white'}]}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    )

    const renderItem2 = ({item}) => (
        <View style={{flex:1,margin:3}}>
            <TouchableOpacity
             onPress={() => navigation.navigate('AnimePosts',{id:item.id})}
            >
            <Image
                source={{uri:item.images}}
                style={{
                    height:120,
                    width:'100%',
                    borderRadius:5
                }}
            />
            </TouchableOpacity>
        </View>
    )


    const key = (item,index) => item + index;
    return(
        <View style={{flex:1}}>
            <View style={{marginHorizontal:3,marginVertical:5}}>
                <Text style={[material.title,{color:'white'}]}>Hot</Text>
            </View>
            <FlatList
                contentContainerStyle={{
                    backgroundColor:'transparent'
                }}
                data={anime.Home}
                renderItem={renderItem}
                horizontal
                keyExtractor={key}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
            <View style={{marginHorizontal:3,marginVertical:5}}>
                <Text style={[material.title,{color:'white'}]}>Baru</Text>
            </View>
            <FlatList
                data={anime.Recommend}
                renderItem={renderItem2}
                keyExtractor={key}
                numColumns={3}
            />
            
        </View>
    )
}

export default HomePage;