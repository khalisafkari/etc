import React, { Component } from 'react'
import { View, SectionList, FlatList, TouchableOpacity } from 'react-native';
import {
    Input,
    SearchBar,
    Image,
    ListItem,
    Text,
    Button
} from 'react-native-elements';
import anime from '../../utils/anime';
import manga from '../../utils/manga';

import {
    SearchComponentAnime
    , SearchComponentManga
} from './components/SearchComponent'
import genre from '../../utils/genre';

interface State {
    Loading: boolean,
    Search?: string,
    mangadata?: Array<any>
    animedata?: Array<any>,
    genre?: boolean
}

class MangaSearch extends Component<any, State>{


    state: State = {
        Loading: false,
        Search: '',
        mangadata: [],
        animedata: [],
        genre: true
    }

    static navigationOptions = { header: null }

    private Search = async (Search) => {
        this.setState({ Search, Loading: true,genre:false })
        const todos = []
        const animedata = await anime.SearchAnime(this.state.Search)
        const mangadata = await manga.SearchManga(this.state.Search)
        //@ts-ignore
        for (let i in animedata) {
            if (animedata[i].id.indexOf('/movie/') !== -1) { }
            else {
                todos.push(animedata[i])
            }
        }
        //@ts-ignore
        this.setState({ animedata: todos, mangadata, Loading: false })
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <SearchBar
                    containerStyle={{  backgroundColor: 'transparent' }}
                    value={this.state.Search}
                    platform="ios"
                    placeholder="Search..."
                    round
                    showLoading={this.state.Loading}
                    onChangeText={this.Search}
                />
                {this.state.genre ? (
                    <FlatList
                        data={genre}
                        renderItem={this.renderGenre}
                        keyExtractor={this.key}
                    />
                ) : (<SectionList
                    sections={[
                        { title: 'Manga', data: [this.manga] },
                        { title: 'Anime', data: [this.anime] }
                    ]}
                    keyExtractor={this.key}
                    renderItem={this.renderItem}
                />)}
            </View>
        )
    }

    private renderGenre = ({item}) => (
        <View>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MangaGenre',{id:item.id})}
            >
            <ListItem
                title={item.title}
            />
            </TouchableOpacity>
        </View>
    )

    private key = (item, index) => item + index;
    private renderItem = ({ item }) => (<View>{item()}</View>)
    private manga = () => {
        return <FlatList
            data={this.state.mangadata.slice(0, 5)}
            renderItem={this.renderManga}
            keyExtractor={this.key}
        />
    }

    private anime = () => {
        return <FlatList
            data={this.state.animedata.slice(0, 5)}
            renderItem={this.renderAnime}
            keyExtractor={this.key}
        />
    }

    private renderManga = ({ item }) => (<SearchComponentManga {...item} />)

    private renderAnime = ({ item }) => (<SearchComponentAnime {...item} />)
}

export default MangaSearch;