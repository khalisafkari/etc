import React, { Component } from 'react'
import { View, SectionList, FlatList, TouchableOpacity } from 'react-native'
import { MangaApi } from '../../../serve'
import gql from 'graphql-tag'
import { Image, Text, Header } from 'react-native-elements'
import { material } from 'react-native-typography'

class MangaViewAll extends Component {

    state = {
        new: [],
        tetangga: [],
        week: [],
        loading: true
    }

    componentDidMount() {
        MangaApi.query({ query: gql`${sql}` }).then(({ loading, data, errors }) => {
            this.setState({
                new: data.posts_unfilter.new,
                tetangga: data.posts_unfilter.tetangga,
                week: data.posts_unfilter.week,
                loading
            })
        })
    }


    static navigationOptions = { header: null }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    statusBarProps={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        translucent: true,
                        animated: true
                    }}
                    backgroundColor="black"
                    leftComponent={{
                        icon: "arrow-back",
                        color: "white",
                        //@ts-ignore
                        onPress: () => this.props.navigation.goBack()
                    }}
                />
                <SectionList
                    sections={[
                        { title: 'Baru', data: [this.Baru] },
                        { title: 'Tetangga', data: [this.Tetangga] },
                        { title: 'Minggu', data: [this.Minggu] }
                    ]}
                    renderItem={this.renderSections}
                    keyExtractor={this.key}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[material.body2]}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }

    private key = (item, index) => item + index;
    private renderSections = ({ item }) => (<View>{item()}</View>)
    private Baru = () => {
        return (
            <FlatList
                data={this.state.new}
                renderItem={this.renderItem}
                keyExtractor={this.key}
                numColumns={3}
            />
        )
    }

    private Tetangga = () => {
        return (
            <FlatList
                data={this.state.tetangga}
                renderItem={this.renderItem}
                keyExtractor={this.key}
                numColumns={3}
            />
        )
    }

    private Minggu = () => {
        return (
            <FlatList
                data={this.state.week}
                renderItem={this.renderItem}
                keyExtractor={this.key}
                numColumns={3}
            />
        )
    }

    private renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 / 3, margin: 3 }}>
                <TouchableOpacity
                    //@ts-ignore
                     onPress={() => this.props.navigation.navigate('MangaPosts', { id: item.id })}
                >
                    <Image
                        source={{ uri: `https://verdauen.com/lhscan/?id=${item.images}` }}
                        style={{
                            height: 120,
                            width: '100%'
                        }}
                    />
                    <Text numberOfLines={1} style={{ fontSize: 12 }}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}


const sql = `{
    posts_unfilter{
      week{
        id
        images
        rating
      }
      new{
        id
        images
        title
      }
      tetangga{
        id
        images
        title
      }
    }
}`

export default MangaViewAll;