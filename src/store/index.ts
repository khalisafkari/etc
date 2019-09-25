import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import { Platform } from 'react-native'
import { anime } from './anime';
import { manga } from './manga';
import { novel } from './novel';
import { accounts } from './accouts';


const store = combineReducers({
    anime: anime,
    manga: manga,
    novel: novel,
    accounts: accounts
})

const persistConfig = {
    key: 'root',
    storage:Platform.OS === "web" ? storage : ExpoFileSystemStorage
}


const persistedReducer = persistReducer(persistConfig, store)

export default createStore(
    persistedReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());