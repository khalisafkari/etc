
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { MangaHome, MangaLibrary, MangaSearch, MangaGenre, MangaPosts, MangaRead } from '../template/manga';
import { AnimeHome, AnimePosts, VideoAnime, AnimeList } from '../template/anime';
import { NovelHome } from '../template/novel'


import {IHManga, ISManga, ILManga} from './Icon'

const HomeManga = createStackNavigator({
  MangaHome: MangaHome,
  MangaPosts: MangaPosts,
  MangaRead: MangaRead
})

//@ts-ignore
HomeManga.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const LibraryManga = createStackNavigator({
  MangaLibrary: MangaLibrary,
  MangaPosts: MangaPosts,
  MangaRead: MangaRead
})

const SearchManga = createStackNavigator({
  MangaSearch: MangaSearch,
  MangaGenre: MangaGenre,
  MangaPosts: MangaPosts,
  MangaRead: MangaRead
})

//@ts-ignore
SearchManga.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};


//@ts-ignore
const TabsManga = createBottomTabNavigator({
  HomeManga: {
    screen: HomeManga,
    navigationOptions:({
      tabBarIcon:IHManga
    })
  },
  SearchManga: {
    screen:SearchManga,
    navigationOptions:({
      tabBarIcon:ISManga
    })
  },
  LibraryManga: {
    screen:LibraryManga,
    navigationOptions:({
      tabBarIcon:ILManga
    })
  },
}, {
    //@ts-ignore
    initialRouteName: 'HomeManga',
    //@ts-ignore
    tabBarOptions: {
      showLabel:false,
      style: {
        backgroundColor: 'black',
      },
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    
})

const HomeAnime = createStackNavigator({
      AnimeHome: AnimeHome,
      AnimePosts: AnimePosts,
      VideoAnime: VideoAnime
    }, {
        initialRouteName: 'AnimeHome',
        mode: "modal"
      })
//@ts-ignore
HomeAnime.navigationOptions = ({ navigation }) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible,
      };
    };

    const ListAnime = createStackNavigator({
      AnimeList: AnimeList
    })

//@ts-ignore
const TabsAnime = createBottomTabNavigator({
      HomeAnime: HomeAnime,
      ListAnime: ListAnime
      //@ts-ignore

    })

const HomeNovel = createStackNavigator({
      NovelHome: NovelHome
    })

//@ts-ignore
const TabsNovel = createBottomTabNavigator({
      HomeNovel: HomeNovel
    })


const Switch = createSwitchNavigator({
      Manga: TabsManga,
      Anime: TabsAnime,
      Novel: TabsNovel
    }, {
        initialRouteName: 'Manga'
      })

const mode = createSwitchNavigator({
        Free: Switch
      })

export default createAppContainer(mode)