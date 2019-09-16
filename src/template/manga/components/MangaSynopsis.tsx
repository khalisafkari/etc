import React from 'react'
import { View, FlatList } from 'react-native';

//redux
import { useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import { Text } from 'react-native-elements';

const MangaSynopsis = () => {

    //@ts-ignore
    const state = useSelector(state => state.manga)
    const navigation = useNavigation()

    const data = state.History[navigation.getParam('id')]

    const renderItem = ({ item }) => (
        <View style={{margin:3,backgroundColor:'#eee',padding:5}}>
            <Text>{item}</Text>
        </View>
    )

    const key = (item, index) => item + index;

    return (
        <View style={{ marginTop: 10, backgroundColor: '#fff',paddingBottom:15 }}>
            {data ? (
                data.data.genre ? (
                    <View style={{ padding: 10 }}>
                        <Text h4>Summary</Text>
                    </View>
                ) : null
            ) : null}
            {data ? (
                <FlatList
                    contentContainerStyle={{
                        marginLeft:10
                    }}
                    data={data.data.genre}
                    renderItem={renderItem}
                    numColumns={4}
                    keyExtractor={key}
                />
            ) : null}
            {data ? (
                data.data.sinopsis ? (
                    <View style={{ padding: 10 }}>
                        <Text h4>Description</Text>
                    </View>
                ) : null
            ) : null}
            {data ? (
                <View style={{margin:3,marginLeft:10}}>
                    <Text numberOfLines={4}>{data.data.sinopsis}</Text>
                </View>
            ):null}
        </View>
    )
}

export default MangaSynopsis