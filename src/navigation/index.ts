
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { MangaHome, MangaLibrary, MangaSearch, MangaGenre, MangaPosts, MangaRead } from '../template/manga';
import { AnimeHome, AnimePosts, VideoAnime, AnimeList } from '../template/anime';
import { ProfileHome, ProfileHistory, ProfileBookmark,DownloadFile } from '../template/profile'
import { NovelHome } from '../template/novel'


import {
  IHManga,
  ISManga,
  ILManga,
  PRofile
} from './Icon'
import {
  Auth as Login,
  SignUp as Daftar
} from '../template/auth/auth';

import Load from '../loading'

const HomeManga = createStackNavigator({
  MangaHome: MangaHome,
  MangaPosts: {
    screen: MangaPosts,
    path: 'mangaposts',
  },
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


const Profile = createStackNavigator({
  ProfileHome: ProfileHome,
  ProfileHistory: ProfileHistory,
  ProfileBookmark: ProfileBookmark,
  MangaPosts: MangaPosts,
  MangaRead: MangaRead,
  DownloadFile:DownloadFile
})

//@ts-ignore
const TabsManga = createBottomTabNavigator({
  HomeManga: {
    screen: HomeManga,
    navigationOptions: ({
      tabBarIcon: IHManga
    })
  },
  SearchManga: {
    screen: SearchManga,
    navigationOptions: ({
      tabBarIcon: ISManga
    })
  },
  LibraryManga: {
    screen: LibraryManga,
    navigationOptions: ({
      tabBarIcon: ILManga
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({
      tabBarIcon: PRofile
    })
  }
}, {
    //@ts-ignore
    // initialRouteName: 'Profile',
    //@ts-ignore
    tabBarOptions: {
      showLabel: false,
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


const Secure = createStackNavigator({
  Login:Login,
  Daftar:Daftar
})

const Switch = createSwitchNavigator({
  Loading:Load,
  Secure:Secure,
  Manga: TabsManga,
  Anime: TabsAnime,
  Novel: TabsNovel
},{
  initialRouteName:"Loading"
})


export default createAppContainer(Switch)